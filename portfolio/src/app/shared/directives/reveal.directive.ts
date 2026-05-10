import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Pass 'stagger' to animate direct children; any other value (or none) animates the host */
  @Input() appReveal: string = '';

  readonly #el = inject(ElementRef<HTMLElement>);
  #observer!: IntersectionObserver;

  ngOnInit(): void {
    const el = this.#el.nativeElement;
    const cls = this.appReveal === 'stagger' ? 'reveal-stagger' : 'reveal';
    el.classList.add(cls);

    this.#observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.#observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    this.#observer.observe(el);
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
  }
}
