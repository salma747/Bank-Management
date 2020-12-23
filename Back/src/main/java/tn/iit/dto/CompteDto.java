package tn.iit.dto;

import lombok.*;
import tn.iit.models.Client;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CompteDto {
    private String solde;
    private Client client;

}
