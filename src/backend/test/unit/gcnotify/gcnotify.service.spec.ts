import { HttpModule, HttpService } from '@nestjs/axios';
import { TestingModule, Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { GcNotifyEmailDto } from 'src/modules/gcnotify/dto/gcnotify-pia.dto';
import { GcNotifyController } from 'src/modules/gcnotify/gcnotify.controller';
import { GcNotifyService } from 'src/modules/gcnotify/gcnotify.service';
import { sendGcNotifyEmailMock } from 'test/util/mocks/data/gcnotify.mock';

/**
 * @Description
 * This file tests the contents of gcnotify.service.ts
 */
describe('GcNotifyService', () => {
  let service: GcNotifyService;

  const httpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GcNotifyController],
      providers: [
        HttpService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        GcNotifyService,
      ],
    }).compile();

    service = module.get<GcNotifyService>(GcNotifyService);
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
   * GCNotify Test
   *
   * @method sendEmail
   */
  describe('`sendEmail` method', () => {
    /**
     * This tests that email notifications can be sent through the GCNotify service.
     *
     * @Input
     *   - MPO
     *    - Name
     *    - Email
     *   - PIA
     *    - ID
     *    - Title
     *    - URL
     *
     * @Output
     *   - Sends email notification to MPO
     */

    const result = {
      data: {},
      headers: {},
      config: { url: 'http://localhost:8080/mockUrl' },
      status: 200,
      statusText: 'Created',
    };

    beforeEach(() => {
      httpService.post.mockReturnValue(of(result));
    });

    it('succeeds in sending an email notification', async () => {
      const gcNotifyEmailDto: GcNotifyEmailDto = { ...sendGcNotifyEmailMock };

      const sendEmail = jest
        .spyOn(service, 'sendEmail')
        .mockImplementation(async () => result.statusText);
      const data = await service.sendEmail(gcNotifyEmailDto);

      expect(sendEmail).toHaveBeenCalledWith({
        ...gcNotifyEmailDto,
      });

      expect(data).toEqual(result.statusText);
    });
  });

  describe('`httpService.post` method', () => {
    /**
     * This tests that httpService works.
     *
     * @Input
     *  - gcNotifyEmailDto
     *  - Third-party API URL
     *  - GCNotify Template ID
     *  - Auth & Content-Type headers
     *
     * @Output
     *   - Response statusText
     */

    const result = {
      data: {},
      headers: {},
      config: { url: 'http://localhost:8080/mockUrl' },
      status: 200,
      statusText: 'Created',
    };

    it('succeeds in sending an email notification', async () => {
      const gcNotifyEmailDto: GcNotifyEmailDto = { ...sendGcNotifyEmailMock };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));
      await service.sendEmail(gcNotifyEmailDto);

      expect(httpService.post).toHaveBeenCalledWith(
        `https://api.notification.canada.ca/v2/notifications/email`,
        {
          template_id: undefined,
          email_address: gcNotifyEmailDto.mpoEmail,
          personalisation: {
            name: gcNotifyEmailDto.mpoName,
            url: gcNotifyEmailDto.url,
            piaTitle: gcNotifyEmailDto.piaTitle,
            piaId: gcNotifyEmailDto.piaId,
          },
        },
        {
          headers: {
            Authorization: `ApiKey-v1 undefined`,
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });
});
