import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { GcNotifyController } from './gcnotify.controller';
import { GcNotifyService } from './gcnotify.service';

describe('GcNotifyService', () => {
  let service: GcNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GcNotifyController],
      providers: [GcNotifyService],
    }).compile();

    service = module.get<GcNotifyService>(GcNotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
