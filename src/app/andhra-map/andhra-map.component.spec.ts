import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndhraMapComponent } from './andhra-map.component';

describe('AndhraMapComponent', () => {
  let component: AndhraMapComponent;
  let fixture: ComponentFixture<AndhraMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AndhraMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AndhraMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
