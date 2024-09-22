class Task {
    constructor(title, description, dueDate, priority, notebook) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notebook = notebook;
    }
    id = undefined;
    #completed = false;
    #showDescription = false;
    #pinned = false;

    getCompleted = () => {
        return this.#completed;
    }

    setCompleted = (bool) => {
        this.#completed = bool;
    }

    getShowDesc = () => {
        return this.#showDescription;
    }

    setShowDesc = (bool) => {
        this.#showDescription = bool;
    }

    getPinned = () => {
        return this.#pinned;
    }

    setPinned = (bool) => {
        this.#pinned = bool;
    }

    setEditableProperties = (title, description, dueDate, priority, notebook) => {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notebook = notebook;
    }
}

export { Task };