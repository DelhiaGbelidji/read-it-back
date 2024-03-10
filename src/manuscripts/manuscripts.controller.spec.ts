import { Test, TestingModule } from '@nestjs/testing';
import { ManuscriptsController } from './manuscripts.controller';
import { ManuscriptsService } from './manuscripts.service';

describe('ManuscriptsController', () => {
  let controller: ManuscriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManuscriptsController],
      providers: [ManuscriptsService],
    }).compile();

    controller = module.get<ManuscriptsController>(ManuscriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
