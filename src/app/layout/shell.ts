import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { FLAT_NAVIGATION, NAVIGATION } from '../navigation';

/**
 * Coquille de l'application : barre supérieure, menu latéral (tiroir sur mobile),
 * zone de contenu et pagination « Précédent / Suivant ».
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
})
export class Shell {
  private readonly router = inject(Router);

  protected readonly navigation = NAVIGATION;
  protected readonly menuOpen = signal(false);

  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  private readonly currentIndex = computed(() =>
    FLAT_NAVIGATION.findIndex((link) => link.path === this.currentPath()),
  );

  protected readonly previous = computed(() => {
    const index = this.currentIndex();
    return index > 0 ? FLAT_NAVIGATION[index - 1] : null;
  });

  protected readonly next = computed(() => {
    const index = this.currentIndex();
    return index >= 0 && index < FLAT_NAVIGATION.length - 1 ? FLAT_NAVIGATION[index + 1] : null;
  });

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
