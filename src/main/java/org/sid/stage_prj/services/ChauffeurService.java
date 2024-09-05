package org.sid.stage_prj.services;

import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.repositories.ChauffeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChauffeurService {

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    public Chauffeur saveChauffeur(Chauffeur chauffeur) {
        return chauffeurRepository.save(chauffeur);
    }

    public Chauffeur getChauffeurById(Long id) {
        return chauffeurRepository.findById(id).orElse(null);
    }

    public List<Chauffeur> getAllChauffeurs() {
        return chauffeurRepository.findAll();
    }

    public void deleteChauffeur(Long id) {
        chauffeurRepository.deleteById(id);
    }

    public Page<Chauffeur> findByName(String kw, int page, int size) {
       return chauffeurRepository.findByNomContaining(kw, PageRequest.of(page,size));

    }
}

