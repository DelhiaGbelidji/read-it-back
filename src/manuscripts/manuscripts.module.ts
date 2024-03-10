import { Module } from '@nestjs/common';
import { ManuscriptsService } from './manuscripts.service';
import { ManuscriptsController } from './manuscripts.controller';

@Module({
  controllers: [ManuscriptsController],
  providers: [ManuscriptsService],
})
export class ManuscriptsModule {}
