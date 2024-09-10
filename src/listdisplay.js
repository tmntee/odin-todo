class ListDisplay {
    tasklistDiv = document.querySelector("div.tasklist");
    #currentListBeingDisplayed;

    createTaskElement(task) {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");

        let taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        let pinBtn = document.createElement("button");
        pinBtn.classList.add("action-btn");
        pinBtn.textContent = "pin";
        let pinBtnIcon = document.createElement("img");
        pinBtnIcon.setAttribute("src","");
        pinBtn.appendChild(pinBtnIcon);
        taskActions.appendChild(pinBtn);

        let editBtn = document.createElement("button");
        editBtn.classList.add("action-btn");
        editBtn.textContent = "edit";
        let editBtnIcon = document.createElement("img");
        editBtnIcon.setAttribute("src","");
        taskActions.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("action-btn");
        deleteBtn.textContent = "delete";
        let deleteBtnIcon = document.createElement("img");
        deleteBtnIcon.setAttribute("src","");
        taskActions.appendChild(deleteBtn);

        taskElement.appendChild(taskActions);

        let taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        let taskHeader = document.createElement("div");
        taskHeader.classList.add("task-header");

        let taskHeader1 = document.createElement("div");
        taskHeader1.classList.add("task-header");

        let checkbox = document.createElement("button");
        checkbox.classList.add("check-box");

        let taskTitle = document.createElement("h1");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = task.title;

        let descToggle = document.createElement("button");
        descToggle.classList.add("desc-toggle");
        descToggle.textContent = "V";

        descToggle.addEventListener("click", () => {
            if(task.showDescription === false) {
                taskDescription.classList.remove("hiding");
                task.showDescription = true;
            } else {
                taskDescription.classList.add("hiding");
                task.showDescription = false;
            }
        })


        taskHeader1.appendChild(checkbox);
        taskHeader1.appendChild(taskTitle);
        taskHeader1.appendChild(descToggle);

        taskHeader.appendChild(taskHeader1);

        let taskHeader2 = document.createElement("div");
        taskHeader2.classList.add("task-header");

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
        date.textContent = task.dueDate;

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
        this.#currentListBeingDisplayed.tasks.forEach((task) => {
            this.tasklistDiv.appendChild(this.createTaskElement(task));
        })
        let addTaskButton = document.createElement("button");
        addTaskButton.textContent = "add task";
        this.tasklistDiv.appendChild(addTaskButton);
        console.log("am i working");
    }

    clearDisplay() {
        while(this.tasklistDiv.firstChild) {
            this.tasklistDiv.removeChild(this.tasklistDiv.firstChild);
            console.log("clearing");
        }
    }
}

export { ListDisplay };