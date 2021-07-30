import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

class CustomValidators{
  static passwordContainNumber(control: AbstractControl): ValidationErrors | undefined{
    const regex=/\d/;
    console.log(control.value)
    //onsole.log(regex.test(control.value))
    console.log(JSON.stringify(control.errors,null, 4))

    if (!(regex.test(control.value) && control.value != null)){
      console.log("michal")
      return {passwordInvalid: true};
    } else{
      return;
    }
  } 

  static passwordMatch (control: AbstractControl): ValidationErrors| undefined{
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value

    if (!((password === passwordConfirm) && password !== null && passwordConfirm !== null)){
      return {passwordsNotMatching: true}
    } else {
      return;
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isEmailWrong!: boolean;



  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.isEmailWrong = false;

  this.registerForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],

    email: [null, [
      Validators.required,
      Validators.minLength(6),
      Validators.email
    ]],

    password: [null, [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.passwordContainNumber
    ]],
    passwordConfirm: [null,[
      Validators.required
    ]],
  }, {
     validators: CustomValidators.passwordMatch
     
  })

  
  

  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }

    this.authService.checkEmail(this.registerForm.value).pipe(
      map(isExist => {
        if(isExist){
          this.isEmailWrong = true;
          this.registerForm.reset()
        } else {
          this.authService.register(this.registerForm.value).pipe(
            map(user => {
              this.router.navigate(['login'])
              }
          )).subscribe();
        }
      })
    ).subscribe()


  }

}
