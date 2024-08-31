import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generatePdf(formValues: any) {
    const pdf = new jsPDF();
    const marginLeft = 20;
    const marginTop = 20;
    let currentY = marginTop;

    pdf.setFontSize(12);

    // Title
    pdf.text("Mandat de représentation pour les livraisons de Chèvres de l'Atlas", marginLeft, currentY);

    // First Section
    currentY += 10;
    pdf.text("Je soussigné:", marginLeft, currentY);
    currentY += 10;
    pdf.text("Nom & Prénom:", marginLeft + 10, currentY);
    pdf.text(formValues.nomPrenom, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("Adresse:", marginLeft + 10, currentY);
    pdf.text(formValues.adresse, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("N° CIN:", marginLeft + 10, currentY);
    pdf.text(formValues.cin, marginLeft + 60, currentY);

    // Second Section
    currentY += 20;
    pdf.text("Agissant pour:", marginLeft, currentY);
    currentY += 10;
    pdf.text("Nom de la société:", marginLeft + 10, currentY);
    pdf.text(formValues.societe, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("Adresse de la société:", marginLeft + 10, currentY);
    pdf.text(formValues.adresseSociete, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("Capital de:", marginLeft + 10, currentY);
    pdf.text(formValues.capital, marginLeft + 60, currentY);

    // Third Section
    currentY += 20;
    pdf.text("Donne en ma qualité de mandant, pouvoir pour les présents à:", marginLeft, currentY);
    currentY += 10;
    pdf.text("Nom & Prénom:", marginLeft + 10, currentY);
    pdf.text(formValues.nomPrenomMandataire, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("Adresse:", marginLeft + 10, currentY);
    pdf.text(formValues.adresseMandataire, marginLeft + 60, currentY);
    currentY += 10;
    pdf.text("CIN:", marginLeft + 10, currentY);
    pdf.text(formValues.cinMandataire, marginLeft + 60, currentY);

    // Fourth Section
    currentY += 20;
    pdf.text("À l'effet en sa qualité de mandataire de:", marginLeft, currentY);
    currentY += 10;
    pdf.text("D’enlever les produits qui figurent  sur les bons de commande émis et de signer les bons \n de livraison à la sortie de l'usine.", marginLeft, currentY);
    currentY += 10;
    pdf.text("Le lieu du mandataire selon le spécimen ci-dessous, fait foi d'accueil de réception \n  en mon nom des marchandises.", marginLeft, currentY);
    currentY += 10;
    pdf.text("Fait à: " + formValues.lieuDelivrance, marginLeft, currentY);
    currentY += 10;
    pdf.text("Date: " + formValues.dateDelivrance, marginLeft, currentY);

    // Checkbox Section
    currentY += 20;
    pdf.text("Ce mandat est valable pour les points d'expédition suivants:", marginLeft, currentY);
    currentY += 10;

    // Iterate through points and check if they're selected
    const points = ['BENAHMED', 'BENIMELLAL', 'SALE', 'FES', 'MARRAKECH'];
    points.forEach(point => {
      if (formValues[point]) {
        pdf.text(`- ${this.getPointLabel(point)}`, marginLeft, currentY);
        currentY += 10;
      }
    });

    // Signatures
    currentY += 10;
    pdf.text("Signature et cachet mandant", marginLeft + 10, currentY);
    pdf.text("Signature mandataire (*)", marginLeft + 70, currentY);
    pdf.text("Photo mandataire", marginLeft + 140, currentY);
    currentY += 10;
    pdf.text(formValues.signatureMandant, marginLeft + 10, currentY);
    pdf.text(formValues.signatureMandataire, marginLeft + 70, currentY);

    pdf.save('mandate.pdf');
  }

  private getPointLabel(id: string): string {
    switch (id) {
      case 'BENAHMED': return 'BEN AHMED';
      case 'BENIMELLAL': return 'BENI MELLAL';
      case 'SALE': return 'SALE';
      case 'FES': return 'FES';
      case 'MARRAKECH': return 'MARRAKECH';
      default: return '';
    }
  }
}
