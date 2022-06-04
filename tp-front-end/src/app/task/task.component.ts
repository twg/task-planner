import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public tasks: any;
  interval: any;
  taskList: Array<any> = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getTasks().subscribe((tasks) => {
      console.log('tasks', tasks);
      this.tasks = tasks;
      this.taskList = [...this.tasks];
    });
    this.appService.getSearchTerm().subscribe((searchTerm) => {
      if (searchTerm) {
        this.taskList = this.tasks.filter(
          (task: any) =>
            task.name.includes(searchTerm) ||
            task.currentStatus.includes(searchTerm)
        );
      }
    });
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
        console.log('abcd', this.tasks);
      }
    });
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
      console.log('overdue');
    }, 1000);
  }

  onPause() {
    console.log('pause');
    clearInterval(this.interval);
  }

  onCompleted(task: any) {
    console.log('completed');
    for (let taskData of this.taskList) {
      if (taskData.id === task.id) {
        taskData.currentStatus = 'completed';
      }
    }
    clearInterval(this.interval);
  }
}
