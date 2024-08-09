import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EoFormHomePageComponent } from './eo-form-home-page.component';

describe('EoFormHomePageComponent', () => {
  let component: EoFormHomePageComponent;
  let fixture: ComponentFixture<EoFormHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EoFormHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EoFormHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
