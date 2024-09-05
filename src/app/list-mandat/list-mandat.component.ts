import { Component, OnInit } from '@angular/core';
import { chauffeur } from '../models/Chauffeur';
import { ChauffeurServiceService } from '../services/chauffeur/chauffeur-service.service';
import { MandatServiceService } from '../services/mandat/mandat-service.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-mandat',
  templateUrl: './list-mandat.component.html',
  styleUrl: './list-mandat.component.css'
})
export class ListMandatComponent implements OnInit {
onSubmit() {
  console.log('Form is valid');
  console.log('Form Values:', this.mandatedata.value);
  const formValues = this.mandatedata.value;
  
}
  mandatedata: FormGroup;
  showDeleteModal = false;
  cinChauff: string | null = null;
  kw:string="";

  openDeleteModal(itemId: string) {
    this.cinChauff = itemId;
    this.showDeleteModal = true; // Show modal
  }

  // Close modal without deleting
  closeModal() {
    this.showDeleteModal = false;
    this.cinChauff = null;
  }
  confirmDelete() {
    if (this.cinChauff) {
      this.mandatService.deleteItem(this.cinChauff).subscribe({
        next: () => {
          console.log('Item deleted');
          this.closeModal(); 
          window.location.reload(); // This will refresh the entire page

        },
        error: (err) => console.error('Error deleting item:', err),
      });
    }
  }
  points = [
    { id: 'BENAHMED', label: 'BEN AHMED' },
    { id: 'BENIMELLAL', label: 'BENI MELLAL' },
    { id: 'SALE', label: 'SALE' },
    { id: 'FES', label: 'FES' },
    { id: 'MARRAKECH', label: 'MARRAKECH' }
  ];
  listmandats:Array<chauffeur> = [];
  constructor(private pdfGenerator: PdfGeneratorService,private fb: FormBuilder,private chauffServ:ChauffeurServiceService,private mandatService:MandatServiceService){
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

  ngOnInit(): void {
  
    this.getmadats();                   
  }
  onSearchChange(searchValue: string) {
    this.kw = searchValue;
    this.getmadats();
  }
  getmadats() {
    this.chauffServ.getChauffeurs(this.kw).subscribe({
      next:(d:any)=>{
        console.log(d)
        this.listmandats=d.items;

      }
    })
  }
}
