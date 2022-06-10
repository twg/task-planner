import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';

export interface DialogData {
  currentStatus: '';
  id: '';
  name: '';
  taskDuration: '';
}



@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.scss']
})
export class EditTaskModelComponent implements OnInit {
  editTaskForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private appService: AppService,
    public matDialogRef: MatDialogRef<EditTaskModelComponent>) {
    this.editTaskForm = this.formBuilder.group({
      taskName: '',
      taskDuration: '',
    })
  }

  ngOnInit(): void {

  }

  onEditTask(taskToBeEdited: any) {
    this.data.name = taskToBeEdited.taskName;
    this.data.taskDuration = taskToBeEdited.taskDuration;
    this.appService.publishEditedTask(this.data)
    this.matDialogRef.close();

  }

}
