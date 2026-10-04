import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-install-mobile-page',
  imports: [DocPage, CodeBlock, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Mise en route"
      title="Installation mobile (local)"
      lead="Cette page explique comment ouvrir, compiler et lancer l'application Android Valais Connect avec Android Studio."
      [toc]="toc"
    >
      <h2 id="prerequis">Prérequis</h2>
      <ul>
        <li>
          <strong>Android Studio</strong> récent, compatible avec Android Gradle Plugin 9.4 et le
          SDK 37.
        </li>
        <li><strong>Android SDK 37</strong> installé via le SDK Manager d'Android Studio.</li>
        <li>
          <strong>JDK 25</strong> : téléchargé automatiquement par Gradle (toolchain foojay) si
          absent.
        </li>
        <li>
          Un <strong>émulateur</strong> (Android 8.0 / API 26 minimum) ou un téléphone Android en
          mode développeur.
        </li>
      </ul>
      <app-callout type="tip" title="Aucune clé à configurer">
        L'application mobile ne nécessite ni clé d'API ni fichier secret. Le fichier
        <code>local.properties</code> ne contient que le chemin du SDK, créé automatiquement par
        Android Studio.
      </app-callout>

      <h2 id="ouvrir">1. Ouvrir le projet</h2>
      <ol>
        <li>Lancez Android Studio, puis <strong>File → Open</strong>.</li>
        <li>Sélectionnez le dossier <code>ValaisConnectMobile</code>.</li>
        <li>
          Attendez la fin de la <strong>synchronisation Gradle</strong> (le premier lancement
          télécharge les dépendances).
        </li>
      </ol>

      <h2 id="lancer">2. Lancer l'application</h2>
      <ol>
        <li>Choisissez un émulateur ou un appareil dans la barre d'outils.</li>
        <li>Cliquez sur <strong>Run ▶</strong> (configuration <code>app</code>).</li>
      </ol>
      <p>En ligne de commande :</p>
      <app-code-block [code]="cliCommands" />

      <h2 id="serveur">3. Choisir le serveur d'API</h2>
      <p>
        Les adresses du backend sont définies dans <code>app/build.gradle.kts</code> et exposées via
        <code>BuildConfig.API_BASE_URLS</code>. Par défaut, le build de debug essaie
        <strong>d'abord la production Azure</strong>, puis votre
        <strong>serveur Laravel local</strong> :
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Ordre</th>
              <th>Serveur</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Production (Azure)</td>
              <td class="font-mono text-xs break-all">
                https://valaisconnect-awfbdgg9ccexdpec.westus3-01.azurewebsites.net/
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Local (émulateur)</td>
              <td class="font-mono text-xs">http://10.0.2.2:8000/</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>10.0.2.2</code> est l'adresse de votre ordinateur vue depuis l'émulateur Android. Pour
        utiliser <strong>uniquement</strong> votre backend local (lancé avec
        <code>composer dev</code>, voir <a routerLink="/installation-web">Installation web</a>) :
      </p>
      <app-code-block [code]="localCommand" />
      <app-callout type="info" title="HTTP en clair">
        Le trafic HTTP non chiffré n'est autorisé que vers <code>10.0.2.2</code>,
        <code>localhost</code> et <code>127.0.0.1</code>
        (<code>res/xml/network_security_config.xml</code>). Sur un téléphone physique, utilisez
        l'adresse IP de votre ordinateur sur le réseau local et ajoutez-la à ce fichier.
      </app-callout>

      <h2 id="tests">4. Lancer les tests</h2>
      <p>
        Les tests unitaires vérifient le contrat d'API (fixtures JSON) et la bascule entre serveurs
        à l'aide d'un serveur HTTP simulé (MockWebServer) :
      </p>
      <app-code-block code="./gradlew testDebugUnitTest" />

      <h2 id="apk">5. Générer un APK</h2>
      <app-code-block [code]="apkCommand" />
      <p>
        L'APK est produit dans <code>app/build/outputs/apk/debug/</code>. Il peut être installé
        directement sur un téléphone Android.
      </p>
    </app-doc-page>
  `,
})
export class InstallMobilePage {
  protected readonly toc: TocItem[] = [
    { id: 'prerequis', label: 'Prérequis' },
    { id: 'ouvrir', label: 'Ouvrir le projet' },
    { id: 'lancer', label: 'Lancer' },
    { id: 'serveur', label: 'Serveur d’API' },
    { id: 'tests', label: 'Tests' },
    { id: 'apk', label: 'Générer un APK' },
  ];

  protected readonly cliCommands = `# Compiler et installer sur l'appareil connecté
./gradlew installDebug

# Vérifier les appareils détectés
adb devices`;

  protected readonly localCommand = `./gradlew installDebug -PapiBaseUrls=http://10.0.2.2:8000/`;

  protected readonly apkCommand = `./gradlew assembleDebug`;
}
