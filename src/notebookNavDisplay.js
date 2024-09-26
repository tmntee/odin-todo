import { NotebookManager } from "./notebookManager";

class NotebookNavDisplay {
    static #notebookDiv = document.querySelector("div.notebook-nav");

    static displayNotebookOpts() {
        let notebookOpts = NotebookManager.getNotebookTitles();

        notebookOpts.forEach((opt) => {
            let tempOpt = this.#createNotebookButton(opt);
            this.#notebookDiv.appendChild(tempOpt);
        })
    }

    static #createNotebookButton(title) {
        let notebookBtn = document.createElement("button");
        notebookBtn.textContent = title;
        notebookBtn.value = title;

        notebookBtn.addEventListener('click', () => {
            NotebookManager.passNotebookToListDisplay(title);
        })

        return notebookBtn;
    }
}

export { NotebookNavDisplay };