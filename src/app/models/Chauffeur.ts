import { MandatRecieve } from "./MandatRecieve";
import { SocieteModel } from "./Societe";

export interface chauffeur{
    nom:string,
    cin:string,
    adresse:string;
    mandat:MandatRecieve,
    societe:SocieteModel,

}