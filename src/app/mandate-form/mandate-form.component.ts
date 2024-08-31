import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { MandatServiceService } from '../services/mandat/mandat-service.service';

@Component({
  selector: 'app-mandate-form',
  templateUrl: './mandate-form.component.html',
  styleUrls: ['./mandate-form.component.css']
})
export class MandateFormComponent implements OnInit {
  mandateForm: FormGroup;
  points = [
    { id: 'BENAHMED', label: 'BEN AHMED' },
    { id: 'BENIMELLAL', label: 'BENI MELLAL' },
    { id: 'SALE', label: 'SALE' },
    { id: 'FES', label: 'FES' },
    { id: 'MARRAKECH', label: 'MARRAKECH' }
  ];

  constructor(private fb: FormBuilder, private pdfGenerator: PdfGeneratorService,private mandatService:MandatServiceService) {
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

  onSubmit() {
    if (this.mandateForm.valid) {
      console.log('Form is valid');
      console.log('Form Values:', this.mandateForm.value);

      const formValues = this.mandateForm.value;
      this.pdfGenerator.generatePdf(formValues);

      //
      this.mandatService.saveMandat(this.mandateForm.value).subscribe({
          next: (data)=>{
            console.log(data)
          },
          error:(err)=>console.log(err)
      })
    } else {
      console.log('Form is invalid');
      this.validateAllFormFields(this.mandateForm); // Optionally, trigger validation on all fields
    }
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
