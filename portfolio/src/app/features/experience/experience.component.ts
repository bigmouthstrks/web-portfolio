import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section class="page-section">
      <div class="section-container">

        <header class="section-header" appReveal>
          <span class="section-label">Trayectoria</span>
          <h2 class="section-title">Experiencia Profesional</h2>
        </header>

        <hr class="rule" />

        <ol class="timeline" [appReveal]="'stagger'" aria-label="Historial de empleo">
          @for (job of data.experience; track job.company) {
            <li class="timeline-item">
              <div class="timeline-marker" aria-hidden="true"></div>

              <article class="timeline-body card">
                <header class="job-header">
                  <div class="job-meta">
                    <h3 class="job-title">{{ job.role }}</h3>
                    <p class="job-company">{{ job.company }}</p>
                  </div>
                  <div class="job-dates">
                    <time class="mono">{{ job.startDate }} — {{ job.endDate }}</time>
                    @if (job.location) {
                      <span class="mono job-location">{{ job.location }}</span>
                    }
                  </div>
                </header>

                @if (job.description) {
                  <p class="job-description">{{ job.description }}</p>
                }

                @if (job.skills && job.skills.length > 0) {
                  <ul class="tech-list" role="list" aria-label="Tecnologías">
                    @for (tech of job.skills; track tech) {
                      <li class="badge">{{ tech }}</li>
                    }
                  </ul>
                }
              </article>
            </li>
          }
        </ol>

      </div>
    </section>
  `,
  styles: [`
    .timeline {
      list-style: none;
      position: relative;
      padding-left: 0;
      margin-top: 3rem;
    }

    /* vertical axis — green gradient, no residual blue */
    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 1px;
      background: linear-gradient(to bottom,
        rgba(102,135,99,.25),
        rgba(102,135,99,.04));
    }

    .timeline-item {
      position: relative;
      padding-left: 2.2rem;
      margin-bottom: 2.5rem;
    }

    .timeline-item:last-child { margin-bottom: 0; }

    .timeline-marker {
      position: absolute;
      left: -2px;
      top: 1.6rem;
      width: 5px;
      height: 5px;
      background: var(--accent-1);
      border-radius: 0;
      box-shadow: 0 0 12px rgba(102,135,99,.5);
    }

    .timeline-body { padding: 1.6rem 2rem; }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .job-title {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: .04em;
      color: var(--accent-light);
    }

    .job-company {
      font-size: .82rem;
      font-weight: 400;
      letter-spacing: .08em;
      color: var(--accent-1);   /* no opacity — was .65 */
      margin-top: .25rem;
    }

    .job-dates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: .2rem;
      flex-shrink: 0;
    }

    /* location is genuinely secondary — use accent-1 directly */
    .job-location { color: var(--accent-1); }

    .job-description {
      font-size: .9rem;
      line-height: 1.8;
      color: var(--accent-2);   /* no opacity — 7.96:1 contrast */
      margin-bottom: 1rem;
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      list-style: none;
    }

    .badge {
      font-size: .7rem;             /* was .65rem — below 11px minimum */
      font-weight: 500;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--accent-1);   /* no opacity — was .7 */
      border: 1px solid rgba(102,135,99,.25);
      border-radius: 2px;
      padding: .2rem .6rem;
      background: rgba(102,135,99,.06);
      transition: border-color 600ms var(--ease),
                  background   600ms var(--ease);
    }

    @media (hover: hover) and (pointer: fine) {
      .badge:hover {
        border-color: rgba(102,135,99,.45);
        background: rgba(102,135,99,.10);
      }
    }

    @media (max-width: 640px) {
      .job-header { flex-direction: column; }
      .job-dates  { align-items: flex-start; }
      .timeline-body { padding: 1.25rem; }
    }
  `],
})
export class ExperienceComponent {
  readonly data = PORTFOLIO_DATA;
}
