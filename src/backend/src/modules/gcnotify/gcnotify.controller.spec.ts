import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { GcNotifyController } from './gcnotify.controller';
import { GcNotifyService } from './gcnotify.service';

describe('GcNotifyController', () => {
  let controller: GcNotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GcNotifyController],
      providers: [GcNotifyService],
    }).compile();

    controller = module.get<GcNotifyController>(GcNotifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
