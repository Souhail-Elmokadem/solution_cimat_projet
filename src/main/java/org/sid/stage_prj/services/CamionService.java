package org.sid.stage_prj.services;

import org.sid.stage_prj.entites.Camion;
import org.sid.stage_prj.repositories.CamionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CamionService {

    @Autowired
    private CamionRepository camionRepository;

    public Camion saveCamion(Camion camion) {
        return camionRepository.save(camion);
    }

    public Camion getCamionById(Long id) {
        return camionRepository.findById(id).orElse(null);
    }

    public List<Camion> getAllCamions() {
        return camionRepository.findAll();
    }

    public void deleteCamion(Long id) {
        camionRepository.deleteById(id);
    }
}

