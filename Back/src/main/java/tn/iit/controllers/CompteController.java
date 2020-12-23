package tn.iit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.iit.dto.CompteDto;
import tn.iit.models.Compte;
import tn.iit.services.ClientService;
import tn.iit.services.CompteService;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RequestMapping(value = "/comptes")
@Controller
@RestController()
public class CompteController {
    private final CompteService compteService;
    private final ClientService clientService;

    @Autowired
    public CompteController(CompteService compteService, ClientService clientService) {
        this.compteService = compteService;
        this.clientService = clientService;
    }

    @PostMapping("/add")
    public Compte AddCompte(@RequestBody CompteDto compteDto) {
        Compte compte=new Compte (new BigDecimal (compteDto.getSolde ()),compteDto.getClient ());
        return compteService.save (compte);
    }

    @GetMapping("/client/{id}")
    public List<Compte> getComptesByClientId(@PathVariable(name = "id") Long id){
        if (!clientService.exists (id)) {
            return null;
        }
        return compteService.getByClientId (id);
    }


    @GetMapping("/{rib}")
    public Compte getCompteByRib(@PathVariable(value = "rib") Long rib) {
        if (!compteService.exists (rib)) {
            return null;
        }
        return compteService.getByRib (rib);
    }

    @GetMapping("/all")
    public List<Compte> getAll() {
        return compteService.getAll ();
    }

    @PutMapping("/{rib}")
    public Compte updateCompte(@PathVariable(value = "rib") Long rib, @RequestBody CompteDto compteDto) {
        if (!compteService.exists (rib)) {
            return null;
        }
        Compte compte=compteService.getByRib (rib);
        compte.setSolde (new BigDecimal (compteDto.getSolde ()));
        compte.setClient(this.clientService.getById(compteDto.getClient().getId()));
        return compteService.save (compte);

    }
    @DeleteMapping("/{rib}")
    public boolean deleteCompte(@PathVariable(value = "rib") Long rib) {
        if (!compteService.exists (rib)) {
            return false;
        }
        compteService.delete (rib);
        return true;
    }
}
