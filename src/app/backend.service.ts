import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TodosResponse } from './types';

const BACKEND_URI = 'http://localhost:5000';
const LOGIN_URI = `${BACKEND_URI}/login`;
const TODOS_URI = `${BACKEND_URI}/todos`;
const USER_DATA_OUT_URI = `${BACKEND_URI}/data-out`;
const ADD_TODO_URI = `${BACKEND_URI}/create-todo`;
const REGISTER_USER = `${BACKEND_URI}/register-user`;
const TODO_START_WORK = `${BACKEND_URI}/start-todo`;
const TODO_END_WORK = `${BACKEND_URI}/end-todo`;
const DATA_READY_WORK = `${BACKEND_URI}/data-ready`;


declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private cookieService: CookieService, private zone: NgZone) { }

  login(userName: string, password: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        // TODO: Inspect what all cookies are set at this point
        this.cookieService.deleteAll();
        this.http.post(LOGIN_URI, {
          userName,
          password
        }).toPromise().then(
        (match: {match: boolean, removeUser: boolean}) => {
          if (match.match) {
            // Set the cookie
            this.cookieService.set('userName', userName);
            this.cookieService.set('password', password);
            if (match.removeUser) {
              this.cookieService.set('removeUser', 'true');
            }
            resolve(true);
          } else {
            resolve(false);
          }
        }
    );
  });
  }

  logout() {
    this.cookieService.delete('userName');
    this.cookieService.delete('password');
  }

  todos() {
    return new Promise<TodosResponse[]>(
      (resolve, reject) => {
        this.http.post<TodosResponse[]>(TODOS_URI, {
          userName: this.cookieService.get('userName')
        }).toPromise().then(
          (data) => {
            resolve(data);
          }
        );
      }
    );
  }

  startTodo(todoID: number) {
    return new Promise<any>(
      (resolve, reject) => {
        this.http.post(TODO_START_WORK, {
          userName: this.cookieService.get('userName'),
          id: todoID
        }).toPromise().then(
          (data) => {
            resolve(data);
          }
        );
      }
    );
  }

  endTodo(todoID: number) {
    return new Promise<any>(
      (resolve, reject) => {
        this.http.post(TODO_END_WORK, {
          userName: this.cookieService.get('userName'),
          id: todoID
        }).toPromise().then(
          (data) => {
            resolve(data);
          }
        );
      }
    );
  }

  addTodo(todoText: string) {
    return new Promise<any>(
      (resolve, reject) => {
        this.http.post(ADD_TODO_URI, {
          text: todoText,
          userName: this.cookieService.get('userName'),
        }).toPromise().then(
          (data) => {
            resolve(data);
          }
        );
      }
    );
  }

  registerUser(username: string, password: string) {
    return new Promise<any>(
      (resolve, reject) => {
        this.http.post(REGISTER_USER, {
          userName: username,
          password
        }).toPromise().then(
          (data) => {
            resolve(data);
          }
        );
      }
    );
  }


  dataReady(): Promise<string> {
    //TODO: Figure out why this is giving out an eror.
    return this.http.post(DATA_READY_WORK, {
      userName: this.cookieService.get('userName')
    }).toPromise();
  }

  removeData(): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.cookieService.set('removeData', 'true');
        resolve();
      }
    );
  }
}
