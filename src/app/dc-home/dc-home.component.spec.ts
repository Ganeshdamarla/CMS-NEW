import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcHomeComponent } from './dc-home.component';

describe('DcHomeComponent', () => {
  let component: DcHomeComponent;
  let fixture: ComponentFixture<DcHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DcHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DcHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
