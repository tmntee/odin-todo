import Task from "./task.js";
import { format } from "date-fns";

class TaskForm {
    static #formdialog = document.querySelector("dialog");
    static #taskform = document.querySelector("form.task-form");
    static #cancelButton = document.querySelector('.cancel-button>button');
    static #tasktitle = document.querySelector("input[name=task-title]");
    static #tasknotes = document.querySelector('textarea[name=task-notes]');
    static #tasknotebook = document.querySelector('select[name=notebook-select]');
    static #duedate = document.querySelector('input[name=due-date]');
    static #noPrior = document.getElementById('none');
    static #lowPrior = document.getElementById('low');
    static #medPrior = document.getElementById('medium');
    static #highPrior = document.getElementById('high');
    static #submitButton = document.querySelector('input[type=submit]');

    static #submitButtonParent;

    static #submitForm() {
        console.log("submitting form");
    }

    static #createTask() {
        console.log("creating task");
    }

    static openFormExistingTask(task) {
        this.#setupForm();

        this.#tasktitle.value = task.title;
        this.#tasknotes.value = task.description;
        this.#tasknotebook.value = task.notebook;

        let dueDateY = format(task.dueDate, "yyyy");
        let dueDateM = format(task.dueDate, "MM");
        let dueDateD = format(task.dueDate, "dd");

        console.log(this.#duedate);
        this.#duedate.value = `${dueDateY}-${dueDateM}-${dueDateD}`;

        switch(task.priority) {
            case 0:
                this.#noPrior.checked = true;
                break;

            case 1:
                this.#lowPrior.checked = true;
                break;

            case 2:
                this.#medPrior.checked = true;
                break;

            case 3:
                this.#highPrior.checked = true;
                break;
        }   

        this.#submitButton = document.createElement("input");
        this.#submitButton.setAttribute("type", "submit");
        this.#submitButton.value = "Submit";
        this.#submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.#submitForm();
        });

        this.#submitButtonParent.appendChild(this.#submitButton);
        this.#formdialog.showModal();
    }

    static openFormNewTask() {
        this.#setupForm();
        this.#noPrior.checked = true;
        this.#formdialog.showModal();
        
        
        this.#submitButton = document.createElement("input");
        this.#submitButton.setAttribute("type", "submit");
        this.#submitButton.value = "Create";
        this.#submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.#createTask();
        });

        this.#submitButtonParent.appendChild(this.#submitButton);

        // find a way to hold submit button parent temporarily then delete it 
        // so you can reassign the newly created submit button to the same parent
        // without having to track down the parent through dom language

        // trying to make it possible for the form to display
        // through the add task button
        // make form work whenever you edit a task or create a new one

        // commit once you get the button to display differently
        // love you bye
    }

    static #setupForm() {
        this.#cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.#formdialog.close();
        });
        console.log(this.#cancelButton);

        let defaultNotebookOpt = document.createElement("option");
        defaultNotebookOpt.setAttribute("value", "Today");
        defaultNotebookOpt.textContent = "Today";

        this.#tasknotebook.appendChild(defaultNotebookOpt);

        this.#submitButtonParent = this.#submitButton.parentNode;

        this.#submitButton.remove();
    }
}

export { TaskForm };