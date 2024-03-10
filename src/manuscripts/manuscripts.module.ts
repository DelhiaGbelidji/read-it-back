import { Module } from '@nestjs/common';
import { ManuscriptsService } from './manuscripts.service';
import { ManuscriptsController } from './manuscripts.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ManuscriptsController],
  providers: [ManuscriptsService, PrismaService, JwtService],
})
export class ManuscriptsModule {}
