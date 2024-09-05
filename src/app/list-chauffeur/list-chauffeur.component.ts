import { Component, OnInit } from '@angular/core';
import { ChauffeurServiceService } from '../services/chauffeur/chauffeur-service.service';
import { chauffeur } from '../models/Chauffeur';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-chauffeur',
  templateUrl: './list-chauffeur.component.html',
  styleUrl: './list-chauffeur.component.css'
})
export class ListChauffeurComponent implements OnInit{
  
  constructor(private chauffeurService:ChauffeurServiceService,private pdfGenerator: PdfGeneratorService,private fb: FormBuilder,private chauffServ:ChauffeurServiceService){
    this.mandatedata = this.fb.group({
      nomPrenom: ['', Validators.required],
      adresse: ['', Validators.required],
      cin: ['', Validators.required],
      societe: ['', Validators.required],
      capital: ['', Validators.required],
      adresseSociete: ['', Validators.required],
      nomPrenomMandataire: ['', Validators.required],
      adresseMandataire: ['', Validators.required],
      cinMandataire: ['', Validators.required],
      lieuDelivrance: ['', Validators.required],
      dateDelivrance: ['', Validators.required],
      signatureMandant: ['', Validators.required],
      signatureMandataire: ['', Validators.required],
      // Initialize checkbox controls
      ...this.points.reduce((controls, point) => {
        controls[point.id] = [false];
        return controls;
      }, {} as { [key: string]: boolean[] })
    });
  }
  listchauffeurs:Array<chauffeur>= [];
  kw:string="";
  dataMandat(chauf:chauffeur){
    const dateti = this.parseDate(chauf.mandat.date_detablissement.toString())
    const normaldate = this.formatDate(dateti);
    this.mandatedata = this.fb.group({
      nomPrenom: [chauf.societe.directeur.nom, Validators.required],
      adresse: [chauf.societe.directeur.adresse, Validators.required],
      cin: [chauf.societe.directeur.cin, Validators.required],
      societe: [chauf.societe.nom, Validators.required],
      capital: [chauf.societe.capitale, Validators.required],
      adresseSociete: [chauf.societe.adresse, Validators.required],
      nomPrenomMandataire: [chauf.nom, Validators.required],
      adresseMandataire: [chauf.adresse, Validators.required],
      cinMandataire: [chauf.cin, Validators.required],
      lieuDelivrance: [chauf.mandat.lieuLivraison, Validators.required],
      dateDelivrance: [ normaldate, Validators.required], // Format the date
      signatureMandant: ['', Validators.required],
      signatureMandataire: ['', Validators.required],
      
   
     // chauf.mandat.point_dexpedition this is list

      
      ...this.points.reduce((controls, point) => {
        controls[point.id] = [chauf.mandat.point_dexpedition.includes(point.label)];
        return controls;
      }, {} as { [key: string]: boolean[] })
    });
    }
  private formatDate(date: Date): string {
      if (!date) return '';
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    }
    private parseDate(dateString: string): Date {
      return new Date(dateString);
    }
    
    
    private async fetchImageAsBase64(url: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = reject;
        xhr.responseType = 'blob';
        xhr.open('GET', url, true);
        xhr.send();
      });
    }
    
  async onSubmit(chauf:chauffeur) {
    console.log('Form is valid');
    this.dataMandat(chauf);
    console.log('Form Values:', this.mandatedata.value);
    const formValues = this.mandatedata.value;
    const base64Imagefetch = await this.fetchImageAsBase64(chauf.photo)
    this.pdfGenerator.generatePdf(formValues,base64Imagefetch);
  }
    mandatedata: FormGroup;
    
    points = [
      { id: 'BENAHMED', label: 'BENAHMED' },
      { id: 'BENIMELLAL', label: 'BENIMELLAL' },
      { id: 'SALE', label: 'SALE' },
      { id: 'FES', label: 'FES' },
      { id: 'MARRAKECH', label: 'MARRAKECH' }
    ];
  ngOnInit(): void {
    this.getChauffeurs();

    
  }
  onSearchChange(searchValue: string) {
    this.kw = searchValue;
    this.getChauffeurs();
  }
  getChauffeurs(){
    this.chauffeurService.getChauffeurs(this.kw).subscribe({
      next:(d:any)=>{
        this.listchauffeurs = d.items;
      }
    })
  }
}
