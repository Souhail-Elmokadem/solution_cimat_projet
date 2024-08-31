package org.sid.stage_prj.entites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Directeur {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    String nom;
    String adresse;
    String cin;




}
