package org.sid.stage_prj.entites;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mandat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date_detablissement;
    @ElementCollection

    private List<String> point_dexpedition;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Chauffeur chauffeur;
    String lieuLivraison;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private Societe societe;
}