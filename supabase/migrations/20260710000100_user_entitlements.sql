-- 用户权益表 + 服务端权益校验（数据库层硬约束，不依赖 Edge Function 部署）

create table if not exists public.user_entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'member', 'custom')),
  max_performers integer not null default 40,
  updated_at timestamptz not null default now()
);

alter table public.user_entitlements enable row level security;

-- 本人只读；写入只允许 service_role（升级通过支付回调/管理员完成，前端不可自改）
drop policy if exists "entitlements_select_own" on public.user_entitlements;
create policy "entitlements_select_own"
  on public.user_entitlements for select
  using (auth.uid() = user_id);

-- 读取用户档位（无记录视为 free）
create or replace function public.get_user_tier(uid uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select tier from public.user_entitlements where user_id = uid), 'free');
$$;

-- 服务端权益硬校验：免费档不得保存 2.5D/3D 预览快照，且演员数不得超过档位上限
create or replace function public.enforce_formation_entitlements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tier text;
  v_max integer;
  v_count integer;
begin
  v_tier := public.get_user_tier(new.user_id);
  v_max := coalesce((select max_performers from public.user_entitlements where user_id = new.user_id),
                    case when v_tier = 'free' then 40 when v_tier = 'member' then 120 else 300 end);

  if v_tier = 'free' and new.preview_mode in ('stage-2.5d', 'stage-3d') then
    raise exception 'ENTITLEMENT_DENIED: 免费档位不支持保存 % 预览快照', new.preview_mode
      using errcode = 'P0001';
  end if;

  v_count := coalesce(jsonb_array_length(new.performers), 0);
  if v_count > v_max then
    raise exception 'ENTITLEMENT_DENIED: 演员数 % 超过当前档位上限 %', v_count, v_max
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_formation_entitlements on public.formation_snapshots;
create trigger trg_enforce_formation_entitlements
  before insert or update on public.formation_snapshots
  for each row execute function public.enforce_formation_entitlements();
