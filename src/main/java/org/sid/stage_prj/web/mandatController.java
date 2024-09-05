package org.sid.stage_prj.web;


import org.sid.stage_prj.dtos.MandatPayload;
import org.sid.stage_prj.dtos.MandatRecieveDTO;
import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.repositories.MandatRepository;
import org.sid.stage_prj.services.MandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class mandatController {

    @Autowired
    MandaService mandatService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addMandat")
    public Mandat AddMandat(@RequestBody MandatPayload mandat) throws IOException {
        System.out.println("++++");
        System.out.println(mandat.getMandat());

        System.out.println("++++");
        return mandatService.addMandat(mandat.getMandat(),mandat.getPhoto());

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/editMandat")
    public Chauffeur editMandat(@RequestBody MandatPayload mandat) throws IOException {
        // Check if the photo field is null or empty
        if (mandat.getPhoto() != null && !mandat.getPhoto().isEmpty()) {
            // Process the image if it's not null or empty
            return mandatService.editMandat(mandat.getMandat(), mandat.getPhoto());
        } else {
            // If the photo is null or empty, pass null to the service
            return mandatService.editMandat(mandat.getMandat(), null);
        }
    }

    @GetMapping("/mandats")
    public List<Mandat> getAllMandats(){
        return mandatService.getAll();
    }
    @GetMapping("/mandat/{cin}")
    public Chauffeur getMandatByChauffeur(@PathVariable("cin") String cin){
        System.out.println("++++++++++++++++");
        return mandatService.getMandatByCinChauffaur(cin);
    }

    @DeleteMapping("/mandat/{cin}")
    public boolean deleteMandatByChauffeur(@PathVariable("cin") String cin){
        return mandatService.deleteMandatByCinChauffaur(cin);
    }



}
