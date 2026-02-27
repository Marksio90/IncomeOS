-- IncomeOS Database Schema
-- PostgreSQL with pgvector for Supabase

-- Enable pgvector extension for semantic search
create extension if not exists vector;

-- Users table (synced from Clerk)
create table if not exists users (
    id text primary key,
    clerk_id text unique not null,
    email text not null,
    name text,
    tier text not null default 'explorer' check (tier in ('explorer', 'builder', 'operator', 'ceo')),
    credits_remaining integer not null default 50,
    credits_total integer not null default 50,
    credits_reset_date timestamptz,
    income_goal numeric(12, 2),
    primary_focus text,
    onboarding_completed boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Skill profiles from diagnosis
create table if not exists skill_profiles (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    name text not null,
    category text not null,
    proficiency_level integer check (proficiency_level between 0 and 100),
    monetization_potential integer check (monetization_potential between 0 and 100),
    demand_score integer check (demand_score between 0 and 100),
    suggested_paths text[],
    raw_analysis text,
    embedding vector(1536),
    created_at timestamptz default now()
);

-- Monetization paths (recommended and tracked)
create table if not exists monetization_paths (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    title text not null,
    category text not null,
    description text,
    match_score integer,
    estimated_revenue_min numeric(10, 2),
    estimated_revenue_max numeric(10, 2),
    time_to_revenue text,
    difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
    status text default 'recommended' check (status in ('recommended', 'active', 'paused', 'completed')),
    implementation_steps jsonb default '[]',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Revenue streams
create table if not exists revenue_streams (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    name text not null,
    type text not null,
    platform text,
    monthly_revenue numeric(12, 2) default 0,
    trend text default 'stable' check (trend in ('up', 'down', 'stable')),
    trend_percent numeric(5, 2) default 0,
    customers integer default 0,
    last_payment_date timestamptz,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Revenue history (monthly snapshots)
create table if not exists revenue_history (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    stream_id uuid references revenue_streams(id) on delete cascade,
    month date not null,
    revenue numeric(12, 2) not null,
    customers integer default 0,
    created_at timestamptz default now(),
    unique (stream_id, month)
);

-- Workflows
create table if not exists workflows (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    name text not null,
    description text,
    trigger_type text not null,
    trigger_config jsonb default '{}',
    actions jsonb default '[]',
    status text default 'draft' check (status in ('draft', 'active', 'paused')),
    last_run_at timestamptz,
    runs_this_month integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Chat conversations
create table if not exists conversations (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    title text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Chat messages
create table if not exists messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid references conversations(id) on delete cascade,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    agent_type text,
    credits_used integer default 0,
    created_at timestamptz default now()
);

-- AI credit usage log
create table if not exists credit_usage (
    id uuid primary key default gen_random_uuid(),
    user_id text references users(id) on delete cascade,
    action_type text not null,
    credits_used integer not null default 1,
    metadata jsonb default '{}',
    created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_skill_profiles_user on skill_profiles(user_id);
create index if not exists idx_monetization_paths_user on monetization_paths(user_id);
create index if not exists idx_revenue_streams_user on revenue_streams(user_id);
create index if not exists idx_revenue_history_stream on revenue_history(stream_id, month);
create index if not exists idx_workflows_user on workflows(user_id);
create index if not exists idx_conversations_user on conversations(user_id);
create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_credit_usage_user on credit_usage(user_id, created_at);

-- Vector similarity search index for skill embeddings
create index if not exists idx_skill_embedding on skill_profiles
    using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Row Level Security policies
alter table users enable row level security;
alter table skill_profiles enable row level security;
alter table monetization_paths enable row level security;
alter table revenue_streams enable row level security;
alter table revenue_history enable row level security;
alter table workflows enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table credit_usage enable row level security;

-- RLS policies: users can only access their own data
create policy "Users can view own profile" on users
    for select using (id = current_setting('app.current_user_id', true));

create policy "Users can view own skills" on skill_profiles
    for all using (user_id = current_setting('app.current_user_id', true));

create policy "Users can view own monetization paths" on monetization_paths
    for all using (user_id = current_setting('app.current_user_id', true));

create policy "Users can view own revenue" on revenue_streams
    for all using (user_id = current_setting('app.current_user_id', true));

create policy "Users can view own workflows" on workflows
    for all using (user_id = current_setting('app.current_user_id', true));

create policy "Users can view own conversations" on conversations
    for all using (user_id = current_setting('app.current_user_id', true));

create policy "Users can view own messages" on messages
    for all using (
        conversation_id in (
            select id from conversations
            where user_id = current_setting('app.current_user_id', true)
        )
    );
