import { Component, OnInit } from '@angular/core';
import {Compte} from '../../models/compte';
import {CompteService} from '../../services/compte.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';


@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css']
})
export class CompteListComponent implements OnInit {
  displayedColumns: string[] = ['rib', 'solde', 'client','actions'];
  comptes: Compte[] = [];
  dataSource : MatTableDataSource<Compte>;

  constructor(private compteService: CompteService, private router: Router) {
  }

  ngOnInit(): void {
    this.compteService.getAll().subscribe((results)=>{
      this.comptes=results;
      this.dataSource = new MatTableDataSource(this.comptes);
      this.dataSource.filterPredicate=(data,filter)=>{
        let fullNameClient= data.client.firstName+" "+data.client.lastName;
        return data.solde.toString().indexOf(filter)!==-1
          || data.rib.toString().indexOf(filter)!==-1
          || fullNameClient.trim().toLowerCase().indexOf(filter)!==-1;
      };
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCompte(compte) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
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
        this.compteService.delete(compte).subscribe((result) => {
          this.comptes = this.comptes.filter((cl) => cl.rib != compte.rib);
          this.dataSource = new MatTableDataSource<Compte>(this.comptes);
        }),
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Account has been deleted.',
            'success'
          )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Account is safe :)',
          'error'
        )
      }
    })
  }
}

