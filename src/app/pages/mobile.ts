import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-mobile-page',
  imports: [DocPage, CodeBlock, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Application mobile Kotlin"
      lead="L'application Android est développée en Kotlin natif avec Jetpack Compose. Son architecture à base de composables est volontairement proche de l'architecture par composants du front web."
      [toc]="toc"
    >
      <h2 id="pourquoi">Pourquoi le natif ?</h2>
      <p>
        À long terme, l'application devra exploiter des fonctionnalités propres à Android :
        <strong>connexion Bluetooth</strong>, détection de proximité, services en arrière-plan,
        notifications système. Le natif donne un accès direct à ces API, là où une solution
        cross-platform aurait demandé des passerelles supplémentaires.
      </p>

      <h2 id="fiche">Fiche technique</h2>
      <div class="overflow-x-auto">
        <table>
          <tbody>
            @for (row of specs; track row[0]) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ row[0] }}
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="architecture">Architecture à base de composables</h2>
      <app-code-block language="text" title="com.dealmood.valaisconnectmobile" [code]="structure" />
      <p>Comme sur le web, l'interface est découpée en briques réutilisables :</p>
      <ul>
        <li>
          <strong>Écrans</strong> (<code>ui/screens</code>) : authentification, événements, réseau,
          profil, communauté, opportunités, messagerie, club, compte.
        </li>
        <li>
          <strong>Composants</strong> (<code>ui/components</code>) : éléments communs, identité
          visuelle, affichage du QR code.
        </li>
        <li>
          <strong>Navigation typée</strong> (<code>ui/navigation</code>) : routes sérialisables et
          barre de navigation flottante adaptée au rôle de l'utilisateur.
        </li>
        <li>
          <strong>Chargement d'état</strong> : un <code>ViewModel</code> générique expose les états
          Chargement / Succès / Échec.
        </li>
      </ul>

      <h2 id="reseau">Couche réseau résiliente</h2>
      <p>
        L'application dialogue avec <code>/api/v1</code> via Retrofit. Le client HTTP intègre une
        <strong>bascule automatique entre serveurs</strong> :
      </p>
      <ol>
        <li>
          Au démarrage, chaque serveur est testé via <code>GET /up</code> ; le premier disponible
          est retenu.
        </li>
        <li>
          Les lectures sont rejouées sur le serveur suivant en cas d'erreur 502/503/504 ou de
          coupure réseau.
        </li>
        <li>Les écritures ne sont rejouées que si la requête n'a jamais atteint le serveur.</li>
        <li>
          Le jeton Bearer et la langue sont ajoutés automatiquement ; un 401 déconnecte
          l'utilisateur.
        </li>
      </ol>

      <h2 id="fonctionnalites">Fonctionnalités</h2>
      <ul>
        <li>Connexion, inscription avec photo, mot de passe oublié.</li>
        <li>
          Événements : liste, détail, inscription, liste d'attente, participants, rendez-vous.
        </li>
        <li>Matching : suggestions, rencontre du mois, score et raisons du match.</li>
        <li>
          <strong>Détection de proximité</strong> pendant un événement : localisation native, liste
          des membres pertinents proches et notification système qui ouvre leur profil.
        </li>
        <li>
          <strong>Notifications système</strong> pour les nouveaux messages, demandes et autres
          activités du réseau.
        </li>
        <li>
          <strong>QR code</strong> : affichage de son propre QR code et
          <strong>scan d'un profil en un clic</strong> avec la caméra.
        </li>
        <li>Réseau : favoris, mises en relation, messagerie.</li>
        <li>Communauté, opportunités, espace club et notifications dans l'application.</li>
        <li>Interface bilingue français / allemand.</li>
      </ul>

      <app-callout type="info" title="Installation">
        Pour lancer le projet dans Android Studio, suivez la page
        <a routerLink="/installation-mobile">Installation mobile</a>.
      </app-callout>
    </app-doc-page>
  `,
})
export class MobilePage {
  protected readonly toc: TocItem[] = [
    { id: 'pourquoi', label: 'Pourquoi le natif' },
    { id: 'fiche', label: 'Fiche technique' },
    { id: 'architecture', label: 'Composables' },
    { id: 'reseau', label: 'Couche réseau' },
    { id: 'fonctionnalites', label: 'Fonctionnalités' },
  ];

  protected readonly specs: [string, string][] = [
    ['Langage', 'Kotlin 2.2'],
    ['Interface', 'Jetpack Compose · Material 3'],
    ['Navigation', 'Navigation Compose (routes typées)'],
    ['Réseau', 'Retrofit 2.11 · OkHttp 4.12 · kotlinx.serialization'],
    ['Images', 'Coil 3'],
    ['QR codes', 'ZXing (génération) · zxing-android-embedded (scan)'],
    ['Android', 'minSdk 26 (Android 8.0) · targetSdk 37'],
    ['Build', 'Gradle 9.6 · Android Gradle Plugin 9.4 · JDK 25'],
    ['Identifiant', 'com.dealmood.valaisconnectmobile'],
    ['Permissions', 'INTERNET, CAMERA, localisation (précise et approximative), notifications'],
  ];

  protected readonly structure = `app/src/main/java/com/dealmood/valaisconnectmobile/
├── ValaisConnectApp.kt     # Application : session, client API, i18n
├── MainActivity.kt         # Activité unique, écran de démarrage
├── data/
│   ├── ApiService.kt       # Interface Retrofit (≈ 90 points d'API)
│   ├── ApiClient.kt        # OkHttp + bascule entre serveurs
│   ├── Session.kt          # Session et jetons
│   ├── Models.kt           # DTO sérialisables
│   └── I18n.kt             # Traductions FR / DE
└── ui/
    ├── navigation/         # Routes, AppRoot, FloatingNavBar
    ├── screens/            # Auth, Events, Network, Profile, Chat…
    ├── components/         # Common, Brand, Loader, QrCode
    └── theme/`;
}
