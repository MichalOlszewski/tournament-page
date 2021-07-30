import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  entries = [
    {
      name: 'Login',
      link: 'login'
    },
    {
      name: 'Register',
      link: 'register'
    },
    {
      name: 'Tournaments',
      link: 'tournaments'
    }
  ]
  constructor(private router: Router){}

  navigateTo(value: any){
    this.router.navigate(['../', value])
  }

  checkIsLogedIn(event: PageEvent){
    const token = localStorage.getItem('access-token')
    console.log(token)

  }
}
