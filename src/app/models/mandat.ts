export interface MandatModel {
  BENAHMED: boolean,
  BENIMELLAL: boolean,
    FES: boolean,
    MARRAKECH: boolean,
    SALE: boolean,
    nomPrenom: string;
    adresse: string;
    cin: string;
    societe: string;
    capital: string;
    adresseSociete: string;
    nomPrenomMandataire: string;
    adresseMandataire: string;
    cinMandataire: string;
    lieuDelivrance: string;
    dateDelivrance: string;
    signatureMandant: string;
    signatureMandataire: string;
    points: { [key: string]: boolean }; 
  }
  