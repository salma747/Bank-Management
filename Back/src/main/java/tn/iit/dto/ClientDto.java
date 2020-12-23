package tn.iit.dto;

import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientDto {
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
}
