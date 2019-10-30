import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Task} from '../app.model';
import { config } from '../app.config';
import { AppService } from "../app.service";

@Component({
  selector: 'app-new-todo-item',
  templateUrl: './new-todo-item.component.html',
  styleUrls: ['./new-todo-item.component.css']
})
export class NewTodoItemComponent implements OnInit {
  dueDate: string;
  taskText: string;
  myTask: string;
  editMode: boolean = false;

  constructor(private db: AngularFirestore, private taskService: AppService) { }

  ngOnInit() {
  }

  saveDate(dueDate: string) {
    this.dueDate = dueDate; 
    console.log(this.dueDate);
  }

  saveTask() {   
    if (this.myTask !== null) {
    //Get the input value      
      let task = {
        description: this.myTask,
        dueDate: 'Urgent'
      };     
      console.log(task); 
      // if (this.dueDate) {         
        console.log(12345);         
        this.taskService.addTask(task);      
      // } else {         
        //Get the task id         
        //let taskId = this.taskToEdit.id;         
        //update the task         
        //this.taskService.updateTask(taskId, task);      
      // }      
      //set edit mode to false and clear form      
      //this.editMode = false;      
      this.myTask = "";   
    }
  } //saveTask

}
