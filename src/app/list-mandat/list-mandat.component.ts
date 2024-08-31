import { Component, OnInit } from '@angular/core';
import { chauffeur } from '../models/Chauffeur';
import { ChauffeurServiceService } from '../services/chauffeur/chauffeur-service.service';

@Component({
  selector: 'app-list-mandat',
  templateUrl: './list-mandat.component.html',
  styleUrl: './list-mandat.component.css'
})
export class ListMandatComponent implements OnInit {
  
  listmandats:Array<chauffeur> = [];
  constructor(private chauffServ:ChauffeurServiceService){}
  ngOnInit(): void {
    this.getmadats();                   
  }
  getmadats() {
    this.chauffServ.getChauffeurs().subscribe({
      next:(d:any)=>{
        console.log(d)
        this.listmandats=d;
      }
    })
  }
}
