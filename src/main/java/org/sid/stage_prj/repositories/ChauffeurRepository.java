package org.sid.stage_prj.repositories;

import org.sid.stage_prj.entites.Chauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
    Chauffeur findByCin(String cin);
}
