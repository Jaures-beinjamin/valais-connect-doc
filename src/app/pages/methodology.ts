import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface KeyFigure {
  value: string;
  label: string;
}

interface Phase {
  letter: string;
  title: string;
  steps: string;
  text: string;
}

interface Step {
  number: number;
  title: string;
  goal: string;
  actions: string[];
  deliverable: string;
  why: string;
}

interface Increment {
  number: number;
  title: string;
  hours: number;
  goal: string;
  content: string[];
  done: string[];
  difficulty: string;
}

interface BacklogLevel {
  level: string;
  meaning: string;
  items: string[];
  color: string;
}

interface Ritual {
  name: string;
  classic: string;
  adapted: string;
}

interface Risk {
  risk: string;
  impact: string;
  response: string;
}

interface TimeSlot {
  label: string;
  hours: number;
  color: string;
}

@Component({
  selector: 'app-methodology-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Le projet"
      title="Méthodologie de travail"
      lead="Valais Connect a été réalisé en deux jours, dans le cadre d'un hackathon. Cette page explique, étape par étape, comment le projet a été mené : de la compréhension du besoin à la mise en production, en passant par le sprint de réalisation."
      [toc]="toc"
    >
      <!-- Résumé -->
      <h2 id="resume">En résumé</h2>
      <div class="not-doc my-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        @for (figure of keyFigures; track figure.label) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="text-2xl font-extrabold text-slate-900 dark:text-white">{{ figure.value }}</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ figure.label }}</p>
          </div>
        }
      </div>
      <p>
        La démarche suit une logique simple : <strong>comprendre avant de construire</strong>, puis
        <strong>construire vite, par incréments livrables</strong>. Le premier temps est consacré au
        cadrage (questions, architecture, contraintes). Le second est un
        <strong>sprint agile</strong> unique, découpé en incréments qui produisent chacun un
        résultat démontrable.
      </p>

      <!-- Contexte -->
      <h2 id="contexte">Contexte et point de départ</h2>
      <p>
        Le cadre était celui d'un <strong>hackathon de deux jours</strong>, avec un seul
        développeur. Le défi n'était pas seulement technique : il fallait livrer une solution
        <strong>fonctionnelle, déployée et démontrable</strong> devant un jury, dans un temps très
        court. Dans ces conditions, chaque heure perdue sur une mauvaise piste ne se rattrape pas.
        La méthode compte donc autant que le code.
      </p>
      <p>
        Je me suis appuyé sur mon expérience en <strong>ingénierie logicielle</strong> pour trois
        choses : cadrer vite le problème, faire des choix techniques que je maîtrise, et repérer tôt
        les risques qui pouvaient faire échouer la livraison.
      </p>
      <p>
        Au départ, le sujet couvrait <strong>deux univers</strong> : le <strong>Club Ami</strong> et
        le <strong>Club Affaire</strong>. Les deux semblaient proches, mais leurs règles (adhésion,
        accès au réseau, événements) étaient différentes. C'est ce flou initial qui a guidé toute la
        première phase.
      </p>

      <!-- Vue d'ensemble -->
      <h2 id="vue-ensemble">Vue d'ensemble de la démarche</h2>
      <p>
        La démarche se découpe en quatre phases, qui regroupent les sept étapes détaillées plus bas
        :
      </p>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-2">
        @for (phase of phases; track phase.letter) {
          <div class="relative rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <div class="flex items-center gap-3">
              <span
                class="grid h-9 w-9 place-items-center rounded-lg bg-red-600 font-bold text-white"
              >
                {{ phase.letter }}
              </span>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">{{ phase.title }}</p>
                <p class="text-xs text-slate-500">{{ phase.steps }}</p>
              </div>
            </div>
            <p class="mt-3 text-sm leading-6">{{ phase.text }}</p>
          </div>
        }
      </div>

      <!-- Madame Emile -->
      <h2 id="echanges">La phase de découverte avec Madame Emile</h2>
      <p>
        Avant d'écrire la moindre ligne de code, j'ai mené une
        <strong>série de discussions avec Madame Emile</strong>, qui connaît le fonctionnement réel
        des clubs. L'objectif était de remplacer mes suppositions par des règles métier vérifiées.
      </p>
      <h3>Les questions posées</h3>
      <ul>
        <li>
          Comment un nouveau membre s'inscrit-il ? Quelles informations sont obligatoires ? Qui
          valide l'adhésion ?
        </li>
        <li>
          Qu'est-ce qui distingue concrètement un membre du Club Ami d'un membre du Club Affaire ?
        </li>
        <li>
          Comment se déroule l'inscription à un événement ? Que se passe-t-il quand il est complet ?
        </li>
        <li>Certains événements sont-ils réservés à un seul club ?</li>
        <li>
          Qu'attendent les membres quand ils viennent à un événement : se divertir, ou rencontrer
          des partenaires ?
        </li>
      </ul>
      <h3>Ce que ces échanges ont changé</h3>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Avant les échanges</th>
              <th>Après les échanges</th>
            </tr>
          </thead>
          <tbody>
            @for (row of discoveryImpacts; track row[0]) {
              <tr>
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p>
        Ces échanges ont permis de recentrer le sujet : le <strong>Club Affaire</strong> était le
        cœur du hackathon. L'architecture a malgré tout été pensée pour accueillir les deux clubs
        comme des modules indépendants (voir
        <a routerLink="/architecture">Architecture globale</a>).
      </p>
      <app-callout type="note" title="Pourquoi commencer par des questions ?">
        Dans un hackathon, la tentation est de coder tout de suite. Mais une règle métier mal
        comprise (par exemple la liste d'attente des événements) coûte bien plus cher à corriger en
        fin de projet qu'une question posée au départ.
      </app-callout>

      <!-- Étapes -->
      <h2 id="etapes">Les 7 étapes en détail</h2>
      <p>
        Pour chaque étape, voici l'objectif, ce qui a été fait concrètement, le livrable obtenu et
        la raison d'être de l'étape.
      </p>
      <div class="not-doc mt-8">
        @for (step of steps; track step.number; let last = $last) {
          <div class="relative flex gap-4 pb-10 sm:gap-5">
            @if (!last) {
              <span
                class="absolute top-11 left-5 h-[calc(100%-2.75rem)] w-px bg-slate-200 dark:bg-slate-800"
              ></span>
            }
            <span
              class="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600 font-bold text-white shadow-md shadow-red-600/25"
            >
              {{ step.number }}
            </span>
            <div
              class="min-w-0 flex-1 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
            >
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ step.title }}</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span class="font-semibold text-slate-900 dark:text-white">Objectif : </span
                >{{ step.goal }}
              </p>
              <p
                class="mt-4 text-xs font-semibold tracking-wider text-red-600 uppercase dark:text-red-400"
              >
                Ce que j'ai fait
              </p>
              <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm marker:text-red-500">
                @for (action of step.actions; track action) {
                  <li>{{ action }}</li>
                }
              </ul>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                  <p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Livrable
                  </p>
                  <p class="mt-1 text-sm">{{ step.deliverable }}</p>
                </div>
                <div class="rounded-xl bg-red-50 p-3 dark:bg-red-950/40">
                  <p
                    class="text-xs font-semibold tracking-wider text-red-600 uppercase dark:text-red-400"
                  >
                    Pourquoi cette étape
                  </p>
                  <p class="mt-1 text-sm">{{ step.why }}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Agile -->
      <h2 id="agile">Le sprint agile : Scrum adapté à un développeur seul</h2>
      <p>
        Une fois le cadrage terminé, je suis passé à une <strong>méthodologie agile</strong>. Scrum
        est conçu pour une équipe et des sprints de plusieurs semaines ; je l'ai adapté au contexte
        d'un hackathon et d'un développeur seul.
      </p>
      <h3>Pourquoi l'agilité plutôt qu'un plan figé ?</h3>
      <ul>
        <li>
          <strong>L'imprévu est certain</strong> : en deux jours, un problème technique (ce fut le
          cas avec la CI/CD) peut tout bloquer. L'agilité permet de réarbitrer immédiatement.
        </li>
        <li>
          <strong>Chaque incrément est livrable</strong> : si le temps manque, ce qui est fait
          fonctionne déjà et peut être montré.
        </li>
        <li>
          <strong>Les priorités sont explicites</strong> : on sait ce qu'on sacrifie si l'on doit
          couper.
        </li>
      </ul>

      <h3>Un sprint unique, organisé en sessions de 7 heures non-stop</h3>
      <p>
        Le projet a été mené en <strong>un sprint complet</strong>, avec un objectif unique et
        clair. Le travail était organisé en <strong>sessions de 7 heures non-stop</strong> : une
        session = un bloc de concentration, sans changement de contexte, qui se termine toujours par
        un résultat vérifiable.
      </p>
      <app-callout type="note" title="Objectif du sprint">
        Livrer une plateforme Club Affaire utilisable de bout en bout : un membre peut se connecter,
        consulter et rejoindre des événements, découvrir les profils qui lui correspondent et entrer
        en contact par QR code — sur le web et sur Android, en production.
      </app-callout>

      <h3>Le backlog priorisé (méthode MoSCoW)</h3>
      <p>
        Avant de démarrer, toutes les fonctionnalités ont été classées selon leur importance. Ce
        classement a servi de boussole à chaque arbitrage pendant le sprint.
      </p>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-2">
        @for (level of backlog; track level.level) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <div class="flex items-center gap-2">
              <span class="rounded-md px-2 py-0.5 text-xs font-bold text-white {{ level.color }}">
                {{ level.level }}
              </span>
              <span class="text-sm font-medium text-slate-900 dark:text-white">{{
                level.meaning
              }}</span>
            </div>
            <ul class="mt-3 list-disc space-y-1 pl-5 text-sm marker:text-slate-400">
              @for (item of level.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>

      <h3>Les rituels Scrum, version solo</h3>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Rituel</th>
              <th>En Scrum classique</th>
              <th>Adaptation pour le hackathon</th>
            </tr>
          </thead>
          <tbody>
            @for (ritual of rituals; track ritual.name) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ ritual.name }}
                </td>
                <td>{{ ritual.classic }}</td>
                <td>{{ ritual.adapted }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h3>Définition de « terminé » (Definition of Done)</h3>
      <p>Une fonctionnalité n'était considérée comme terminée que si :</p>
      <ul>
        @for (rule of definitionOfDone; track rule) {
          <li>{{ rule }}</li>
        }
      </ul>

      <!-- Incréments -->
      <h2 id="increments">Le déroulé du sprint, incrément par incrément</h2>
      <p>
        Le sprint a été découpé en quatre incréments successifs. L'ordre n'est pas un hasard :
        chaque incrément <strong>s'appuie sur le précédent</strong>. L'API d'abord, car le web et le
        mobile en dépendent ; le déploiement ensuite, pour rendre le tout accessible au jury.
      </p>
      <div class="not-doc my-6 space-y-5">
        @for (increment of increments; track increment.number) {
          <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div
              class="flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-5 py-3 dark:bg-slate-900"
            >
              <p class="font-semibold text-slate-900 dark:text-white">
                Incrément {{ increment.number }} — {{ increment.title }}
              </p>
              <span
                class="rounded-full bg-red-600 px-3 py-0.5 font-mono text-xs font-bold text-white"
              >
                {{ increment.hours }} h
              </span>
            </div>
            <div class="space-y-4 p-5 text-sm leading-6">
              <p>
                <span class="font-semibold text-slate-900 dark:text-white">Objectif : </span
                >{{ increment.goal }}
              </p>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <p
                    class="text-xs font-semibold tracking-wider text-red-600 uppercase dark:text-red-400"
                  >
                    Contenu
                  </p>
                  <ul class="mt-2 list-disc space-y-1 pl-5 marker:text-red-500">
                    @for (item of increment.content; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
                <div>
                  <p class="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                    Critères de fin
                  </p>
                  <ul class="mt-2 list-disc space-y-1 pl-5 marker:text-emerald-500">
                    @for (item of increment.done; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
              </div>
              <p class="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
                <span class="font-semibold text-slate-900 dark:text-white"
                  >Point d'attention : </span
                >{{ increment.difficulty }}
              </p>
            </div>
          </div>
        }
      </div>

      <!-- Temps -->
      <h2 id="temps">Répartition du temps de développement</h2>
      <p>
        Au total, environ <strong>{{ totalHours }} heures</strong> de travail effectif ont été
        consacrées à la réalisation technique :
      </p>
      <div
        class="not-doc my-6 space-y-4 rounded-2xl border border-slate-200 p-5 sm:p-6 dark:border-slate-800"
      >
        @for (slot of timeSlots; track slot.label) {
          <div>
            <div class="mb-1.5 flex items-baseline justify-between text-sm">
              <span class="font-medium text-slate-900 dark:text-white">{{ slot.label }}</span>
              <span class="font-mono text-slate-500"
                >{{ slot.hours }} h · {{ percent(slot.hours) }} %</span
              >
            </div>
            <div class="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                class="h-full rounded-full {{ slot.color }}"
                [style.width.%]="(slot.hours / maxHours) * 100"
              ></div>
            </div>
          </div>
        }
      </div>
      <p>
        L'application mobile a demandé le plus de temps : elle est <strong>native</strong> et ne
        réutilise pas le code du front web. Le déploiement a pris autant de temps que le backend, à
        cause des difficultés rencontrées avec la CI/CD (voir
        <a routerLink="/deploiement">Déploiement Azure</a>).
      </p>

      <!-- Risques -->
      <h2 id="risques">Gestion des risques</h2>
      <p>
        Les principaux risques ont été identifiés dès le cadrage, chacun avec une réponse prévue :
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Risque</th>
              <th>Conséquence</th>
              <th>Réponse apportée</th>
            </tr>
          </thead>
          <tbody>
            @for (risk of risks; track risk.risk) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ risk.risk }}</td>
                <td>{{ risk.impact }}</td>
                <td>{{ risk.response }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Bilan -->
      <h2 id="lecons">Ce que la méthode a apporté</h2>
      <ul>
        <li>
          <strong>Moins de reprises</strong> : les questions posées en amont ont évité de développer
          des fonctionnalités hors sujet.
        </li>
        <li>
          <strong>Une architecture stable</strong> : posée sur papier puis validée, elle n'a pas été
          remise en cause pendant le sprint.
        </li>
        <li>
          <strong>Des arbitrages rapides</strong> : grâce au backlog priorisé, l'abandon temporaire
          de la CI/CD n'a pas mis la livraison en danger.
        </li>
        <li>
          <strong>Une livraison réelle</strong> : trois applications (API, web, mobile) déployées et
          utilisables par le jury.
        </li>
        <li>
          <strong>Une IA encadrée</strong> : elle a accéléré l'exécution, mais les décisions sont
          restées humaines (voir <a routerLink="/workflow-ia">Workflow & outils IA</a>).
        </li>
      </ul>
    </app-doc-page>
  `,
})
export class MethodologyPage {
  protected readonly toc: TocItem[] = [
    { id: 'resume', label: 'En résumé' },
    { id: 'contexte', label: 'Contexte' },
    { id: 'vue-ensemble', label: 'Vue d’ensemble' },
    { id: 'echanges', label: 'Découverte avec Mme Emile' },
    { id: 'etapes', label: 'Les 7 étapes' },
    { id: 'agile', label: 'Le sprint agile' },
    { id: 'increments', label: 'Incréments du sprint' },
    { id: 'temps', label: 'Répartition du temps' },
    { id: 'risques', label: 'Gestion des risques' },
    { id: 'lecons', label: 'Apports de la méthode' },
  ];

  protected readonly keyFigures: KeyFigure[] = [
    { value: '2 jours', label: 'de hackathon' },
    { value: '7 étapes', label: 'de la compréhension au workflow' },
    { value: '1 sprint', label: 'en sessions de 7 h non-stop' },
    { value: '18 h', label: 'de développement effectif' },
  ];

  protected readonly phases: Phase[] = [
    {
      letter: 'A',
      title: 'Comprendre',
      steps: 'Étapes 1 et 2',
      text: 'Analyser le sujet, puis lever chaque zone d’ombre avec Madame Emile. Résultat : des règles métier claires et un périmètre recentré sur le Club Affaire.',
    },
    {
      letter: 'B',
      title: 'Concevoir',
      steps: 'Étapes 3 et 4',
      text: 'Dessiner l’architecture sur papier, la faire reformuler par Gemini, puis la confronter aux contraintes de temps, de coût et d’évolutivité.',
    },
    {
      letter: 'C',
      title: 'Décider',
      steps: 'Étapes 5, 6 et 7',
      text: 'Fixer les technologies web et mobile, la cible de déploiement et le flux de travail outillé par l’IA.',
    },
    {
      letter: 'D',
      title: 'Réaliser et livrer',
      steps: 'Sprint agile',
      text: 'Un sprint unique en sessions de 7 h, découpé en quatre incréments : backend, web, mobile, déploiement.',
    },
  ];

  protected readonly discoveryImpacts: [string, string][] = [
    [
      'Deux clubs traités à égalité, avec des règles supposées.',
      'Le Club Affaire devient la priorité du hackathon ; le Club Ami reste prévu dans l’architecture.',
    ],
    [
      'Une inscription simple « nom + e-mail ».',
      'Un parcours d’adhésion complet, avec validation des comptes par le club avant activation.',
    ],
    [
      'Des événements avec une simple liste d’inscrits.',
      'Une capacité maximale, une liste d’attente et une promotion automatique en cas de désistement.',
    ],
    [
      'Tous les événements ouverts à tous.',
      'Des événements pouvant être réservés au Club Affaire.',
    ],
    [
      'Un annuaire de membres.',
      'Un vrai besoin de mise en relation : c’est l’origine du matching et du scan de QR code.',
    ],
  ];

  protected readonly steps: Step[] = [
    {
      number: 1,
      title: 'Comprendre le problème',
      goal: 'Savoir précisément pour qui l’on construit, et quel problème on résout.',
      actions: [
        'Lecture attentive du sujet du hackathon.',
        'Identification des utilisateurs : membres du Club Ami, membres du Club Affaire, secrétariat du club.',
        'Identification des parcours essentiels : adhésion, événements, mise en relation.',
        'Formulation du problème central : les membres se croisent aux événements sans savoir qui il serait utile de rencontrer.',
      ],
      deliverable: 'Une description écrite du problème, des utilisateurs et de leurs parcours.',
      why: 'Sans problème clairement formulé, on construit des fonctionnalités au hasard. Cette étape donne un cap à toutes les décisions suivantes.',
    },
    {
      number: 2,
      title: 'Lever les zones d’ombre',
      goal: 'Remplacer les suppositions par des règles métier vérifiées.',
      actions: [
        'Série d’échanges avec Madame Emile (voir la section précédente).',
        'Clarification des mécanismes d’inscription et des règles des événements.',
        'Distinction précise entre Club Ami et Club Affaire.',
        'Recentrage du périmètre du hackathon sur le Club Affaire.',
      ],
      deliverable: 'Une liste de règles métier validées et un périmètre recentré.',
      why: 'Une règle mal comprise coûte très cher à corriger en fin de projet. Une question posée au départ ne coûte que quelques minutes.',
    },
    {
      number: 3,
      title: 'Poser l’architecture sur papier',
      goal: 'Avoir une vue d’ensemble du système avant d’écrire du code.',
      actions: [
        'Choix d’une architecture client-serveur : un serveur unique, source de vérité.',
        'Un backend Laravel exposant une API, pensé en deux modules indépendants (Club Ami et Club Affaire).',
        'Deux clients qui consomment la même API : l’application web et l’application mobile.',
        'Esquisse du modèle de données : membres, entreprises, événements, inscriptions, mises en relation.',
      ],
      deliverable: 'Un schéma d’architecture et un premier modèle de données.',
      why: 'Dessiner coûte moins cher que coder. Les incohérences se voient sur papier en quelques minutes, alors qu’elles prennent des heures à découvrir dans le code.',
    },
    {
      number: 4,
      title: 'Faire reformuler par Gemini, puis lister les contraintes',
      goal: 'Vérifier la solidité de l’architecture et l’ancrer dans la réalité du hackathon.',
      actions: [
        'Soumission de l’architecture à Gemini en lui demandant de la reformuler et de poser des questions.',
        'Correction des oublis et des ambiguïtés révélés par la reformulation.',
        'Contrainte de temps : deux jours, un seul développeur.',
        'Contrainte de coût : rester dans des paliers gratuits ou peu coûteux (d’où Mapbox plutôt que Google Maps).',
        'Contrainte d’évolutivité : l’application devra un jour utiliser le Bluetooth et d’autres fonctions natives.',
      ],
      deliverable:
        'Une architecture relue et une liste de contraintes qui guide chaque choix technique.',
      why: 'Faire reformuler son idée par un tiers révèle ce qui n’est pas clair. Les contraintes, elles, transforment une architecture idéale en architecture réalisable.',
    },
    {
      number: 5,
      title: 'Bâtir les bases web, puis concevoir le mobile natif',
      goal: 'Poser des fondations communes, puis étendre au mobile sans dupliquer la logique.',
      actions: [
        'Application Laravel embarquant le front Vue.js : les deux communiquent déjà ensemble, sans serveur supplémentaire.',
        'Front basé sur des composants réutilisables pendant toute la durée de vie de l’application.',
        'Une fois le web posé, choix d’une application mobile native (Kotlin) plutôt que cross-platform, pour les besoins natifs futurs.',
        'Architecture mobile à base de composables, volontairement proche de celle du front web.',
      ],
      deliverable: 'Une base web fonctionnelle et une architecture mobile définie.',
      why: 'Le web d’abord, car il valide l’API dans un environnement rapide à tester. Le mobile ensuite, en réutilisant exactement la même API et les mêmes règles.',
    },
    {
      number: 6,
      title: 'Penser le déploiement',
      goal: 'Garantir que le jury puisse utiliser l’application en ligne.',
      actions: [
        'Choix d’Azure, provider sur lequel j’ai une solide expérience (App Service et services associés).',
        'Préparation d’une chaîne CI/CD avec GitHub Actions.',
        'Face aux difficultés rencontrées avec mon compte GitHub, bascule vers un déploiement par SSH.',
        'Migration de la base de données et mise en ligne de comptes de démonstration.',
      ],
      deliverable:
        'Une application en production, accessible au jury, avec des données de démonstration.',
      why: 'Une application qui ne tourne qu’en local ne peut pas être évaluée. Penser au déploiement tôt évite la mauvaise surprise de dernière minute.',
    },
    {
      number: 7,
      title: 'Mettre en place le flux de travail et les outils IA',
      goal: 'Aller vite sans perdre le contrôle de la qualité.',
      actions: [
        'GPT-5 comme assistant principal de développement.',
        'Gemini pour la reformulation et la recherche de précisions.',
        'Un système multi-agents exécuté en local avec Ollama, chaque agent ayant un rôle précis.',
        'Un cycle court pour chaque fonctionnalité : cadrage, implémentation, vérification, intégration.',
      ],
      deliverable: 'Un flux de travail reproductible et outillé.',
      why: 'L’IA multiplie la vitesse d’exécution, à condition d’être encadrée. Le flux définit qui fait quoi : l’IA propose, je décide et je vérifie.',
    },
  ];

  protected readonly backlog: BacklogLevel[] = [
    {
      level: 'MUST',
      meaning: 'Indispensable à la démo',
      color: 'bg-red-600',
      items: [
        'Connexion et adhésion des membres',
        'Événements et inscriptions (avec liste d’attente)',
        'Matching des profils',
        'QR code et scan de profil',
        'Mise en production',
      ],
    },
    {
      level: 'SHOULD',
      meaning: 'Important, prévu dans le sprint',
      color: 'bg-orange-500',
      items: [
        'Application mobile Android',
        'Bilinguisme français / allemand',
        'Espace d’administration du club',
      ],
    },
    {
      level: 'COULD',
      meaning: 'Si le temps le permet',
      color: 'bg-sky-600',
      items: [
        'Carte Mapbox des entreprises',
        'Messagerie entre membres',
        'Communauté et opportunités',
      ],
    },
    {
      level: 'WON’T (pour l’instant)',
      meaning: 'Reporté après le hackathon',
      color: 'bg-slate-500',
      items: [
        'Alerte de proximité sur mobile',
        'Notifications push',
        'CI/CD automatisée de bout en bout',
      ],
    },
  ];

  protected readonly rituals: Ritual[] = [
    {
      name: 'Sprint planning',
      classic: 'L’équipe choisit les éléments du backlog pour le sprint.',
      adapted: 'Définition de l’objectif du sprint et priorisation MoSCoW à la fin du cadrage.',
    },
    {
      name: 'Daily',
      classic: 'Point quotidien de 15 minutes en équipe.',
      adapted:
        'Point de contrôle personnel au début de chaque session : où j’en suis, quel est le prochain incrément, qu’est-ce qui bloque ?',
    },
    {
      name: 'Sprint review',
      classic: 'Démonstration du travail aux parties prenantes.',
      adapted:
        'Démonstration de chaque incrément terminé : je teste le parcours réel comme le ferait un membre.',
    },
    {
      name: 'Rétrospective',
      classic: 'L’équipe analyse sa façon de travailler.',
      adapted:
        'Courte analyse en fin de session : qu’est-ce qui a ralenti ? Faut-il réarbitrer ? (C’est ainsi qu’est née la décision du déploiement SSH.)',
    },
  ];

  protected readonly definitionOfDone = [
    'le parcours fonctionne de bout en bout, testé manuellement comme un vrai utilisateur ;',
    'les règles métier sont couvertes par des tests automatisés quand c’est pertinent ;',
    'l’API renvoie des réponses cohérentes, utilisables à la fois par le web et par le mobile ;',
    'l’interface est disponible en français et en allemand ;',
    'le code est relu (et non simplement accepté tel que proposé par l’IA).',
  ];

  protected readonly increments: Increment[] = [
    {
      number: 1,
      title: 'Backend Laravel',
      hours: 4,
      goal: 'Construire le socle : toutes les règles métier et l’API dont dépendent les deux clients.',
      content: [
        'Modèle de données et migrations.',
        'Authentification (session pour le web, jetons pour le mobile).',
        'Événements, inscriptions, liste d’attente.',
        'Algorithme de matching explicable.',
        'Jetons QR sécurisés.',
      ],
      done: [
        'Les points d’API répondent correctement.',
        'Les règles critiques sont testées.',
        'Des données de démonstration sont disponibles.',
      ],
      difficulty:
        'Bien séparer les deux clubs dès le départ, pour que le Club Ami puisse être enrichi plus tard sans tout réécrire.',
    },
    {
      number: 2,
      title: 'Application web Vue.js',
      hours: 4,
      goal: 'Rendre le backend utilisable par un vrai membre, depuis un navigateur.',
      content: [
        'Composants réutilisables (en-tête, cartes, formulaires).',
        'Pages : connexion, profil, événements, suggestions, QR code.',
        'Espace d’administration du club.',
        'Carte Mapbox des entreprises.',
      ],
      done: [
        'Un membre peut réaliser tous les parcours MUST depuis le web.',
        'L’interface fonctionne sur smartphone.',
      ],
      difficulty:
        'Garder les composants génériques pour éviter les copier-coller, tout en avançant vite.',
    },
    {
      number: 3,
      title: 'Application mobile Kotlin',
      hours: 6,
      goal: 'Offrir l’expérience native, pensée pour être utilisée debout pendant un événement.',
      content: [
        'Navigation et écrans en Jetpack Compose.',
        'Connexion par jeton et appels à l’API existante.',
        'Événements, matching, notifications dans l’application.',
        'Scan de QR code avec la caméra.',
      ],
      done: [
        'Les parcours principaux fonctionnent sur un vrai téléphone.',
        'L’application se connecte à l’API de production.',
      ],
      difficulty:
        'C’est l’incrément le plus long : tout l’affichage est réécrit en natif. Mais la logique, elle, reste sur le serveur.',
    },
    {
      number: 4,
      title: 'Déploiement et migration sur Azure',
      hours: 4,
      goal: 'Mettre l’ensemble en ligne pour le jury.',
      content: [
        'Configuration d’App Service et de la base MySQL.',
        'Script de démarrage (Nginx, stockage persistant, migrations).',
        'Déploiement par SSH.',
        'Chargement des comptes de démonstration.',
      ],
      done: [
        'L’application web répond en production.',
        'L’application mobile fonctionne avec l’API en ligne.',
        'Les comptes de démo permettent de se connecter.',
      ],
      difficulty:
        'La CI/CD n’a pas fonctionné à cause de difficultés avec mon compte GitHub. Plutôt que de bloquer, j’ai basculé vers un déploiement SSH.',
    },
  ];

  protected readonly risks: Risk[] = [
    {
      risk: 'Manque de temps',
      impact: 'Livraison incomplète.',
      response: 'Backlog MoSCoW et incréments livrables : ce qui est fait fonctionne déjà.',
    },
    {
      risk: 'Règles métier mal comprises',
      impact: 'Fonctionnalités à refaire.',
      response: 'Phase de questions avec Madame Emile avant de coder.',
    },
    {
      risk: 'Échec de la CI/CD',
      impact: 'Application non accessible au jury.',
      response: 'Déploiement manuel par SSH, plan B prêt.',
    },
    {
      risk: 'Coût des API externes',
      impact: 'Facturation imprévue.',
      response: 'Mapbox (palier gratuit généreux) plutôt que Google Maps.',
    },
    {
      risk: 'Perte des fichiers à chaque déploiement',
      impact: 'Photos et logos effacés.',
      response: 'Stockage persistant configuré dans le script de démarrage.',
    },
    {
      risk: 'Serveur indisponible pendant la démo',
      impact: 'Démonstration impossible.',
      response: 'Bascule automatique de l’application mobile vers un serveur de secours.',
    },
  ];

  protected readonly timeSlots: TimeSlot[] = [
    { label: 'Backend Laravel', hours: 4, color: 'bg-red-600' },
    { label: 'Application web Vue.js', hours: 4, color: 'bg-red-500' },
    { label: 'Application mobile Kotlin', hours: 6, color: 'bg-red-700' },
    { label: 'Déploiement & migration sur Azure', hours: 4, color: 'bg-slate-500' },
  ];

  protected readonly totalHours = this.timeSlots.reduce((sum, slot) => sum + slot.hours, 0);
  protected readonly maxHours = Math.max(...this.timeSlots.map((slot) => slot.hours));

  protected percent(hours: number): number {
    return Math.round((hours / this.totalHours) * 100);
  }
}
