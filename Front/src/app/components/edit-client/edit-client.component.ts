import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  formGroup: FormGroup;
  id: any;
  loaded=false;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private clientService:ClientService,private router:Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.clientService.get(this.id).subscribe((data) => {
      this.formGroup = this.formBuilder.group({
        firstName: [data.firstName, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        lastName: [data.lastName, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        phone: [data.phone, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]],
        address: [data.address, Validators.required]
      });
      this.loaded=true;
    });
  }
  submit()
  {
    console.log(this.formGroup.value);
    this.clientService.update(this.id,this.formGroup.value).subscribe((data)=>{
      if(data !=null)
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'the client has been updated',
          showConfirmButton: false,
          timer: 1500
        }),
          this.router.navigate(['/client-list'])
      }
    });
  }

}
