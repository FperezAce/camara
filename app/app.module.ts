import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';   
import { Headers, RequestOptions } from '@angular/http';   
  
import { HttpModule } from '@angular/http'; 

import { ChartModule } from 'angular2-highcharts';
 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ChartModule.forRoot( require('highcharts/highstock')
            ),
    BrowserModule,NgbModule.forRoot(),FormsModule,HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 




}
 
 
