import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentController } from './controller/tournament.controller';
import { LogoEntity } from './models/logo.entity';
import { TournamentEntity } from './models/tournament.entity';
import { TournamentService } from './service/tournament.service'

@Module({
   imports: 
   [TypeOrmModule.forFeature([TournamentEntity]),
   TypeOrmModule.forFeature([LogoEntity])],
  controllers: [TournamentController],
  providers: [TournamentService,TournamentEntity, LogoEntity]
})
export class TournamentModule {}
