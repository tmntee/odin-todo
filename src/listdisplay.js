class ListDisplay {
    tasklistDiv = document.querySelector("div.tasklist");
    #currentListBeingDisplayed;

    createTaskElement(task) {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");

        let taskTitle = document.createElement("h1");
        taskTitle.textContent = task.title;
        taskElement.appendChild(taskTitle);

        let taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;
        taskElement.appendChild(taskDescription);

        let taskDueDate = document.createElement("p");
        taskDueDate.textContent = task.dueDate;
        taskElement.appendChild(taskDueDate);

        let taskPriority = document.createElement("div");
        switch (task.priority) {
            case 0: 
                taskPriority.style.backgroundColor = "red";
                break;
            
            case 1:
                taskPriority.style.backgroundColor = "yellow";

            case 2:
                taskPriority.style.backgroundColor = "green";
        }
        taskPriority.textContent = "  . ";
        taskElement.appendChild(taskPriority);

        let taskNotes = document.createElement("p");
        taskNotes.textContent = task.notes;
        taskElement.appendChild(taskNotes);

        return taskElement;
    }
    
    displayTaskList(tasklist) {
        this.clearDisplay();
        tasklist.tasks.forEach((task) => {
            this.tasklistDiv.appendChild(this.createTaskElement(task));
        })
    }

    clearDisplay() {
        while(this.tasklistDiv.firstChild) {
            this.tasklistDiv.removeChild(this.tasklistDiv.firstChild);
            console.log("clearing");
        }
    }
}

export { ListDisplay };