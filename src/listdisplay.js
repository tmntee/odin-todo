import { format, isPast, formatDistanceToNow } from "date-fns";
import editicon from './edit_icon.png';
import pinicon from './pin_icon.png';
import trashicon from './trash_icon.png';
import descicon from './desc_icon.png';
import checkicon from './check_icon.png';
import { TaskForm } from './taskform.js';

class ListDisplay {
    tasklistDiv = document.querySelector("div.tasklist");
    pinnedTasklistDiv = document.querySelector("div.pinned-tasklist");
    #currentListBeingDisplayed;
    #TASK_ACTION_HEIGHT = 30;

    createTaskElement(task) {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");

        let taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("action-btn");
        const deleteIcon = new Image();
        deleteIcon.height = this.#TASK_ACTION_HEIGHT;
        deleteIcon.src = trashicon;
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", () => {
            this.#currentListBeingDisplayed.removeTask(task);
            this.displayCurrentTasklist();
        })
        taskActions.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.classList.add("action-btn");
        const editIcon = new Image();
        editIcon.height = this.#TASK_ACTION_HEIGHT;
        editIcon.src = editicon;
        editBtn.appendChild(editIcon);
        editBtn.addEventListener('click', () => {
            TaskForm.openFormExistingTask(task);
        })
        taskActions.appendChild(editBtn);

        let pinBtn = document.createElement("button");
        pinBtn.classList.add("action-btn");
        const pinIcon = new Image();
        pinIcon.height = this.#TASK_ACTION_HEIGHT;
        pinIcon.src = pinicon;
        pinBtn.appendChild(pinIcon);
        if (task.getPinned() === true) {
            pinBtn.classList.add("pinned");
        }
        pinBtn.addEventListener('click', () => {
            if(task.getPinned() === true) {
                task.setPinned(false);
            } else {
                task.setPinned(true);
            }
            this.displayCurrentTasklist();
        });
        taskActions.appendChild(pinBtn);

        taskElement.appendChild(taskActions);

        let taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        let taskHeader = document.createElement("div");
        taskHeader.classList.add("task-header");

        let taskHeader1 = document.createElement("div");
        taskHeader1.classList.add("task-title");
        if (task.completed) {
            taskHeader1.classList.add("completed");
        }

        let checkbox = document.createElement("button");
        checkbox.classList.add("check-box");
        checkbox.height = this.#TASK_ACTION_HEIGHT;
        let checkIcon = new Image();
        checkbox.appendChild(checkIcon);
        if (task.getCompleted() === true) {
            checkbox.classList.add("completed");
            checkIcon.src = checkicon;
            checkIcon.height = this.#TASK_ACTION_HEIGHT;
        }
        checkbox.addEventListener('click', () => {
            if (task.getCompleted() === false) {
                task.setCompleted(true);
            } else {
                task.setCompleted(false);
            }
            this.displayCurrentTasklist();
        })

        let taskTitle = document.createElement("h1");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = task.title;

        let descToggle = document.createElement("button");
        descToggle.classList.add("desc-toggle");
        const descIcon = new Image();
        descIcon.height = 15;
        descIcon.src = descicon;
        descToggle.appendChild(descIcon);

        descToggle.addEventListener("click", () => {
            if(task.getShowDesc() === false) {
                taskDescription.classList.remove("hiding");
                task.setShowDesc(true);
            } else {
                taskDescription.classList.add("hiding");
                task.setShowDesc(false);
            }
        })

        taskHeader.appendChild(checkbox);
        taskHeader1.appendChild(taskTitle);
        taskHeader1.appendChild(descToggle);

        taskHeader.appendChild(taskHeader1);

        let taskHeader2 = document.createElement("div");
        taskHeader2.classList.add("due-date");

        let priority = document.createElement("p");
        priority.classList.add("priority");
        switch (task.priority) {
            case 0: 
                priority.textContent = "";
                break;

            case 1:
                priority.textContent = "!";
                break;

            case 2: 
                priority.textContent = "!!";
                break;

            case 3:
                priority.textContent = "!!!";

        }

        let date = document.createElement("h1");
        if (isPast(task.dueDate)) {
            date.textContent = formatDistanceToNow(task.dueDate, {addSuffix: true});
            date.classList.add("overdue");
        } else {
            date.textContent = format(task.dueDate, "MMM dd, yyyy");
        }
       

        let notebookName = document.createElement("p");
        notebookName.classList.add("notebook-name");
        notebookName.textContent = task.notebook;

        taskHeader2.appendChild(priority);
        taskHeader2.appendChild(date);
        taskHeader2.appendChild(notebookName);

        taskHeader.appendChild(taskHeader2);

        taskInfo.appendChild(taskHeader);

        let taskDescription = document.createElement("div");
        taskDescription.classList.add("task-desc");
        taskDescription.textContent = task.description;
        if (task.showDescription === false) {
            taskDescription.classList.add("hiding");
        }

        taskInfo.appendChild(taskDescription);

        taskElement.appendChild(taskInfo);

        return taskElement;
    }

    assignTasklist(tasklist) {
        this.#currentListBeingDisplayed = tasklist;
    }
    
    displayCurrentTasklist() {
        this.clearDisplay();
        let completedTasks = [];

        this.#currentListBeingDisplayed.tasks.forEach((task) => {
            if (task.getPinned() === true) {
                this.pinnedTasklistDiv.appendChild(this.createTaskElement(task));
            }
            else if (task.getCompleted() === true) {
                completedTasks.push(task);
            } else {
                this.tasklistDiv.appendChild(this.createTaskElement(task));
            }
        })

        completedTasks.reverse();

        completedTasks.forEach((task) => {
            this.tasklistDiv.appendChild(this.createTaskElement(task));
        })

        let addTaskButton = document.createElement("button");
        addTaskButton.textContent = "add task";
        addTaskButton.addEventListener('click', () => {
            TaskForm.openFormNewTask();
        });
        this.tasklistDiv.appendChild(addTaskButton);
    }

    clearDisplay() {
        while(this.pinnedTasklistDiv.firstChild) {
            this.pinnedTasklistDiv.removeChild(this.pinnedTasklistDiv.firstChild);
        }
        while(this.tasklistDiv.firstChild) {
            this.tasklistDiv.removeChild(this.tasklistDiv.firstChild);
        }
        console.log("clearing");
    }
}

export { ListDisplay };