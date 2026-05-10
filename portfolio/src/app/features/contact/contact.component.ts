import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section class="page-section">
      <div class="section-container">

        <header class="section-header" appReveal>
          <span class="section-label">Conexión</span>
          <h2 class="section-title">Contacto</h2>
        </header>

        <hr class="rule" />

        <div class="contact-layout">

          <!-- Form -->
          <div class="card form-card" appReveal>
            @if (status() !== 'sent') {
              <form class="contact-form" (submit)="handleSubmit($event)" novalidate>

                <!-- Honeypot — hidden from humans, bots fill it in -->
                <div class="trap-field" aria-hidden="true">
                  <label for="_trap">Leave this empty</label>
                  <input id="_trap" name="_trap" type="text" tabindex="-1" autocomplete="off" />
                </div>

                <div class="form-group">
                  <label class="form-label" for="name">Nombre</label>
                  <input class="form-input" id="name" name="name"
                         type="text" autocomplete="name"
                         placeholder="Tu nombre completo" required />
                </div>

                <div class="form-group">
                  <label class="form-label" for="email">Email</label>
                  <input class="form-input" id="email" name="email"
                         type="email" autocomplete="email"
                         placeholder="tu@email.com" required />
                </div>

                <div class="form-group">
                  <label class="form-label" for="subject">Asunto</label>
                  <input class="form-input" id="subject" name="subject"
                         type="text" placeholder="Motivo del contacto" />
                </div>

                <div class="form-group">
                  <label class="form-label" for="message">Mensaje</label>
                  <textarea class="form-textarea" id="message" name="message"
                            placeholder="Escribe tu mensaje…" required></textarea>
                </div>

                @if (status() === 'error') {
                  <p class="error-msg" role="alert">{{ errorText() }}</p>
                }

                <button type="submit" class="btn btn-submit"
                        [disabled]="status() === 'sending'"
                        [class.sending]="status() === 'sending'">
                  {{ status() === 'sending' ? 'Enviando…' : 'Enviar mensaje' }}
                </button>
              </form>
            } @else {
              <div class="sent-state">
                <p class="sent-label mono">Mensaje enviado</p>
                <p class="sent-msg">Gracias por escribir. Responderé a la brevedad.</p>
                <button class="btn btn-ghost" (click)="reset()">
                  Nuevo mensaje
                </button>
              </div>
            }
          </div>

          <!-- Info -->
          <aside class="contact-info" appReveal>
            <dl class="info-list">
              <div class="info-item">
                <dt class="mono">Ubicación</dt>
                <dd>{{ data.personal.location }}</dd>
              </div>
              @if (data.personal.email) {
                <div class="info-item">
                  <dt class="mono">Email</dt>
                  <dd>
                    <a [href]="'mailto:' + data.personal.email"
                       class="info-link">{{ data.personal.email }}</a>
                  </dd>
                </div>
              }
              <div class="info-item">
                <dt class="mono">Disponibilidad</dt>
                <dd>Abierto a oportunidades</dd>
              </div>
            </dl>

            <div class="info-rule" aria-hidden="true"></div>

            <nav class="social-links" aria-label="Redes profesionales">
              <a [href]="data.personal.linkedin"
                 target="_blank" rel="noopener noreferrer"
                 class="social-link mono">LinkedIn</a>
              <a [href]="data.personal.github"
                 target="_blank" rel="noopener noreferrer"
                 class="social-link mono">GitHub</a>
            </nav>
          </aside>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 1.5rem;
      margin-top: 3rem;
      align-items: start;
    }

    .form-card { padding: 2rem; }

    .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }

    .btn-submit {
      align-self: flex-start;
      margin-top: .5rem;
    }

    .btn-submit:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .btn-submit.sending {
      animation: pulse 1.4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: .5; }
      50%       { opacity: .85; }
    }

    /* Honeypot — visually hidden */
    .trap-field {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }

    /* Error message */
    .error-msg {
      font-size: .82rem;
      color: #c67a7a;
      background: rgba(198, 122, 122, 0.08);
      border: 1px solid rgba(198, 122, 122, 0.22);
      border-radius: 4px;
      padding: .6rem .9rem;
      margin: 0;
      line-height: 1.5;
    }

    /* Sent state */
    .sent-state {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }

    .sent-label { color: var(--accent-1); margin-bottom: .25rem; }

    .sent-msg {
      font-size: .9rem;
      line-height: 1.75;
      color: var(--accent-2);   /* no opacity — was .7 */
      margin-bottom: .5rem;
    }

    /* Info */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      padding-top: .25rem;
    }

    .info-list { list-style: none; display: flex; flex-direction: column; gap: 1.25rem; }

    .info-item { display: flex; flex-direction: column; gap: .2rem; }

    /* dt is genuinely secondary — use accent-1 without opacity */
    .info-item dt { color: var(--accent-1); font-size: .72rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; }

    .info-item dd {
      font-size: .92rem;
      color: var(--accent-light);
      font-weight: 400;
    }

    .info-link {
      color: var(--accent-2);   /* no opacity — was accent-light @ .7 */
      text-decoration: none;
      transition: color 600ms var(--ease);
    }

    .info-link:hover { color: var(--accent-light); }

    .info-rule { height: 1px; background: var(--border); }

    .social-links { display: flex; gap: 1.5rem; }

    .social-link {
      text-decoration: none;
      color: var(--accent-1);   /* no opacity — was .4, fails WCAG */
      font-size: .72rem;
      font-weight: 500;
      letter-spacing: .18em;
      text-transform: uppercase;
      transition: color 600ms var(--ease);
    }

    .social-link:hover { color: var(--accent-2); }

    @media (max-width: 760px) {
      .contact-layout { grid-template-columns: 1fr; }
    }
  `],
})
export class ContactComponent {
  readonly data = PORTFOLIO_DATA;
  readonly status = signal<FormStatus>('idle');
  readonly errorText = signal('');

  reset(): void {
    this.status.set('idle');
    this.errorText.set('');
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.status() === 'sending') return;

    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    this.status.set('sending');
    this.errorText.set('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        this.status.set('sent');
        form.reset();
      } else {
        this.errorText.set(json.error ?? 'Error inesperado. Intenta nuevamente.');
        this.status.set('error');
      }
    } catch {
      this.errorText.set('Sin conexión. Verifica tu red e intenta de nuevo.');
      this.status.set('error');
    }
  }
}
