import { Component, computed, input } from '@angular/core';

type CalloutType = 'info' | 'tip' | 'warning' | 'note';

const STYLES: Record<CalloutType, { box: string; badge: string; label: string }> = {
  info: {
    box: 'border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40',
    badge: 'bg-sky-600',
    label: 'Info',
  },
  tip: {
    box: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40',
    badge: 'bg-emerald-600',
    label: 'Astuce',
  },
  warning: {
    box: 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40',
    badge: 'bg-amber-500',
    label: 'Attention',
  },
  note: {
    box: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40',
    badge: 'bg-red-600',
    label: 'À retenir',
  },
};

@Component({
  selector: 'app-callout',
  template: `
    <div class="my-6 rounded-xl border p-4 sm:p-5 {{ style().box }}">
      <div class="mb-2 flex items-center gap-2">
        <span
          class="rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase {{
            style().badge
          }}"
        >
          {{ style().label }}
        </span>
        @if (title()) {
          <span class="font-semibold text-slate-900 dark:text-white">{{ title() }}</span>
        }
      </div>
      <div class="text-sm leading-6 [&_p]:my-2"><ng-content /></div>
    </div>
  `,
})
export class Callout {
  readonly type = input<CalloutType>('info');
  readonly title = input<string>('');

  protected readonly style = computed(() => STYLES[this.type()]);
}
