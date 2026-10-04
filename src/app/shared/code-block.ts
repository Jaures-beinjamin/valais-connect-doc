import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  template: `
    <div
      class="group my-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm"
    >
      <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span class="font-mono text-xs text-slate-400">{{ title() || language() }}</span>
        <button
          type="button"
          (click)="copy()"
          class="rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          {{ copied() ? 'Copié ✓' : 'Copier' }}
        </button>
      </div>
      <pre
        class="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-slate-100"
      ><code>{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input<string>('bash');
  readonly title = input<string>('');

  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      this.copied.set(false);
    }
  }
}
