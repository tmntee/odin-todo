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

    getCompleted = () => {
        return this.completed;
    }

    setCompleted = (bool) => {
        this.completed = bool;
    }

    getShowDesc = () => {
        return this.showDescription;
    }

    setShowDesc = (bool) => {
        this.showDescription = bool;
    }

    getPinned = () => {
        return this.pinned;
    }

    setPinned = (bool) => {
        this.pinned = bool;
    }
}

export { Task };