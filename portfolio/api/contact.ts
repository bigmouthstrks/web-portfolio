import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const TO_EMAIL = process.env['CONTACT_TO_EMAIL'] ?? 'ben@bencaceres.com';
// Must use an address on a domain verified in https://resend.com/domains
const FROM_EMAIL =
  process.env['CONTACT_FROM_EMAIL'] ?? 'Portfolio Contact <contact@bencaceres.com>';

// Sanitize plain text to avoid HTML injection in the email body
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, _trap } = req.body ?? {};

  // Honeypot: if this hidden field was filled, it's a bot — silently discard
  if (_trap) {
    return res.status(200).json({ ok: true });
  }

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos.' });
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: 'El email no tiene un formato válido.' });
  }

  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' });
  }

  const safeSubject = subject?.trim()
    ? `[Portfolio] ${subject.trim()}`
    : `[Portfolio] Mensaje de ${name.trim()}`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email.trim(),
    subject: safeSubject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;color:#222">
        <h2 style="color:#2c6334;border-bottom:2px solid #668763;padding-bottom:.5rem">
          Nuevo mensaje desde el portfolio
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600;width:90px">Nombre</td>
            <td style="padding:.4rem 0">${esc(name.trim())}</td>
          </tr>
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600">Email</td>
            <td style="padding:.4rem 0"><a href="mailto:${esc(email.trim())}">${esc(email.trim())}</a></td>
          </tr>
          <tr>
            <td style="padding:.4rem 0;color:#668763;font-size:.85rem;font-weight:600">Asunto</td>
            <td style="padding:.4rem 0">${esc(subject?.trim() || '—')}</td>
          </tr>
        </table>
        <div style="background:#f5f8f5;padding:1rem 1.25rem;border-left:3px solid #668763;border-radius:4px">
          <p style="margin:0;line-height:1.75">${esc(message.trim())}</p>
        </div>
        <p style="margin-top:2rem;font-size:.78rem;color:#999">
          Enviado desde bencaceres.com · responde directamente a este email para contestar al remitente.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' });
  }

  console.info('[contact] Email sent:', data?.id);
  return res.status(200).json({ ok: true });
}
