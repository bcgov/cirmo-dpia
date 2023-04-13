import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { AppTokensDto } from 'src/modules/auth/dto/app-tokens.dto';
import { appTokensDtoMock } from 'test/util/mocks/data/auth.mock';
import { authServiceMock } from 'test/util/mocks/services/auth.service.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should call the getUrlLogin method of the AuthService', () => {
      const urlLogin = 'https://example.com/login';
      service.getUrlLogin = jest.fn().mockReturnValue({ url: urlLogin });

      expect(controller.login()).toEqual({ url: urlLogin });
      expect(service.getUrlLogin).toHaveBeenCalled();
    });
  });

  describe('getAccessToken', () => {
    it('should call the getAccessToken method of the AuthService', async () => {
      const code = 'sample_code';
      const keycloakToken = { access_token: 'access_token' };

      service.getAccessToken = jest.fn().mockResolvedValue(keycloakToken);

      expect(await controller.getAccessToken(code)).toEqual(keycloakToken);
      expect(service.getAccessToken).toHaveBeenCalledWith(code);
    });
  });

  describe('getUserInfo', () => {
    it('should call the getUserInfo method of the AuthService', async () => {
      const accessToken = 'sample_access_token';
      const kcUserInfo = { id: 'user_id', username: 'username' };

      service.getUserInfo = jest.fn().mockResolvedValue(kcUserInfo);
      const req = { headers: { authorization: `Bearer ${accessToken}` } };

      expect(await controller.getUserInfo(req)).toEqual(kcUserInfo);
      expect(service.getUserInfo).toHaveBeenCalledWith(accessToken);
    });
  });

  describe('refreshAccessToken', () => {
    it('should call the refreshAccessToken method of the AuthService', async () => {
      const appTokensDto: AppTokensDto = {
        ...appTokensDtoMock,
      };
      const newAccessToken = 'new_access_token';

      service.refreshAccessToken = jest.fn().mockResolvedValue(newAccessToken);

      expect(await controller.refreshAccessToken(appTokensDto)).toEqual(
        newAccessToken,
      );
      expect(service.refreshAccessToken).toHaveBeenCalledWith(
        appTokensDto.refresh_token,
      );
    });
  });

  describe('logout', () => {
    it('should call the logout method of the AuthService', async () => {
      const appTokensDto: AppTokensDto = { ...appTokensDtoMock };

      service.logout = jest.fn().mockResolvedValue(undefined);

      await controller.logout(appTokensDto);
      expect(service.logout).toHaveBeenCalledWith(appTokensDto.refresh_token);
    });
  });
});
