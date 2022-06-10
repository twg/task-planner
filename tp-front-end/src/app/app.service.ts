import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  searchTerm = new BehaviorSubject('');
  taskToBeAdded = new ReplaySubject();
  taskToBeEdited = new ReplaySubject();
  constructor(private httpClient: HttpClient) { }

  publishSearchTerm(searchTerm: any) {
    this.searchTerm.next(searchTerm);
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  publishTask(taskToBeAdded: any) {
    this.taskToBeAdded.next(taskToBeAdded);
  }

  getTask() {
    return this.taskToBeAdded;
  }

  publishEditedTask(taskToBeEdited: any) {
    this.taskToBeEdited.next(taskToBeEdited);
  }

  getEditedTask() {
    return this.taskToBeEdited;
  }

  getTasks(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/');
  }

  setTaskDataInStorage(taskData: any) {
    localStorage.setItem('taskPlannerData', JSON.stringify({ taskData: taskData }));
  }

  getTaskDataFromStorage() {
    return localStorage.getItem('taskPlannerData');
  }
}
