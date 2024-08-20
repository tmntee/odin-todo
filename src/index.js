import "./style.css";
import { Task } from "./task.js";
import { TaskList } from "./tasklist.js";
import { ListDisplay } from "./listdisplay.js";

let todayTaskList = new TaskList("Today");
let shoesTask = new Task("buy shoes", "i need shoes", "today", 2, "should go to walmart or target");
todayTaskList.addTask(shoesTask);


let TaskListDisplayer = new ListDisplay();
TaskListDisplayer.displayTaskList(todayTaskList);

let chapstickTask = new Task("buy chapstick", "vaseline", "today", 0, "Buy from target");
todayTaskList.addTask(chapstickTask);
TaskListDisplayer.displayTaskList(todayTaskList);