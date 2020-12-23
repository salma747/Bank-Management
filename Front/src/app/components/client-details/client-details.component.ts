import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client:Client;
  constructor(private clientService:ClientService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.clientService.get(id).subscribe((results)=>{
      this.client=results;
    })
  }

  list() {
    this.router.navigate(['client-list']);
  }

}
