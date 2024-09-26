import { ListDisplay } from './listdisplay';
import { isSameWeek, isToday, isSameMonth, isPast } from "date-fns";
import { Notebook } from './notebook';

class NotebookManager {
    static #notebookList = [];

    static addNotebook(notebook) {
        this.#notebookList.push(notebook);
    }

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

            ListDisplay.assignNotebook(notebook);
            ListDisplay.displayCurrentNotebook();
        
    }

    static #getAllTasks() {
        let master_notebook = [];

        this.#notebookList.forEach((notebook) => {
            notebook.tasks.forEach((task) => {
                master_notebook.push(task);
            })
        })

        return master_notebook;
    }

    static generateNotebook(type) {
        let generatedNb = new Notebook("generated");

        switch(type) {
            case "TODAY":
                generatedNb.tasks = this.#getAllTasks().filter((task) => {
                    return isToday(task.dueDate);
                })
                break;

            case "THIS_WEEK":
                generatedNb.tasks = this.#getAllTasks().filter((task) => {
                    return isSameWeek(task.dueDate);
                })
                break;

            case "THIS_MONTH":
                generatedNb.tasks = this.#getAllTasks().filter((task) => {
                    return isSameMonth(task.dueDate);
                })
                break;

            case "OVERDUE":
                generatedNb.tasks = this.#getAllTasks().filter((task) => {
                    return isPast(task.dueDate);
                })
                break;

            case "PINNED":
                generatedNb.tasks = this.#getAllTasks().filter((task) => {
                    return task.getPinned();
                })
                break;

            case "ALL":
                generatedNb.tasks = this.#getAllTasks();
                break;
        }

        console.log(generatedNb);
        this.passNotebookToListDisplay(generatedNb);
    }
}

export { NotebookManager };