import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="page-section">
      <div class="section-container">

        <header class="section-header" appReveal>
          <span class="section-label">Perfil</span>
          <h2 class="section-title">Sobre mí</h2>
        </header>

        <hr class="rule" />

        <!-- ID card — airport-board style overview -->
        <div class="id-card card" appReveal>
          <dl class="id-grid">
            <div class="id-field">
              <dt class="id-label">Nombre</dt>
              <dd class="id-value">{{ data.personal.name }}</dd>
            </div>
            <div class="id-sep" aria-hidden="true"></div>
            <div class="id-field">
              <dt class="id-label">Especialidad</dt>
              <dd class="id-value">{{ data.personal.title }}</dd>
            </div>
            <div class="id-sep" aria-hidden="true"></div>
            <div class="id-field">
              <dt class="id-label">Experiencia</dt>
              <dd class="id-value">5+ años</dd>
            </div>
            <div class="id-sep" aria-hidden="true"></div>
            <div class="id-field">
              <dt class="id-label">Ubicación</dt>
              <dd class="id-value">{{ data.personal.location }}</dd>
            </div>
          </dl>
        </div>

        <!-- Main grid -->
        <div class="about-grid">

          <!-- Bio -->
          <article class="bio-article" appReveal>

            <!-- Role headline -->
            <h3 class="bio-tagline">Senior Software<br />Engineer</h3>

            <div class="bio-rule" aria-hidden="true"></div>

            <p class="bio-text">{{ data.personal.bio }}</p>

            <!-- Key facts row -->
            <ul class="bio-facts" role="list">
              <li class="fact-item">
                <span class="fact-num">5+</span>
                <span class="fact-label">años de exp.</span>
              </li>
              <li class="fact-sep" aria-hidden="true"></li>
              <li class="fact-item">
                <span class="fact-num">iOS</span>
                <span class="fact-label">especialización</span>
              </li>
              <li class="fact-sep" aria-hidden="true"></li>
              <li class="fact-item">
                <span class="fact-num">3</span>
                <span class="fact-label">idiomas</span>
              </li>
            </ul>

            <div class="bio-actions">
              <a routerLink="/experience" class="btn">Ver experiencia</a>
              <a routerLink="/contact"    class="btn btn-ghost">Contactar</a>
            </div>

          </article>

          <!-- Side panel -->
          <aside class="side-panel" [appReveal]="'stagger'">

            <!-- Languages -->
            <div class="card lang-card">
              <h3 class="card-title">Idiomas</h3>
              <ul class="lang-list" role="list">
                @for (lang of data.languages; track lang.name) {
                  <li class="lang-item">
                    <span class="lang-name">{{ lang.name }}</span>
                    <span class="lang-badge">{{ lang.proficiency }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Links -->
            <div class="card links-card">
              <h3 class="card-title">Redes</h3>
              <nav class="link-list" aria-label="Redes profesionales">
                <a [href]="data.personal.linkedin"
                   target="_blank" rel="noopener noreferrer"
                   class="link-item"
                   aria-label="Perfil LinkedIn (abre en nueva pestaña)">
                  <span class="link-name">LinkedIn</span>
                  <span class="link-arrow" aria-hidden="true">→</span>
                </a>
                <a [href]="data.personal.github"
                   target="_blank" rel="noopener noreferrer"
                   class="link-item"
                   aria-label="Perfil GitHub (abre en nueva pestaña)">
                  <span class="link-name">GitHub</span>
                  <span class="link-arrow" aria-hidden="true">→</span>
                </a>
              </nav>
            </div>

          </aside>
        </div>

      </div>
    </section>
  `,
  styles: [`
    /* ── ID card ── */
    .id-card {
      margin-top: 3rem;
      padding: 1.75rem 2rem;
    }

    .id-grid {
      display: flex;
      align-items: stretch;
      gap: 0;
      flex-wrap: wrap;
    }

    .id-field {
      display: flex;
      flex-direction: column;
      gap: .35rem;
      padding: 0 2rem;
      flex: 1;
      min-width: 160px;
    }

    .id-field:first-child { padding-left: 0; }

    .id-sep {
      width: 1px;
      background: var(--border);
      flex-shrink: 0;
      align-self: stretch;
    }

    .id-label {
      font-family: var(--font);
      font-size: .62rem;
      font-weight: 500;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--accent-1);
    }

    .id-value {
      font-family: var(--font-mono);
      font-size: 1.15rem;        /* Bebas at display size */
      letter-spacing: .06em;
      color: var(--accent-light);
      line-height: 1.1;
    }

    /* ── Main grid ── */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2rem;
      margin-top: 2rem;
      align-items: start;
    }

    /* ── Bio ── */
    .bio-article {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      overflow: hidden;                /* contain watermark */
      padding: 2.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      backdrop-filter: blur(28px) saturate(200%);
      -webkit-backdrop-filter: blur(28px) saturate(200%);
      /* Left accent bar */
      border-left: 3px solid var(--accent-1);
    }

    /* Punch line */
    .bio-tagline {
      font-family: var(--font-mono);
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      letter-spacing: .04em;
      line-height: 1;
      color: var(--accent-light);
      text-shadow: 0 0 60px rgba(102,135,99,.18);
      position: relative;            /* above watermark */
    }

    /* Short horizontal accent rule */
    .bio-rule {
      width: 3rem;
      height: 2px;
      background: linear-gradient(to right, var(--accent-1), transparent);
      border-radius: 1px;
    }

    .bio-text {
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.9;
      color: var(--accent-2);
      position: relative;
    }

    /* Key facts row */
    .bio-facts {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      list-style: none;
      flex-wrap: wrap;
      position: relative;
    }

    .fact-item {
      display: flex;
      flex-direction: column;
      gap: .2rem;
    }

    .fact-num {
      font-family: var(--font-mono);
      font-size: 1.8rem;
      letter-spacing: .05em;
      color: var(--accent-light);
      line-height: 1;
    }

    .fact-label {
      font-size: .62rem;
      font-weight: 500;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--accent-1);
    }

    .fact-sep {
      width: 1px;
      height: 2.5rem;
      background: var(--border);
      flex-shrink: 0;
    }

    .bio-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      position: relative;
    }

    /* ── Side panel ── */
    .side-panel {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    /* Languages */
    .lang-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: .85rem;
    }

    .lang-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .lang-name {
      font-size: .88rem;
      font-weight: 400;
      color: var(--accent-2);
    }

    .lang-badge {
      font-family: var(--font);
      font-size: .6rem;
      font-weight: 500;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--accent-1);
      border: 1px solid rgba(102, 135, 99, 0.25);
      border-radius: 2px;
      padding: .18rem .5rem;
      background: rgba(102, 135, 99, 0.06);
      white-space: nowrap;
    }

    /* Links */
    .link-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .link-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .8rem 0;
      border-bottom: 1px solid var(--border-light);
      text-decoration: none;
      color: var(--accent-2);
      transition: color 500ms var(--ease), padding-left 500ms var(--ease);
    }

    .link-item:last-child { border-bottom: none; }

    @media (hover: hover) and (pointer: fine) {
      .link-item:hover {
        color: var(--accent-light);
        padding-left: .5rem;
      }
      .link-item:hover .link-arrow { color: var(--accent-1); }
    }

    .link-name {
      font-family: var(--font);
      font-size: .78rem;
      font-weight: 500;
      letter-spacing: .1em;
    }

    .link-arrow {
      font-size: .9rem;
      color: var(--accent-1);
      opacity: .5;
      transition: opacity 500ms var(--ease);
    }

    /* Responsive */
    @media (max-width: 860px) {
      .id-field { min-width: 140px; }
    }

    @media (max-width: 720px) {
      .about-grid { grid-template-columns: 1fr; }

      .id-grid {
        flex-direction: column;
        gap: 1.25rem;
      }
      .id-sep { width: 100%; height: 1px; }
      .id-field { padding: 0; }
    }

    @media (max-width: 480px) {
      .bio-text { font-size: .95rem; }
      .bio-text::first-letter { font-size: 3rem; }
    }
  `],
})
export class AboutComponent {
  readonly data = PORTFOLIO_DATA;
}
