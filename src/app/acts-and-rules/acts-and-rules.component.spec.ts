import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsAndRulesComponent } from './acts-and-rules.component';

describe('ActsAndRulesComponent', () => {
  let component: ActsAndRulesComponent;
  let fixture: ComponentFixture<ActsAndRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActsAndRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActsAndRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
