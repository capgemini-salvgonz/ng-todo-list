import { Injectable } from "@angular/core";
import { ToDoItem } from "../model/todo.model";

@Injectable({ providedIn: 'root' })
export class TodoListService {

  retrieveList() {
    const storedTodoList = localStorage.getItem('tdl');
    return storedTodoList === null
      ? []
      : JSON.parse(storedTodoList);
  }

  async saveAll(toDoList: ToDoItem[]) {
    localStorage.setItem('tdl', JSON.stringify(toDoList));
  }
}