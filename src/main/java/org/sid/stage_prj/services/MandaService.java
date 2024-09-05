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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
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
    public String uploadBase64Image(String base64Image) throws IOException {
        if (base64Image == null || base64Image.isEmpty()) {
            throw new IOException("Base64 image string is empty or null");
        }

        // Determine the file extension from the data URL prefix
        String extension = "png"; // Default extension
        String base64Data = base64Image;

        if (base64Image.contains(",")) {
            String[] parts = base64Image.split(",");
            base64Data = parts[1];
            if (parts[0].contains("jpeg")) {
                extension = "jpeg";
            } else if (parts[0].contains("png")) {
                extension = "png";
            } else if (parts[0].contains("jpg")) {
                extension = "jpg";
            }
        }

        // Decode Base64 to bytes
        byte[] decodedBytes = Base64.getDecoder().decode(base64Data);

        // Construct the file name and path
        String directoryPath = Host.LOCAL; // Update this to your actual directory path
        if (!Files.exists(Paths.get(directoryPath))) {
            Files.createDirectories(Paths.get(directoryPath));
        }

        String fileName = UUID.randomUUID().toString() + "." + extension;
        String filePath = directoryPath + "/" + fileName;
        String fileUrl = Host.HOSTNAME_FILE + fileName;

        // Save the file
        try {
            Files.write(Paths.get(filePath), decodedBytes);
        } catch (IOException e) {
            throw new IOException("Failed to write file to disk", e);
        }

        return fileUrl;
    }

    public List<Mandat> getAll(){
        return mandatRepository.findAll();
    }

    public Mandat addMandat(MandatRecieveDTO mandat, String photo) throws IOException {
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
            chauffeur.setPhoto(uploadBase64Image(photo));
            chauffeurRepository.save(chauffeur);
        }



        mandat1.setChauffeur(chauffeur);
        mandat1.setSociete(societe);
        mandat1.setLieuLivraison(mandat.getLieuDelivrance());
        mandat1.setDate_detablissement(mandat.getDateDelivrance());
        Mandat mandaSaved = mandatRepository.save(mandat1);
        chauffeur.setMandat(mandaSaved);
        chauffeur.setSociete(societe);
        chauffeurRepository.save(chauffeur);





        return  mandat1;
    }

    public Chauffeur getMandatByCinChauffaur(String cin) {
        return  chauffeurRepository.findByCin(cin);
    }

    public Chauffeur editMandat(MandatRecieveDTO mandat, String photo) throws IOException {

        Chauffeur chauffeur = chauffeurRepository.findByCin(mandat.getCinMandataire());
        chauffeur.setNom(mandat.getNomPrenomMandataire());
        chauffeur.setCin(mandat.getCinMandataire());
        chauffeur.getSociete().getDirecteur().setNom(mandat.getNomPrenom());
        if (photo != null){
            chauffeur.setPhoto(uploadBase64Image(photo));
        }
        chauffeur.setAdresse(mandat.getAdresseMandataire());
        chauffeurRepository.save(chauffeur);
        Directeur directeur = directeurRepository.findByCin(mandat.getCin());
        directeur.setNom(mandat.getNomPrenom());
        directeur.setAdresse(mandat.getAdresse());
        directeurRepository.save(directeur);
        Societe societe = societeRepository.findByNom(chauffeur.getSociete().getNom());
            societe.setNom(mandat.getSociete());
            societe.setCapitale(mandat.getCapital());
            societe.setAdresse(mandat.getAdresseSociete());
            societe.setDirecteur(directeur);
            societeRepository.save(societe);


        Mandat mandat4save = mandatRepository.findByChauffeurId(chauffeur.getId());
        mandat4save.setSociete(societe);
        mandat4save.setChauffeur(chauffeur);
        mandat4save.setLieuLivraison(mandat.getLieuDelivrance());
        mandat4save.setPoint_dexpedition(
                List.of(mandat.isBENAHMED()?"BENAHMED":"",mandat.isSALE()?"SALE":"",
                        mandat.isFES()?"FES":"",mandat.isBENIMELLAL()?"BENIMELLAL":"",mandat.isMARRAKECH()?"MARRAKECH":"")
        );
        mandat4save.setPoint_dexpedition(mandat4save.getPoint_dexpedition().stream().filter(v->!v.isEmpty()).collect(Collectors.toList()));


        Mandat mandat2 = mandatRepository.save(mandat4save);
        chauffeur.setMandat(mandat2);
        chauffeur.setSociete(societe);
        return chauffeurRepository.save(chauffeur);
    }

    public boolean deleteMandatByCinChauffaur(String cin) {
        try {
            List<Chauffeur> chauffeurs = chauffeurRepository.findByCinOrAdresse(cin,"");

            for (Chauffeur chauffeur : chauffeurs) {
                // If there is a mandat, delete it
                if (chauffeur.getMandat() != null) {
                    mandatRepository.deleteById(chauffeur.getMandat().getId());
                }

                // If there is a camion related to this chauffeur, delete it
                if (chauffeur.getCamion() != null) {
                   // camionRepository.deleteById(chauffeur.getCamion().getId());
                }

                // Delete the chauffeur itself
                chauffeurRepository.deleteById(chauffeur.getId());
            }

            // Now that all related chauffeurs are deleted, you can safely delete the societe
            Societe societe = chauffeurs.get(0).getSociete();
            if (societe != null) {
                if (societe.getDirecteur() != null) {
                    directeurRepository.deleteById(societe.getDirecteur().getId());
                }
                societeRepository.deleteById(societe.getId());
            }

            return true;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
