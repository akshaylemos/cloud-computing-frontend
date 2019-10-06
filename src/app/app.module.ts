import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { TodoComponent } from './todo/todo.component';
import { AuthGuardService } from './auth-guard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    ChartsModule
  ],
  providers: [CookieService, AuthGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
