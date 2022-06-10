import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskModelComponent } from './edit-task-model.component';

describe('EditTaskModelComponent', () => {
  let component: EditTaskModelComponent;
  let fixture: ComponentFixture<EditTaskModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
