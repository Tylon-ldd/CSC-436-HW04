import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Task} from '../app.model';
import { config } from '../app.config';
import { AppService } from "../app.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoItemComponent implements OnInit {
  chooseStatus: boolean = false;
  urgentStatus: boolean = false;
  dayStatus: boolean = false;
  weekStatus: boolean = false;
  dueDate: string;
  taskText: string;
  tasks: Observable<any[]>;
  myTask: string;
  editMode: boolean = false;
  taskToEdit: any = {};

  constructor(private db: AngularFirestore, private taskService: AppService) { }

  ngOnInit() {
     // this.tasks = this.db.collection(config.collection_endpoint).valueChanges();
     this.tasks = this.db
     .collection(config.collection_endpoint)
     .snapshotChanges()
     .map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as Task;
         //Get document id
         const id = a.payload.doc.id;
         //Use spread operator to add the id to the document data
         return { id, ...data };
       });
     });
  }

  saveDate(dueDate: string) {
    if (dueDate == 'Urgent'){
      this.dueDate = dueDate; 
      this.urgentStatus = true;
      this.dayStatus = false;
      this.weekStatus = false;
    }
    else if (dueDate == 'Days'){
      this.dueDate = dueDate; 
      this.urgentStatus = false;
      this.dayStatus = true;
      this.weekStatus = false;
    }
    else if (dueDate == 'Week'){
      this.dueDate = dueDate; 
      this.urgentStatus = false;
      this.dayStatus = false;
      this.weekStatus = true;
    }
    console.log(this.dueDate);
    console.log(this.chooseStatus);
  }

  edit(task) {  
    console.log(task);  
    //Set taskToEdit and editMode  
    this.taskToEdit = task;  
    this.editMode = true;  
    //Set form value  
    this.myTask = task.description;
  } //edit

  saveTask() {   
    if (this.myTask !== null) {
    //Get the input value      
      let task = {
        description: this.myTask
      };      
      if (!this.editMode) {         
        console.log(task);         
        this.taskService.addTask(task);      
      } else {         
        //Get the task id         
        let taskId = this.taskToEdit.id;         
        //update the task         
        this.taskService.updateTask(taskId, task);      
      }      
      //set edit mode to false and clear form      
      this.editMode = false;      
      this.myTask = "";   
    }
  } //saveTask

  deleteTask(task) {
    //Get the task id
    let taskId = task.id;

    //delete the task
    this.taskService.deleteTask(taskId);
  } //deleteTask

}
