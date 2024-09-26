import "./style.css";
import { Notebook } from "./notebook.js";
import { ListDisplay } from "./listdisplay.js";
import { NotebookManager } from "./notebookManager.js";
import { NotebookNavDisplay } from "./notebookNavDisplay.js";

let defaultNotebook = new Notebook("default");
NotebookManager.addNotebook(defaultNotebook);

defaultNotebook.createTask("buy shoes", "i need shoes", new Date(2024, 11, 14), 2);
defaultNotebook.createTask("buy chapstick", "vaseline", new Date(2024, 8, 10), 0);
defaultNotebook.createTask("bombaclaat", "idk", new Date(2022, 11, 14), 3);

ListDisplay.assignNotebook(defaultNotebook);
ListDisplay.displayCurrentNotebook();

NotebookManager.addNotebook(new Notebook('madagascar'));

NotebookNavDisplay.displayNotebookOpts();
NotebookNavDisplay.loadButtons();