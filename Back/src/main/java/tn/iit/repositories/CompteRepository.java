package tn.iit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iit.models.Compte;

import java.util.List;

@Repository
public interface CompteRepository extends JpaRepository<Compte,Long> {

     List<Compte> findComptesByClientId(Long clientId);

    void deleteComptesByClientId(Long clientId);
}
