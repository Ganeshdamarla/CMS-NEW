import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private complaints: any[] = [];
  private selectedComplaint: any = null;
  private controlRoomFormData: any = null;

  constructor() { }

  addComplaint(complaint: any) {
    this.complaints.push(complaint);
    this.selectedComplaint = complaint;
  }

  getComplaintsCount(): number {
    return this.complaints.length;
  }

  getComplaints() {
    return this.complaints;
  }

  updateComplaint(updatedComplaint: any) {
    const index = this.complaints.findIndex(c => c.id === updatedComplaint.id);
    if (index !== -1) {
      this.complaints[index] = updatedComplaint;
    }
    this.selectedComplaint = updatedComplaint;
  }

  getSelectedComplaint() {
    return this.selectedComplaint;
  }

  setSelectedComplaint(complaint: any) {
    this.selectedComplaint = complaint; 
  }

  getComplaintsForEO(): any[] {
    return this.complaints.filter(complaint => complaint.assignedTo === 'EO');
  }

  getComplaintsForDC(): any[] {
    return this.complaints.filter(complaint => complaint.assignedTo === 'DC');
  }

  getCurrentUserRole(): string {
    return 'EO';
  }

  setControlRoomFormData(data: any) {
    this.controlRoomFormData = data;
  }

  getControlRoomFormData() {
    return this.controlRoomFormData;
  }
}