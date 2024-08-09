import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../complaint.service';
import { Router } from '@angular/router';


interface FormField {
  label: string;
  name: string;
  type: string;
  readonly: boolean;
  disabled: boolean;
  options?: string[];
  value?: string | number;
  isButton?: boolean;
}

const validationMessages = {
  required: 'This field is required.'
  
};

@Component({
  selector: 'app-enquiry-officers-form',
  templateUrl: './enquiry-officers-form.component.html',
  styleUrls: ['/src/styles.css']
})
export class EnquiryOfficersFormComponent {
  complaintForm: FormGroup;
  popupForm: FormGroup;
  activeFields: { [key: string]: boolean } = {};
  submitted = false;
  isPopupVisible = false;
  showConditionalFields = false;

  leftColumnFields: FormField[] = [
    // { label: 'Complaint Id', name: 'complaintId', type: 'text', readonly: true, disabled: true },
    // { label: 'Complaint details', name: 'complaintDetails', type: 'text', readonly: true, disabled: true},
    // { label: 'Complaint Type', name: 'complaintType', type: 'text', readonly: true, disabled: false },
    // { label: 'Attachments', name: 'attachments', type: 'file', readonly: true, disabled: true },
    // { label: 'Mandal', name: 'mandal', type: 'text', readonly: true, disabled: true},
    // { label: 'Village', name: 'village', type: 'text', readonly: true, disabled: true },
    // { label: 'Received Time Stamp', name: 'receivedTimeStamp', type: 'text', readonly: true, disabled: true},
    
  ];

  rightColumnFields: FormField[] = [
    { label: 'Status', name: 'status', type: 'dropdown', options: ['Assigned','ATR Preliminary Submitted','ATR Submitted'], readonly: false, disabled: false },
    { label: 'ATR', name: 'atr', type: 'textarea', readonly: false, disabled: false },
    { label: 'ATR Attachments', name: 'atrAttachments', type: 'file', readonly: false, disabled: false },
    { label: 'Persons arrested', name: 'personsArrested', type: 'number', readonly: false, disabled: false },
    { label: 'Seizure Type', name: 'seizureType', type: 'dropdown', options: ['Vehicles', 'Contraband','Others'], readonly: false, disabled: false },
    { label: 'Number of vehicles seized', name: 'numberOfVehiclesSeized', type: 'number', readonly: false, disabled: false },
    { label: 'Contraband Type', name: 'ContrabandType', type: 'dropdown', options: ['Illicit Liquor ', 'Beer','Jaggery','Ganja'], readonly: false, disabled: false },
    { label: 'Quantity seized (Litres)', name: 'quantitySeized', type: 'number', readonly: false, disabled: false },
    { label: 'Illicit Liquor', name: 'illicitLiquor', type: 'dropdown', options: ['Adulterated Toddy', 'NDPL','Duty Paid Liquor (IML)','Spurious Liquor','RS/ENA','ID Liquor','Wash','Others (IL)'], readonly: false, disabled: false },
    { label: 'ATR Preliminary', name: 'Preliminary', type: 'button', readonly: false, disabled: false },
  ];

  popupWindowFields: FormField[] = [
    { label: 'Inspection Date', name: 'InspectionDate', type: 'date', readonly: false, disabled: false },
    { label: 'Inspecting Officer', name: 'InspectingOfficer', type: 'text', readonly: false, disabled: false },
    { label: 'Crime Detection Status', name: 'CrimeDetectionStatus', type: 'dropdown', options: ['Detected', 'Not Detected'], readonly: false, disabled: false },
    { label: 'Crime Location', name: 'CrimeLocation', type: 'text', readonly: false, disabled: false },
    { label: 'Cr. #', name: 'Cr', type: 'text', readonly: false, disabled: false },
    { label: 'Cases booked', name: 'Casesbooked', type: 'number', readonly: false, disabled: false },
    { label: 'U/S', name: 'US', type: 'text', readonly: false, disabled: false },
    { label: 'PersonsArrested#', name: 'PersonsArrested', type: 'number', readonly: false, disabled: false },
    { label: 'Contraband Seized', name: 'ComplaintSource', type: 'number', readonly: false, disabled: false },
    { label: 'Contraband Value (INR)', name: 'ContrabandValue', type: 'number', readonly: false, disabled: false },
    { label: 'Remarks', name: 'Remarks', type: 'text', readonly: false, disabled: false },
  ];

  constructor(private fb: FormBuilder,private complaintService: ComplaintService,private router: Router) {
    this.complaintForm = this.fb.group({
      complaintId: [{ value: '', disabled: true }],
      complaintDetails: [{ value: '', disabled: true }],
      complaintType: [{ value: '', disabled: true }],
      attachments: [{ value: '', disabled: true }],
      mandal: [{ value: '', disabled: true }],
      village: [{ value: '', disabled: true }],
      receivedTimeStamp: [{ value: '', disabled: true }],
      status: ['', Validators.required],
      atr: ['', Validators.required],
      atrAttachments: ['', Validators.required],
      personsArrested: ['', Validators.required],
      seizureType: ['', Validators.required],
      numberOfVehiclesSeized: ['', Validators.required],
      ContrabandType: ['', Validators.required],
      quantitySeized: ['', Validators.required],
      illicitLiquor: ['', Validators.required],
    });
    this.popupForm = this.fb.group({});
  }

  ngOnInit() {
    this.initializeForm();
    this.setupConditionalFieldDisplay();
    const controlRoomFormData = this.complaintService.getControlRoomFormData();
    if (controlRoomFormData) {
      this.populateForm(controlRoomFormData);
    }
  }

  populateForm(data: any): void {
    this.complaintForm.patchValue({
      complaintId: data.complaintId,
      complaintDetails: data.complaintDetails,
      complaintType: data.complaintType,
      attachments: data.attachments,
      mandal: data.mandal,
      village: data.village,
      receivedTimeStamp: data.timeStamp,
    });
    this.activeFields['complaintId'] = !!data.complaintId;
    this.activeFields['complaintDetails'] = !!data.complaintDetails;
    this.activeFields['complaintType'] = !!data.complaintType;
    this.activeFields['attachments'] = !!data.attachments;
    this.activeFields['mandal'] = !!data.mandal;
    this.activeFields['village'] = !!data.village;
    this.activeFields['receivedTimeStamp'] = !!data.timeStamp;
  }

  

  initializeForm() {
    this.leftColumnFields.concat(this.rightColumnFields).forEach(field => {
      if (field.type !== 'button') {
        this.complaintForm.addControl(field.name, this.fb.control({ value: field.value || '', disabled: field.disabled }, Validators.required));
      }
      this.activeFields[field.name] = !!field.value;
    });
    this.popupWindowFields.forEach(field => {
      const isOptionalField = ['CrimeLocation', 'Cr', 'Casesbooked', 'US', 'PersonsArrested', 'ComplaintSource', 'ContrabandValue'].includes(field.name);
      this.popupForm.addControl(field.name, this.fb.control({ value: field.value || '', disabled: field.disabled }, isOptionalField ? [] : Validators.required));
    });
  }

  setupConditionalFieldDisplay() {
    this.popupForm.get('CrimeDetectionStatus')?.valueChanges.subscribe(value => {
      this.showConditionalFields = value === 'Detected';
    });
  }

  onFocus(fieldName: string) {
    this.activeFields[fieldName] = true;
  }

  onBlur(fieldName: string) {
    if (!this.complaintForm.get(fieldName)?.value) {
      this.activeFields[fieldName] = false;
    }
  }

  isActive(fieldName: string): boolean {
    return this.activeFields[fieldName];
  }

  getErrorMessage(fieldName: string): string {
    const control = this.complaintForm.get(fieldName);
    if (control && control.invalid && control.touched) {
      const errors = control.errors ?? {}; 
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        const errorKey = errorKeys[0] as keyof typeof validationMessages; 
        return validationMessages[errorKey];
      }
    }
    return '';
  }

  showPopup() { 
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.complaintForm.controls).forEach(field => {
      const control = this.complaintForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if (this.complaintForm.valid) {
      console.log(this.complaintForm.value);
      alert('Form submitted successfully');
      this.complaintForm.reset();
      this.submitted = false;
      this.router.navigate(['/eo-form-home']);
    }
  }

  onPopupSubmit() {
    if (this.popupForm.valid) {
      console.log(this.popupForm.value);
      this.hidePopup();
    }
  }
}