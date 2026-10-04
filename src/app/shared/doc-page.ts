import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Gabarit commun d'une page de documentation : en-tête, contenu projeté
 * et sommaire « Sur cette page » collant sur grand écran.
 */
@Component({
  selector: 'app-doc-page',
  imports: [RouterLink],
  template: `
    <div class="flex gap-12">
      <article class="doc min-w-0 flex-1">
        <header class="mb-10">
          <p
            class="mb-2 text-sm font-semibold tracking-wide text-red-600 uppercase dark:text-red-400"
          >
            {{ eyebrow() }}
          </p>
          <h1
            class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {{ title() }}
          </h1>
          @if (lead()) {
            <p class="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">{{ lead() }}</p>
          }
        </header>
        <ng-content />
      </article>

      @if (toc().length) {
        <aside class="hidden w-56 shrink-0 xl:block">
          <nav class="sticky top-24">
            <p
              class="mb-3 text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-white"
            >
              Sur cette page
            </p>
            <ul class="space-y-2 border-l border-slate-200 text-sm dark:border-slate-800">
              @for (item of toc(); track item.id) {
                <li>
                  <a
                    [routerLink]="[]"
                    [fragment]="item.id"
                    class="-ml-px block border-l border-transparent pl-4 text-slate-500 transition hover:border-red-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>
        </aside>
      }
    </div>
  `,
})
export class DocPage {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>('');
  readonly toc = input<TocItem[]>([]);
}
