// agent-home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import { ComplaintDataService } from '../complaint-data-service.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['/src/styles.css']
})
export class AgentHomeComponent {
  // tasksVisible: boolean = false;
  modalVisible: boolean = false;
  selectedTask: any = null;
  agentFormClicked: boolean = false;

  tasks: any[] = [];


  constructor(
    private router: Router,
    private complaintService: ComplaintService,
    private complaintDataService: ComplaintDataService
  ) {
    this.tasks = this.complaintService.getComplaints();
  }

  // showTasks() {
  //   this.tasksVisible = !this.tasksVisible;
  // }

  closeModal() {
    this.modalVisible = false;
    this.selectedTask = null;
  }

  toggleActionButtons(task: any) {
    task.showActions = !task.showActions;
  }

  assignTask(task: any) {
    console.log('Assign', task);
    this.complaintDataService.setSelectedComplaint(task); 
    this.router.navigate(['/control-room-form']);
  }

  // deleteTask(task: any) {
  //   this.tasks = this.tasks.filter(t => t !== task);
  // }

  viewTask(task: any) {
    this.selectedTask = task;
    console.log('Selected Task:', this.selectedTask);
    this.modalVisible = true;
  }

  Newcomplaint() {
    this.router.navigate(['/Agent-complaint-form']);
  }


  logout() {

    this.router.navigate(['/home']);
  }
}
