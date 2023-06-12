import { Test, TestingModule } from '@nestjs/testing';
import { InviteesService } from './invitees.service';

describe('InviteesService', () => {
  let service: InviteesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteesService],
    }).compile();

    service = module.get<InviteesService>(InviteesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
