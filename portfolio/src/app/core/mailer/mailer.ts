import { environment } from '../../../environments/environment';
import { MailerClient } from './mailer.client';

export const mailer = new MailerClient({
  apiKey: environment.mailer.apiKey,
  baseUrl: environment.mailer.baseUrl,
});
