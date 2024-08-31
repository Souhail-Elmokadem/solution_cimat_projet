package org.sid.stage_prj.services;

import org.sid.stage_prj.dtos.MandatRecieveDTO;
import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Directeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.entites.Societe;
import org.sid.stage_prj.repositories.ChauffeurRepository;
import org.sid.stage_prj.repositories.DirecteurRepository;
import org.sid.stage_prj.repositories.MandatRepository;
import org.sid.stage_prj.repositories.SocieteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MandaService{

    @Autowired
    public MandatRepository mandatRepository;
    @Autowired
    public SocieteRepository societeRepository;

    @Autowired
    public ChauffeurRepository chauffeurRepository;

    @Autowired
    public DirecteurRepository directeurRepository;

    public Mandat getMandatByChauffeur(Chauffeur chauffeur){
        return mandatRepository.findByChauffeurId(chauffeur.getId());
    }

    public List<Mandat> getAll(){
        return mandatRepository.findAll();
    }

    public Mandat addMandat(MandatRecieveDTO mandat) {
        Mandat mandat1 = new Mandat();

        Directeur directeur = directeurRepository.findByCin(mandat.getCin());
        if (directeur == null){

            directeur = new Directeur();
            directeur.setNom(mandat.getNomPrenom());
            directeur.setCin(mandat.getCin());
            directeur.setAdresse(mandat.getAdresse());
            directeurRepository.save(directeur);
        }
        Societe societe = societeRepository.findByNom(mandat.getSociete());
        if (societe ==null){
            societe = new Societe();
            societe.setNom(mandat.getSociete());
            societe.setAdresse(mandat.getAdresseSociete());
            societe.setCapitale(mandat.getCapital());
            societe.setDirecteur(directeur);
            societeRepository.save(societe);
        }




        mandat1.setPoint_dexpedition(
                List.of(mandat.isBENAHMED()?"BENAHMED":"",mandat.isSALE()?"SALE":"",
                        mandat.isFES()?"FES":"",mandat.isBENIMELLAL()?"BENIMELLAL":"",mandat.isMARRAKECH()?"MARRAKECH":"")
        );
        mandat1.setPoint_dexpedition(mandat1.getPoint_dexpedition().stream().filter(v->!v.isEmpty()).collect(Collectors.toList()));


        Chauffeur chauffeur = chauffeurRepository.findByCin(mandat.getCin());
        if (chauffeur == null){

            chauffeur = new Chauffeur();
            chauffeur.setNom(mandat.getNomPrenomMandataire());
            chauffeur.setCin(mandat.getCinMandataire());
            chauffeur.setAdresse(mandat.getAdresseMandataire());
            chauffeurRepository.save(chauffeur);
        }



        mandat1.setChauffeur(chauffeur);
        mandat1.setSociete(societe);
        Mandat mandaSaved = mandatRepository.save(mandat1);
        chauffeur.setMandat(mandaSaved);
        chauffeur.setSociete(societe);
        chauffeurRepository.save(chauffeur);





        return  mandat1;
    }
}
