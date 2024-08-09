import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'app-control-room-form',
  templateUrl: './control-room-form.component.html',
  styleUrls: ['/src/styles.css']
})  
export class ControlRoomFormComponent implements OnInit {
  controlRoomForm: FormGroup;
  statusOptions: string[] = ['New', 'Unattended', 'Assigned', 'ATR Preliminary Submitted', 'Enquiry Completed', 'Invalid', 'Closed', 'Review'];
  reasonOptions: string[] = ['Not Pertaining to department', 'Not Verifiable', 'Not Legible', 'Others'];
  complaintTypeOptions: string[] = ['ID Liquor', 'Unauthorised IML', 'Toddy Adulteration', 'A4 Shop Violation', '2B Violation', 'Defence Liquor', 'NDPL', 'Spurious Liquor', 'RS/ENA', 'DS', 'Ganja', 'Excise Personnel', 'Others'];
  a4ShopViolationOptions: string[] = ['MRP', 'Timings', 'Loose sale', 'Unauthorised Storage', 'Others (A4)'];
  twoBViolationOptions: string[] = ['Timing', 'Parcel Sale', 'Unauthorised Storage', 'Others (2B)'];
  assignedToOptions: any[] = [
    { value: 'EO', label: 'Enforcement Officer (EO)' },
    { value: 'DC', label: 'District Collector (DC)' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private complaintService: ComplaintService
  ) {
    this.controlRoomForm = this.fb.group({
      complaintId: [{ value: '', disabled: true }],
      complaintSource: [{ value: 'Online', disabled: true }],
      complaintName: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      mandal: [{ value: '', disabled: true }],
      village: [{ value: '', disabled: true }],
      complaintDetails: ['', Validators.required],
      attachments: [{ value: '', disabled: true }], 
      status: ['', Validators.required],
      reason: [''],
      complaintType: ['', Validators.required],
      a4ShopViolation: [''],
      twoBViolation: [''],
      assignedTo: ['', Validators.required],
      timeStamp: [{ value: new Date().toLocaleString(), disabled: true }],
      atr: [''], 
      atrUpload: [''], 
      feedback: [''] 
    });
  }

  ngOnInit(): void {
    const selectedComplaint = this.complaintService.getSelectedComplaint();
    if (selectedComplaint) {
      this.populateForm(selectedComplaint);
    }
    this.onChanges();
  }

  populateForm(complaint: any): void {
    this.controlRoomForm.patchValue({
      complaintId: complaint.id,
      complaintName: complaint.name,
      district: complaint.district,
      mandal: complaint.mandal,
      village: complaint.village,
      complaintDetails: complaint.details,
      attachments: complaint.attachments,
    });
  }

  onChanges(): void {
    this.controlRoomForm.get('status')?.valueChanges.subscribe(value => {
      if (value === 'Invalid') {
        this.controlRoomForm.get('reason')?.setValidators([Validators.required]);
      } else {
        this.controlRoomForm.get('reason')?.clearValidators();
      }
      this.controlRoomForm.get('reason')?.updateValueAndValidity();
    });

    this.controlRoomForm.get('complaintType')?.valueChanges.subscribe(value => {
      if (value === 'A4 Shop Violation') {
        this.controlRoomForm.get('a4ShopViolation')?.setValidators([Validators.required]);
      } else {
        this.controlRoomForm.get('a4ShopViolation')?.clearValidators();
      }
      this.controlRoomForm.get('a4ShopViolation')?.updateValueAndValidity();

      if (value === '2B Violation') {
        this.controlRoomForm.get('twoBViolation')?.setValidators([Validators.required]);
      } else {
        this.controlRoomForm.get('twoBViolation')?.clearValidators();
      }
      this.controlRoomForm.get('twoBViolation')?.updateValueAndValidity();
    });

    this.controlRoomForm.get('assignedTo')?.valueChanges.subscribe(value => {
      if (value === 'DC') {
        this.router.navigate(['/dc-form']);
      } else if (value === 'EO') {
        this.router.navigate(['/eo-form']);
      }
    });
  }

  onSubmit() {
    if (this.controlRoomForm.valid) {
      const formData = this.controlRoomForm.getRawValue();
      console.log('Form data:', formData);

      const updatedComplaint = {
        ...this.complaintService.getSelectedComplaint(),
        status: formData.status,
        reason: formData.reason,
        complaintType: formData.complaintType,
        a4ShopViolation: formData.a4ShopViolation,
        twoBViolation: formData.twoBViolation,
        assignedTo: formData.assignedTo,
        timeStamp: new Date().toLocaleString(),
        atr: formData.atr,
        feedback: formData.feedback
      };
      this.complaintService.setControlRoomFormData(formData);
      
      this.complaintService.updateComplaint(updatedComplaint);

     
      alert('Form submitted successfully');
      if (formData.assignedTo === 'DC') {
        this.router.navigate(['/dc-home']);
      } else if (formData.assignedTo === 'EO') {
        this.router.navigate(['/eo-form-home']);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}




