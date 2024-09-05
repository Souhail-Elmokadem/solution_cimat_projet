package org.sid.stage_prj.repositories;

import org.sid.stage_prj.entites.Chauffeur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
    Chauffeur findByCin(String cin);
    List<Chauffeur> findByCinOrAdresse(String cin,String adresse);
    Page<Chauffeur> findByNomContaining(String kw, PageRequest pageRequest);

}
