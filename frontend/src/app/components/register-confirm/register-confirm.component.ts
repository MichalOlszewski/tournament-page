import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {

  user_id!: number;
  token!: string;
  confirmed!: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.user_id = params.user;
        this.token = params.token
      }
    );
    this.confirm();
    console.log("CONFIRMED " + this.confirmed)
  }

   confirm(){
    this.authService.confirm({user_id: this.user_id, token: this.token}).subscribe(
      data => {
        console.log(data.affected)
        this.confirmed = (data.affected > 0)
      })
  }

  onLoginClick(){
    console.log("click")
    this.router.navigate(['../', 'login'])
  }
  
}
