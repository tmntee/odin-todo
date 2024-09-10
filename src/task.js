class Task {
    constructor(title, description, dueDate, priority, notebook) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notebook = notebook;
        this.completed = false;
        this.showDescription = false;
        this.pinned = false;
    }
    id = undefined;
}

export { Task };