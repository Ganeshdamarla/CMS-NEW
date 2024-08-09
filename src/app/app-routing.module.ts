import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintFormComponent } from './dc-form/complaint-form.component';
import { PublicFormComponent } from './public-complaint-form/public-form.component';
import { HomeComponent } from './home/home.component';
import {UserLoginComponent} from './user-login/user-login.component'
import { LoginComponent } from './admin-login/login.component';
import { ComplaintRegistrationFormForAgentComponent } from './agent -complaint-form/complaint-registration-form-for-agent.component';
import { EnquiryOfficersFormComponent } from './enquiry-officers-form/enquiry-officers-form.component';
import { EoFormHomePageComponent } from './eo-form-home-page/eo-form-home-page.component'; 
import { ControlRoomFormComponent } from './control-room-form/control-room-form.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ActsAndRulesComponent } from './acts-and-rules/acts-and-rules.component';
import { DcHomeComponent } from './dc-home/dc-home.component';
import { FeaturesComponent } from './features/features.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'complaint-form', component: ComplaintFormComponent },
  { path: 'public-form', component: PublicFormComponent },
  { path: 'login', component: UserLoginComponent }, 
  { path: 'Agent-complaint-form', component: ComplaintRegistrationFormForAgentComponent },
  { path: 'enquiry-officers-form', component:EnquiryOfficersFormComponent },
  { path: 'eo-form-home', component: EoFormHomePageComponent },
  { path: 'control-room-form', component: ControlRoomFormComponent }, 
  { path: 'Agent-complaint-form', component: ComplaintRegistrationFormForAgentComponent },
  {path:'contactus',component:ContactUsComponent},
  { path: 'acts-and-rules', component: ActsAndRulesComponent },
  {path:'dc-home',component:DcHomeComponent},
  {path:'features',component:FeaturesComponent},
  { path: '**', redirectTo: '/home' },
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
