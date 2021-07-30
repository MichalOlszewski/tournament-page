import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { RegisterComponent } from './components/register/register.component';
import { TournamentsAddComponent } from './components/tournaments/tournaments-add/tournaments-add.component';
import { TournamentsDetailComponent } from './components/tournaments/tournaments-detail/tournaments-detail.component';
import { TournamentsShowComponent } from './components/tournaments/tournaments-show/tournaments-show.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
      {
        path: 'confirm',
        component: RegisterConfirmComponent
      }
    ]

  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'mail',
    children: [
      {
        path: "confirm",
        component: RegisterConfirmComponent
      }
    ]
  },
  {
    path: 'tournaments',
    children: [
      {
        path: '',
        component: TournamentsShowComponent,
      },
      {
        path: 'details/:id',
        component: TournamentsDetailComponent,
      },
      {
        path: 'add',
        component: TournamentsAddComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
