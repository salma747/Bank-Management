import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CompteService} from '../../services/compte.service';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';
import Swal from 'sweetalert2';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {

  loaded: boolean;
  formGroup: FormGroup;
  clients: Client[] = [];
  filteredClients: Observable<Client[]>;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private router: Router,
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe((data) => {
      this.clients = data;
      this.formGroup = this.formBuilder.group({
        solde: ['', [Validators.required, Validators.pattern('([0-9]*[.])?[0-9]*')]],
        client: ['', Validators.required]
      });

      this.filteredClients = this.formGroup.controls['client'].valueChanges.pipe(
        startWith(''), map(value => value ? this._filter(value) : this.clients.slice()));
      this.loaded = true;
    });

  }

  displayFn(client: Client): string {
    return client ? client.firstName + ' ' + client.lastName : '';
  }

  private _filter(value: string): Client[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.clients.filter(client => {
        let fullName = client.firstName.toLowerCase() + ' ' + client.lastName.toLowerCase();
        return fullName.indexOf(filterValue.toLowerCase()) === 0;
      });
    }

  }

  submit() {
    if (this.formGroup.valid && this.formGroup.value.client.id != null) {
      this.compteService.add(this.formGroup.value).subscribe(
        (data) => {
          Swal.fire('Account', "Account has been added successfully", 'success').then((value) => {
            console.log(value);
            if (value.isConfirmed) {
              this.router.navigate(['/compte-list']);
            }
          });

        }
      );
    }
  }

}
