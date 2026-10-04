import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-frontend-page',
  imports: [DocPage, CodeBlock, Callout],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Application web Vue.js"
      lead="Le front web est une application Vue 3 embarquée dans l'application Laravel. Son architecture repose sur des composants réutilisables pendant toute la durée de vie de l'application."
      [toc]="toc"
    >
      <h2 id="integration">Intégration dans Laravel</h2>
      <p>
        Laravel sert une page unique (<code>resources/views/app.blade.php</code>) via un contrôleur
        « catch-all ». Vue prend ensuite le relais dans le navigateur et dialogue avec le backend
        par l'API JSON <code>/api</code>. Le front et le back sont donc
        <strong>livrés ensemble</strong>, dans un même déploiement, et communiquent déjà entre eux
        sans configuration supplémentaire.
      </p>

      <h2 id="structure">Organisation du code</h2>
      <app-code-block language="text" title="resources/js/" [code]="structure" />

      <h2 id="composants">Une architecture par composants</h2>
      <p>
        Chaque élément d'interface est un <strong>composant Vue</strong> autonome, réutilisé partout
        où il est nécessaire :
      </p>
      <ul>
        <li>
          <strong>Composants de site</strong> : en-tête, pied de page, bandeau de page, bascule de
          thème.
        </li>
        <li>
          <strong>Composants métier</strong> : logo d'entreprise, sélecteur d'entreprise, partage de
          pass.
        </li>
        <li>
          <strong>Composants d'administration</strong> : cartes KPI, graphiques, pagination,
          notifications toast, boîtes de confirmation.
        </li>
        <li>
          <strong>Composants cartographiques</strong> : carte des entreprises et autocomplétion
          d'adresses Mapbox.
        </li>
      </ul>
      <p>
        La logique partagée (utilisateur courant, profil, suggestions, thème) est extraite dans des
        <strong>composables</strong>, et chaque domaine de l'API possède son propre module client
        (<code>api/</code>) basé sur un client commun.
      </p>

      <h2 id="pages">Pages principales</h2>
      <div class="not-doc my-6 flex flex-wrap gap-2">
        @for (page of pages; track page) {
          <span
            class="rounded-full border border-slate-200 px-3 py-1 text-sm dark:border-slate-700"
            >{{ page }}</span
          >
        }
      </div>
      <p>
        Un espace d'administration complet (12 pages) permet au secrétariat de gérer les membres,
        les événements, les check-in et les statistiques d'impact.
      </p>

      <h2 id="qr">QR code et scan dans le navigateur</h2>
      <ul>
        <li>
          Le QR code du membre est généré dans le navigateur avec la librairie <code>qrcode</code>.
        </li>
        <li>
          Le scan utilise la caméra arrière et l'API native <code>BarcodeDetector</code> du
          navigateur.
        </li>
      </ul>

      <h2 id="i18n">Bilinguisme FR / DE</h2>
      <p>
        Toute l'interface est disponible en <strong>français</strong> et en
        <strong>allemand</strong>, pour couvrir le Valais romand et le Haut-Valais
        (<code>i18n/fr.js</code>, <code>i18n/de.js</code>).
      </p>

      <app-callout type="tip" title="Mobile d'abord">
        L'interface web est pensée pour être utilisable sur smartphone, debout dans les allées d'un
        salon ou d'un événement.
      </app-callout>
    </app-doc-page>
  `,
})
export class FrontendPage {
  protected readonly toc: TocItem[] = [
    { id: 'integration', label: 'Intégration Laravel' },
    { id: 'structure', label: 'Organisation du code' },
    { id: 'composants', label: 'Architecture par composants' },
    { id: 'pages', label: 'Pages principales' },
    { id: 'qr', label: 'QR code' },
    { id: 'i18n', label: 'Bilinguisme' },
  ];

  protected readonly structure = `resources/js/
├── app.js            # Point d'entrée, monte App.vue
├── App.vue           # Coquille de l'application et routage des pages
├── router/           # Routeur de l'application
├── api/              # Un module par domaine (events, members, qr…) + client.js
├── composables/      # useCurrentUser, useProfile, useSuggestions, useTheme…
├── components/
│   ├── site/         # SiteHeader, SiteFooter, PageHero, ThemeToggle
│   ├── admin/        # KpiCard, BarChart, Pagination, Toast, ConfirmDialog…
│   ├── community/
│   └── maps/         # CompanyMap, AddressAutocomplete (Mapbox)
├── pages/            # 24 pages + pages/admin/
├── qr/               # render.js, scan.js
├── i18n/             # fr.js, de.js
└── mapbox.js         # Chargement de Mapbox GL JS`;

  protected readonly pages = [
    'Accueil',
    'Inscription',
    'Connexion',
    'Profil',
    'Événements',
    'Suggestions',
    'Membres',
    'Entreprises (carte)',
    'Messages',
    'Communauté',
    'Adhésion',
    'Mon QR code',
    'Scanner',
  ];
}
