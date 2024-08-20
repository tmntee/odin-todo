import "./style.css";
import { Task } from "./task.js";
import { TaskList } from"./tasklist.js";

let todayTaskList = new TaskList("Today");
todayTaskList.addTask(new Task("buy shoes", "i need shoes", "today", 3, "should go to walmart or target"));