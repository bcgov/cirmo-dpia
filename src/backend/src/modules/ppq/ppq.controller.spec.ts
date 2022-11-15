import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMock } from '../../test-utils/repository.mock';
import { AuthModule } from '../auth/auth.module';
import { PpqEntity } from './entities/ppq.entity';
import { PpqController } from './ppq.controller';
import { PpqService } from './ppq.service';

describe('PpqController', () => {
  let controller: PpqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [PpqController],
      providers: [
        PpqService,
        {
          provide: getRepositoryToken(PpqEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    controller = module.get<PpqController>(PpqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
