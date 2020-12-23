import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      'username':['',Validators.required],
      'password':['',[Validators.required,Validators.minLength(8)]],
    });
  }
  submit()
  {console.log(this.formGroup.value);
    if(this.formGroup.valid)
    {
      this.authService.login(this.formGroup.value).subscribe((data)=>{

        if(data!=null)
        {
          this.router.navigate(['home']);
        }
      });
    }
  }

}
