import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone','address','actions'];
  clients:Client[]=[];
  dataSource : MatTableDataSource<Client>;
  constructor(private clientService:ClientService, private router:Router,private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe((results)=>{
      this.clients=results;
      this.dataSource = new MatTableDataSource(this.clients);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteClient(client:Client){
    if(this.tokenStorageService.isAdmin())
    {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientService.delete(client).subscribe((result)=>{
            this.clients=this.clients.filter((cl)=>cl.id!=client.id);
            this.dataSource=new MatTableDataSource<Client>(this.clients);
          }),
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
  }

}
