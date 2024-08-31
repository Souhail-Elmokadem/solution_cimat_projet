package org.sid.stage_prj.repositories;

import org.sid.stage_prj.entites.Mandat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MandatRepository extends JpaRepository<Mandat, Long> {
    Mandat findByChauffeurId(Long Id);
}
