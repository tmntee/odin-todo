import Task from "./task.js";
import { parseISO, formatISO } from "date-fns";

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

    static #submitForm(task) {
        console.log("submitting form");
        
        const currentSelectedPrior = document.querySelector('input[name=priority]:checked');
        let priorNumber;

        switch(currentSelectedPrior) {
            case this.#noPrior:
                priorNumber = 0;
                break;

            case this.#lowPrior:
                priorNumber = 1;
                break;

            case this.#medPrior:
                priorNumber = 2;
                break;

            case this.#highPrior:
                priorNumber = 3;
                break;
        }

        task.setEditableProperties(
            this.#tasktitle.value, 
            this.#tasknotes.value, 
            parseISO(this.#duedate.value), 
            priorNumber, 
            this.#tasknotebook.value);
        this.#formdialog.close();
    }

    static #createTask() {
        console.log("creating task");
        this.#formdialog.close();
    }

    static openFormExistingTask(task) {
        this.#setupForm();

        this.#tasktitle.value = task.title;
        this.#tasknotes.value = task.description;
        this.#tasknotebook.value = task.notebook;
        this.#duedate.value = formatISO(task.dueDate, { representation: 'date'});

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
            this.#submitForm(task);
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



        // trying to make it possible for the form to display
        // through the add task button
        // make form work whenever you edit a task or create a new one
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