package org.sid.stage_prj.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chauffeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String cin;
    private String adresse;
    private String photo;
    @OneToOne
    private Mandat mandat;

    @ManyToOne
    private Societe societe;

    @OneToOne(mappedBy = "chauffeur")
    private Camion camion;
}

