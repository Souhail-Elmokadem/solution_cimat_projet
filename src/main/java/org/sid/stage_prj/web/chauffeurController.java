package org.sid.stage_prj.web;


import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.repositories.ChauffeurRepository;
import org.sid.stage_prj.services.MandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class chauffeurController {


    @Autowired
    private MandaService mandaService;

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @GetMapping("/mandats/{id}")
    public Mandat getMandat(@PathVariable("id") Long idChauf){
        Chauffeur chauffeur = chauffeurRepository.findById(idChauf).get();
            return mandaService.getMandatByChauffeur(chauffeur);
    }

    @GetMapping("/chauffeurs")
    public List<Chauffeur> getAll(){
        return chauffeurRepository.findAll();
    }


}
