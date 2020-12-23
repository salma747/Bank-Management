package tn.iit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.iit.dto.ClientDto;
import tn.iit.models.Client;
import tn.iit.services.ClientService;

import java.util.List;

@CrossOrigin("*")
@RequestMapping(value = "/clients")
@Controller
@RestController()
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/add")
    public Client AddClient(@RequestBody ClientDto clientDto) {
        Client client=new Client (clientDto.getFirstName (),clientDto.getLastName (),clientDto.getPhone (),clientDto.getAddress ());
        return clientService.save (client);
    }


    @GetMapping("/{id}")
    public Client getClientById(@PathVariable(value = "id") Long id) {
        if (!clientService.exists (id)) {
            return null;
        }
        return clientService.getById (id);
    }

    @GetMapping("/all")
    public List<Client> getAll() {
        return clientService.getAll ();
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable(value = "id") Long id, @RequestBody ClientDto clientDto) {
        if (!clientService.exists (id)) {
            return null;
        }
        Client client=clientService.getById (id);
        client.setFirstName (clientDto.getFirstName ());
        client.setLastName (clientDto.getLastName ());
        client.setPhone (clientDto.getPhone ());
        client.setAddress (clientDto.getAddress ());
        return clientService.save (client);
    }

    @DeleteMapping("/{id}")
    public boolean deleteClient(@PathVariable(value = "id") Long id) {
        if (!clientService.exists (id)) {
            return false;
        }
        clientService.delete (id);
        return true;
    }
}