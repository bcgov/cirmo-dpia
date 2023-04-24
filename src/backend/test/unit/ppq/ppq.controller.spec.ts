import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PpqController } from 'src/modules/ppq/ppq.controller';
import { PpqService } from 'src/modules/ppq/ppq.service';
import { PpqPostDTO } from 'src/modules/ppq/dto/ppq-post.dto';
import {
  createPpqMock,
  createPpqRoMock,
  ppqEntityMock,
} from 'test/util/mocks/data/ppq.mock';
import { PpqResultRO } from 'src/modules/ppq/ro/ppq-result.ro';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { NotFoundException } from '@nestjs/common';
import { PpqServiceMock } from 'test/util/mocks/services/ppq.service.mock';
import { PpqEntity } from 'src/modules/ppq/entities/ppq.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';

describe('PpqController', () => {
  let controller: PpqController;
  let service: PpqService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [PpqController],
      providers: [
        PpqService,
        {
          provide: PpqService,
          useValue: PpqServiceMock,
        },
        {
          provide: getRepositoryToken(PpqEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    controller = module.get<PpqController>(PpqController);
    service = module.get<PpqService>(PpqService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  /**
   * @Description
   * Dummy test to check if the controller and service is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('ppqForm', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `Service.create` is called with correct mock data
     *
     * @Input
     *   - API data mock for ppq create form submission
     *   - Mock user req
     *
     * @Output 201
     * Test pass and all methods called with correct data
     */
    const ppqPostDTO: PpqPostDTO = { ...createPpqMock };

    const ppqResultRO: PpqResultRO = {
      ...createPpqRoMock,
    };

    it('should call the createPpq method and return the result', async () => {
      service.createPpq = jest.fn().mockResolvedValue(ppqResultRO);
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const result = await controller.postForm(ppqPostDTO, mockReq);

      expect(service.createPpq).toHaveBeenCalledWith(ppqPostDTO, mockReq.user);
      expect(result).toEqual(ppqResultRO);
    });
  });

  describe('downloadResult', () => {
    /**
     * @Description
     * This test validates the authenticated user getting 404 when
     * no ppq form result for the provided id is available in the database
     * and returns 404 when unable to create buffer for that record
     *
     * @Input
     *  - ppq id
     *  - Request
     *  - Response
     *
     * @Output 404
     * Not Found Exception is shown to the user
     *
     */
    it('fails and throws not found exception when the service did not return any buffer', async () => {
      const ppqId = ppqEntityMock.id;
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const mockRes: any = { set: jest.fn(), send: jest.fn() };

      await expect(
        controller.downloadResult(ppqId, mockReq, mockRes),
      ).rejects.toThrow(new NotFoundException());

      expect(service.downloadPpqResultPdf).toHaveBeenCalledWith(ppqId);

      expect(mockRes.send).not.toHaveBeenCalled();
    });
    /**
     * @Description
     * This test demonstrates the happy flow. It validates that
     *  - the service did not errored out, and returned the correct buffer
     *  - the user is got the received buffer
     *
     * @Input
     *  - ppq id
     *  - Request
     *  - Response
     *
     * @Output 200
     *  - pdf buffer
     */
    it('should call the downloadPpqResultPdf method and return the result', async () => {
      const pdfBuffer = Buffer.from('test pdf buffer');
      service.downloadPpqResultPdf = jest.fn().mockResolvedValue(pdfBuffer);
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const mockRes: any = {
        set: jest.fn(),
        send: jest.fn(),
      };

      await controller.downloadResult(1, mockReq, mockRes);

      expect(service.downloadPpqResultPdf).toHaveBeenCalledWith(1);
      expect(mockRes.set).toHaveBeenCalledTimes(2);
      expect(mockRes.set).toHaveBeenCalledWith(
        'Content-Type',
        'application/pdf',
      );
      expect(mockRes.set).toHaveBeenCalledWith(
        'Content-Disposition',
        'attachment; filename=result.pdf',
      );
      expect(mockRes.send).toHaveBeenCalledWith(pdfBuffer);
    });
  });
});
