import { Component, OnInit } from '@angular/core';
import { ChauffeurServiceService } from '../services/chauffeur/chauffeur-service.service';
import { chauffeur } from '../models/Chauffeur';

@Component({
  selector: 'app-list-chauffeur',
  templateUrl: './list-chauffeur.component.html',
  styleUrl: './list-chauffeur.component.css'
})
export class ListChauffeurComponent implements OnInit{
  
  constructor(private chauffeurService:ChauffeurServiceService){}
  listchauffeurs:Array<chauffeur>= [];
  ngOnInit(): void {
    this.getChauffeurs();
  }
  getChauffeurs(){
    this.chauffeurService.getChauffeurs().subscribe({
      next:(d:any)=>{
        this.listchauffeurs = d;
      }
    })
  }
}
