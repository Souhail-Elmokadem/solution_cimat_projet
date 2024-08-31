import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chauffeur } from '../../models/Chauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurServiceService {

  constructor(private http:HttpClient) { }
  apiUrl = "http://localhost:8084";

  getChauffeurs():Observable<chauffeur>{
    return this.http.get<chauffeur>(this.apiUrl+"/chauffeurs");
  }
}
