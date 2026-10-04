import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface Service {
  name: string;
  responsibility: string;
  data: string;
  technology: string;
  events: string;
  highlight?: boolean;
}

interface FlowStep {
  actor: string;
  action: string;
}

interface MigrationStage {
  number: number;
  title: string;
  why: string;
}

@Component({
  selector: 'app-future-architecture-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Perspectives"
      title="Architecture future : microservices"
      lead="Pendant le hackathon, Valais Connect est un monolithe modulaire. Cette page décrit l'architecture cible en microservices, pourquoi elle n'a pas été adoptée tout de suite, et comment y migrer progressivement sans interrompre le service."
      [toc]="toc"
    >
      <h2 id="pourquoi-pas-maintenant">Pourquoi pas tout de suite ?</h2>
      <p>
        Les microservices apportent de la souplesse, mais ils ont un coût : plusieurs déploiements,
        des données réparties, de la communication réseau entre services, de la supervision. En deux
        jours et avec un seul développeur, ce coût aurait consommé le temps destiné aux
        fonctionnalités.
      </p>
      <p>
        J'ai donc choisi un <strong>monolithe modulaire</strong> : une seule application, mais dont
        le code est déjà découpé par domaine (matching, adhésion, événements, QR codes, mises en
        relation). Ces frontières internes sont précisément celles des futurs microservices.
      </p>
      <app-callout type="note" title="Le principe">
        Commencer simple, mais avec des frontières claires. On découpe ensuite quand un vrai besoin
        apparaît, et non par anticipation.
      </app-callout>

      <h2 id="quand">Quand migrer ?</h2>
      <p>La migration se justifiera lorsque l'un de ces signaux apparaîtra :</p>
      <ul>
        <li>
          <strong>Pics de charge</strong> : un grand événement (salon, foire) où des centaines de
          membres utilisent le matching et la géolocalisation en même temps.
        </li>
        <li>
          <strong>Temps réel</strong> : l'alerte de proximité exige des connexions permanentes,
          qu'un serveur PHP classique gère mal.
        </li>
        <li>
          <strong>Plusieurs équipes</strong> : quand plusieurs développeurs travaillent en parallèle
          sur des domaines différents.
        </li>
        <li>
          <strong>Plusieurs clubs</strong> : l'ouverture à d'autres clubs et associations du canton.
        </li>
        <li>
          <strong>Rythmes différents</strong> : faire évoluer le matching chaque semaine sans
          redéployer l'adhésion ou les événements.
        </li>
      </ul>

      <!-- Schéma -->
      <h2 id="schema">Architecture cible</h2>
      <div
        class="not-doc my-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <p class="mb-2 text-center text-xs font-bold tracking-wider text-slate-500 uppercase">
          Clients
        </p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          @for (client of clients; track client) {
            <div
              class="rounded-xl border-2 border-sky-300 bg-white p-3 text-center text-sm font-semibold text-slate-900 dark:border-sky-800 dark:bg-slate-900 dark:text-white"
            >
              {{ client }}
            </div>
          }
        </div>

        <div class="flex justify-center py-2 text-xl text-slate-400">↓</div>

        <div
          class="rounded-xl border-2 border-violet-300 bg-white p-3 text-center dark:border-violet-800 dark:bg-slate-900"
        >
          <p class="font-semibold text-slate-900 dark:text-white">
            Passerelle d'API (Azure API Management)
          </p>
          <p class="mt-1 text-xs text-slate-500">
            Point d'entrée unique · authentification · quotas · versions d'API
          </p>
        </div>

        <div class="flex justify-center py-2 text-xl text-slate-400">↓</div>

        <p class="mb-2 text-center text-xs font-bold tracking-wider text-slate-500 uppercase">
          Microservices (Azure Container Apps)
        </p>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-5">
          @for (service of services; track service.name) {
            <div
              class="rounded-xl border-2 bg-white p-3 dark:bg-slate-900"
              [class]="
                service.highlight
                  ? 'border-red-400 dark:border-red-800'
                  : 'border-slate-200 dark:border-slate-700'
              "
            >
              <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ service.name }}</p>
              <p class="mt-1 text-[11px] leading-4 text-slate-500">{{ service.technology }}</p>
            </div>
          }
        </div>

        <div class="flex justify-center py-2 text-xl text-slate-400">⇅</div>

        <div
          class="rounded-xl border-2 border-amber-300 bg-white p-3 text-center dark:border-amber-800 dark:bg-slate-900"
        >
          <p class="font-semibold text-slate-900 dark:text-white">
            Bus d'événements (Azure Service Bus)
          </p>
          <p class="mt-1 text-xs text-slate-500">
            Les services communiquent par événements : « membre inscrit », « match calculé », «
            participant proche »…
          </p>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-3">
          @for (block of platform; track block[0]) {
            <div
              class="rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">
                {{ block[0] }}
              </p>
              <p class="mt-1 text-sm text-slate-900 dark:text-white">{{ block[1] }}</p>
            </div>
          }
        </div>
      </div>

      <h2 id="services">Le rôle de chaque service</h2>
      <p>
        Chaque service possède <strong>une seule responsabilité</strong> et
        <strong>ses propres données</strong>. Aucun service ne lit directement la base d'un autre :
        il passe par son API ou écoute ses événements.
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Responsabilité</th>
              <th>Données</th>
              <th>Événements publiés</th>
            </tr>
          </thead>
          <tbody>
            @for (service of services; track service.name) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ service.name }}
                </td>
                <td>{{ service.responsibility }}</td>
                <td class="text-xs">{{ service.data }}</td>
                <td class="font-mono text-xs">{{ service.events }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="communication">Comment les services communiquent</h2>
      <h3>Communication synchrone : quand une réponse immédiate est nécessaire</h3>
      <p>
        Le client appelle la passerelle, qui route vers le bon service en REST. Exemple : afficher
        la liste des événements. Ces appels restent courts et sans chaîne longue entre services.
      </p>
      <h3>Communication asynchrone : pour tout le reste</h3>
      <p>
        Quand un service change d'état, il <strong>publie un événement</strong> sur le bus. Les
        services intéressés réagissent à leur rythme. Si l'un d'eux est momentanément indisponible,
        les messages l'attendent : <strong>aucune panne ne se propage</strong>.
      </p>

      <h3>Exemple 1 : inscription à un événement</h3>
      <ol class="not-doc my-4 space-y-2">
        @for (step of registrationFlow; track step.action; let index = $index) {
          <li
            class="flex gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
          >
            <span
              class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold text-white"
              >{{ index + 1 }}</span
            >
            <span
              ><strong>{{ step.actor }}</strong> — {{ step.action }}</span
            >
          </li>
        }
      </ol>

      <h3>Exemple 2 : alerte de proximité pendant un événement</h3>
      <ol class="not-doc my-4 space-y-2">
        @for (step of proximityFlow; track step.action; let index = $index) {
          <li
            class="flex gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
          >
            <span
              class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold text-white"
              >{{ index + 1 }}</span
            >
            <span
              ><strong>{{ step.actor }}</strong> — {{ step.action }}</span
            >
          </li>
        }
      </ol>
      <app-callout type="info" title="Pourquoi un service dédié à la proximité ?">
        La proximité demande des connexions permanentes et des calculs de distance très fréquents.
        Isolée dans son propre service (Node.js ou Go, avec Redis pour les positions), elle peut
        monter en charge pendant un événement sans ralentir le reste de la plateforme.
      </app-callout>

      <h2 id="migration">Stratégie de migration progressive</h2>
      <p>
        La migration suit le modèle du <strong>« figuier étrangleur »</strong> (strangler fig) : le
        monolithe continue de fonctionner, et les services sont extraits un par un. La passerelle
        d'API redirige progressivement le trafic vers chaque nouveau service. À aucun moment
        l'application n'est arrêtée.
      </p>
      <div class="not-doc my-6 space-y-3">
        @for (stage of migration; track stage.number) {
          <div class="flex gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900"
            >
              {{ stage.number }}
            </span>
            <div>
              <p class="font-semibold text-slate-900 dark:text-white">{{ stage.title }}</p>
              <p class="mt-1 text-sm leading-6">{{ stage.why }}</p>
            </div>
          </div>
        }
      </div>

      <h2 id="principes">Principes techniques</h2>
      <ul>
        <li>
          <strong>Une base de données par service</strong> : chaque service est libre de son modèle
          et peut évoluer seul.
        </li>
        <li>
          <strong>Contrats d'API versionnés</strong> : <code>/api/v1</code> existe déjà ; un
          changement incompatible crée une nouvelle version.
        </li>
        <li>
          <strong>Idempotence</strong> : traiter deux fois le même événement ne doit jamais créer de
          doublon.
        </li>
        <li>
          <strong>Résilience</strong> : nouvelles tentatives, délais d'expiration et disjoncteurs
          entre services.
        </li>
        <li>
          <strong>Observabilité</strong> : journaux, métriques et traces centralisés dans
          Application Insights pour suivre une requête de bout en bout.
        </li>
        <li>
          <strong>Sécurité</strong> : secrets dans Azure Key Vault, authentification centralisée,
          communications chiffrées entre services.
        </li>
        <li>
          <strong>Protection des données</strong> : les positions GPS ne sont conservées que le
          temps de l'événement, conformément à la loi suisse sur la protection des données (LPD).
        </li>
        <li>
          <strong>Automatisation</strong> : un pipeline CI/CD par service, avec tests avant chaque
          mise en production.
        </li>
      </ul>

      <h2 id="azure">Correspondance avec les services Azure</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Besoin</th>
              <th>Service Azure</th>
            </tr>
          </thead>
          <tbody>
            @for (row of azureMapping; track row[0]) {
              <tr>
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p>
        Mon expérience d'Azure, déjà mise à profit pendant le hackathon (voir
        <a routerLink="/deploiement">Déploiement Azure</a>), rend cette évolution réaliste.
      </p>

      <h2 id="bilan">Avantages et points de vigilance</h2>
      <div class="not-doc my-6 grid gap-4 md:grid-cols-2">
        <div
          class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30"
        >
          <p class="font-semibold text-emerald-800 dark:text-emerald-300">Ce que l'on gagne</p>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            @for (item of benefits; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div
          class="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30"
        >
          <p class="font-semibold text-amber-800 dark:text-amber-300">Ce qu'il faut maîtriser</p>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            @for (item of challenges; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
      </div>
    </app-doc-page>
  `,
})
export class FutureArchitecturePage {
  protected readonly toc: TocItem[] = [
    { id: 'pourquoi-pas-maintenant', label: 'Pourquoi pas tout de suite' },
    { id: 'quand', label: 'Quand migrer' },
    { id: 'schema', label: 'Architecture cible' },
    { id: 'services', label: 'Rôle des services' },
    { id: 'communication', label: 'Communication' },
    { id: 'migration', label: 'Migration progressive' },
    { id: 'principes', label: 'Principes techniques' },
    { id: 'azure', label: 'Services Azure' },
    { id: 'bilan', label: 'Avantages et vigilance' },
  ];

  protected readonly clients = [
    'Web (Vue.js)',
    'Android (Kotlin)',
    'iOS (futur)',
    'Administration',
  ];

  protected readonly services: Service[] = [
    {
      name: 'Identité',
      responsibility: 'Connexion, jetons, rôles, connexion via des comptes externes.',
      data: 'Comptes, rôles, sessions',
      technology: 'Laravel · Sanctum / Entra ID',
      events: 'CompteActivé',
    },
    {
      name: 'Membres',
      responsibility: 'Profils, entreprises, langues, offres et besoins, adhésions.',
      data: 'Profils, entreprises, adhésions',
      technology: 'Laravel · MySQL',
      events: 'ProfilMisÀJour, AdhésionRenouvelée',
    },
    {
      name: 'Club Affaires',
      responsibility: 'Réseau d’affaires, mises en relation, opportunités, mentorat.',
      data: 'Mises en relation, opportunités',
      technology: 'Laravel · MySQL',
      events: 'MiseEnRelationAcceptée',
      highlight: true,
    },
    {
      name: 'Club Amis',
      responsibility: 'Activités et sorties conviviales, groupes, communauté.',
      data: 'Groupes, publications',
      technology: 'Laravel · MySQL',
      events: 'GroupeRejoint',
    },
    {
      name: 'Événements',
      responsibility: 'Événements, capacité, liste d’attente, check-in QR.',
      data: 'Événements, inscriptions',
      technology: 'Laravel · MySQL',
      events: 'InscriptionConfirmée, ParticipantEnregistré',
    },
    {
      name: 'Matching',
      responsibility: 'Calcul des scores et des suggestions, explication des raisons.',
      data: 'Index des compétences, scores',
      technology: 'Python · Redis',
      events: 'MatchCalculé',
      highlight: true,
    },
    {
      name: 'Proximité',
      responsibility: 'Positions pendant un événement, détection des personnes proches.',
      data: 'Positions temporaires',
      technology: 'Node.js / Go · Redis · Web PubSub',
      events: 'ParticipantProche',
      highlight: true,
    },
    {
      name: 'Notifications',
      responsibility: 'Push mobile, e-mails, notifications dans l’application, en FR / DE.',
      data: 'Préférences, historique',
      technology: 'Azure Functions · Notification Hubs',
      events: 'NotificationEnvoyée',
    },
    {
      name: 'Messagerie',
      responsibility: 'Conversations entre membres, pièces jointes, traduction.',
      data: 'Conversations, messages',
      technology: 'Node.js · Web PubSub',
      events: 'MessageEnvoyé',
    },
    {
      name: 'QR & Pass',
      responsibility: 'Jetons QR signés, partage de pass, cartes entreprise.',
      data: 'Jetons (empreintes)',
      technology: 'Laravel · MySQL',
      events: 'QrScanné',
    },
  ];

  protected readonly platform: [string, string][] = [
    ['Données', 'Une base par service (Azure MySQL, Redis)'],
    ['Supervision', 'Application Insights · Azure Monitor'],
    ['Sécurité', 'Azure Key Vault · identités managées'],
  ];

  protected readonly registrationFlow: FlowStep[] = [
    { actor: 'Membre', action: 'demande à s’inscrire à un événement depuis l’application mobile.' },
    {
      actor: 'Passerelle',
      action: 'vérifie le jeton auprès du service Identité, puis transmet au service Événements.',
    },
    {
      actor: 'Événements',
      action:
        'vérifie la capacité, confirme l’inscription (ou place en liste d’attente) et publie « InscriptionConfirmée ».',
    },
    {
      actor: 'Notifications',
      action:
        'reçoit l’événement et envoie une confirmation push et par e-mail, dans la langue du membre.',
    },
    {
      actor: 'Matching',
      action:
        'reçoit le même événement et précalcule les meilleures rencontres parmi les participants.',
    },
  ];

  protected readonly proximityFlow: FlowStep[] = [
    {
      actor: 'Membre',
      action: 'arrive à l’événement ; le check-in par QR code active la détection de proximité.',
    },
    {
      actor: 'Application mobile',
      action:
        'envoie sa position (GPS en extérieur, balises Bluetooth en intérieur) au service Proximité.',
    },
    {
      actor: 'Proximité',
      action: 'calcule en temps réel les participants situés à quelques mètres.',
    },
    {
      actor: 'Proximité',
      action:
        'interroge le service Matching et ne retient que les profils au score suffisant, puis publie « ParticipantProche ».',
    },
    {
      actor: 'Notifications',
      action:
        'envoie une notification push : « Nathalie, experte en fiduciaire, est à proximité ».',
    },
    {
      actor: 'Membre',
      action: 'ouvre la notification : le profil et les raisons du match s’affichent en un clic.',
    },
  ];

  protected readonly migration: MigrationStage[] = [
    {
      number: 1,
      title: 'Mettre en place les fondations',
      why: 'Passerelle d’API devant le monolithe, bus d’événements, CI/CD et supervision. Rien ne change pour les utilisateurs, mais tout est prêt pour extraire les services.',
    },
    {
      number: 2,
      title: 'Extraire le service Notifications',
      why: 'C’est le domaine le moins couplé : il ne fait que réagir à des événements. C’est aussi l’occasion d’ajouter les notifications push mobiles.',
    },
    {
      number: 3,
      title: 'Créer le service Proximité',
      why: 'C’est un nouveau service, sans code à migrer. Il répond au besoin temps réel que le monolithe PHP gère mal, et active la fonctionnalité innovante d’alerte de proximité.',
    },
    {
      number: 4,
      title: 'Extraire le service Matching',
      why: 'Le calcul est gourmand et évolue souvent. Isolé, il peut monter en charge pendant les événements et être enrichi (apprentissage automatique) sans toucher au reste.',
    },
    {
      number: 5,
      title: 'Extraire Événements, puis Club Affaires et Club Amis',
      why: 'Ces domaines sont plus liés aux membres : ils sont extraits une fois les échanges par événements bien rodés.',
    },
    {
      number: 6,
      title: 'Réduire le monolithe à Identité et Membres',
      why: 'Le cœur restant devient lui-même un service. La migration est terminée, sans aucune interruption de service.',
    },
  ];

  protected readonly azureMapping: [string, string][] = [
    ['Exécuter les conteneurs des services', 'Azure Container Apps (ou AKS à grande échelle)'],
    ['Point d’entrée unique des API', 'Azure API Management'],
    ['Communication par événements', 'Azure Service Bus'],
    ['Temps réel (proximité, messagerie)', 'Azure Web PubSub'],
    ['Notifications push Android et iOS', 'Azure Notification Hubs'],
    ['Traitements déclenchés par événement', 'Azure Functions'],
    ['Bases de données', 'Azure Database for MySQL · Azure Cache for Redis'],
    ['Secrets et clés', 'Azure Key Vault'],
    ['Supervision', 'Application Insights · Azure Monitor'],
    ['Images de conteneurs', 'Azure Container Registry'],
    ['Livraison continue', 'GitHub Actions (un pipeline par service)'],
  ];

  protected readonly benefits = [
    'Chaque service monte en charge indépendamment (le matching et la proximité pendant un événement).',
    'Une panne reste isolée : si la messagerie tombe, les inscriptions continuent.',
    'Chaque service utilise la technologie la plus adaptée (PHP, Python, Node.js).',
    'Plusieurs équipes peuvent travailler en parallèle.',
    'Des mises en production plus fréquentes et moins risquées.',
  ];

  protected readonly challenges = [
    'Complexité opérationnelle : plus de déploiements et de supervision.',
    'Cohérence des données entre services, qui devient « à terme » plutôt qu’immédiate.',
    'Coût d’infrastructure plus élevé qu’un monolithe unique.',
    'Nécessité d’une CI/CD et d’une observabilité solides dès le départ.',
  ];
}
