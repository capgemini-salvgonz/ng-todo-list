import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { TodoListService } from './service/todo.service';
import { ToDoItem } from './model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filter: "all" | "done" | "todo" = "all";
  title = 'To do List';
  toDoList: ToDoItem[] = [];
  dataView: ToDoItem[] = [];
  taskDescription: string = '';
  numbers: number[] = [1, 2, 3, 4, 5];
  displayedColumns = ['Delete', 'Task', 'Done'];

  constructor(private todoListService: TodoListService) {
    this.toDoList = todoListService.retrieveList();
    this.dataView = [...this.toDoList];
  }

  filterList(isDone: boolean) {
    this.filter = isDone ? 'done' : 'todo';
    this.dataView = this.toDoList.filter(task => task.isDone === isDone);
  }

  showAll(filter: "all" | "done" | "todo" = "all") {
    if (filter === "all") {
      this.dataView = [...this.toDoList];
      return;
    }

    this.filterList(filter === "done");
  }

  addTask() {

    if (this.taskDescription === '') {
      return;
    }

    this.toDoList.push(this.newTask());
    this.todoListService.saveAll(this.toDoList);
    this.taskDescription = '';
    this.showAll();
  }

  newTask() : ToDoItem {
    return {
      id: uuid(),
      description: this.taskDescription,
      isDone: false
    };
  }

  taskDone(id: string) {
    const item = this.toDoList.filter(todoItem => todoItem.id === id);
    if (item.length === 1) {
      item[0].isDone = !item[0].isDone;
    }
    this.todoListService.saveAll(this.toDoList);
    this.showAll();
  }

  deleteItem(id: string) {
    const index = this.toDoList.findIndex(item => item.id === id);
    this.toDoList.splice(index, 1);
    this.todoListService.saveAll(this.toDoList);
    this.showAll(this.filter);
  }

  deleteCompleted() {
    this.toDoList = this.toDoList.filter(task => !task.isDone);
    this.showAll();
  }

}
