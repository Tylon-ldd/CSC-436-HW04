import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../app.model';
import { AppService } from "../app.service";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() task: Task;
  @Input() i: number;

  constructor(private taskService: AppService) { }

  ngOnInit() {
  }

  saveDate(dueDate: string) {
    console.log('task111', this.task);
    
    this.task.dueDate = dueDate;

    console.log('task111', this.task);

  }

  
  deleteTask(task) {
    //Get the task id
    let taskId = task.id;

    //delete the task
    this.taskService.deleteTask(taskId);
  } //deleteTask


}
