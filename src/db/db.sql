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
    account_id integer not  null primary key,
    name text not null,
    bio text not null default '',
    position text not null default ''
);

create table task.task (
    task_id integer not null primary key,
    name text not null,
    description text not null,
    priority task.priority_type default 'low',
    status task.status_type default 'task',
    creator_id integer not null references account.account(account_id),
    assignee_id integer not null references account.account(account_id),
    created_at timestamptz not null default NOW(),
    updated_at timestamptz not null default NOW()
);



insert into account.account (account_id, name) values
(1, 'mehdi'),
(2, 'pouria');


insert into task.task (task_id, name, description, creator_id, assignee_id) values
(1, 'Hello TaskController', 'We need first task', 2, 1 ),
(2, 'Create Mobile View', 'We need mobile view to handle mobile experience', 2, 2),
(3, 'Create Desktop view', 'We need desktop view to handle desktop experience', 1, 1);
