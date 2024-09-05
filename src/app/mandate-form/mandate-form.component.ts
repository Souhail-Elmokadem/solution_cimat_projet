import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { MandatServiceService } from '../services/mandat/mandat-service.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mandate-form',
  templateUrl: './mandate-form.component.html',
  styleUrls: ['./mandate-form.component.css']
})
export class MandateFormComponent implements OnInit {
  mandateForm: FormGroup;
  base64Image: string | ArrayBuffer | null = '';

  points = [
    { id: 'BENAHMED', label: 'BEN AHMED' },
    { id: 'BENIMELLAL', label: 'BENI MELLAL' },
    { id: 'SALE', label: 'SALE' },
    { id: 'FES', label: 'FES' },
    { id: 'MARRAKECH', label: 'MARRAKECH' }
  ];

  constructor(private router: Router,private fb: FormBuilder, private pdfGenerator: PdfGeneratorService,private mandatService:MandatServiceService) {
    this.mandateForm = this.fb.group({
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

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file); // Converts the file to Base64 format

    reader.onload = () => {
      this.base64Image = reader.result; // The Base64 image string is stored here
    };
  }
  onSubmit() {
    
      console.log('Form is valid');
      console.log('Form Values:', this.mandateForm.value);
      const base64ImageStr = this.base64Image ? this.base64Image.toString() : '';

      const formValues = this.mandateForm.value;

      const base64String = this.base64Image?.toString();  // Convert to primitive string
      this.pdfGenerator.generatePdf(formValues, base64String!);  // Ensure it's not null

      this.mandatService.saveMandat(this.mandateForm.value,base64ImageStr).subscribe({
          next: (data)=>{
            console.log(data);
            this.router.navigate(['/list'])
          },
          error:(err)=>console.log(err)
      })
   
  }

  // Method to validate all form fields (for debugging)
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control!.markAsTouched({ onlySelf: true });
      }
    });
  }
}
