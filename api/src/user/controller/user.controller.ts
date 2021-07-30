import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, Request, Res, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guards';
import { fileURLToPath } from 'url';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';
import {diskStorage} from 'multer';
import {v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { UserisUserGuard } from 'src/auth/guards/UserIsUser.guard';
import { MailService } from 'src/mail/service/mail.service';
import { AuthService } from 'src/auth/services/auth.service';
import { MailToken } from 'src/mail/models/mail.interface';
import { UserModule } from '../user.module';


export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            var path = require('path')
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('users')
export class UserController {

constructor (
    private userService: UserService,
    private mailService: MailService
    ) {}

@Post()
create (@Body() user: User, @Headers() header: Headers): Observable<User | Object > | boolean{
    const host = header['host']
    const token = Math.floor(1000 + Math.random() * 9000).toString()

    return this.userService.create(user).pipe(
        map((user: User) => {
            this.mailService.sendUserConfirmation(user, token, host)
        return user}),
        catchError(err => of({error: err.message }))
    );
}

@Get('exist')
check(@Query() query): Observable<boolean>{
    return this.userService.emailExist(query.email)
}
 

@Post('login')
login(@Body() user: User): Observable<Object> {

    return this.userService.login(user).pipe(
        switchMap((jwt: string) => {
            return this.userService.findByMail(user.email).pipe(map(user => {
                return {
                    access_token: jwt
                    }
                }))
        }
        )
    )
}

@Get(':id')
findOne(@Param()params): Observable<User> {
    return this.userService.findOne(params.id);
}


@Get()
index(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
    @Query('username') username: string
    ): Observable<Pagination<User>>{
    limit = limit > 100 ? 100 : limit;
    

    if (username === null || username === undefined){
        return this.userService.paginate(
            {
                page: Number(page), 
                limit: Number(limit), 
                route: 'https://localhost:3000/api/users'
            })
    } else {
        console.log(username)
        return this.userService.paginateFilterByUsername(
            {
                page: Number(page), 
                limit: Number(limit), 
                route: 'https://localhost:3000/api/users'
            },
            {
                username
            }
            )
    }
}

@Delete(':id')
deleteOne(@Param('id') id: String): Observable<User>{
    return this.userService.deleteOne(Number(id))
}

@UseGuards(JwtAuthGuard, UserisUserGuard)
@Put(':id')
updateOne(@Param('id') id: string, @Body() user: User): Observable<any>{
    return this.userService.updateOne(Number(id), user)
}

@hasRoles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Put(':id/role')
updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
    return this.userService.updateRoleOfUser(Number(id), user);
}

@UseGuards(JwtAuthGuard)
@Post('upload')
@UseInterceptors(FileInterceptor('file', storage))
uploadFile(@UploadedFile() file, @Request() req): Observable<Object>{
    const user: User = req.user.user;

    return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
        map((user: User) => ({profileImage: user.profileImage}))
    )
    
}

@Get('profile-image/:imagename')
findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object>{
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
}

@Get('password/:email')
findPassword(@Param('email') email){
    return this.userService.getPassword(email)
}




}

