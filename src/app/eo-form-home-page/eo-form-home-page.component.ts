// eo-form-home-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'app-eo-form-home-page',
  templateUrl: './eo-form-home-page.component.html',
  styleUrls: ['/src/styles.css']
})
export class EoFormHomePageComponent implements OnInit {
  complaints: any[] = [];
  // complaintsVisible: boolean = false;
  modalVisible: boolean = false;
  selectedComplaint: any = null;
  eoFormClicked: boolean = false;

  constructor(
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    // Retrieve complaints based on the logged-in user's role
    const currentUserRole = this.complaintService.getCurrentUserRole();
    if (currentUserRole === 'EO') {
      this.complaints = this.complaintService.getComplaintsForEO();
    } else if (currentUserRole === 'DC') {
      this.complaints = this.complaintService.getComplaintsForDC();
    } else {
      this.complaints = [];
    }
  }

  // showComplaints() {
  //   this.complaintsVisible = !this.complaintsVisible;
  // }

  openStatusModal(complaint: any) {
    this.selectedComplaint = complaint;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedComplaint = null;
  }

  toggleActionButtons(complaint: any) {
    complaint.showActions = !complaint.showActions;
  }

  assignComplaint(complaint: any) {
    console.log('Assign', complaint);
    this.router.navigate(['/enquiry-officers-form']); 
  }

  // deleteComplaint(complaint: any) {
  //   this.complaints = this.complaints.filter(c => c !== complaint);
  // }

  viewComplaint(complaint: any) {
    this.selectedComplaint = complaint;
    this.modalVisible = true;
  }

  logout() {
    console.log('Logged out');
    this.router.navigate(['/home']);
  }

  // navigateToEOForm() {
  //   this.eoFormClicked = true;
  //   this.router.navigate(['/enquiry-officers-form']); 
  // }
}
