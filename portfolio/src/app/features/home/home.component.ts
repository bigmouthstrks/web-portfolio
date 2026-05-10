import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="hero" aria-label="Presentación">

      <!-- perspective floor grid -->
      <div class="hero-grid" aria-hidden="true">
        <div class="hero-grid-inner"></div>
      </div>

      <!-- motion blur streaks -->
      <div class="streak streak-1" aria-hidden="true"></div>
      <div class="streak streak-2" aria-hidden="true"></div>

      <!-- central identity block -->
      <div class="hero-body" appReveal>
        <p class="hero-overline mono" aria-label="Ubicación y rol">
          {{ data.personal.location }}
          <span class="dot" aria-hidden="true"></span>
          Senior Software Engineer
        </p>

        <h1 class="hero-name">{{ data.personal.name }}</h1>

        <p class="hero-descriptor">Mobile · Web · AI · UX/UI  </p>

        <div class="hero-actions">
          <a routerLink="/experience" class="btn">Experiencia</a>
          <a routerLink="/contact"    class="btn btn-ghost">Contacto</a>
        </div>
      </div>

      <!-- stats / links bar — pinned to bottom -->
      <div class="hero-data" appReveal aria-label="Estadísticas">
        <div class="stat-row" role="list">
          <div class="stat" role="listitem">
            <span class="stat-value" aria-label="Más de 5 años de experiencia">5+</span>
            <span class="stat-label mono">Años</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat" role="listitem">
            <span class="stat-value" aria-label="7 empresas">7</span>
            <span class="stat-label mono">Empresas</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat" role="listitem">
            <span class="stat-value" aria-label="3 idiomas">3</span>
            <span class="stat-label mono">Idiomas</span>
          </div>
        </div>

        <nav class="hero-links" aria-label="Redes profesionales">
          <a [href]="data.personal.linkedin" target="_blank"
             rel="noopener noreferrer" class="ext-link mono"
             aria-label="Perfil de LinkedIn (abre en nueva pestaña)">LinkedIn</a>
          <a [href]="data.personal.github" target="_blank"
             rel="noopener noreferrer" class="ext-link mono"
             aria-label="Perfil de GitHub (abre en nueva pestaña)">GitHub</a>
        </nav>
      </div>

    </section>
  `,
  styles: [`
    /* ── Hero shell — full viewport, no scroll ── */
    .hero {
      position: relative;
      height: calc(100vh - 61px);   /* exact viewport, nothing beyond */
      max-height: calc(100vh - 61px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 4rem 2rem 6rem;
      overflow: hidden;
    }

    /* ── Perspective floor grid ── */
    .hero-grid {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 46%;
      overflow: hidden;
      pointer-events: none;
    }

    .hero-grid-inner {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(102,135,99,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(102,135,99,.06) 1px, transparent 1px);
      background-size: 80px 80px;
      transform: perspective(480px) rotateX(52deg);
      transform-origin: bottom center;
    }

    .hero-grid::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, var(--bg) 0%, transparent 60%);
      pointer-events: none;
    }

    /* ── Motion blur streaks ── */
    .streak {
      position: absolute;
      height: 1px;
      pointer-events: none;
      filter: blur(3px);
    }

    .streak-1 {
      top: 28%;
      left: 0;
      width: 35%;
      background: linear-gradient(90deg, transparent, rgba(102,135,99,.20), transparent);
    }

    .streak-2 {
      top: 62%;
      right: 0;
      width: 22%;
      background: linear-gradient(270deg, transparent, rgba(102,135,99,.14), transparent);
    }

    /* ── Identity block ── */
    .hero-body {
      position: relative;
      z-index: 1;
      max-width: 1060px;
      width: 100%;
      margin: 0 auto;
    }

    .hero-overline {
      display: flex;
      align-items: center;
      gap: .75rem;
      margin-bottom: 2rem;
    }

    .dot {
      display: inline-block;
      width: 3px;
      height: 3px;
      background: var(--accent-1);
      border-radius: 50%;
    }

    .hero-name {
      font-family: var(--font-mono);
      font-size: clamp(3rem, 8vw, 7rem);  /* Bebas needs more size to shine */
      letter-spacing: 0.06em;
      color: var(--accent-light);
      text-shadow: 0 0 100px rgba(102,135,99,.14);
      line-height: 1;
      margin-bottom: 1.25rem;
    }

    .hero-descriptor {
      font-size: .78rem;
      font-weight: 500;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--accent-1);   /* full opacity — was .45, fails WCAG */
      margin-bottom: 2.5rem;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* ── Stats bar — absolutely pinned to bottom ── */
    .hero-data {
      position: absolute;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 1060px;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
    }

    .stat-row {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: .15rem;
    }

    .stat-value {
      font-size: 1.6rem;
      font-weight: 300;
      letter-spacing: .05em;
      color: var(--accent-light);
      line-height: 1;
    }

    .stat-sep {
      width: 1px;
      height: 28px;
      background: var(--border);
      flex-shrink: 0;
    }

    .hero-links { display: flex; gap: 2rem; }

    .ext-link {
      text-decoration: none;
      color: var(--accent-1);   /* full opacity — was .4, fails WCAG */
      transition: color 600ms var(--ease);
    }

    .ext-link:hover { color: var(--accent-2); }

    @media (max-width: 680px) {
      .hero { padding: 3rem 1.25rem 9rem; }

      .hero-data {
        position: absolute;
        bottom: 1.5rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
        padding: 0 1.25rem;
      }

      .streak-2 { display: none; }
    }

    @media (max-height: 600px) {
      /* landscape phone — collapse stats to avoid overlap */
      .hero-data { display: none; }
      .hero { padding-bottom: 2rem; min-height: auto; }
    }
  `],
})
export class HomeComponent {
  readonly data = PORTFOLIO_DATA;
}
