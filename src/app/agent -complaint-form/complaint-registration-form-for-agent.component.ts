import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { ComplaintService } from '../complaint.service';

interface FormField {
  label: string;
  name: string;
  type: string;
  readonly: boolean;
  disabled: boolean;
  options?: string[];
  value?: string | number;
}

const validationMessages = {
  required: 'This field is required.'
};

@Component({
  selector: 'app-complaint-registration-form-for-agent',
  templateUrl: './complaint-registration-form-for-agent.component.html',
  styleUrls: ['/src/styles.css']
})
export class ComplaintRegistrationFormForAgentComponent implements OnInit {
  formData: { [key: string]: any } = {};
  activeFields: { [key: string]: boolean } = {};
  errors: { [key: string]: string } = {};
  submitted = false;
  complaintId: string = '';

  leftColumnFields: FormField[] = [
    { label: 'Name', name: 'Name', type: 'text', readonly: false, disabled: false },
    { label: 'Phone', name: 'Phone', type: 'number', readonly: false, disabled: false },
    { label: 'Aadhaar', name: 'Aadhaar', type: 'number', readonly: false, disabled: false },
    { label: 'District', name: 'District', type: 'dropdown', options: ['Srikakulam', 'Vizianagaram', 'Visakhapatnam', 'East Godavari', 'West Godavari', 'Krishna', 'Guntur', 'Prakasham', 'Nellore', 'Chittoor', 'Cuddapah', 'Anantapur', 'Kurnool'], readonly: false, disabled: false },
    { label: 'Mandal', name: 'Mandal', type: 'dropdown', options: ['Puttur', 'Tirupati', 'Nagari', 'Narayanavanam', 'Renigunta'], readonly: false, disabled: false },
    { label: 'Village', name: 'Village', type: 'dropdown', options: ['Puttur', 'Tirupati', 'Nagari', 'Narayanavanam', 'Renigunta'], readonly: false, disabled: false },
    { label: 'Complaint details', name: 'Complaint details', type: 'textarea', readonly: false, disabled: false },
    { label: 'Attachment', name: 'Attachment', type: 'file', readonly: false, disabled: false },
    { label: 'Complaint Source', name: 'ComplaintSource', type: 'dropdown', options: ['Phone', 'In-writing', 'Email', 'SMS', 'IPress/e-Media', 'EC'], readonly: false, disabled: false },
  ];

  constructor(private router: Router, private complaintService: ComplaintService, private http: HttpClient) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchFormData(); 
  }

  initializeForm() {
    this.leftColumnFields.forEach(field => {
      this.formData[field.name] = field.value || '';
      this.activeFields[field.name] = !!field.value;
    });
  }

  fetchFormData() {
    this.http.get('https://58622452-b1d4-423c-be9b-d21d3f596da8.mock.pstmn.io/user').subscribe((data: any) => {
      console.log('Fetched form data:', data);
      this.formData = data; 
      Object.keys(data).forEach(fieldName => {
        this.activeFields[fieldName] = !!data[fieldName];
      });
    });
  }

  onFocus(fieldName: string) {
  this.activeFields[fieldName] = true;
  }

  onBlur(fieldName: string) {
    if (!this.formData[fieldName]) {
      this.activeFields[fieldName] = false;
    }
  }


  isActive(fieldName: string): boolean {
    return this.activeFields[fieldName];
  }

  getErrorMessage(fieldName: string): string {
    return validationMessages['required'];
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.formData[fieldName] = file;
    } 
  }

  generateComplaintID(district: string, date: Date, sequenceNumber: number): string {
    const districtCode = district.substring(0, 3).toUpperCase();
    const dateString = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString().substring(2)}`;
    const sequenceString = sequenceNumber.toString().padStart(3, '0');
    return `${districtCode}${dateString}${sequenceString}`;
  }

  onSubmit() {
    this.submitted = true;
    this.errors = {};

    this.leftColumnFields.forEach(field => {
      if (!this.formData[field.name]) {
        this.errors[field.name] = this.getErrorMessage(field.name);
      }
    });

    if (Object.keys(this.errors).length === 0) {
      const date = new Date();
      const sequenceNumber = this.complaintService.getComplaintsCount() + 1;
      this.complaintId = this.generateComplaintID(this.formData['District'], date, sequenceNumber);
      
      const complaint = {
        id: this.complaintId,
        name: this.formData['Name'],
        phone: this.formData['Phone'],
        aadhaar: this.formData['Aadhaar'],
        district: this.formData['District'],
        mandal: this.formData['Mandal'],
        village: this.formData['Village'],
        details: this.formData['Complaint details'],
        attachment: this.formData['Attachment'],
        timestamp: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
      };
      
      this.complaintService.addComplaint(complaint);
      alert('Form submitted successfully');
      
      this.router.navigate(['/agent-home']);
      
    }
  }
}