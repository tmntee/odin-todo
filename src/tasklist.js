class TaskList {
    #idTracker;

    constructor(title) {
        this.title = title;
        this.tasks = [];
        this.#idTracker = 0;
    }

    addTask = (task) => {
        task.id = this.#idTracker;
        this.#idTracker++;

        this.tasks.push(task);
        console.log(this.tasks);
    }

    removeTask = (task) => {
        let taskBeingDeleted = this.tasks.find((element) => { element.id === task.id});
        this.tasks.splice(this.tasks.indexOf(taskBeingDeleted));
    }
}

export { TaskList };