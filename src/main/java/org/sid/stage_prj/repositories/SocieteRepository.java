package org.sid.stage_prj.repositories;

import org.sid.stage_prj.entites.Societe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocieteRepository extends JpaRepository<Societe, Long> {
    Societe findByNom(String nom);
}
