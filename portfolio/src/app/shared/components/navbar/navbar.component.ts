import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { label: string; route: string; }

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar" role="banner">
      <nav class="nav-inner" aria-label="Navegación principal">

        <a routerLink="/" class="nav-brand" aria-label="Ir al inicio">
          <span class="brand-mark" aria-hidden="true">BC</span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()" role="list">
          @for (item of items; track item.route) {
            <li role="listitem">
              <a [routerLink]="item.route"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                 class="nav-link"
                 (click)="close()">
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <button class="menu-toggle"
                [attr.aria-expanded]="menuOpen()"
                [attr.aria-label]="menuOpen() ? 'Cerrar menú' : 'Abrir menú'"
                (click)="toggle()">
          <span class="bar" [class.open]="menuOpen()"></span>
          <span class="bar mid" [class.open]="menuOpen()"></span>
          <span class="bar" [class.open]="menuOpen()"></span>
        </button>

      </nav>
      <div class="nav-rule" aria-hidden="true"></div>
    </header>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1060px;
      margin: 0 auto;
      padding: 0 2rem;
      height: 60px;
      background: rgba(16, 22, 13, 0.52);
      backdrop-filter: blur(32px) saturate(200%) brightness(1.04);
      -webkit-backdrop-filter: blur(32px) saturate(200%) brightness(1.04);
    }

    .nav-rule {
      height: 1px;
      background: var(--border);
    }

    /* brand */
    .nav-brand {
      text-decoration: none;
      display: flex;
      align-items: center;
      min-height: 44px;
    }

    .brand-mark {
      font-size: .75rem;        /* was .68rem — below 11px minimum */
      font-weight: 500;
      letter-spacing: .22em;
      color: var(--accent-1);
    }

    /* links */
    .nav-links {
      display: flex;
      list-style: none;
      gap: 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      min-height: 44px;              /* touch target */
      padding: 0 .85rem;
      font-size: .72rem;             /* was .65rem — below 11px minimum */
      font-weight: 500;
      letter-spacing: .18em;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--accent-1);
      position: relative;
      transition: color 600ms var(--ease);
    }

    /* Active indicator — small bottom line */
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 12px;
      left: .85rem;
      right: .85rem;
      height: 1px;
      background: var(--accent-2);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 600ms var(--ease);
    }

    .nav-link:hover { color: var(--accent-2); }

    .nav-link.active {
      color: var(--accent-light);
    }

    .nav-link.active::after {
      transform: scaleX(1);
    }

    /* hamburger button — min 44×44px */
    .menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      padding: .5rem;
    }

    .bar {
      display: block;
      width: 18px;
      height: 1px;
      background: var(--accent-1);
      transition: transform 300ms var(--ease), opacity 300ms;
    }

    .bar.open:first-child  { transform: translateY(6px) rotate(45deg); }
    .bar.mid.open          { opacity: 0; }
    .bar.open:last-child   { transform: translateY(-6px) rotate(-45deg); }

    /* mobile */
    @media (max-width: 680px) {
      .menu-toggle { display: flex; }

      .nav-links {
        display: none;
        position: fixed;
        top: 61px;
        left: 0;
        right: 0;
        flex-direction: column;
        gap: 0;
        background: rgba(16, 22, 13, 0.97);
        backdrop-filter: blur(24px);
        border-bottom: 1px solid var(--border);
        padding: .5rem 0;
      }

      .nav-links.open { display: flex; }

      .nav-link {
        padding: 0 1.25rem;
        border-bottom: 1px solid var(--border-light);
      }

      .nav-link::after { display: none; }

      .nav-link.active { color: var(--accent-light); background: rgba(102,135,99,.06); }
    }

    @media (max-width: 480px) {
      .nav-inner { padding: 0 1rem; }
    }
  `],
})
export class NavbarComponent {
  readonly menuOpen = signal(false);

  readonly items: NavItem[] = [
    { label: 'Inicio',      route: '/'           },
    { label: 'Sobre mí',    route: '/about'       },
    { label: 'Experiencia', route: '/experience'  },
    { label: 'Habilidades', route: '/skills'      },
    { label: 'Educación',   route: '/education'   },
    { label: 'Contacto',    route: '/contact'     },
  ];

  toggle() { this.menuOpen.update(v => !v); }
  close()  { this.menuOpen.set(false); }
}
