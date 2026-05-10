import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer-rule" aria-hidden="true"></div>
      <div class="footer-inner">
        <span class="mono footer-copy">
          &copy; {{ year }} {{ data.personal.name }}
        </span>
      </div>
    </footer>
  `,
  styles: [`
    .footer { position: relative; }

    .footer-rule {
      height: 1px;
      background: var(--border);
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1060px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
    }

    .footer-copy, .footer-built {
      opacity: .25;
      font-size: .62rem;
    }

    @media (max-width: 580px) {
      .footer-inner { flex-direction: column; gap: .4rem; }
    }
  `],
})
export class FooterComponent {
  readonly data = PORTFOLIO_DATA;
  readonly year = new Date().getFullYear();
}
