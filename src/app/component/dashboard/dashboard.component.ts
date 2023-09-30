import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj: Task=  new Task();
  taskArr: Task[] = [];
  addTaskValue: string ='';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTasks().subscribe({
      next: res => {
        this.taskArr = res;
      },
      error: err=> alert('aleart while fetching tasks')
    });
  }

  addTask() {
    this.taskObj.task_message = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: res=> {
        this.ngOnInit();
        this.addTaskValue='';
    }, 
    error: err=> alert(err)
  });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe({
      next: res=>{
        console.log(res);
        this.ngOnInit();
    },
    error: err=> alert("unable to delete task")
  });
  }

  updateTask() {
    this.taskObj.task_message= this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: res=> {
        console.log("Task updated");
        this.ngOnInit();
      },
      error: err=> alert("task can't be updated")
    });

  }

  editButton(task: Task){
    this.taskObj = task;
    this.editTaskValue = task.task_message;
  }

}
