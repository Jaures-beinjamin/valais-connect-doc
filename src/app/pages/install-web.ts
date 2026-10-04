import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-install-web-page',
  imports: [DocPage, CodeBlock, Callout],
  template: `
    <app-doc-page
      eyebrow="Mise en route"
      title="Installation web (local)"
      lead="Cette page explique comment lancer le backend Laravel et l'application web Vue.js sur votre machine."
      [toc]="toc"
    >
      <app-callout type="tip" title="Pas obligatoire">
        L'application est déjà déployée avec des comptes de démonstration. L'installation locale
        n'est utile que pour explorer ou modifier le code.
      </app-callout>

      <h2 id="prerequis">Prérequis</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Outil</th>
              <th>Version</th>
              <th>Vérification</th>
            </tr>
          </thead>
          <tbody>
            @for (tool of prerequisites; track tool[0]) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ tool[0] }}</td>
                <td>{{ tool[1] }}</td>
                <td>
                  <code>{{ tool[2] }}</code>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p>
        Extensions PHP nécessaires : <code>pdo_mysql</code>, <code>mbstring</code>,
        <code>openssl</code>, <code>tokenizer</code>, <code>xml</code>, <code>ctype</code>,
        <code>fileinfo</code>, <code>gd</code>.
      </p>

      <h2 id="cloner">1. Récupérer le code</h2>
      <app-code-block [code]="cloneCommand" />

      <h2 id="base">2. Créer la base de données</h2>
      <app-code-block language="sql" title="MySQL" [code]="databaseCommand" />

      <h2 id="env">3. Configurer l'environnement</h2>
      <app-code-block [code]="envCommand" />
      <p>Renseignez ensuite au minimum ces variables dans <code>.env</code> :</p>
      <app-code-block language="ini" title=".env" [code]="envFile" />
      <app-callout type="info" title="Clés Mapbox (facultatives)">
        Sans clés Mapbox, l'application fonctionne normalement ; seules la carte des entreprises et
        l'autocomplétion d'adresses sont désactivées. Un compte gratuit sur mapbox.com suffit pour
        obtenir les deux jetons.
      </app-callout>

      <h2 id="setup">4. Installer les dépendances</h2>
      <p>Une seule commande installe tout et prépare l'application :</p>
      <app-code-block code="composer setup" />
      <p>Elle enchaîne automatiquement :</p>
      <ol>
        <li><code>composer install</code> — dépendances PHP ;</li>
        <li>
          création du <code>.env</code> s'il n'existe pas et <code>php artisan key:generate</code> ;
        </li>
        <li><code>php artisan migrate --force</code> — création des tables ;</li>
        <li><code>php artisan storage:link</code> — accès public aux fichiers envoyés ;</li>
        <li>
          <code>npm install</code> puis <code>npm run build</code> — compilation du front Vue.js.
        </li>
      </ol>

      <h2 id="seed">5. Charger les données de démonstration</h2>
      <app-code-block [code]="seedCommand" />
      <p>
        Le seeder crée les comptes de démonstration (administration, membres du Club des Amis et du
        Club des Affaires), des entreprises valaisannes géolocalisées, des groupes et des
        événements. La liste des identifiants s'affiche dans le terminal à la fin de la commande.
      </p>

      <h2 id="lancer">6. Lancer l'application</h2>
      <app-code-block code="composer dev" />
      <p>
        Cette commande démarre en parallèle le serveur Laravel, la file d'attente, les logs et Vite
        (rechargement à chaud du front). Ouvrez ensuite
        <a href="http://localhost:8000" target="_blank" rel="noopener">http://localhost:8000</a>.
      </p>

      <h2 id="tests">7. Lancer les tests</h2>
      <app-code-block code="composer test" />
      <p>
        Les tests utilisent une base SQLite en mémoire : aucune configuration MySQL n'est requise.
      </p>

      <h2 id="problemes">Problèmes fréquents</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Symptôme</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            @for (issue of issues; track issue[0]) {
              <tr>
                <td>{{ issue[0] }}</td>
                <td>{{ issue[1] }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-doc-page>
  `,
})
export class InstallWebPage {
  protected readonly toc: TocItem[] = [
    { id: 'prerequis', label: 'Prérequis' },
    { id: 'cloner', label: 'Récupérer le code' },
    { id: 'base', label: 'Base de données' },
    { id: 'env', label: 'Environnement' },
    { id: 'setup', label: 'Dépendances' },
    { id: 'seed', label: 'Données de démo' },
    { id: 'lancer', label: 'Lancer' },
    { id: 'tests', label: 'Tests' },
    { id: 'problemes', label: 'Problèmes fréquents' },
  ];

  protected readonly prerequisites: [string, string, string][] = [
    ['PHP', '8.3 ou supérieur', 'php -v'],
    ['Composer', '2.x', 'composer -V'],
    ['Node.js', '20 ou supérieur (24 conseillé)', 'node -v'],
    ['npm', '10 ou supérieur', 'npm -v'],
    ['MySQL', '8.x (ou MariaDB 10.6+)', 'mysql --version'],
    ['Git', '2.x', 'git --version'],
  ];

  protected readonly cloneCommand = `git clone <url-du-depot> valais-connect
cd valais-connect`;

  protected readonly databaseCommand =
    'CREATE DATABASE valais_connect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

  protected readonly envCommand = 'cp .env.example .env';

  protected readonly envFile = `APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=valais_connect
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe

# Facultatif : carte et géocodage
MAPBOX_PUBLIC_TOKEN=
MAPBOX_SERVER_TOKEN=`;

  protected readonly seedCommand = `php artisan db:seed

# Ou repartir d'une base vide avec les données de démo :
php artisan migrate:fresh --seed`;

  protected readonly issues: [string, string][] = [
    [
      '« Unable to locate file in Vite manifest »',
      'Lancer npm run build, ou composer dev pour le mode développement.',
    ],
    ['SQLSTATE[HY000] [1045] Access denied', 'Vérifier DB_USERNAME et DB_PASSWORD dans .env.'],
    ['Les images téléversées ne s’affichent pas', 'Lancer php artisan storage:link.'],
    [
      'La carte reste vide',
      'Renseigner MAPBOX_PUBLIC_TOKEN puis vider le cache : php artisan config:clear.',
    ],
    [
      'Erreur 419 à la connexion',
      'Vider les cookies et vérifier que APP_URL correspond à l’URL utilisée.',
    ],
  ];
}
