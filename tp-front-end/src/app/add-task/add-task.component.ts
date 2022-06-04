import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.addTaskForm = this.formBuilder.group({
      taskName: '',
      taskDuration: '',
    });
  }

  ngOnInit(): void {}

  onAddTask(taskToAdd: any) {
    console.log('taskToAdd', taskToAdd);
    this.appService.publishTask(taskToAdd);
  }
}
