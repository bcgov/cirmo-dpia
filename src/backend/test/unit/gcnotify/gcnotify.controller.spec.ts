import { Test, TestingModule } from '@nestjs/testing';
import { GcNotifyEmailDto } from 'src/modules/gcnotify/dto/gcnotify-pia.dto';
import { GcNotifyController } from 'src/modules/gcnotify/gcnotify.controller';
import { GcNotifyService } from 'src/modules/gcnotify/gcnotify.service';
import { sendGcNotifyEmailMock } from 'test/util/mocks/data/gcnotify.mock';
import { gcnotifyServiceMock } from 'test/util/mocks/services/gcnotify.service.mock';

/**
 * @Description
 * This file tests the contents of gcnotify.controller.ts
 */
describe('GcNotifyController', () => {
  let controller: GcNotifyController;
  let service: GcNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcNotifyController],
      providers: [
        {
          provide: GcNotifyService,
          useValue: gcnotifyServiceMock,
        },
      ],
    }).compile();

    controller = module.get<GcNotifyController>(GcNotifyController);
    service = module.get<GcNotifyService>(GcNotifyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /**
   * @Description
   * This test suite validates that the method passes the correct passed values to the service,
   * mock the service result and return correct result to the user
   *
   * @method sendEmail
   */
  describe('`sendEmail` method', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `service.sendEmail` is called with correct mock data
     *
     * @Input
     *  - MPO
     *    - Name
     *    - Email
     *  - PIA
     *    - Title
     *    - ID
     *    - URL
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const gcNotifyEmailDto: GcNotifyEmailDto = { ...sendGcNotifyEmailMock };

      await controller.sendEmail(gcNotifyEmailDto);

      expect(service.sendEmail).toHaveBeenCalledWith(gcNotifyEmailDto);
    });
  });
});
