import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMock } from '../../util/mocks/repository/repository.mock';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PpqEntity } from 'src/modules/ppq/entities/ppq.entity';
import { PpqController } from 'src/modules/ppq/ppq.controller';
import { PpqService } from 'src/modules/ppq/ppq.service';
import {
  createPpqMock,
  createPpqRoMock,
  ppqEntityMock,
} from 'test/util/mocks/data/ppq.mock';
import { PpqPostDTO } from 'src/modules/ppq/dto/ppq-post.dto';
import { PpqResultRO } from 'src/modules/ppq/ro/ppq-result.ro';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import * as pdfHelper from 'src/common/helpers/pdf-helper';
import * as dateHelper from 'src/common/helpers/date-helper';
import { marked } from 'marked';
import { delay } from 'rxjs';
describe('PpqService', () => {
  let service: PpqService;
  let ppqRepository;
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

    service = module.get<PpqService>(PpqService);
    ppqRepository = module.get(getRepositoryToken(PpqEntity));
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
    expect(ppqRepository).toBeDefined();
  });
  /**
   * @Description
   * These set of tests validates that getPpqById method returns the data pertaining to user's permissions.
   *
   * @method getPpqById
   */
  describe('getPpqById', () => {
    it('should call the findOneBy method of the repository', async () => {
      const ppqForm = new PpqEntity();
      ppqRepository.findOneBy = jest.fn().mockResolvedValue(ppqForm);
      const result = await service.getPpqById(1);

      expect(ppqRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(ppqForm);
    });
  });
  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * mocking the database save operation.
   *
   * @method createPpq
   */
  describe('createPpq', () => {
    it('should call the save method of the repository and return the result', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const createPpqDto: PpqPostDTO = { ...createPpqMock };
      const createPpqResultRo: PpqResultRO = { ...createPpqRoMock };
      const ppqEntity: PpqEntity = {
        ...ppqEntityMock,
      };
      ppqRepository.save = jest.fn(async () => {
        delay(10);
        return ppqEntity;
      });
      const result = await service.createPpq(createPpqDto, user);

      expect(ppqRepository.save).toHaveBeenCalledWith({
        ...createPpqDto,
        createdByGuid: user.idir_user_guid,
        createdByDisplayName: user.display_name,
        createdByUsername: user.idir_username,
        createdByEmail: user.email,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.display_name,
      });
      expect(result).toEqual({ id: createPpqResultRo.id });
    });
  });
  /**
   * @Description
   * These set of tests validates that the pugToPdf method is only when the ppq id is valid
   * and the method returns the correct pdf buffer value back.
   *
   * @method downloadPpqResultPdf
   */
  describe('downloadPpqResultPdf', () => {
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
     * This test validates that the method returns null if the provided ppq id does not exist
     *
     * @Input
     *   - ppq id
     *
     * @Output
     *   - empty return(null)
     */
    it('should return null when ppqForm does not exist', async () => {
      jest.spyOn(service, 'getPpqById').mockResolvedValue(null);
      const result = await service.downloadPpqResultPdf(1);
      expect(result).toBeNull();
    });
    /**
     * This test validates that the method returns the pdf buffer of the provided ppq id
     *
     * @Input
     *   - ppq id
     *
     * @Output
     *   - pdf buffer content
     */
    it('should call the getPpqById method', async () => {
      const getPpqEntity = { ...ppqEntityMock };
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');

      pugToPdfBufferSpy.mockImplementation(async () => mockPdfBuffer);

      service.getPpqById = jest.fn(async () => {
        delay(10);
        return getPpqEntity;
      });

      const result = await service.downloadPpqResultPdf(getPpqEntity.id);

      const pdfParsedData = {
        ...getPpqEntity,
        ...{
          updatedAt: null,
          ministry: 'Tourism, Arts, Culture and Sport',
          piaType: 'Standard PIA',
          delegatedReviewType: 'Checklist',
          proposedStartDate: '2022/06/20',
          description: null,
          otherFactors: [],
        },
      };

      expect(shortDateSpy).toHaveBeenCalledTimes(1);
      expect(shortDateSpy).toHaveBeenCalledWith(getPpqEntity.createdAt);

      expect(markedParseSpy).toHaveBeenCalledTimes(1);

      expect(pugToPdfBufferSpy).toHaveBeenCalledTimes(1);
      expect(pugToPdfBufferSpy).toHaveBeenCalledWith(
        'src/modules/ppq/templates/ppq-result.pug',
        pdfParsedData,
      );
      expect(service.getPpqById).toHaveBeenCalledWith(1);
      expect(result).toBe(mockPdfBuffer);
    });
  });
});
