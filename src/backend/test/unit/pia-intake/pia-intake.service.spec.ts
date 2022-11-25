import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthModule } from 'src/modules/auth/auth.module';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';

import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import {
  createPiaIntakeMock,
  piaIntakeEntityMock,
} from 'test/util/mocks/data/pia-intake.mock';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { delay } from 'test/util/testUtils';

describe('PiaIntakeService', () => {
  let service: PiaIntakeService;
  let piaIntakeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [PiaIntakeController],
      providers: [
        PiaIntakeService,
        {
          provide: getRepositoryToken(PiaIntakeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    service = module.get<PiaIntakeService>(PiaIntakeService);
    piaIntakeRepository = module.get(getRepositoryToken(PiaIntakeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('`create` method', () => {
    it('succeeds calling the database repository with correct data', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = { ...createPiaIntakeMock };
      const piaIntakeEntity = { ...piaIntakeEntityMock };

      const user: KeycloakUser = { ...keycloakUserMock };

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return { id: piaIntakeEntity.id };
      });

      const result = await service.create(createPiaIntakeDto, user);

      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        ...createPiaIntakeDto,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        drafterEmail: user.email,
      });

      expect(result).toEqual({ id: piaIntakeEntity.id });
    });
  });
});
