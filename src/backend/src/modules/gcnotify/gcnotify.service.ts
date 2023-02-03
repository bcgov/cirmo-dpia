import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { GcNotifyEmailDto } from './dto/gcnotify-pia.dto';
import { GcNotifyRO } from './ro/gcnotify.ro';

@Injectable()
export class GcNotifyService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(
    user: KeycloakUser,
    emailProps: GcNotifyEmailDto,
  ): Promise<GcNotifyRO> {
    const data = await firstValueFrom(
      this.httpService.post(
        `${process.env.GCNOTIFY_BASE_URL}/v2/notifications/email`,
        {
          email_address: emailProps.mpoEmail,
          template_id: process.env.GCNOTIFY_TEMPLATE_ID,
          personalisation: {
            name: user.idir_username,
            url: emailProps.url,
            piaTitle: emailProps.piaTitle,
            piaId: emailProps.piaId,
          },
        },
        {
          headers: {
            Authorization: `ApiKey-v1 ${process.env.GCNOTIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return data;
  }
}
