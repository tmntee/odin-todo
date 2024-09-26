import { NotebookManager } from "./notebookManager";
import { Notebook } from "./notebook.js";

class NotebookNavDisplay {
    static #notebookDiv = document.querySelector("div.notebooks");
    static #genNbBtns = document.querySelectorAll("button.genNbs");

    static displayNotebookOpts() {
        while (this.#notebookDiv.firstChild) {
            this.#notebookDiv.removeChild(this.#notebookDiv.firstChild);
            console.log("clearing");
        }

        let notebookOpts = NotebookManager.getNotebooks();

        notebookOpts.forEach((nb) => {
            let notebookOptRow = document.createElement("div");
            notebookOptRow.classList.add("notebook-row");

            let notebookBtn = document.createElement("button");
            notebookBtn.textContent = nb.title;
            notebookBtn.value = NotebookManager.getNotebooks().findIndex((notebook) => { return notebook === nb });

            notebookBtn.addEventListener('click', () => {
                NotebookManager.passNotebookToListDisplay(nb);
            })

            let deleteNbBtn = document.createElement("button");
            deleteNbBtn.textContent = "Delete";
            deleteNbBtn.addEventListener("click", () => {
                if (confirm('Are you sure? You will delete all of the tasks in this notebook.')) {
                    this.#notebookDiv.removeChild(notebookOptRow);
                    NotebookManager.removeNotebook(notebookBtn.value);
                }
            });

            notebookOptRow.appendChild(deleteNbBtn);
            notebookOptRow.appendChild(notebookBtn);

            this.#notebookDiv.appendChild(notebookOptRow);
        })

        let addNotebookBtn = document.createElement('button');
        addNotebookBtn.textContent = 'add notebook';
        addNotebookBtn.addEventListener('click', () => {
            this.#notebookDiv.removeChild(addNotebookBtn);
            this.#newNotebookField();
            this.#notebookDiv.appendChild(addNotebookBtn);
            addNotebookBtn.setAttribute("disabled","");
        })

        this.#notebookDiv.appendChild(addNotebookBtn);
    }

    static #newNotebookField() {
        let smallForm = document.createElement("form");
        smallForm.classList.add("sml-form");
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("required","");

        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener('click',(e) => {
            e.preventDefault();
            if(smallForm.checkValidity()) {
                NotebookManager.addNotebook(new Notebook(nameInput.value));
                this.displayNotebookOpts();
            } else {
                smallForm.reportValidity();
            }
        })

        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.displayNotebookOpts();
        })

        smallForm.appendChild(nameInput);
        smallForm.appendChild(submitBtn); 
        smallForm.appendChild(cancelBtn);    
        
        this.#notebookDiv.appendChild(smallForm);
    }

    static loadButtons() {
        let btnArray = Array.from(this.#genNbBtns);

        btnArray.forEach((btn) => {
            btn.addEventListener('click', () => {
                NotebookManager.generateNotebook(btn.value);
            })
        })
    }
}

export { NotebookNavDisplay };