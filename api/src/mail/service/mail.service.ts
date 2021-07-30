import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { User } from '../../user/models/user.interface'
import { MailEntity } from '../models/mail.entity';
import { MailToken } from '../models/mail.interface';

@Injectable()
export class MailService {
  constructor(
      private mailerService: MailerService,
      @InjectRepository(MailEntity) private readonly mailRepository: Repository<MailEntity>,
      ) 
      {}

  async sendUserConfirmation(user: User, token: string, host: string) {

    const url = `http://${host}/register/confirm?user=${user.id}&token=${token}`;
    console.log(url)
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
      
    });
    this.create({user_id: user.id, token: token})
    return user
  }


  create(mailToken: MailToken): Observable<MailToken> {
      console.log("MAILTOKEN " + mailToken.user_id)
      return from(this.mailRepository.save(mailToken)).pipe(
                  map((mailToken: MailToken) => {return mailToken}),
                  catchError(err => throwError(err))
              )
          }
    

      findMailToken(mailToken: MailToken): Observable<any>{
          const user_id = (mailToken.user_id)
          return from(this.mailRepository.findOne({user_id: user_id}))
      }
  
      deleteMailToken(mailToken: MailToken): Observable<any>{
           return from(this.mailRepository.delete({user_id: mailToken.user_id}))
      }


  
}
