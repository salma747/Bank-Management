import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,private clientService:ClientService,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ['', Validators.required],
    });
  }
  submit()
  {
    console.log(this.formGroup.value);
    this.clientService.add(this.formGroup.value).subscribe((data)=>{
        if(data !=null)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'the client has been created',
            showConfirmButton: false,
            timer: 1500
          }),
            this.router.navigate(['/client-list'])
        }
    });
  }

}
