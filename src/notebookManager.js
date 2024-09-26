import { ListDisplay } from './listdisplay';

class NotebookManager {
    static #notebookList = [];

    static addNotebook(notebook) {
        this.#notebookList.push(notebook);
    }

    // somehow make delete/edit tasklist buttons have associated ids to the tasklist id so if two notebooks were to have the same name
    // the notebook manager would delete the right one. 

    // also notebook manager should not be handing out notebooks all willy nilly
    // so find a way to refactor that

    // you also need to create a add and edit notebook form/modal
    // also need to make it when you click to preset buttons on the top that the list display generates
    // custom notebook and displays them based off ALL task due dates/pin statuses

    // after visual finishing touches you should be finished and can come back later to add search, sort, and filter capabilities

    static getNotebooks() {
        return this.#notebookList;
    }

    static getNotebookTitles() {
        let nbTitles = [];
        
        this.#notebookList.forEach((nb) => {
            nbTitles.push(nb.title);
        })
       
        return nbTitles;
    }

    static passNotebookToListDisplay(notebook) {
        try {
            ListDisplay.assignNotebook(notebook);
            ListDisplay.displayCurrentNotebook();
        } catch {
            alert('error');
        }
    }
}

export { NotebookManager };