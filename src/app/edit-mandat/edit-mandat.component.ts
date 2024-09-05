import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MandatServiceService } from '../services/mandat/mandat-service.service';
import { chauffeur } from '../models/Chauffeur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurServiceService } from '../services/chauffeur/chauffeur-service.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';

@Component({
  selector: 'app-edit-mandat',
  templateUrl: './edit-mandat.component.html',
  styleUrls: ['./edit-mandat.component.css']
})
export class EditMandatComponent implements OnInit {
  chauffaur!: chauffeur;
  cin!: string;
  mandatedata: FormGroup;
  base64Image: string | ArrayBuffer | null = '';

  constructor(
    private routeAct: ActivatedRoute,
    private mandatService: MandatServiceService,
    private chauffeurService: ChauffeurServiceService,
    private pdfGenerator: PdfGeneratorService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
      ...this.points.reduce((controls, point) => {
        controls[point.id] = [false];
        return controls;
      }, {} as { [key: string]: boolean[] })
    });
  }

  ngOnInit(): void {
    this.cin = this.routeAct.snapshot.params['id'];
    console.log(this.cin);
    this.getMandatByCinChauffaur();
  }

  getMandatByCinChauffaur() {
    this.mandatService.getMandatByCinChauffaur(this.cin).subscribe({
      next: (data: any) => {
        this.chauffaur = data;
        console.log(data);
        this.dataMandat(this.chauffaur); // Initialize the form with the data after fetching it
      },
      error: (err) => console.log(err)
    });
  }

  dataMandat(chauf: chauffeur) {
    const dateti = this.parseDate(chauf.mandat.date_detablissement.toString());
    const normaldate = this.formatDate(dateti);
  
    this.mandatedata.setValue({
      nomPrenom: chauf.societe.directeur.nom,
      adresse: chauf.societe.directeur.adresse,
      cin: chauf.societe.directeur.cin,
      societe: chauf.societe.nom,
      capital: chauf.societe.capitale,
      adresseSociete: chauf.societe.adresse,
      nomPrenomMandataire: chauf.nom,
      adresseMandataire: chauf.adresse,
      cinMandataire: chauf.cin,
      lieuDelivrance: chauf.mandat.lieuLivraison,
      dateDelivrance: normaldate, // Format the date
      signatureMandant: '', // Update this field as needed
      signatureMandataire: '', // Update this field as needed
      ...this.points.reduce((controls, point) => {
        controls[point.id] = chauf.mandat.point_dexpedition.includes(point.label);
        return controls;
      }, {} as { [key: string]: boolean }) // Use boolean instead of boolean[]
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

  points = [
    { id: 'BENAHMED', label: 'BENAHMED' },
    { id: 'BENIMELLAL', label: 'BENIMELLAL' },
    { id: 'SALE', label: 'SALE' },
    { id: 'FES', label: 'FES' },
    { id: 'MARRAKECH', label: 'MARRAKECH' }
  ];

  async onSubmit(){
    console.log('Form is valid');
    console.log('Form Values:', this.mandatedata.value);
    const formValues = this.mandatedata.value;
    const base64Imagestr = this.base64Image?.toString()??"";
    this.mandatService.editMandat(this.mandatedata.value,base64Imagestr).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.router.navigate(['/list'])
      },
      error:err=>console.log(err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file); // Converts the file to Base64 format

    reader.onload = () => {
      this.base64Image = reader.result; // The Base64 image string is stored here
    };
  }
}
