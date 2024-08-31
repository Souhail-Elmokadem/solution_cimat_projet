package org.sid.stage_prj.repositories;

import org.sid.stage_prj.entites.Directeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirecteurRepository extends JpaRepository<Directeur,Long> {
    Directeur findByCin(String cin);
}
