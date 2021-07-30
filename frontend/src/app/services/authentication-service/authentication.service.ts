import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt"

export interface LoginForm{
  email: string;
  password: string;
};

export interface User{
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
};

export interface MailToken{
  user_id: number;
  token: string;
}

export const JWT_TOKEN = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        if (token.access_token != '-')
          localStorage.setItem(JWT_TOKEN, token.access_token)
        return token;
      })
    )
  }

  checkEmail(user: User){
    return this.http.get<any>(`api/users/exist?email=${user.email}`)
  }

  register(user: User){
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }

  confirm(mailToken: MailToken){
    return this.http.delete<any>(`api/mail/confirm?user_id=${mailToken.user_id}&token=${mailToken.token}`)
  }

  isAuthenticated(): boolean{
    var token = localStorage.getItem(JWT_TOKEN)!;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
