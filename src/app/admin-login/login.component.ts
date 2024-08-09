import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/src/styles.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      complaintId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const selectedRole = this.loginForm.value.role;

      switch (selectedRole) {
        case 'agent':
          this.router.navigate(['/agent-home']);
          break;
        case 'dc':
        
          this.router.navigate(['/dc-home']);
          break;
        case 'eo':
          this.router.navigate(['/eo-form-home']);
          break;
        default:
          console.log('Invalid role selected:', selectedRole);
          break;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Getter methods for form controls 
  get complaintId() {
    return this.loginForm.get('complaintId');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
