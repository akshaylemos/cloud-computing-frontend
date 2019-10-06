import { Component, OnInit } from '@angular/core';
import { TodosResponse } from '../types';
import { BackendService } from '../backend.service';
import { DatePipe } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ChartOptions } from 'chart.js';

declare var gapi: any;


export class Todo implements TodosResponse {

  constructor(private todoResponse: TodosResponse, private datePipe: DatePipe) { }

  get id() {
    return this.todoResponse.id;
  }

  get start() {
    return this.todoResponse.start;
  }

  get end() {
    return this.todoResponse.end;
  }

  get startDate(): Date {
    return new Date(this.todoResponse.start);
  }

  get endDate(): Date {
    return new Date(this.todoResponse.end);
  }

  get user() {
    return this.todoResponse.user;
  }

  get text() {
    return this.todoResponse.text;
  }

  get done() {
    return this.start && this.end;
  }

  get timeTaken() {
    return diffYMDHMS(new Date(this.end), new Date(this.start));
  }

  get timeTakenStr() {
    return `${this.timeTaken} seconds`;
  }

}

function diffYMDHMS(date1: Date, date2: Date) {
  const t1 = date1;
  const t2 = date2;
  const diff = t1.getTime() - t2.getTime();

  const secondsFromT1ToT2 = diff / 1000;
  const secondsBetweenDates = Math.abs(secondsFromT1ToT2);
  return secondsBetweenDates;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  newTodoText: string;
  showNewTodoInput = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    showLines: false
  };
  public showDataOutProcessing = false;
  public barChartLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Todos Started' },
    { data: [], label: 'Todos Done' },
  ];
  apiLoaded = false;
  apiFailed = true;
  apiReady = false;

  constructor(private backendService: BackendService, private datePipe: DatePipe) { }

  ngOnInit() {
    // this.backendService.loadClient().then(
    //   result => {
    //     this.apiLoaded = true;
    //     return this.backendService.initClient();
    //   },
    //   err => {
    //     this.apiFailed = true;
    //   }
    // ).then(result => {
    //   this.apiReady = true;
    // }, err => {
    //   this.apiFailed = true;
    // });
    this.updateTodo();
  }


  newTodo() {
    this.showNewTodoInput = true;
  }

  addTodo() {
    this.backendService.addTodo(this.newTodoText).then(
      _ => {
        this.newTodoText = '';
        this.showNewTodoInput = false;
        this.updateTodo();
      }
    );
  }

  startTodo(index: number) {
    this.backendService.startTodo(index).then(
      (value) => {
        this.updateTodo();
      }
    );
  }

  endTodo(index: number) {
    this.backendService.endTodo(index).then(
      (value) => {
        this.updateTodo();
      }
    );
  }
  updateTodo() {
    this.backendService.todos().then(
      (todosResponse) => {
        this.todos = todosResponse.map(x => new Todo(x, this.datePipe));
        const graphDataDone = new Array(7).fill(0);
        const graphDataStarted = new Array(7).fill(0);
        this.todos.forEach((todo) => {
          graphDataDone[todo.startDate.getDay()]++;
          graphDataStarted[todo.endDate.getDay()]++;
        });
        this.barChartData[1].data = graphDataDone;
        this.barChartData[0].data = graphDataStarted;
      }
    );
  }

  takeOutData() {
    // this.backendService.pubSubDataReady().then(
    //   (data) => {
    //     debugger;
    //   }
    // );
    this.backendService.dataReady();
  }
}
