// complaint-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplaintDataService {
  private selectedComplaint: any;

  constructor() {}

  setSelectedComplaint(complaint: any) {
    this.selectedComplaint = complaint;
  }

  getSelectedComplaint(): any {
    return this.selectedComplaint;
  }
}
