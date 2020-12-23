package tn.iit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iit.models.ERole;
import tn.iit.models.Role;
import java.util.Optional;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

