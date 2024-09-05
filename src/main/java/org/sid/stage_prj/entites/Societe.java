package org.sid.stage_prj.entites;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Societe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    @ManyToOne(cascade = CascadeType.ALL)
    private Directeur directeur;

    private String adresse;
    private String capitale;

    @OneToMany(mappedBy = "societe")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Chauffeur> chauffeurs;

    @OneToMany(mappedBy = "societe")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Mandat> mandats;
}
