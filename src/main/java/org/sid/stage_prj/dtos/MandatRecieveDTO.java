package org.sid.stage_prj.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class MandatRecieveDTO {
    @JsonProperty("BENAHMED")
    private boolean BENAHMED;
    @JsonProperty("BENIMELLAL")
    private boolean BENIMELLAL;
    @JsonProperty("FES")
    private boolean FES;
    @JsonProperty("MARRAKECH")
    private boolean MARRAKECH;
    @JsonProperty("SALE")
    private boolean SALE;
    private String nomPrenom;
    private String adresse;
    private String cin;
    private String societe;
    private String capital;
    private String adresseSociete;
    private String nomPrenomMandataire;
    //private String photo;
    private String adresseMandataire;
    private String cinMandataire;
    private String lieuDelivrance;
    private Date dateDelivrance;
    private String signatureMandant;
    private String signatureMandataire;

}
