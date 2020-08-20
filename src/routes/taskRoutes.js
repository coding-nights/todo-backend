import TaskController from '../controllers/task/taskController.js';
import TaskSchema from "../controllers/task/taskSchema.js";
const todoController = new TaskController();

const TaskRoutes = [
    {
        method: 'POST',
        address: '/task/:id',
        schema: TaskSchema.update,
        controller: todoController.update
    },
    {
        method: 'GET',
        address: '/task/:id',
        controller: todoController.get
    },
    {
        method: 'GET',
        address: '/task',
        controller: todoController.getAll
    }
];

export default {TaskRoutes, TaskController };