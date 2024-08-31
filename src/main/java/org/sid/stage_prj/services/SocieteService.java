package org.sid.stage_prj.services;

import org.sid.stage_prj.entites.Societe;
import org.sid.stage_prj.repositories.SocieteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocieteService {
    @Autowired
    private SocieteRepository societeRepository;



    public Societe saveSociete(Societe societe) {
        return societeRepository.save(societe);
    }

    public Societe getSocieteById(Long id) {
        return societeRepository.findById(id).get();
    }

    public List<Societe> getAllSocietes() {
        return societeRepository.findAll();
    }

    public void deleteSociété(Long id) {
        societeRepository.deleteById(id);
    }
}
