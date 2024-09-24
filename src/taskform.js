import { Task } from "./task.js";
import { parseISO, formatISO } from "date-fns";
import { NotebookManager } from "./notebookManager.js";
import { ListDisplay } from "./listdisplay.js";

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
        
        if (createMode && opts === undefined) {
        
            const assignedNotebook = NotebookManager.getNotebook(this.#tasknotebook.value);
    
            assignedNotebook.addTask(
                new Task(
                    this.#tasktitle.value, 
                    this.#tasknotes.value, 
                    ISOtoDate, 
                    this.#currentSelectedPrior.id, 
                    this.#tasknotebook.value
                    )
                );

        } else if (!createMode && opts.task !== undefined) {
            opts.task.setEditableProperties(
                this.#tasktitle.value, 
                this.#tasknotes.value, 
                ISOtoDate, 
                this.#currentSelectedPrior.id, 
                this.#tasknotebook.value);

        } else if (createMode && opts !== undefined) {
            alert('remove task argument from function'); 

        } else if (!createMode && opts === undefined) {
            alert('add task argument to function');
        }
        
        this.#formdialog.close();
        ListDisplay.displayCurrentTasklist();
    }

    static openFormExistingTask(currentTask) {
        this.#setupForm();

        this.#tasktitle.value = currentTask.title;
        this.#tasknotes.value = currentTask.description;
        this.#tasknotebook.value = currentTask.notebook;
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