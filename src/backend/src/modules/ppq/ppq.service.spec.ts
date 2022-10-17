import { Test, TestingModule } from '@nestjs/testing';
import { PpqService } from './ppq.service';

describe('PpqService', () => {
  let service: PpqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PpqService],
    }).compile();

    service = module.get<PpqService>(PpqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
