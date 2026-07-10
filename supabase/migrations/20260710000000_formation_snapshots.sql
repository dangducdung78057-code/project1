-- 队形快照表：黑点草图 / 2.5D / 3D 共用统一米制坐标 payload
create table if not exists public.formation_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null default '未命名队形',
  preview_mode text not null default 'dot-sketch' check (preview_mode in ('dot-sketch','stage-2.5d','stage-3d')),
  template_id text,
  stage jsonb not null,
  performers jsonb not null,
  keyframes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.formation_snapshots enable row level security;

-- per-user 隔离（隐私硬约束：仅本人可见）
create policy "formation_snapshots_select_own"
  on public.formation_snapshots for select
  using (auth.uid() = user_id);

create policy "formation_snapshots_insert_own"
  on public.formation_snapshots for insert
  with check (auth.uid() = user_id);

create policy "formation_snapshots_update_own"
  on public.formation_snapshots for update
  using (auth.uid() = user_id);

create policy "formation_snapshots_delete_own"
  on public.formation_snapshots for delete
  using (auth.uid() = user_id);

create index if not exists formation_snapshots_user_idx on public.formation_snapshots(user_id, updated_at desc);
create index if not exists formation_snapshots_project_idx on public.formation_snapshots(project_id);
