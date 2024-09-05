import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MandatModel } from '../../models/mandat';
import jsPDF from 'jspdf';
import { MandatRecieve } from '../../models/MandatRecieve';

@Injectable({
  providedIn: 'root'
})
export class MandatServiceService {
  

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:8084";

  saveMandat(mandat: MandatModel,photo:String): Observable<any> {
    const payload = {
      mandat,
      photo
    }
    return this.http.post<any>(this.apiUrl+"/addMandat", payload);
  }
  editMandat(mandat: MandatModel,photo:String):Observable<any> {
    const payload = {
      mandat,
      photo
    }
    return this.http.put(this.apiUrl+"/editMandat",payload)
  }
  deleteItem(cinChauff: string):Observable<any> {
    return this.http.delete(this.apiUrl+"/mandat/"+cinChauff)
  }
  
  getMandats():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/mandats");
  }
  getMandatByCinChauffaur(cin: any):Observable<MandatRecieve> {
    return this.http.get<any>(this.apiUrl+"/mandat/"+cin);
    
  }
  
 


  
}
