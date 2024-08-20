class TaskList {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    
    #idTracker = 0;

    addTask = (task) => {
        task.id = this.#idTracker;
        this.#idTracker++;

        this.tasks.push(task);
        console.log(this.tasks);
    }
}

export { TaskList };