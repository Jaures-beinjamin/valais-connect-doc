import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-architecture-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Architecture globale"
      lead="Valais Connect repose sur une architecture client-serveur : un backend Laravel unique, source de vérité, et deux clients qui consomment la même API."
      [toc]="toc"
    >
      <h2 id="schema">Schéma d'ensemble</h2>

      <!-- Diagramme -->
      <div
        class="not-doc my-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="rounded-xl border-2 border-sky-300 bg-white p-4 dark:border-sky-800 dark:bg-slate-900"
          >
            <p class="text-xs font-bold tracking-wider text-sky-600 uppercase">Client web</p>
            <p class="mt-1 font-semibold text-slate-900 dark:text-white">Application Vue.js 3</p>
            <p class="mt-1 text-xs text-slate-500">Navigateur · session + cookie CSRF</p>
            <p class="mt-2 font-mono text-xs text-sky-700 dark:text-sky-300">→ /api</p>
          </div>
          <div
            class="rounded-xl border-2 border-emerald-300 bg-white p-4 dark:border-emerald-800 dark:bg-slate-900"
          >
            <p class="text-xs font-bold tracking-wider text-emerald-600 uppercase">Client mobile</p>
            <p class="mt-1 font-semibold text-slate-900 dark:text-white">
              Android · Kotlin / Compose
            </p>
            <p class="mt-1 text-xs text-slate-500">Jeton Bearer Sanctum · sans état</p>
            <p class="mt-2 font-mono text-xs text-emerald-700 dark:text-emerald-300">→ /api/v1</p>
          </div>
        </div>

        <div class="flex justify-center py-3 text-2xl text-slate-400">⇅</div>

        <div
          class="rounded-xl border-2 border-red-300 bg-white p-4 sm:p-5 dark:border-red-900 dark:bg-slate-900"
        >
          <p class="text-xs font-bold tracking-wider text-red-600 uppercase">
            Serveur · Azure App Service
          </p>
          <p class="mt-1 font-semibold text-slate-900 dark:text-white">
            Backend Laravel 13 (API REST)
          </p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg bg-red-50 p-3 dark:bg-red-950/40">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                Module Club des Affaires
              </p>
              <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Réseau, matching, mises en relation, opportunités · focus du hackathon
              </p>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                Module Club des Amis
              </p>
              <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Événements, inscriptions, profil, QR code
              </p>
            </div>
          </div>
          <p class="mt-3 text-xs text-slate-500">
            Noyau commun : authentification · membres · notifications · administration
          </p>
        </div>

        <div class="flex justify-center py-3 text-2xl text-slate-400">⇅</div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
          >
            <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Données</p>
            <p class="mt-1 font-semibold text-slate-900 dark:text-white">
              Azure Database for MySQL
            </p>
          </div>
          <div
            class="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
          >
            <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Service externe</p>
            <p class="mt-1 font-semibold text-slate-900 dark:text-white">
              Mapbox (géocodage & cartes)
            </p>
          </div>
        </div>
      </div>

      <h2 id="client-serveur">Le modèle client-serveur</h2>
      <p>
        Toute la logique métier vit sur le serveur. Les clients se contentent d'afficher les données
        et de transmettre les actions de l'utilisateur. Ce choix garantit que les
        <strong>règles</strong> (places disponibles, droits d'accès, score de matching) sont
        <strong>identiques sur le web et sur le mobile</strong>.
      </p>
      <p>
        Chaque point d'API est déclaré <strong>une seule fois</strong>, puis monté sur deux piles :
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Préfixe</th>
              <th>Client</th>
              <th>Authentification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/api</code></td>
              <td>Application web Vue.js</td>
              <td>Session Laravel + cookie, protection CSRF</td>
            </tr>
            <tr>
              <td><code>/api/v1</code></td>
              <td>Application mobile, intégrations</td>
              <td>Jeton Bearer Laravel Sanctum, sans état</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="modules">Deux modules : Club des Amis et Club des Affaires</h2>
      <p>
        Dès l'architecture papier, le backend a été pensé en
        <strong>deux modules indépendants</strong>. Pendant le hackathon, je me suis concentré sur
        le <strong>Club des Affaires</strong>, qui était le cœur du sujet ; le Club des Amis
        s'appuie sur le même socle.
      </p>
      <p>
        Concrètement, la séparation est assurée par le <strong>niveau d'adhésion</strong> du membre
        :
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Club des Amis</th>
              <th>Club des Affaires</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cotisation</td>
              <td>CHF 150</td>
              <td>CHF 500</td>
            </tr>
            <tr>
              <td>Événements et inscriptions</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Profil et QR code</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Réseau, matching, mises en relation</td>
              <td>—</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Événements réservés « Affaires »</td>
              <td>—</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Cartes entreprise supplémentaires</td>
              <td>—</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Cette règle est appliquée à trois endroits du backend :</p>
      <ul>
        <li>
          un <strong>middleware</strong> <code>network</code> qui protège les routes du réseau
          d'affaires ;
        </li>
        <li>le <strong>périmètre du matching</strong>, limité aux membres Affaires actifs ;</li>
        <li>les <strong>événements</strong>, qui peuvent exiger un niveau minimum d'adhésion.</li>
      </ul>

      <h2 id="principes">Principes d'architecture</h2>
      <ul>
        <li>
          <strong>Contrôleurs fins</strong> : la validation est dans des Form Requests, la mise en
          forme dans des API Resources.
        </li>
        <li>
          <strong>Domaine isolé</strong> : les règles métier (matching, adhésion, QR codes, mises en
          relation) sont dans <code>app/Domain</code>, en PHP pur et testable.
        </li>
        <li>
          <strong>Composants réutilisables</strong> côté web (Vue) comme côté mobile (composables
          Compose).
        </li>
        <li>
          <strong>Bilinguisme natif</strong> : français et allemand partout (API, web, mobile,
          e-mails).
        </li>
      </ul>

      <app-callout type="tip" title="Pour aller plus loin">
        Chaque brique a sa page détaillée :
        <a routerLink="/backend">Backend Laravel</a>,
        <a routerLink="/frontend">Application web Vue.js</a> et
        <a routerLink="/mobile">Application mobile Kotlin</a>. L'évolution vers les microservices
        est décrite dans <a routerLink="/architecture-future">Architecture future</a>.
      </app-callout>
    </app-doc-page>
  `,
})
export class ArchitecturePage {
  protected readonly toc: TocItem[] = [
    { id: 'schema', label: 'Schéma d’ensemble' },
    { id: 'client-serveur', label: 'Modèle client-serveur' },
    { id: 'modules', label: 'Deux modules' },
    { id: 'principes', label: 'Principes' },
  ];
}
