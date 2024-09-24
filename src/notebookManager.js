class NotebookManager {
    static #notebookList = [];

    static addNotebook(notebook) {
        this.#notebookList.push(notebook);
    }

    static getNotebookTitles() {
        let notebookTitlesList = [];

        this.#notebookList.forEach((notebook) => {
            notebookTitlesList.push(notebook.title);
        })

        return notebookTitlesList;
    }

    static getNotebook(name) {
        let indexOfNotebook = NotebookManager.getNotebookTitles().indexOf(name);
       
        return this.#notebookList.at(indexOfNotebook);
    }
}

export { NotebookManager };