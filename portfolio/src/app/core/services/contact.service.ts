import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MailerError } from '../mailer/mailer.client';
import { mailer } from '../mailer/mailer';

export interface ContactFormData {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  _trap?: string;
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  async submit(data: ContactFormData): Promise<ContactSubmitResult> {
    if (data._trap) {
      return { ok: true };
    }

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return { ok: false, error: 'Nombre, email y mensaje son requeridos.' };
    }

    if (!EMAIL_RX.test(data.email)) {
      return { ok: false, error: 'El email no tiene un formato válido.' };
    }

    const apiKey = environment.mailer.apiKey;
    const toEmail = environment.mailer.contactToEmail;
    if (!apiKey || !toEmail) {
      console.error('[contact] MAILER_API_KEY or CONTACT_TO_EMAIL is not configured');
      return { ok: false, error: 'No se pudo enviar el mensaje. Intenta más tarde.' };
    }

    const safeName = data.name.trim();
    const safeEmail = data.email.trim();
    const safeMessage = data.message.trim();
    const safeSubject = data.subject?.trim()
      ? `[Portfolio] ${data.subject.trim()}`
      : `[Portfolio] Mensaje de ${safeName}`;

    const textBody = [
      'Nuevo mensaje desde el portfolio',
      '',
      `Nombre: ${safeName}`,
      `Email: ${safeEmail}`,
      `Asunto: ${data.subject?.trim() || '—'}`,
      '',
      safeMessage,
      '',
      'Enviado desde bencaceres.com · responde directamente a este email para contestar al remitente.',
    ].join('\n');

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;color:#222">
        <h2 style="color:#2c6334;border-bottom:2px solid #668763;padding-bottom:.5rem">
          Nuevo mensaje desde el portfolio
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600;width:90px">Nombre</td>
            <td style="padding:.4rem 0">${esc(safeName)}</td>
          </tr>
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600">Email</td>
            <td style="padding:.4rem 0"><a href="mailto:${esc(safeEmail)}">${esc(safeEmail)}</a></td>
          </tr>
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600">Asunto</td>
            <td style="padding:.4rem 0">${esc(data.subject?.trim() || '—')}</td>
          </tr>
        </table>
        <div style="background:#f5f8f5;padding:1rem 1.25rem;border-left:3px solid #668763;border-radius:4px">
          <p style="margin:0;line-height:1.75">${esc(safeMessage)}</p>
        </div>
        <p style="margin-top:2rem;font-size:.78rem;color:#999">
          Enviado desde bencaceres.com · responde directamente a este email para contestar al remitente.
        </p>
      </div>
    `;

    try {
      await mailer.sendEmail({
        to: toEmail,
        replyTo: safeEmail,
        subject: safeSubject,
        html: htmlBody,
        text: textBody,
      });
      return { ok: true };
    } catch (err) {
      if (err instanceof MailerError) {
        console.error(
          `[contact] Mailer error [${err.status}] requestId=${err.requestId}:`,
          err.message,
        );
      } else {
        console.error('[contact] Unexpected error:', err);
      }
      return { ok: false, error: 'No se pudo enviar el mensaje. Intenta más tarde.' };
    }
  }
}
