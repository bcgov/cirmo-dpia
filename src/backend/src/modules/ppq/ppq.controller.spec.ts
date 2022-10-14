import { Test, TestingModule } from '@nestjs/testing';
import { PpqController } from './ppq.controller';

describe('PpqController', () => {
  let controller: PpqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PpqController],
    }).compile();

    controller = module.get<PpqController>(PpqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
