import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MailToken } from 'src/mail/models/mail.interface';
import { MailService } from 'src/mail/service/mail.service';
import { UserService } from 'src/user/service/user.service';

@Controller('mail')
export class MailController {

    constructor(
        private mailService: MailService,
        private userSerice: UserService
        ){}


    @Delete('confirm')
    deleteMailToken(@Query() query): Observable<MailToken>{
        return this.mailService.deleteMailToken(query).pipe(
            map(res => {
                if(res.affected > 0){
                    this.userSerice.updateVerifiedOfUser(Number(query.user_id), {verified: true})
                }
                return res
            })
        )
    }


}
