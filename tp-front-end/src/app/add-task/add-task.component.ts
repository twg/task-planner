import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private appService: AppService,
    private router: Router
  ) {
    this.addTaskForm = this.formBuilder.group({
      taskName: '',
      taskDuration: '',
    });
  }

  ngOnInit(): void { }

  onAddTask(taskToAdd: any) {
    this.appService.publishTask(taskToAdd);
    this.router.navigateByUrl('viewtask');
  }
}
