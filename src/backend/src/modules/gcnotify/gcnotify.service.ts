import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { GcNotifyEmailDto } from './dto/gcnotify-pia.dto';

@Injectable()
export class GcNotifyService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(
    user: KeycloakUser,
    mpoEmail: string,
    pia: GcNotifyEmailDto,
  ): Promise<any> {
    this.httpService.post(
      `${process.env.GCNOTIFY_BASE_URL}/v2/notifications/email`,
      {
        email_address: mpoEmail,
        template_id: process.env.GCNOTIFY_TEMPLATE_ID,
        personalisation: {
          name: user.idir_username,
          url: pia.url,
          piaTitle: pia.piaTitle,
          piaId: pia.piaId,
        },
      },
      {
        headers: {
          Authorization: `ApiKey-v1 ${process.env.GCNOTIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
