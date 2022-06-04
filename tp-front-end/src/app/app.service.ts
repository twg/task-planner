import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  searchTerm = new BehaviorSubject('');
  taskToBeAdded = new ReplaySubject();
  constructor(private httpClient: HttpClient) {}

  publishSearchTerm(searchTerm: any) {
    this.searchTerm.next(searchTerm);
    console.log('app service', this.searchTerm);
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  publishTask(taskToBeAdded: any) {
    this.taskToBeAdded.next(taskToBeAdded);
    console.log('app service taskToBeAdded', this.taskToBeAdded);
  }

  getTask() {
    return this.taskToBeAdded;
  }

  getTasks(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/');
  }
}
