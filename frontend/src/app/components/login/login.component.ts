import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginInvalid: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    //this.loginInvalid = true;
    this.loginForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),

      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),


    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => {
        if(token.access_token != '-'){
        this.router.navigate(['tournaments'])
        } else {
          this.loginInvalid = true;
          this.loginForm.reset()

        }
      })
      ).subscribe()
    
  }



}
