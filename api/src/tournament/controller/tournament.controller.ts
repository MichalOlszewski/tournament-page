import { Body, Controller, Get, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { storage } from 'src/user/controller/user.controller';
import { Logo } from '../models/logo.interface';
import { Tournament } from '../models/torunament.interface';
import { TournamentService } from '../service/tournament.service';

@Controller('tournaments')
export class TournamentController {

    constructor(
        private tourService: TournamentService,
    ){}

    @Get()
    index(
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 10,
        @Query('name') name: string
        ): Observable<Pagination<Tournament>>{
        limit = limit > 100 ? 100 : limit;
        
            console.log(name)
        if (name === null || name === undefined){
            console.log('undefined')
            return this.tourService.paginate(
                {
                    page: Number(page), 
                    limit: Number(limit), 
                    route: 'https://localhost:3000/api/tournaments'
                })
        } else {
            console.log(name)
            return this.tourService.paginateFilterByUsername(
                {
                    page: Number(page), 
                    limit: Number(limit), 
                    route: 'https://localhost:3000/api/tournaments'
                },
                {
                    name
                }
                )
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    addTournament(@Body() tour: Tournament, @Request() req){
        
        const user = req.user.user
        return this.tourService.add(tour, user)
    }


    @Get(':id')
    findOne(@Param('id') id: string): Observable<Tournament>{
        return this.tourService.findOne(Number(id))
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() tour: Tournament): Observable<Tournament>{
        return this.tourService.updateOne(Number(id), tour)
    }
    
    //@UseGuards(JwtAuthGuard)
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFile() image, @Body() tour): Observable<Object>{
    //     var logo: Logo = {
    //         filename: image
    //     }
    //     console.log(image.filename)
    //     console.log(tour.tour)
    //     return this.tourService.addLogo(logo, tour.tour)
    // }
    
    // @Get('profile-image/:imagename')
    // findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object>{
    //     return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
    // }

}
