import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/authGuard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { TableListComponent } from './table-list/table-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  
  {path:"",component:DashboardComponent,canActivate: [AuthGuard], children:[
  {path:"home", component:TableListComponent},
  {path:"" , redirectTo:"home", pathMatch:"full"},
  {path:"user-details/:id", component:UserDetailsComponent},
  {path:"add-user", component:AddUserComponent},
  {path:"edit-user/:user", component:AddUserComponent},
  {path:"post",component:ViewPostComponent},
  {path:"add-post",component:AddPostComponent},
  ]},
  {path:"login",component:LoginComponent},

    


  

 // {path:"home", component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
