import { Task } from './task';

class Notebook {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    createTask(title, description, dueDate, priority) {
        let currentTask = new Task(title, description, dueDate, priority, this);
        this.#addTask(currentTask);
    }

    #addTask = (task) => {
        this.tasks.push(task);
    }

    editTask = (task, title, description, dueDate, priority) => {

        let matchingTask = this.tasks.find((t) => {
            return t === task;
        })
        matchingTask.setEditableProperties(title, description, dueDate, priority, this);
        console.log('from notebook:' + task.priority);
    }

    removeTask = (task) => {
        let taskBeingDeleted = this.tasks.find((t) => { return t === task});
        this.tasks.splice(this.tasks.indexOf(taskBeingDeleted), 1);
    }
}

export { Notebook };