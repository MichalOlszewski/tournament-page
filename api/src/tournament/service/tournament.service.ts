import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/user/models/user.interface';
import { Like, Repository } from 'typeorm';
import { LogoEntity } from '../models/logo.entity';
import { Logo } from '../models/logo.interface';
import { Tournament } from '../models/torunament.interface';
import { TournamentEntity } from '../models/tournament.entity';

@Injectable()
export class TournamentService {

    constructor(
        @InjectRepository(TournamentEntity) private readonly tournamentRepository: Repository<TournamentEntity>,
        @InjectRepository(LogoEntity) private readonly logoRepository: Repository<LogoEntity>
    ){}

    add(tour: Tournament, user: User): Observable<Tournament>{
        tour.organizer = user
        return from(this.tournamentRepository.save(tour))
    }

    addLogo(logo: Logo, tour: Tournament): Observable<Logo>{
        logo.tournament = tour
        return from(this.logoRepository.save(logo))
    }

    updateOne(id: number, tour: Tournament): Observable<Tournament>{
        return from(this.tournamentRepository.update(id, tour)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

    findOne(id: number): Observable<Tournament> {
        return from(this.tournamentRepository.findOne(id))
    }

    findAll(): Observable<Tournament[]>{
        return from(this.tournamentRepository.find())
    }

    paginate(options: IPaginationOptions): Observable<Pagination<Tournament>> {
        return from(paginate<Tournament>(this.tournamentRepository, options))
    }

    paginateFilterByUsername(options: IPaginationOptions, tour: Tournament): Observable<Pagination<Tournament>> {
        return from(this.tournamentRepository.findAndCount({
            skip: (Number(options.page)) * Number(options.limit)|| 0,
            take: Number(options.limit) || 10,
            order: {id: "ASC"},
            //select: ['id', 'name'],
            where: [
                {name: Like('%'+tour.name+'%')}
            ]
        })).pipe(
            map(([tours, totalTours]) => {
                const toursPageable: Pagination<Tournament> = {
                    items: tours,
                    links: {
                        first: options.route + '?limit=' + options.limit,
                        previous: options.route + '',
                        next: options.route + '?limit=' + options.limit + '&page=' + String(Number(options.page) + 1),
                        last: options.route + '?limit=' + options.limit + '&page=' + String(Math.ceil(Number(totalTours) / Number(options.limit))),
                    },
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: tours.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalTours,
                        totalPages: Math.ceil(totalTours / Number(options.limit))
                    }
                };
                return toursPageable;
            })
        )
    }



}
