import "./style.css";
import { Task } from "./task.js";
import { TaskList } from "./tasklist.js";
import { ListDisplay } from "./listdisplay.js";

let todayTaskList = new TaskList("Today");
let shoesTask = new Task("buy shoes", "i need shoes", "today", 2,  todayTaskList.title);
todayTaskList.addTask(shoesTask);

let chapstickTask = new Task("buy chapstick", "vaseline", "today", 0, todayTaskList.title);
todayTaskList.addTask(chapstickTask);

let TaskListDisplayer = new ListDisplay();
TaskListDisplayer.assignTasklist(todayTaskList);

TaskListDisplayer.displayCurrentTasklist();