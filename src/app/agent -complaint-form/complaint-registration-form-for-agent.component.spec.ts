import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintRegistrationFormForAgentComponent } from './complaint-registration-form-for-agent.component';

describe('ComplaintRegistrationFormForAgentComponent', () => {
  let component: ComplaintRegistrationFormForAgentComponent;
  let fixture: ComponentFixture<ComplaintRegistrationFormForAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintRegistrationFormForAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintRegistrationFormForAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
