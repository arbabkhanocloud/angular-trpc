import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../../../lib';
import { TRPCService } from './tRPC.service';
import { v4 as uuid4 } from 'uuid';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: { text: string; done: boolean }[] = [];

  todo: ITodo[] = [];
  newTask: string = '';

  constructor(private readonly todoService: TRPCService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((list) => {
      this.todo = list;
    });
  }

  addTask() {
    if (this.newTask) {
      this.todoService.addTodo({
        todoID: uuid4(),
        text: this.newTask,
        done: false,
      });
    }
  }

  onValueChange(i: number) {
    this.todoService.updateTodo(this.todo[i]);
  }

  deleteTask(index: number) {
    this.todoService.deleteTodo(this.todo[index].todoID);
  }
}
