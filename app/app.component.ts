import { Component, OnInit } from '@angular/core'; 
 
import { HttpClient } from '@angular/common/http';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';   
 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import { empty } from 'rxjs';
 
@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbTabsetConfig] 
})
export class AppComponent   {
  public myform: FormGroup;
   // Our array of clients
   public reportes: any[];
   public reportesx: any[];
   public indicesItem: any[];
   public chart: any;
   // Our future instance of DataTable
   dataTable: any;

  static readonly DATE_FMT = 'yyyy/mm/dd';
  public title = 'Reportes Bolsa de Santiago';
  public content : String = 'Loading content...';
  public d_day : String;
  public count : String;
  public d_day2 : String;
  public m_month : String;
  public m_month2 : String;  
  public reporte_lista: boolean; 
  public options: Object;
  public options3: Object;
  public dataList: any;
  public periodo_table : any;f_desde_table : any; f_hasta_table : any;

  public headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    });
 
  constructor(config: NgbTabsetConfig,private _http: HttpClient) {

    config.justify = 'center';
    config.type = 'pills';

  }
  model = {
    indice : null,
    periodo: null,
    f_desde : null,
    f_hasta : null
    
  }; 
 

  ngOnInit(){
  
     
  }

  buscarDatos(indice, periodo, f_desde, f_hasta) {
    
    if(f_desde.value.day < 10){ this.d_day = '0'+f_desde.value.day } else{ this.d_day = f_desde.value.day }
    if(f_hasta.value.day < 10){ this.d_day2 = '0'+f_hasta.value.day } else{ this.d_day2 = f_hasta.value.day }

    
    if(f_desde.value.month < 10){ this.m_month= '0'+f_desde.value.month } else{ this.m_month = f_desde.value.month }
    if(f_hasta.value.month < 10){ this.m_month2 = '0'+f_hasta.value.month } else{ this.m_month2 = f_hasta.value.month }

    let desde = f_desde.value.year + '-' + this.m_month + '-' + this.d_day;
    let hasta = f_hasta.value.year + '-' + this.m_month2 + '-' + this.d_day2;
    let c = '';
    if(indice.value != null ){ c = indice.value}
    
    let parametros  = { indice: c, periodo:periodo.value, f_desde: desde  , f_hasta: hasta};
    
    this.periodo_table = periodo.value;
    this.f_desde_table = desde;
    this.f_hasta_table = hasta;

 
 
    this._http.get('http://bcstest.mybluemix.net/bcstest/rest/indices/consultaIndices',{params: parametros}).subscribe(
      (data: any[]) => this.reportes = data.indicesItem   
    );   
 
    this.reporte_lista =  true;

  }
  
  buscarDatosChart(indice_g){
 
    let c = indice_g.value;
 
    let parametros  = { indice: c, periodo:this.periodo_table, f_desde: this.f_desde_table  , f_hasta: this.f_hasta_table};
 
    this._http.get('http://bcstest.mybluemix.net/bcstest/rest/indices/consultaIndices',{params: parametros}).subscribe(
      (data: any[]) => this.reportesx = data.indicesItem
    );  
 
    const tipo = indice_g.value;
 
    const groupedData = _.groupBy(this.reportesx, 'indice');
    const result = Object.keys(groupedData)
      .map((k) => {
        const d = groupedData[k];
        const currentGroup = {
          name: k,
          data: [],
        };
        currentGroup.data = d.map((item) => {  
          
          const date = new Date(item.fecha);
            return [ 
              date.getTime(), 
              item.ind_ant, 
              item.ind_may,
              item.ind_men,
              item.ind_act,
            ]
           
        })
        return currentGroup;
      })
      const seriesx = result.map(r => ({
        data: r.data , 
      })) 

      const reportesx = Array();
      seriesx.forEach(function (value) {
        reportesx.push(value.data);
      }); 
     this.options3 = {
      title : { text : 'OHLC' },
      rangeSelector : {
          selected : 2
      },
      series : [{   
          type: 'candlestick',
          name: tipo,
          data: reportesx[0], 
          tooltip: {
              valueDecimals: 2
          }
      }]
  }; 
 

  }

}
 

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './app.component.html',
})
export class NgbdDatepickerPopup {
  model;
}

@Component({
  selector: 'app-header',
  template: `
    <ng-progress></ng-progress>
  `
})
export class HeaderComponent {
}
 

