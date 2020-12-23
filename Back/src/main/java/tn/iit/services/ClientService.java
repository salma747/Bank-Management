package tn.iit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.models.Client;
import tn.iit.repositories.ClientRepository;
import tn.iit.repositories.CompteRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final CompteRepository compteRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, CompteRepository compteRepository) {
        this.clientRepository = clientRepository;
        this.compteRepository = compteRepository;
    }

    public Client save(Client client) {
        return this.clientRepository.saveAndFlush(client);
    }

    public Client getById(Long id) {
        return this.clientRepository.getOne (id);
    }

    public boolean exists(Long id) {
        return this.clientRepository.existsById (id);
    }

    @Transactional
    public void delete(Long id) {
        this.compteRepository.deleteComptesByClientId(id);
        this.clientRepository.deleteById (id);
    }

    public List<Client> getAll() {
        return this.clientRepository.findAll ();
    }

}
