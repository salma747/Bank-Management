package tn.iit.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

import static lombok.EqualsAndHashCode.*;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "t_compte")
public class Compte implements Serializable {
    @Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rib;
    private BigDecimal solde;
    @ManyToOne
    @JoinColumn(name = "client_id",nullable = false,referencedColumnName = "id")
    private Client client;
    public Compte(BigDecimal solde,Client client){
        this.solde=solde;
        this.client=client;
    }
}
