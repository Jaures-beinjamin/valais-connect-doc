import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-video-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Démarrer"
      title="Vidéo de présentation — version longue"
      lead="Une vidéo longue qui présente Valais Connect en détail : le contexte du projet, les fonctionnalités web et mobile, et la mise en relation des membres du Club des Amis et du Club des Affaires."
      [toc]="toc"
    >
      <h2 id="video">La vidéo (version longue)</h2>
      <div
        class="not-doc overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg dark:border-slate-800"
      >
        <video
          class="aspect-video w-full"
          src="videos/valais-connect.mp4"
          controls
          preload="metadata"
          playsinline
        >
          Votre navigateur ne prend pas en charge la lecture de vidéos.
          <a href="videos/valais-connect.mp4">Télécharger la vidéo</a>.
        </video>
      </div>
      <p class="text-sm text-slate-500">
        Vous pouvez aussi
        <a href="videos/valais-connect.mp4" target="_blank" rel="noopener">ouvrir la vidéo</a>
        dans un nouvel onglet ou en plein écran.
      </p>

      <h2 id="contenu">Ce que présente la vidéo</h2>
      <ul>
        <li>Le contexte du projet et les besoins des deux clubs.</li>
        <li>L'application web : événements, inscriptions, suggestions de profils et QR code.</li>
        <li>L'application Android et la mise en relation par scan de QR code.</li>
        <li>L'alerte de proximité entre membres pertinents lors d'un événement.</li>
      </ul>

      <app-callout type="tip" title="Envie de tester par vous-même ?">
        Après la vidéo, rendez-vous sur la page <a routerLink="/demo">Démo en ligne</a> pour
        essayer l'application web et l'application Android avec les comptes de démonstration.
      </app-callout>
    </app-doc-page>
  `,
})
export class VideoPage {
  protected readonly toc: TocItem[] = [
    { id: 'video', label: 'La vidéo' },
    { id: 'contenu', label: 'Ce que présente la vidéo' },
  ];
}
