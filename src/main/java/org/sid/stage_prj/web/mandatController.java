package org.sid.stage_prj.web;


import org.sid.stage_prj.dtos.MandatRecieveDTO;
import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.repositories.MandatRepository;
import org.sid.stage_prj.services.MandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class mandatController {

    @Autowired
    MandaService mandatService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addMandat")
    public Mandat AddMandat(@RequestBody MandatRecieveDTO mandat){

        return mandatService.addMandat(mandat);
    }

    @GetMapping("/mandats")
    public List<Mandat> getAllMandats(){
        return mandatService.getAll();
    }


}
