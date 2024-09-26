import { NotebookManager } from "./notebookManager";
import { Notebook } from "./notebook.js";

class NotebookNavDisplay {
    static #notebookDiv = document.querySelector("div.notebooks");

    static displayNotebookOpts() {
        while (this.#notebookDiv.firstChild) {
            this.#notebookDiv.removeChild(this.#notebookDiv.firstChild);
            console.log("clearing");
        }

        let notebookOpts = NotebookManager.getNotebooks();

        notebookOpts.forEach((nb) => {
            let tempOpt = this.#createNotebookButton(nb);
            this.#notebookDiv.appendChild(tempOpt);
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

    static #createNotebookButton(notebook) {
        let notebookBtn = document.createElement("button");
        notebookBtn.textContent = notebook.title;
        notebookBtn.value = NotebookManager.getNotebooks().findIndex((nb) => { return nb === notebook });

        notebookBtn.addEventListener('click', () => {
            NotebookManager.passNotebookToListDisplay(notebook);
        })

        return notebookBtn;
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
}

export { NotebookNavDisplay };