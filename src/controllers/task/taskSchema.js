const TaskSchema = {
    update: {
        body: {
            type: 'object',
            required: [
                'name',
                'description',
                'status',
                'priority',
                'assigneeId',
                'creatorId'
            ],
            properties: {
                name:  {
                    type: 'string',
                    maxLength: 10
                },
                description: {
                    type: 'string',
                    maxLength: 20
                },
                status: {
                    type: 'string',
                    enum: [
                        'task', 'in_progress', 'to_deploy', 'test', 'testing', 'fixed'
                    ]
                },
                priority: {
                    type: 'string',
                    enum: [
                        'high', 'medium', 'low'
                    ]
                },
                assigneeId: {
                    type: 'number'
                },
                creatorId: {
                    type: 'number',
                    nullable: false
                }
            }
        }
    }
};


export default TaskSchema;