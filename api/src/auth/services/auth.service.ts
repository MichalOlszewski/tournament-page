import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { MailService } from 'src/mail/service/mail.service';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private mailService: MailService,
        ){}

    generateJWT(user: User): Observable <string>{
        return from(this.jwtService.signAsync({user}))
    }


    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12))
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean>{
        if (newPassword == undefined || passwordHash == undefined){
            return new Observable<false>();
        }
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }


}
