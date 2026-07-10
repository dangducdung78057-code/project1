-- 工程收口迁移：补齐缺失表 + 会员过期降级 + 审计日志
-- 表：profiles / appearance_snapshots / schedule_tasks / audit_logs
-- 强化：user_entitlements.expires_at 过期即降级（服务端 get_user_tier 统一判定）

-- ============ profiles ============
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- 注册自动建档
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ appearance_snapshots ============
create table if not exists public.appearance_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default '未命名外观',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_appearance_snapshots_user on public.appearance_snapshots (user_id, updated_at desc);
alter table public.appearance_snapshots enable row level security;

drop policy if exists "appearance_select_own" on public.appearance_snapshots;
create policy "appearance_select_own" on public.appearance_snapshots for select using (auth.uid() = user_id);
drop policy if exists "appearance_insert_own" on public.appearance_snapshots;
create policy "appearance_insert_own" on public.appearance_snapshots for insert with check (auth.uid() = user_id);
drop policy if exists "appearance_update_own" on public.appearance_snapshots;
create policy "appearance_update_own" on public.appearance_snapshots for update using (auth.uid() = user_id);
drop policy if exists "appearance_delete_own" on public.appearance_snapshots;
create policy "appearance_delete_own" on public.appearance_snapshots for delete using (auth.uid() = user_id);

-- ============ schedule_tasks（倒排计划任务完成状态，全档位可用） ============
create table if not exists public.schedule_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  performance_date date not null,
  task_key text not null,
  title text not null,
  due_date date not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, performance_date, task_key)
);

create index if not exists idx_schedule_tasks_user on public.schedule_tasks (user_id, performance_date);
alter table public.schedule_tasks enable row level security;

drop policy if exists "schedule_select_own" on public.schedule_tasks;
create policy "schedule_select_own" on public.schedule_tasks for select using (auth.uid() = user_id);
drop policy if exists "schedule_insert_own" on public.schedule_tasks;
create policy "schedule_insert_own" on public.schedule_tasks for insert with check (auth.uid() = user_id);
drop policy if exists "schedule_update_own" on public.schedule_tasks;
create policy "schedule_update_own" on public.schedule_tasks for update using (auth.uid() = user_id);
drop policy if exists "schedule_delete_own" on public.schedule_tasks;
create policy "schedule_delete_own" on public.schedule_tasks for delete using (auth.uid() = user_id);

-- ============ audit_logs（只增不改不删） ============
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_logs_user on public.audit_logs (user_id, created_at desc);
alter table public.audit_logs enable row level security;

drop policy if exists "audit_select_own" on public.audit_logs;
create policy "audit_select_own" on public.audit_logs for select using (auth.uid() = user_id);
drop policy if exists "audit_insert_own" on public.audit_logs;
create policy "audit_insert_own" on public.audit_logs for insert with check (auth.uid() = user_id);
-- 无 update/delete 策略 → 用户不可篡改审计记录

-- ============ 会员过期降级 ============
alter table public.user_entitlements add column if not exists expires_at timestamptz;

-- get_user_tier 统一判定过期：expires_at 已过 → 视为 free（服务端触发器同步生效）
create or replace function public.get_user_tier(uid uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select case when e.expires_at is not null and e.expires_at < now() then 'free' else e.tier end
     from public.user_entitlements e
     where e.user_id = uid),
    'free');
$$;

-- 演员上限同样考虑过期
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
  v_max := case when v_tier = 'free' then 40
                else coalesce((select max_performers from public.user_entitlements where user_id = new.user_id), 40)
           end;

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
