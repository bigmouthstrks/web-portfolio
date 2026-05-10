import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

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
            @if (!sent()) {
              <form class="contact-form" (submit)="handleSubmit($event)" novalidate>
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

                <button type="submit" class="btn btn-submit">
                  Enviar mensaje
                </button>
              </form>
            } @else {
              <div class="sent-state">
                <p class="sent-label mono">Mensaje enviado</p>
                <p class="sent-msg">Gracias por escribir. Responderé a la brevedad.</p>
                <button class="btn btn-ghost" (click)="sent.set(false)">
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
  readonly sent = signal(false);

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.sent.set(true);
  }
}
