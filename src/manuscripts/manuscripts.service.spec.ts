import { Test, TestingModule } from '@nestjs/testing';
import { ManuscriptsService } from './manuscripts.service';

describe('ManuscriptsService', () => {
  let service: ManuscriptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManuscriptsService],
    }).compile();

    service = module.get<ManuscriptsService>(ManuscriptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
