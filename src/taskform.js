import { Task } from "./task.js";
import { parseISO, formatISO } from "date-fns";
import { NotebookManager } from "./notebookManager.js";
import { ListDisplay } from "./listdisplay.js";
import { Notebook } from "./notebook.js";

class TaskForm {
    static #formdialog = document.querySelector("dialog");
    static #taskform = document.querySelector("form.task-form");
    static #cancelButton = document.querySelector('.cancel-button>button');
    static #tasktitle = document.querySelector("input[name=task-title]");
    static #tasknotes = document.querySelector('textarea[name=task-notes]');
    static #tasknotebook = document.querySelector('select[name=notebook-select]');
    static #duedate = document.querySelector('input[name=due-date]');
    static #noPrior = document.getElementById('0');
    static #lowPrior = document.getElementById('1');
    static #medPrior = document.getElementById('2');
    static #highPrior = document.getElementById('3');
    static #currentSelectedPrior = document.querySelector('input[name=priority]:checked');

    static #submitButton = document.querySelector('input[type=submit]');

    static #submitButtonParent;

    static #submitForm(createMode, opts) {  
        this.#currentSelectedPrior = document.querySelector('input[name=priority]:checked');
        let ISOtoDate = parseISO(this.#duedate.value);
        const assignedNotebook = NotebookManager.getNotebooks().at(this.#tasknotebook.value);
        
        if (createMode && opts === undefined) {
    
            assignedNotebook.createTask(
                this.#tasktitle.value, 
                this.#tasknotes.value, 
                ISOtoDate, 
                Number(this.#currentSelectedPrior.id));
                
                console.log('making new task');

        } else if (!createMode && opts.task !== undefined) {

            if (assignedNotebook === opts['task'].notebook) {

                console.log(this.#currentSelectedPrior.id);

                assignedNotebook.editTask(
                    opts['task'],
                    this.#tasktitle.value, 
                    this.#tasknotes.value, 
                    ISOtoDate, 
                    Number(this.#currentSelectedPrior.id));

                    console.log('editing task');


            } else {
                assignedNotebook.createTask(
                    this.#tasktitle.value, 
                    this.#tasknotes.value, 
                    ISOtoDate, 
                    Number(this.#currentSelectedPrior.id));

                opts['task'].notebook.removeTask(opts['task']);

                console.log('switching notebooks');

            }

        } else if (createMode && opts !== undefined) {
            alert('remove task argument from function'); 

        } else if (!createMode && opts === undefined) {
            alert('add task argument to function');
        }
        
        this.#formdialog.close();
        ListDisplay.displayCurrentNotebook();
    }

    static openFormExistingTask(currentTask) {
        this.#setupForm();

        this.#tasktitle.value = currentTask.title;
        this.#tasknotes.value = currentTask.description;

        for (let i = 0; i < NotebookManager.getNotebooks().length; i++) {
            if (NotebookManager.getNotebooks().at(i) === currentTask.notebook) {
                this.#tasknotebook.value = i;
            }
        }

        this.#duedate.value = formatISO(currentTask.dueDate, { representation: 'date'});

        switch(currentTask.priority) {
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
            if (this.#taskform.checkValidity()) {
                if (this.#tasknotebook.checkValidity()) {
                    this.#submitForm(false, {task: currentTask});
                } else {
                    this.#tasknotebook.reportValidity();
                }
                
            } else {
                this.#taskform.reportValidity();
            }
  
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
            if (this.#taskform.checkValidity()) {
                if (this.#tasknotebook.checkValidity()) {
                    this.#submitForm(true);
                } else {
                    this.#tasknotebook.reportValidity();
                }
                
            } else {
                this.#taskform.reportValidity();
            }
            
        });
        this.#submitButtonParent.appendChild(this.#submitButton);

        // working on creating a new task
        // make sure to validate the form before a user can submit
        // for each missing thing add a message to the label of what to add
        // turn fields red for missing inputs
        // add this functionality for when the user edits an existing task as well
    }

    static #setupForm() {
        this.#taskform.reset();
        this.#loadNotebookOpts();

        this.#cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.#formdialog.close();
        });

        this.#submitButtonParent = this.#submitButton.parentNode;

        this.#submitButton.remove();
    }

    static #clearNotebookOpts() {
        console.log('clearing options');

        while (this.#tasknotebook.firstChild) {
            this.#tasknotebook.removeChild(this.#tasknotebook.firstChild);
        }
    }

    static #loadNotebookOpts() {
        this.#clearNotebookOpts();

        let defaultOption = document.createElement("option");
        defaultOption.value = '';
        defaultOption.textContent = "Select a notebook";
        this.#tasknotebook.appendChild(defaultOption);

        for (let i = 0; i < NotebookManager.getNotebookTitles().length; i++) {
            let tempOpt = document.createElement("option");
            tempOpt.textContent = NotebookManager.getNotebookTitles().at(i);
            tempOpt.value = i;
            this.#tasknotebook.appendChild(tempOpt);
            if (NotebookManager.getNotebooks().at(i) === ListDisplay.getCurrentNotebook()) {
                tempOpt.setAttribute("selected","");
            }
        }
    }
}

export { TaskForm };