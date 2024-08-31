import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MandatModel } from '../../models/mandat';

@Injectable({
  providedIn: 'root'
})
export class MandatServiceService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:8084";

  saveMandat(mandat: MandatModel): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/addMandat", mandat);
  }
  getMandats():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/mandats");
  }
  
}
