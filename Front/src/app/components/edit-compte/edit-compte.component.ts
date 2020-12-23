import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../models/client';
import {CompteService} from '../../services/compte.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import Swal from 'sweetalert2';
import {Compte} from '../../models/compte';

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.css']
})
export class EditCompteComponent implements OnInit {
  loaded = false;
  formGroup: FormGroup;
  clients: Client[] = [];
  compte:Compte;
  private id: any;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private compteService: CompteService, private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  this.clientService.getAll().subscribe((allClients)=>{
    this.clients=allClients;
    this.compteService.get(this.id).subscribe((data) => {
      this.compte=data;
      this.formGroup = this.formBuilder.group({
        solde: [data.solde, [Validators.required, Validators.pattern('[0-9]*')]],
        client: [null, [Validators.required]],
      });

      const toSelect = this.clients.find(c => c.id == this.compte.client.id);
      this.formGroup.get('client').setValue(toSelect);
      this.loaded=true;
    });
  })

  }

  submit() {
    console.log(this.formGroup.value);
    this.compteService.update(this.id,this.formGroup.value).subscribe((data) => {
      if (data != null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'the account has been Edited',
          showConfirmButton: false,
          timer: 1500
        }),
          this.router.navigate(['/compte-list']);
      }
    });
  }

}

