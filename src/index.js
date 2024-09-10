import "./style.css";
import { Task } from "./task.js";
import { TaskList } from "./tasklist.js";
import { ListDisplay } from "./listdisplay.js";

let todayTaskList = new TaskList("Today");
let shoesTask = new Task("buy shoes", "i need shoes", new Date(2024, 11, 14), 2,  todayTaskList.title);
todayTaskList.addTask(shoesTask);

let chapstickTask = new Task("buy chapstick", "vaseline", new Date(2024, 8, 10), 0, todayTaskList.title);
todayTaskList.addTask(chapstickTask);

let bombaclaat = new Task("bombaclaat", "idk", new Date(2022, 11, 14), 3, todayTaskList.title);
todayTaskList.addTask(bombaclaat);

let TaskListDisplayer = new ListDisplay();
TaskListDisplayer.assignTasklist(todayTaskList);

TaskListDisplayer.displayCurrentTasklist();