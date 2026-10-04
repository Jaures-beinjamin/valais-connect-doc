import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface StackItem {
  layer: string;
  technology: string;
  version: string;
}

interface Criterion {
  name: string;
  question: string;
}

interface Alternative {
  name: string;
  reason: string;
}

interface Decision {
  id: string;
  category: string;
  title: string;
  need: string;
  alternatives: Alternative[];
  reasons: string[];
  tradeoff: string;
}

@Component({
  selector: 'app-tech-choices-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Choix technologiques"
      lead="Chaque technologie de Valais Connect est le résultat d'une décision argumentée. Cette page explique, pour chaque choix, le besoin de départ, les alternatives étudiées, les raisons du choix et le compromis accepté."
      [toc]="toc"
    >
      <h2 id="synthese">La stack en un coup d'œil</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Couche</th>
              <th>Technologie</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            @for (item of stack; track item.layer) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ item.layer }}
                </td>
                <td>{{ item.technology }}</td>
                <td class="font-mono text-xs whitespace-nowrap">{{ item.version }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="criteres">Les critères de décision</h2>
      <p>
        Tous les choix ont été évalués avec les mêmes cinq critères. Dans un hackathon, la
        <strong>maîtrise</strong> et la <strong>rapidité</strong> pèsent lourd ; mais le projet
        devant vivre après la compétition, l'<strong>évolutivité</strong> n'a jamais été sacrifiée.
      </p>
      <div class="not-doc my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        @for (criterion of criteria; track criterion.name) {
          <div class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p class="font-semibold text-red-600 dark:text-red-400">{{ criterion.name }}</p>
            <p class="mt-1 text-sm leading-6">{{ criterion.question }}</p>
          </div>
        }
      </div>

      <h2 id="decisions">Les décisions, une par une</h2>
      <p>Cliquez sur une décision pour y accéder directement :</p>
      <div class="not-doc my-4 flex flex-wrap gap-2">
        @for (decision of decisions; track decision.id) {
          <a
            [routerLink]="[]"
            [fragment]="decision.id"
            class="rounded-full border border-slate-200 px-3 py-1 text-sm transition hover:border-red-400 hover:text-red-600 dark:border-slate-700"
          >
            {{ decision.title }}
          </a>
        }
      </div>

      <div class="not-doc mt-8 space-y-6">
        @for (decision of decisions; track decision.id; let index = $index) {
          <section
            [id]="decision.id"
            class="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <div
              class="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <p
                class="text-xs font-semibold tracking-wider text-red-600 uppercase dark:text-red-400"
              >
                Décision {{ index + 1 }} · {{ decision.category }}
              </p>
              <h3 class="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                {{ decision.title }}
              </h3>
            </div>
            <div class="space-y-5 p-5 text-sm leading-6">
              <div>
                <p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Le besoin
                </p>
                <p class="mt-1">{{ decision.need }}</p>
              </div>

              <div>
                <p class="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                  Pourquoi ce choix
                </p>
                <ul class="mt-2 list-disc space-y-1.5 pl-5 marker:text-emerald-500">
                  @for (reason of decision.reasons; track reason) {
                    <li>{{ reason }}</li>
                  }
                </ul>
              </div>

              <div>
                <p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Alternatives étudiées
                </p>
                <div class="mt-2 overflow-x-auto">
                  <table class="w-full text-left text-sm">
                    <tbody>
                      @for (alternative of decision.alternatives; track alternative.name) {
                        <tr class="border-b border-slate-100 last:border-0 dark:border-slate-800">
                          <td
                            class="py-2 pr-4 align-top font-medium whitespace-nowrap text-slate-900 dark:text-white"
                          >
                            {{ alternative.name }}
                          </td>
                          <td class="py-2 align-top">{{ alternative.reason }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <p class="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
                <span class="font-semibold text-slate-900 dark:text-white"
                  >Compromis accepté : </span
                >{{ decision.tradeoff }}
              </p>
            </div>
          </section>
        }
      </div>

      <h2 id="coherence">La cohérence d'ensemble</h2>
      <p>Pris ensemble, ces choix forment un système cohérent :</p>
      <ul>
        <li>
          <strong>Une seule source de vérité</strong> : toute la logique est dans Laravel. Le web et
          le mobile ne font qu'afficher et transmettre.
        </li>
        <li>
          <strong>Une même philosophie de composants</strong> : composants Vue côté web, composables
          Compose côté mobile.
        </li>
        <li>
          <strong>Des coûts maîtrisés</strong> : Mapbox, Azure et des modèles IA locaux restent dans
          des budgets compatibles avec un projet associatif.
        </li>
        <li>
          <strong>Une porte ouverte sur l'avenir</strong> : le monolithe modulaire peut être découpé
          en microservices sans réécriture (voir
          <a routerLink="/architecture-future">Architecture future</a>).
        </li>
      </ul>

      <app-callout type="info" title="Un choix à discuter en présentiel">
        Le choix natif / cross-platform pour le mobile est un vrai arbitrage d'ingénierie (coût de
        développement contre accès au matériel). Je peux le détailler davantage lors de la
        présentation.
      </app-callout>
    </app-doc-page>
  `,
})
export class TechChoicesPage {
  protected readonly toc: TocItem[] = [
    { id: 'synthese', label: 'La stack' },
    { id: 'criteres', label: 'Critères de décision' },
    { id: 'decisions', label: 'Les décisions' },
    { id: 'coherence', label: 'Cohérence d’ensemble' },
  ];

  protected readonly stack: StackItem[] = [
    { layer: 'Backend', technology: 'Laravel · PHP', version: '13 · 8.3+ (8.4 sur Azure)' },
    { layer: 'Authentification', technology: 'Laravel Sanctum', version: '4' },
    { layer: 'Front web', technology: 'Vue.js · Vite · Tailwind CSS', version: '3.5 · 8 · 4' },
    { layer: 'Mobile', technology: 'Kotlin · Jetpack Compose', version: 'Kotlin 2.2 · Material 3' },
    { layer: 'Réseau mobile', technology: 'Retrofit · OkHttp', version: '2.11 · 4.12' },
    { layer: 'QR codes', technology: 'qrcode (web) · ZXing (mobile)', version: '1.5 · 3.5' },
    { layer: 'Cartographie', technology: 'Mapbox GL JS · Geocoding', version: '3 · v6' },
    { layer: 'Base de données', technology: 'MySQL', version: 'Azure Database for MySQL' },
    { layer: 'Hébergement', technology: 'Azure App Service', version: 'Linux · Nginx · PHP 8.4' },
    { layer: 'IA', technology: 'GPT-5 · Gemini · Ollama (local)', version: '—' },
  ];

  protected readonly criteria: Criterion[] = [
    {
      name: 'Maîtrise',
      question: 'Est-ce que je connais assez l’outil pour ne pas perdre de temps ?',
    },
    { name: 'Rapidité', question: 'Permet-il de livrer en deux jours ?' },
    { name: 'Coût', question: 'Reste-t-il abordable pour un club ou une association ?' },
    { name: 'Évolutivité', question: 'Supportera-t-il les besoins futurs sans réécriture ?' },
    {
      name: 'Écosystème',
      question: 'Existe-t-il une communauté, de la documentation, des librairies ?',
    },
  ];

  protected readonly decisions: Decision[] = [
    {
      id: 'choix-architecture',
      category: 'Architecture',
      title: 'Client-serveur et monolithe modulaire',
      need: 'Servir deux clients (web et mobile) avec exactement les mêmes règles métier, tout en livrant en deux jours.',
      reasons: [
        'Un serveur unique garantit que les règles (places disponibles, droits d’accès, score de matching) sont identiques sur le web et sur le mobile.',
        'Un seul déploiement, une seule base de données : la complexité opérationnelle reste minimale pendant le hackathon.',
        'Le code est découpé par domaine (matching, adhésion, QR codes, mises en relation) : chaque domaine pourra devenir un microservice plus tard.',
        'Chaque point d’API est écrit une seule fois et exposé sur deux piles : /api pour le web, /api/v1 pour le mobile.',
      ],
      alternatives: [
        {
          name: 'Microservices dès le départ',
          reason:
            'Trop coûteux à mettre en place en deux jours : réseau, découverte de services, données distribuées, déploiements multiples.',
        },
        {
          name: 'Logique dupliquée dans chaque client',
          reason: 'Risque de règles divergentes entre web et mobile, et double maintenance.',
        },
        {
          name: 'Backend-as-a-Service (Firebase…)',
          reason:
            'Logique métier complexe (matching, liste d’attente) difficile à exprimer, et dépendance forte à un fournisseur.',
        },
      ],
      tradeoff:
        'Le monolithe ne passe pas à l’échelle aussi finement que des microservices. C’est volontaire : l’architecture future est déjà pensée pour le découper progressivement.',
    },
    {
      id: 'choix-laravel',
      category: 'Backend',
      title: 'Laravel (PHP)',
      need: 'Un framework backend complet pour écrire vite une API sûre : authentification, base de données, validation, e-mails, tâches planifiées, tests.',
      reasons: [
        'Tout est inclus : ORM Eloquent, migrations, validation, notifications, files d’attente, planificateur, tests. Aucun temps perdu à assembler des briques.',
        'Je maîtrise Laravel : chaque heure du hackathon est consacrée au métier, pas à l’apprentissage.',
        'Laravel Sanctum gère dans un même outil la session du web et les jetons du mobile.',
        'PHP moderne (enums, typage strict, readonly) permet d’écrire un domaine métier propre et testable.',
        'L’hébergement PHP est disponible partout et à faible coût, dont Azure App Service.',
      ],
      alternatives: [
        {
          name: 'Node.js (Express / NestJS)',
          reason:
            'Excellent pour le temps réel, mais demande d’assembler davantage de briques (ORM, validation, e-mails) pour le même résultat.',
        },
        {
          name: 'Symfony',
          reason: 'Très robuste, mais plus verbeux et plus long à configurer pour un prototype.',
        },
        {
          name: 'Django (Python)',
          reason:
            'Bon candidat, mais moins de maîtrise personnelle, donc plus de risque en deux jours.',
        },
      ],
      tradeoff:
        'PHP n’est pas le langage le plus adapté au temps réel (WebSockets). Pour l’alerte de proximité future, un service dédié est prévu dans l’architecture microservices.',
    },
    {
      id: 'choix-vue',
      category: 'Front web',
      title: 'Vue.js 3 intégré à Laravel',
      need: 'Une interface web réactive, construite par composants réutilisables, livrée avec le backend.',
      reasons: [
        'Vue est embarqué dans l’application Laravel : front et back communiquent déjà ensemble, sans serveur ni configuration CORS supplémentaires.',
        'L’architecture par composants permet de réutiliser les mêmes briques (en-têtes, cartes, formulaires) pendant toute la durée de vie de l’application.',
        'Courbe d’apprentissage douce : un futur contributeur du club peut reprendre le code facilement.',
        'Vite compile le front en quelques secondes, ce qui accélère chaque itération.',
      ],
      alternatives: [
        {
          name: 'React',
          reason:
            'Équivalent en capacités, mais plus de choix à faire (routage, état, structure) pour démarrer.',
        },
        {
          name: 'Angular',
          reason:
            'Très structurant mais plus lourd pour une petite application intégrée à Laravel.',
        },
        {
          name: 'Pages Blade (rendu serveur)',
          reason:
            'Plus simple, mais moins adapté aux interactions riches (scan QR, carte, filtres instantanés).',
        },
      ],
      tradeoff:
        'Le front est une application monopage : le référencement naturel est plus limité. Ce n’est pas un enjeu pour un espace réservé aux membres.',
    },
    {
      id: 'choix-tailwind',
      category: 'Design',
      title: 'Tailwind CSS',
      need: 'Une interface cohérente, responsive et soignée, sans écrire de CSS sur mesure.',
      reasons: [
        'Les classes utilitaires permettent de styliser directement dans les composants, sans aller-retour entre fichiers.',
        'Le responsive (smartphone d’abord) et le mode sombre sont natifs.',
        'Le CSS final ne contient que les classes réellement utilisées : il reste léger.',
      ],
      alternatives: [
        {
          name: 'Bootstrap',
          reason: 'Rapide, mais rendu générique et plus difficile à personnaliser.',
        },
        {
          name: 'CSS sur mesure',
          reason: 'Trop long à écrire et à maintenir dans le temps d’un hackathon.',
        },
      ],
      tradeoff:
        'Les gabarits HTML sont plus chargés en classes ; c’est compensé par la réutilisation des composants.',
    },
    {
      id: 'choix-sanctum',
      category: 'Sécurité',
      title: 'Laravel Sanctum pour l’authentification',
      need: 'Authentifier à la fois un navigateur (web) et une application mobile, de façon sûre.',
      reasons: [
        'Web : session classique protégée par cookie et jeton CSRF, le mécanisme le plus sûr pour un navigateur.',
        'Mobile : jeton Bearer, sans état, révocable appareil par appareil.',
        'Un seul outil, intégré à Laravel, pour les deux cas : moins de code, moins de failles.',
        'Limitation du nombre de tentatives de connexion (10 par minute) contre les attaques par force brute.',
      ],
      alternatives: [
        {
          name: 'Laravel Passport (OAuth2)',
          reason: 'Surdimensionné : pas d’applications tierces à autoriser pour l’instant.',
        },
        { name: 'JWT maison', reason: 'Révocation difficile et risque d’erreurs de sécurité.' },
      ],
      tradeoff:
        'Pas de « connexion avec Google / LinkedIn » pour l’instant. Ce sera le rôle du futur service d’identité.',
    },
    {
      id: 'choix-mysql',
      category: 'Données',
      title: 'MySQL',
      need: 'Stocker des données très relationnelles : membres, entreprises, événements, inscriptions, mises en relation.',
      reasons: [
        'Les données sont fortement liées entre elles : une base relationnelle garantit leur cohérence (clés étrangères, transactions).',
        'Les transactions protègent les règles critiques, comme la promotion depuis la liste d’attente.',
        'Service managé sur Azure (sauvegardes, chiffrement, mises à jour), sans administration de serveur.',
      ],
      alternatives: [
        {
          name: 'PostgreSQL',
          reason:
            'Tout aussi pertinent ; MySQL a été retenu par habitude et pour sa simplicité sur Azure.',
        },
        {
          name: 'MongoDB (NoSQL)',
          reason:
            'Peu adapté à des données aussi relationnelles ; la cohérence serait à gérer dans le code.',
        },
      ],
      tradeoff:
        'Une base unique pour tout le monolithe. Dans l’architecture future, chaque service aura sa propre base.',
    },
    {
      id: 'choix-kotlin',
      category: 'Mobile',
      title: 'Kotlin natif avec Jetpack Compose',
      need: 'Une application mobile qui devra, à terme, utiliser le Bluetooth, la localisation en arrière-plan et les notifications système.',
      reasons: [
        'À long terme, l’application doit intégrer la connexion Bluetooth et d’autres fonctionnalités natives d’Android : le natif y donne un accès direct, complet et fiable.',
        'La détection de proximité pendant un événement exige des services en arrière-plan précis et économes en batterie : c’est le terrain du natif.',
        'Jetpack Compose propose une architecture à base de composables, très proche de l’architecture par composants du front Vue : la même façon de penser sur web et mobile.',
        'Kotlin est le langage officiel d’Android : documentation, outils et performances optimaux.',
      ],
      alternatives: [
        {
          name: 'Flutter',
          reason:
            'Une seule base de code pour Android et iOS, mais l’accès au Bluetooth et aux services en arrière-plan passe par des plugins supplémentaires.',
        },
        {
          name: 'React Native',
          reason:
            'Même limite que Flutter pour le matériel, avec une couche de pont entre JavaScript et natif.',
        },
        {
          name: 'Application web (PWA)',
          reason: 'Accès au Bluetooth et à l’arrière-plan très limité, surtout sur iPhone.',
        },
      ],
      tradeoff:
        'Une future application iOS devra être écrite séparément (en Swift). C’est un coût assumé au profit de la qualité de l’expérience native.',
    },
    {
      id: 'choix-retrofit',
      category: 'Mobile',
      title: 'Retrofit, OkHttp et bascule entre serveurs',
      need: 'Une communication fiable avec l’API, même quand le réseau est instable dans un salon ou une salle d’événement.',
      reasons: [
        'Retrofit décrit l’API sous forme d’interface typée : moins d’erreurs, code lisible.',
        'OkHttp permet d’ajouter automatiquement le jeton et la langue à chaque requête.',
        'Une bascule automatique vers un serveur de secours rend la démo et l’usage réel plus robustes.',
      ],
      alternatives: [
        {
          name: 'Ktor Client',
          reason: 'Moderne et multiplateforme, mais moins de maîtrise personnelle.',
        },
        { name: 'HttpURLConnection', reason: 'Bas niveau, beaucoup de code répétitif.' },
      ],
      tradeoff:
        'Les écritures ne sont rejouées que si elles n’ont jamais atteint le serveur, pour éviter les doublons. Certaines erreurs restent donc visibles par l’utilisateur.',
    },
    {
      id: 'choix-mapbox',
      category: 'Géolocalisation',
      title: 'Mapbox plutôt que Google Maps',
      need: 'Afficher des cartes du Valais et convertir des adresses en coordonnées GPS.',
      reasons: [
        'Le coût : l’API Google Maps devient vite payante ; pour un hackathon et un projet associatif, Mapbox offre un palier gratuit généreux.',
        'Une très bonne qualité de cartes sur la Suisse et les zones de montagne.',
        'Un service de géocodage simple, limité à la Suisse pour des résultats pertinents.',
        'Des styles de carte personnalisables aux couleurs de l’application.',
      ],
      alternatives: [
        {
          name: 'Google Maps',
          reason: 'Écarté à cause du coût et de la facturation dès un certain volume.',
        },
        {
          name: 'OpenStreetMap + Leaflet',
          reason: 'Gratuit, mais géocodage moins fiable et plus de travail d’intégration.',
        },
      ],
      tradeoff:
        'Une dépendance à un fournisseur externe, isolée derrière un service dédié côté serveur pour pouvoir en changer facilement.',
    },
    {
      id: 'choix-qr',
      category: 'Mise en relation',
      title: 'QR codes à jetons signés',
      need: 'Permettre d’échanger un profil en un geste, sans exposer de données personnelles.',
      reasons: [
        'Tout smartphone sait lire un QR code : aucune installation requise côté web.',
        'Le QR code contient un jeton aléatoire, pas l’identifiant du membre ; seule son empreinte est stockée en base.',
        'Le même mécanisme sert au check-in des participants aux événements.',
      ],
      alternatives: [
        {
          name: 'NFC',
          reason:
            'Expérience fluide, mais non supportée par tous les téléphones et impossible sur le web.',
        },
        {
          name: 'Échange de cartes de visite',
          reason: 'Aucune trace numérique, aucun matching possible.',
        },
      ],
      tradeoff:
        'Il faut sortir son téléphone pour scanner. La détection de proximité par Bluetooth prendra le relais à terme.',
    },
    {
      id: 'choix-azure',
      category: 'Hébergement',
      title: 'Microsoft Azure',
      need: 'Mettre en ligne rapidement et de façon fiable l’application et sa base de données.',
      reasons: [
        'J’ai une solide expérience d’Azure, notamment d’App Service : aucune découverte à faire pendant le hackathon.',
        'App Service gère le serveur, le HTTPS et les redémarrages ; Azure Database for MySQL gère les sauvegardes.',
        'Les services nécessaires à l’architecture future existent déjà sur Azure : conteneurs, messagerie, temps réel, notifications push.',
        'Une région européenne est disponible, en ligne avec la protection des données suisse.',
      ],
      alternatives: [
        { name: 'AWS', reason: 'Équivalent, mais moins de maîtrise personnelle.' },
        {
          name: 'Laravel Cloud / Forge',
          reason:
            'Très simple pour Laravel, mais ne couvre pas les besoins futurs (temps réel, push).',
        },
        {
          name: 'Serveur VPS',
          reason: 'Bon marché, mais administration, sécurité et sauvegardes entièrement manuelles.',
        },
      ],
      tradeoff:
        'Une configuration propre à Azure (script de démarrage, Nginx). Elle est versionnée dans le dépôt pour rester reproductible.',
    },
    {
      id: 'choix-ssh',
      category: 'Livraison',
      title: 'Déploiement par SSH (temporaire)',
      need: 'Livrer l’application en production malgré l’échec de la CI/CD.',
      reasons: [
        'La CI/CD GitHub Actions était prête, mais des difficultés avec mon compte GitHub l’ont bloquée.',
        'Le déploiement par SSH est un plan B maîtrisé : livraison garantie dans les délais.',
        'Le workflow CI/CD est conservé dans le dépôt, prêt à être réactivé.',
      ],
      alternatives: [
        {
          name: 'Insister sur la CI/CD',
          reason: 'Temps impossible à estimer : risque de ne rien livrer.',
        },
        {
          name: 'Déploiement depuis l’IDE',
          reason: 'Moins reproductible que des commandes SSH documentées.',
        },
      ],
      tradeoff:
        'Les tests ne sont pas exécutés automatiquement avant chaque mise en production. C’est la première amélioration prévue.',
    },
    {
      id: 'choix-ia',
      category: 'Productivité',
      title: 'GPT-5, Gemini et agents locaux Ollama',
      need: 'Démultiplier la vitesse d’exécution d’un développeur seul, sans perdre le contrôle de la qualité.',
      reasons: [
        'GPT-5 pour générer et relire le code.',
        'Gemini pour reformuler l’architecture et révéler les ambiguïtés.',
        'Des agents locaux avec Ollama pour les tâches répétitives, sans coût d’API ni envoi de données à l’extérieur.',
      ],
      alternatives: [
        { name: 'Pas d’IA', reason: 'Impossible de livrer trois applications en 18 heures.' },
        {
          name: 'Un seul assistant',
          reason: 'Moins de recul : un second modèle sert de regard critique.',
        },
      ],
      tradeoff:
        'Le code proposé par l’IA est systématiquement relu et testé : l’IA propose, je décide.',
    },
  ];
}
