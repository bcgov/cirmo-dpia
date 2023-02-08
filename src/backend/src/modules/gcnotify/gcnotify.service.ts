import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { GcNotifyEmailDto } from './dto/gcnotify-pia.dto';

@Injectable()
export class GcNotifyService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(emailProps: GcNotifyEmailDto): Promise<string> {
    const data = await firstValueFrom(
      this.httpService
        .post(
          `https://api.notification.canada.ca/v2/notifications/email`,
          {
            email_address: emailProps.mpoEmail,
            template_id: process.env.GCNOTIFY_TEMPLATE_ID,
            personalisation: {
              name: emailProps.mpoName,
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
        )
        .pipe(
          map((response: any) => response.data),
          catchError((e) => {
            console.error(e.response);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
    return data.statusText;
  }
}
