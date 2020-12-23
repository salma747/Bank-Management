package tn.iit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tn.iit.services.CompteService;

@SpringBootApplication
public class FirstSpringProjectApplication   {


    public static void main(String[] args) {
        SpringApplication.run (FirstSpringProjectApplication.class, args);
    }


}
