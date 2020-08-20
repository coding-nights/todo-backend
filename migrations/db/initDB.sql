drop table if exists task.task;
drop table if exists account.account;
drop type if exists task.priority_type;
drop type if exists task.status_type;
drop schema if exists account;
drop schema if exists task;
create schema account;
create schema task;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE task.priority_type AS ENUM (
    'high', 'medium', 'low'
    );

CREATE TYPE task.status_type AS ENUM ('todo', 'in_progress', 'to_deploy', 'test', 'testing', 'fixed');

create table account.account (
     account_id uuid not  null primary key default uuid_generate_v4(),
     name text not null,
     bio text not null default '',
     position text not null default ''
);

create table task.task (
   task_id uuid not null primary key default uuid_generate_v4(),
   name text not null,
   description text not null,
   priority task.priority_type default 'low',
   status task.status_type default 'todo',
   creator_id uuid not null references account.account(account_id),
   assignee_id uuid not null references account.account(account_id),
   created_at timestamptz not null default NOW(),
   updated_at timestamptz not null default NOW()
);



insert into account.account (account_id, name) values
('b903832b-12fe-43fc-a2d6-0cde16b243e4', 'mehdi'),
('ebb61b60-f1ee-41fe-a391-499fcba3b138', 'pouria');


insert into task.task (name, description, creator_id, assignee_id) values
('Hello TaskController', 'We need first task', 'ebb61b60-f1ee-41fe-a391-499fcba3b138', 'b903832b-12fe-43fc-a2d6-0cde16b243e4' ),
('Create Mobile View', 'We need mobile view to handle mobile experience', 'ebb61b60-f1ee-41fe-a391-499fcba3b138', 'ebb61b60-f1ee-41fe-a391-499fcba3b138'),
('Create Desktop view', 'We need desktop view to handle desktop experience', 'b903832b-12fe-43fc-a2d6-0cde16b243e4', 'b903832b-12fe-43fc-a2d6-0cde16b243e4');
