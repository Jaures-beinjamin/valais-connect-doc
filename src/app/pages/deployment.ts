import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

@Component({
  selector: 'app-deployment-page',
  imports: [DocPage, CodeBlock, Callout],
  template: `
    <app-doc-page
      eyebrow="Mise en route"
      title="Déploiement Azure"
      lead="Valais Connect est hébergé sur Microsoft Azure. Cette page décrit l'infrastructure, la procédure de déploiement retenue et les difficultés rencontrées."
      [toc]="toc"
    >
      <h2 id="pourquoi">Pourquoi Azure ?</h2>
      <p>
        J'ai une <strong>solide expérience d'Azure</strong>, notamment d'App Service pour les
        applications web et des services associés. Pendant un hackathon, maîtriser son provider
        évite de perdre des heures sur la configuration : c'était le choix le plus sûr pour livrer à
        temps.
      </p>

      <h2 id="infrastructure">Infrastructure</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Ressource</th>
              <th>Service Azure</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            @for (resource of resources; track resource[0]) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ resource[0] }}</td>
                <td>{{ resource[1] }}</td>
                <td>{{ resource[2] }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="difficultes">La difficulté : la CI/CD</h2>
      <p>
        Le déploiement a été la partie la plus délicate du projet (environ
        <strong>4 heures</strong>, migration comprise). Un workflow GitHub Actions complet a été
        préparé (<code>.github/workflows/master_valaisconnect.yml</code>) : tests, build, puis
        déploiement vers App Service. Mais j'ai rencontré des
        <strong>difficultés liées à mon compte GitHub</strong> pour faire fonctionner la chaîne
        CI/CD de bout en bout.
      </p>
      <app-callout type="note" title="Décision pragmatique">
        Plutôt que de bloquer la livraison sur la CI/CD, j'ai opté pour un
        <strong>déploiement manuel par SSH</strong>. Le workflow reste dans le dépôt, prêt à être
        réactivé après le hackathon.
      </app-callout>

      <h2 id="procedure">Procédure de déploiement par SSH</h2>
      <h3>1. Préparer le paquet de production en local</h3>
      <app-code-block [code]="buildCommands" />

      <h3>2. Envoyer le paquet sur App Service</h3>
      <app-code-block [code]="uploadCommands" />

      <h3>3. Se connecter en SSH et finaliser</h3>
      <app-code-block [code]="sshCommands" />

      <h3>4. Vérifier</h3>
      <app-code-block [code]="checkCommand" />

      <h2 id="startup">Le script de démarrage</h2>
      <p>
        App Service exécute <code>.github/azure/startup.sh</code> à chaque démarrage du conteneur.
        Il rend l'application autonome après chaque déploiement :
      </p>
      <ol>
        <li>
          installe la configuration <strong>Nginx</strong> (racine sur <code>public/</code>) et les
          réglages <strong>PHP</strong> ;
        </li>
        <li>
          déplace <code>storage/</code> vers un
          <strong>stockage persistant</strong> (<code>/home/data</code>) pour que les fichiers
          envoyés survivent aux déploiements ;
        </li>
        <li>
          exécute <code>storage:link</code>, les <strong>migrations</strong> et
          <code>optimize</code> ;
        </li>
        <li>lance le <strong>planificateur</strong> (résumé hebdomadaire, relances) ;</li>
        <li>recharge Nginx.</li>
      </ol>

      <h2 id="configuration">Variables d'application</h2>
      <p>
        Les secrets ne sont jamais versionnés : ils sont saisis dans
        <strong>App Service → Configuration → Paramètres d'application</strong>. Le modèle est
        fourni dans <code>.github/azure/app-settings.example.env</code>.
      </p>
      <app-code-block language="ini" title="Paramètres principaux" [code]="settings" />
      <app-callout type="info" title="HTTPS derrière un proxy">
        Azure termine le HTTPS en amont de l'application. Laravel est configuré pour faire confiance
        au proxy (<code>trustProxies</code>), afin de générer des URL et des cookies sécurisés
        corrects.
      </app-callout>

      <h2 id="migration">Migration de la base de données</h2>
      <ul>
        <li>
          Base <strong>Azure Database for MySQL</strong> avec connexion chiffrée (certificat SSL).
        </li>
        <li>Les migrations sont exécutées automatiquement au démarrage par le script.</li>
        <li>
          Les données de démonstration ont été chargées une fois avec
          <code>php artisan db:seed --force</code>.
        </li>
      </ul>

      <h2 id="cicd">Réactiver la CI/CD</h2>
      <p>
        Le workflow GitHub Actions déjà présent enchaîne trois jobs à chaque push sur
        <code>master</code> :
      </p>
      <ol>
        <li>
          <strong>test</strong> : PHP 8.4, Node 24, build du front puis
          <code>php artisan test</code> ;
        </li>
        <li>
          <strong>build</strong> : dépendances de production et archive <code>release.zip</code> ;
        </li>
        <li>
          <strong>deploy</strong> : connexion Azure (OIDC) puis déploiement sur App Service et
          contrôle de <code>/up</code>.
        </li>
      </ol>
      <p>
        Pour le réactiver, il suffit de configurer les secrets OIDC Azure dans le dépôt GitHub
        (identifiants client, tenant et abonnement).
      </p>
    </app-doc-page>
  `,
})
export class DeploymentPage {
  protected readonly toc: TocItem[] = [
    { id: 'pourquoi', label: 'Pourquoi Azure' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'difficultes', label: 'Difficultés CI/CD' },
    { id: 'procedure', label: 'Déploiement SSH' },
    { id: 'startup', label: 'Script de démarrage' },
    { id: 'configuration', label: 'Variables' },
    { id: 'migration', label: 'Base de données' },
    { id: 'cicd', label: 'Réactiver la CI/CD' },
  ];

  protected readonly resources: [string, string, string][] = [
    [
      'Application',
      'App Service (Linux, PHP 8.4, Nginx)',
      'Laravel + front Vue.js compilé + API mobile',
    ],
    ['Base de données', 'Azure Database for MySQL', 'Données des membres, événements, matching'],
    ['Stockage', 'Stockage persistant App Service (/home)', 'Photos, logos, pièces jointes, logs'],
    [
      'Planificateur',
      'schedule:work dans le conteneur',
      'Résumé hebdomadaire, relances quotidiennes',
    ],
  ];

  protected readonly buildCommands = `composer install --no-dev --optimize-autoloader
npm ci && npm run build

# Archive sans les fichiers inutiles en production
zip -r deploy.zip . -x ".git/*" "node_modules/*" "tests/*" ".env*"`;

  protected readonly uploadCommands = `az login
az webapp deploy \\
  --resource-group <groupe-de-ressources> \\
  --name valaisconnect \\
  --src-path deploy.zip --type zip`;

  protected readonly sshCommands = `az webapp ssh --resource-group <groupe-de-ressources> --name valaisconnect

# Dans le conteneur
cd /home/site/wwwroot
php artisan migrate --force
php artisan optimize`;

  protected readonly checkCommand = `curl -I https://valaisconnect-awfbdgg9ccexdpec.westus3-01.azurewebsites.net/up`;

  protected readonly settings = `APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:…
APP_URL=https://…azurewebsites.net

DB_CONNECTION=mysql
DB_HOST=…mysql.database.azure.com
DB_DATABASE=…
DB_USERNAME=…
DB_PASSWORD=…
MYSQL_ATTR_SSL_CA=…

MAPBOX_PUBLIC_TOKEN=…
MAPBOX_SERVER_TOKEN=…
RUN_SCHEDULER=true`;
}
