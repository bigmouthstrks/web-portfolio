import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-education',
  imports: [RevealDirective],
  template: `
    <section class="page-section">
      <div class="section-container">

        <header class="section-header" appReveal>
          <span class="section-label">Formación</span>
          <h2 class="section-title">Educación</h2>
        </header>

        <hr class="rule" />

        <ul class="edu-list" [appReveal]="'stagger'" role="list">
          @for (item of data.education; track item.institution) {
            <li class="card edu-card">
              <div class="edu-main">
                <h3 class="edu-degree">{{ item.degree }}</h3>
                <p class="edu-institution">{{ item.institution }}</p>
                @if (item.notes) {
                  <p class="edu-description">{{ item.notes }}</p>
                }
              </div>
              <div class="edu-dates">
                <span class="mono">{{ item.startYear }} — {{ item.endYear }}</span>
              </div>
            </li>
          }
        </ul>

      </div>
    </section>
  `,
  styles: [`
    .edu-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-top: 3rem;
    }

    .edu-card {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .edu-degree {
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: .04em;
      color: var(--accent-light);
      margin-bottom: .3rem;
    }

    .edu-institution {
      font-size: .82rem;
      font-weight: 400;
      letter-spacing: .08em;
      color: var(--accent-1);   /* no opacity — was .6 */
    }

    .edu-description {
      font-size: .88rem;
      line-height: 1.75;
      color: var(--accent-2);   /* no opacity — was .65 */
      margin-top: .7rem;
    }

    .edu-dates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: .2rem;
      flex-shrink: 0;
      text-align: right;
    }
  `],
})
export class EducationComponent {
  readonly data = PORTFOLIO_DATA;
}
