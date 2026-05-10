import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="page-section">
      <div class="section-container">

        <header class="section-header" appReveal>
          <span class="section-label">Capacidades</span>
          <h2 class="section-title">Habilidades Técnicas</h2>
        </header>

        <hr class="rule" />

        <div class="skills-grid">
          @for (category of data.skillCategories; track category.name) {
            <div class="category-block" appReveal>
              <h3 class="category-name">{{ category.name }}</h3>
              <ul class="tag-list" role="list">
                @for (skill of category.skills; track skill.name) {
                  <li class="tag" [attr.aria-label]="skill.name">
                    {{ skill.name }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>


      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 2.5rem;
      margin-top: 3rem;
    }

    /* Category group */
    .category-block {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .category-name {
      font-family: var(--font);   /* Inter — Bebas illegible at small label size */
      font-size: .7rem;
      font-weight: 500;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--accent-1);
      padding-bottom: .65rem;
      border-bottom: 1px solid var(--border);
      margin: 0;
    }

    /* Tag list */
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: .45rem;
      list-style: none;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      font-family: var(--font);
      font-size: .72rem;
      font-weight: 400;
      letter-spacing: .04em;
      padding: .3rem .7rem;
      border-radius: 2px;
      color: var(--accent-2);
      background: rgba(102, 135, 99, 0.06);
      border: 1px solid rgba(102, 135, 99, 0.20);
      transition: border-color 500ms var(--ease),
                  background   500ms var(--ease),
                  color        500ms var(--ease);
    }


    @media (hover: hover) and (pointer: fine) {
      .tag:hover {
        border-color: rgba(102, 135, 99, 0.52);
        background: rgba(102, 135, 99, 0.12);
        color: var(--accent-light);
      }
    }

  `],
})
export class SkillsComponent {
  readonly data = PORTFOLIO_DATA;
}
