import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from './components/client-list/client-list.component';
import {CompteListComponent} from './components/compte-list/compte-list.component';
import {AddCompteComponent} from './components/add-compte/add-compte.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {HomeComponent} from './components/home/home.component';
import {EditCompteComponent} from './components/edit-compte/edit-compte.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {LoginComponent} from './components/login/login.component';
import {AdminGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'client-list',component:ClientListComponent},
  {path:'add-client',component:AddClientComponent,canActivate:[AdminGuard]},
  {path:'compte-list',component:CompteListComponent,canActivate:[AdminGuard]},
  {path:'add-compte',component:AddCompteComponent,canActivate:[AdminGuard]},
  {path:'edit-compte/:id',component:EditCompteComponent,canActivate:[AdminGuard]},
  {path:'edit-client/:id',component:EditClientComponent,canActivate:[AdminGuard]},
  {path:'client-details/:id',component:ClientDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
