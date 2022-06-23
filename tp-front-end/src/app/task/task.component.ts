import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import * as moment from 'moment';
import { AppService } from '../app.service';
import { EditTaskModelComponent } from '../edit-task-model/edit-task-model.component';
import { GET_TASKS } from '../graphql.queries';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public tasks: any;
  interval: any;
  taskList: Array<any> = [];


  constructor(private appService: AppService, private matDialog: MatDialog, private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.apollo.watchQuery({
      query: GET_TASKS
    })
      .valueChanges.subscribe((tasks: any) => {
        this.tasks = tasks.data.getAllTasks;
        const taskDataFromStorage = this.appService.getTaskDataFromStorage();
        if (taskDataFromStorage) {
          this.tasks = JSON.parse(taskDataFromStorage).taskData;
        }

        this.appService.getTask().subscribe((taskToBeAdded: any) => {
          if (taskToBeAdded) {
            this.tasks.push({
              id: this.tasks.length + 1,
              name: taskToBeAdded.taskName,
              currentStatus: 'open',
              taskDuration: moment(taskToBeAdded.taskDuration, 'hh:mm:ss').format(
                'hh:mm:ss'
              ),
            });
          }
        });
        this.appService.getEditedTask().subscribe((taskToBeEdited: any) => {
          if (taskToBeEdited) {
            this.tasks.map((task: any) => {
              if (task.id === taskToBeEdited.id) {
                task.name = taskToBeEdited.name;
                task.taskDuration = moment(taskToBeEdited.taskDuration, 'hh:mm:ss').format('hh:mm:ss')
              }
              return task;
            })
            this.appService.setTaskDataInStorage(this.tasks);
          }
        });
        this.taskList = [...this.tasks];
        this.appService.setTaskDataInStorage(this.taskList);
      });
    this.appService.getSearchTerm().subscribe((searchTerm) => {
      if (searchTerm && searchTerm.length) {
        this.taskList = this.tasks.filter(
          (task: any) =>
            task.name.includes(searchTerm) ||
            task.currentStatus.includes(searchTerm)
        );
      } else {
        this.taskList = this.tasks;
      }
    });
    this.changeDetectorRef.detectChanges();

  }

  onStart(task: any) {
    const taskDuration = moment.duration(task.taskDuration, 'h');
    this.interval = setInterval(() => {
      taskDuration.subtract(1, 's');
      const taskDurationInMilliseconds = taskDuration.asMilliseconds();
      for (let taskData of this.taskList) {
        if (taskData.id === task.id) {
          taskData.taskDuration = moment
            .utc(taskDurationInMilliseconds)
            .format('HH:mm:ss');
        }
      }

      if (taskDurationInMilliseconds !== 0) {
        return;
      }

      clearInterval(this.interval);
    }, 1000);
  }

  onPause() {
    clearInterval(this.interval);
  }

  onCompleted(task: any) {
    for (let taskData of this.taskList) {
      if (taskData.id === task.id) {
        taskData.currentStatus = 'completed';
      }
    }
    clearInterval(this.interval);
  }

  onEdit(taskToBeEdited: any) {
    this.matDialog.open(EditTaskModelComponent, {
      width: '500px',
      data: taskToBeEdited
    });

  }

  onDelete(taskToBeDeleted: any) {
    this.taskList = this.tasks.filter((task: any) => task.id !== taskToBeDeleted.id);
    this.tasks = this.taskList;
    this.appService.setTaskDataInStorage(this.taskList);
  }
}
