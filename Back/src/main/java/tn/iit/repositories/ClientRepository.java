package tn.iit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iit.models.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {
}
