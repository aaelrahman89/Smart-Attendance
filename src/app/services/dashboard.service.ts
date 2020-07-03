import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rootURL } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  subjectreturned;
  subjectArr = []

  constructor(private httpClient : HttpClient) {   }

 

  gettingAllData(url){
    return this.httpClient.get<any>(`${rootURL}${url}`)
  }  
 
 
 
}
