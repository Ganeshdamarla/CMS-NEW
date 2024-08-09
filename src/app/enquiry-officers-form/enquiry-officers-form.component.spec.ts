import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryOfficersFormComponent } from './enquiry-officers-form.component';

describe('EnquiryOfficersFormComponent', () => {
  let component: EnquiryOfficersFormComponent;
  let fixture: ComponentFixture<EnquiryOfficersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnquiryOfficersFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnquiryOfficersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
