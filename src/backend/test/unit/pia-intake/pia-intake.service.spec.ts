import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { marked } from 'marked';

import * as pdfHelper from 'src/common/helpers/pdf-helper';
import * as dateHelper from 'src/common/helpers/date-helper';

import { AuthModule } from 'src/modules/auth/auth.module';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';

import {
  createPiaIntakeMock,
  piaIntakeEntityMock,
} from 'test/util/mocks/data/pia-intake.mock';
import { delay } from 'test/util/testUtils';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';

/**
 * @Description
 * This file tests the contents of pia-intake.service.ts
 */
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @Description
   * Dummy test to check if the service is defined
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * mocking the database save operation.
   *
   * @method create
   */
  describe('`create` method', () => {
    /**
     * This test validates that the it passes the correct data to the repository, saving the pia-intake form.
     * It also validates that the result received is actually coming from the repository.
     *
     * @Input
     *   - API data mock for pia-intake create form submission
     *   - User info mock
     *
     * @Output
     *   - an object containing id of the newly created database row
     */
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

  /**
   * @Description
   * These set of tests validates that findAll method returns the restricted data based on user's permissions.
   *
   * @method findAll
   */
  describe('`findAll` method', () => {
    /**
     * This test validates that the it passes the correct data to the repository
     *
     * @Input
     *   - User info mock
     */
    it('succeeds calling the database repository with correct data', async () => {
      const user1: KeycloakUser = { ...keycloakUserMock };

      await service.findAll(user1);

      expect(piaIntakeRepository.find).toHaveBeenCalledWith({
        where: {
          isActive: true,
          createdByGuid: user1.idir_user_guid,
        },
        order: {
          updatedAt: -1,
        },
      });
    });
  });

  /**
   * @Description
   * These set of tests validates that the pugToPdf method is only when the pia-intake id is valid
   * and the method returns the correct pdf buffer value back.
   *
   * @method downloadPiaIntakeResultPdf
   */
  describe('`downloadPiaIntakeResultPdf` method', () => {
    const pugToPdfBufferSpy = jest
      .spyOn(pdfHelper, 'pugToPdfBuffer')
      .mockImplementation(() => null);

    const markedParseSpy = jest
      .spyOn(marked, 'parse')
      .mockImplementation(() => null);

    const shortDateSpy = jest
      .spyOn(dateHelper, 'shortDate')
      .mockImplementation(() => null);

    beforeEach(() => {
      pugToPdfBufferSpy.mockClear();
      markedParseSpy.mockClear();
      shortDateSpy.mockClear();
    });

    /**
     * This test validates that the implementation does not go beyond and return null
     * if the provided pia-intake id is invalid or is not included in the database
     *
     * @Input
     *   - pia-intake id
     *
     * @Output
     *   null
     */
    it('returns null when provide pia-intake id is not found', async () => {
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const result = await service.downloadPiaIntakeResultPdf(
        piaIntakeEntity.id,
      );

      expect(result).toBe(null);
      expect(shortDateSpy).not.toHaveBeenCalled();
      expect(markedParseSpy).not.toHaveBeenCalled();
      expect(pugToPdfBufferSpy).not.toHaveBeenCalled();
    });

    /**
     * This test validates that the method returns the pdf buffer of the provided pia-intake id
     *
     * @Input
     *   - pia-intake id
     *
     * @Output
     *   - pdf buffer content
     */
    it('returns pdf buffer when provided correct data', async () => {
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');

      pugToPdfBufferSpy.mockImplementation(async () => mockPdfBuffer);

      piaIntakeRepository.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeEntity;
      });

      const result = await service.downloadPiaIntakeResultPdf(
        piaIntakeEntity.id,
      );

      const pdfParsedData = {
        ...piaIntakeEntity,
        ...{
          updatedAt: null,
          ministry: 'Tourism, Arts, Culture and Sport',
          initiativeDescription: null,
          initiativeScope: null,
          dataElementsInvolved: null,
          riskMitigation: null,
        },
      };

      expect(shortDateSpy).toHaveBeenCalledTimes(1);
      expect(shortDateSpy).toHaveBeenCalledWith(piaIntakeEntity.createdAt);

      expect(markedParseSpy).toHaveBeenCalledTimes(4);

      expect(pugToPdfBufferSpy).toHaveBeenCalledTimes(1);
      expect(pugToPdfBufferSpy).toHaveBeenCalledWith(
        'src/modules/pia-intake/templates/pia-intake-result.pug',
        pdfParsedData,
      );

      expect(result).toBe(mockPdfBuffer);
    });
  });
});
