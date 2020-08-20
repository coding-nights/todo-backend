import Knex from 'knex';

const KnexPg = new Knex({client: 'pg'});

const validationMessages = {
    name: 'please enter your correct name'
}

class TaskController {
    get(pool, req, res) {
        res.send({
            id: req.params.id,
            message: 'hello from first api'
        });
    }

    async getAll(pool, req, res) {
        const query = KnexPg.select({
            'task_id': 'task.task_id',
            'task_name': 'task.name',
            'task_description': 'task.description',
            'task_status': 'task.status',
            'creator_id': 'creator.account_id',
            'creator_name': 'creator.name',
            'assignee_id': 'assignee.account_id',
            'assignee_name': 'assignee.name'
        }).from({
            'task': 'task.task'
        }).leftJoin({
            'creator': 'account.account'
        }, {
            'task.creator_id': 'creator.account_id'
        }).leftJoin({
            'assignee': 'account.account'
        }, {
            'task.assignee_id': 'assignee.account_id'
        });
        try {
            const result = await pool.query(query.toString());
            res.send(result.rows);
        } catch (e) {
            res.statusCode = 500;
            res.send(e);
        }

    }

    async update(pool, req, res) {
        if (req.validationError) {
            let errors = [];
            req.validationError.validation.forEach(error => {
                const field  = error.keyword === 'enum' ? error.dataPath.split('.')[1] : error.params.missingProperty;
                errors.push({
                    field,
                    code: error.keyword,
                    message: validationMessages[field]
                });
            })
            return res.code(400).send(errors);
        }
        const taskId = req.params.id;
        const {
            name,
            description,
            assigneeId,
            creatorId,
            priority,
            status
        } = req.body;


        const query = `
            insert into task.task (task_id,name, description, creator_id, assignee_id, priority, status)
               values (${taskId}, '${name}', '${description}', ${creatorId}, ${assigneeId}, '${priority}', '${status}');
        `;

        try {
            await pool.query(query);
            res.send({
                message: `task has been created by ${req.body.creatorId}. the task id is ${req.params.id}`
            });
        } catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    }
}

export default TaskController;

