package tn.iit.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

import java.io.Serializable;

import static lombok.EqualsAndHashCode.*;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "t_client")
public class Client implements Serializable {
    @Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;

    public Client(String firstName,String lastName,String phone,String address)
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.phone=phone;
        this.address = address;
    }
}
