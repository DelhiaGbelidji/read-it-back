import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, JwtService],
})
export class ProjectModule {}
