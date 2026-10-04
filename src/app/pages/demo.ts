import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';
import { API_BASE_URL, MOBILE_APK_URL, WEB_APP_URL } from '../project-links';

@Component({
  selector: 'app-demo-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Démarrer"
      title="Démo en ligne"
      lead="Valais Connect est déjà déployé sur Microsoft Azure. Vous pouvez tester l'application web et l'application Android sans rien installer."
      [toc]="toc"
    >
      <div class="not-doc grid gap-4 sm:grid-cols-2">
        <a
          [href]="webAppUrl"
          target="_blank"
          rel="noopener"
          class="group rounded-2xl border border-slate-200 p-6 transition hover:border-red-300 hover:shadow-md dark:border-slate-800 dark:hover:border-red-800"
        >
          <p class="text-3xl">🌐</p>
          <p class="mt-3 font-semibold text-slate-900 group-hover:text-red-600 dark:text-white">
            Application web ↗
          </p>
          <p class="mt-1 text-sm break-all text-slate-500">{{ webAppUrl }}</p>
        </a>
        <a
          [href]="mobileApkUrl"
          class="group rounded-2xl border border-slate-200 p-6 transition hover:border-red-300 hover:shadow-md dark:border-slate-800 dark:hover:border-red-800"
        >
          <p class="text-3xl">📱</p>
          <p class="mt-3 font-semibold text-slate-900 group-hover:text-red-600 dark:text-white">
            Application Android (APK)
          </p>
          <p class="mt-1 text-sm text-slate-500">Android 8.0 (API 26) minimum · ~24 Mo</p>
        </a>
      </div>

      <h2 id="web">Tester l'application web</h2>
      <ol>
        <li>Ouvrez l'<a [href]="webAppUrl" target="_blank" rel="noopener">application web</a>.</li>
        <li>Cliquez sur <strong>Se connecter</strong>.</li>
        <li>
          Utilisez l'un des comptes de démonstration listés tout en bas de la page
          <a routerLink="/vision" fragment="comptes">Vision long terme</a>.
        </li>
        <li>
          Parcourez les événements, inscrivez-vous, consultez vos suggestions de profils et affichez
          votre QR code.
        </li>
      </ol>

      <h2 id="mobile">Installer l'application Android</h2>
      <ol>
        <li>Téléchargez l'APK depuis votre téléphone Android.</li>
        <li>
          Autorisez l'installation depuis des sources inconnues si Android vous le demande
          (Paramètres → Sécurité).
        </li>
        <li>Ouvrez <strong>Valais Connect</strong> et connectez-vous avec un compte de démo.</li>
        <li>Autorisez l'accès à la caméra pour scanner le QR code d'un autre membre.</li>
      </ol>
      <app-callout type="info" title="Build de démonstration">
        L'APK fourni est un build de démonstration (debug), non publié sur le Play Store. Il se
        connecte automatiquement à l'API de production hébergée sur Azure.
      </app-callout>

      <h2 id="scenario">Scénario de démonstration conseillé</h2>
      <ol>
        <li>Connectez-vous avec un membre du <strong>Club des Affaires</strong> sur le web.</li>
        <li>
          Ouvrez les <strong>suggestions</strong> : chaque profil affiche un score et les raisons du
          match.
        </li>
        <li>Inscrivez-vous à un <strong>événement</strong> et observez les places restantes.</li>
        <li>Sur le mobile, connectez-vous avec un <strong>autre</strong> compte.</li>
        <li>
          Affichez le QR code sur le web et <strong>scannez-le</strong> depuis le mobile : le profil
          s'ouvre en un clic.
        </li>
      </ol>

      <h2 id="api">API publique</h2>
      <p>
        L'API consommée par l'application mobile est accessible à l'adresse
        <code class="break-all">{{ apiBaseUrl }}</code
        >. Un point de contrôle de santé est exposé sur <code>/up</code>.
      </p>
    </app-doc-page>
  `,
})
export class DemoPage {
  protected readonly webAppUrl = WEB_APP_URL;
  protected readonly mobileApkUrl = MOBILE_APK_URL;
  protected readonly apiBaseUrl = API_BASE_URL;

  protected readonly toc: TocItem[] = [
    { id: 'web', label: 'Application web' },
    { id: 'mobile', label: 'Application Android' },
    { id: 'scenario', label: 'Scénario conseillé' },
    { id: 'api', label: 'API publique' },
  ];
}
