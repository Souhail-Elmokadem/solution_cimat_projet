package org.sid.stage_prj.web;


import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.repositories.ChauffeurRepository;
import org.sid.stage_prj.services.ApiResponse;
import org.sid.stage_prj.services.ChauffeurService;
import org.sid.stage_prj.services.MandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class chauffeurController {


    @Autowired
    private MandaService mandaService;
    @Autowired
    private ChauffeurService chauffeurService;

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @GetMapping("/mandats/{id}")
    public Mandat getMandat(@PathVariable("id") Long idChauf){
        Chauffeur chauffeur = chauffeurRepository.findById(idChauf).get();
            return mandaService.getMandatByChauffeur(chauffeur);
    }

    @GetMapping("/chauffeurs")
    public ApiResponse<?> getAll(@RequestParam(name = "page", defaultValue = "0") int page,
                              @RequestParam(name = "size",defaultValue = "6") int size,
                              @RequestParam(name = "search",defaultValue = "") String kw
    ){
        Page<Chauffeur> chauffeurs = chauffeurService.findByName(kw,page,size);
        return new ApiResponse<Chauffeur>(chauffeurs.getContent(),(int) chauffeurs.getTotalElements());
    }


}
