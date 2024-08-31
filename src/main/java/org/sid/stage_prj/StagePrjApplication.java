package org.sid.stage_prj;

import lombok.Data;
import org.sid.stage_prj.entites.Chauffeur;
import org.sid.stage_prj.entites.Mandat;
import org.sid.stage_prj.repositories.ChauffeurRepository;
import org.sid.stage_prj.repositories.MandatRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class StagePrjApplication {

    public static void main(String[] args) {
        SpringApplication.run(StagePrjApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ChauffeurRepository chauffeurRepository,
                            MandatRepository mandatRepository){
        return args -> {
//             Chauffeur chauffeur = new Chauffeur(null,"chef1","prenomChef","BBnjhj","gfghf",null,null,null);
//             chauffeurRepository.save(chauffeur);
//             Mandat mandat = new Mandat(null,new Date(),"",chauffeur,null);
//             mandatRepository.save(mandat);
        };
    }
}
