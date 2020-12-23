package tn.iit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.models.Compte;
import tn.iit.repositories.CompteRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CompteService {

    private final CompteRepository compteRepository;

    @Autowired
    public CompteService(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    @Transactional
    public Compte save(Compte compte) {
        return compteRepository.saveAndFlush (compte);
    }

    public Compte getByRib(Long rib) {
        return compteRepository.getOne (rib);
    }

    public boolean exists(Long rib) {
        return compteRepository.existsById (rib);
    }

    public void delete(Long rib) {
        compteRepository.deleteById (rib);
    }

    public List<Compte> getAll() {
        return compteRepository.findAll ();
    }

    public List<Compte> getByClientId(Long id){
        return this.compteRepository.findComptesByClientId (id);
    }
}
