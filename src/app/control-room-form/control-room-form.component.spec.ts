import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRoomFormComponent } from './control-room-form.component';

describe('ControlRoomFormComponent', () => {
  let component: ControlRoomFormComponent;
  let fixture: ComponentFixture<ControlRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlRoomFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
