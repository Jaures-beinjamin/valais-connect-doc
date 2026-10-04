import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface Step {
  number: number;
  title: string;
  summary: string;
  details: string[];
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
      lead="Valais Connect a été réalisé dans le cadre d'un hackathon de deux jours. Cette page retrace la démarche suivie, de la compréhension du besoin jusqu'à la mise en production."
      [toc]="toc"
    >
      <h2 id="contexte">Contexte : un hackathon de deux jours</h2>
      <p>
        Le cadre était celui d'un <strong>hackathon sur deux jours</strong> : un temps très court,
        un sujet ouvert et l'obligation de livrer une solution fonctionnelle, déployée et
        démontrable. Dans ces conditions, la méthode compte autant que le code : chaque heure doit
        produire une valeur visible.
      </p>
      <p>
        Je me suis appuyé sur mon expérience en <strong>ingénierie logicielle</strong> pour cadrer
        rapidement le problème, faire des choix techniques assumés et éviter les impasses coûteuses.
      </p>

      <h2 id="echanges">Phase de questions et d'échanges avec Madame Emile</h2>
      <p>
        Au départ, j'étais parti sur <strong>deux axes</strong> : le <strong>Club Ami</strong> et le
        <strong>Club Affaire</strong>. Avant d'écrire la moindre ligne de code, j'ai engagé une
        série de discussions avec <strong>Madame Emile</strong>, qui m'a éclairé sur toutes les
        spécificités métier :
      </p>
      <ul>
        <li>les mécanismes d'<strong>inscription</strong> des membres ;</li>
        <li>
          le fonctionnement des <strong>événements</strong> et de l'inscription aux événements ;
        </li>
        <li>les attentes propres à chaque club et ce qui les distingue.</li>
      </ul>
      <p>
        Ces échanges ont permis de recentrer le sujet : le <strong>Club Affaire</strong> était le
        cœur du hackathon. L'architecture a malgré tout été pensée pour accueillir les deux clubs
        comme des modules indépendants (voir
        <a routerLink="/architecture">Architecture globale</a>).
      </p>

      <h2 id="agile">Une approche agile : un sprint unique et intensif</h2>
      <p>
        Une fois la phase de questions terminée, je suis passé à une
        <strong>méthodologie agile</strong> avec un <strong>sprint complet</strong>, organisé en
        sessions de travail de <strong>7 heures non-stop</strong>. Le sprint était volontairement
        simple : un objectif clair (le Club Affaire), un périmètre maîtrisé et des livrables
        démontrables à chaque fin de session.
      </p>

      <app-callout type="note" title="Principe directeur">
        Mieux vaut un périmètre réduit mais complet, testé et déployé, qu'un périmètre large resté à
        l'état de maquette.
      </app-callout>

      <h2 id="etapes">Les 7 étapes de la démarche</h2>
      <ol class="not-doc mt-8 space-y-0">
        @for (step of steps; track step.number; let last = $last) {
          <li class="relative flex gap-5 pb-10">
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
            <div class="min-w-0 pt-1.5">
              <h3 class="!mt-0 !mb-1">{{ step.title }}</h3>
              <p class="!my-1 text-slate-600 dark:text-slate-400">{{ step.summary }}</p>
              <ul class="!my-3 text-sm">
                @for (detail of step.details; track detail) {
                  <li>{{ detail }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>

      <h2 id="temps">Répartition du temps de développement</h2>
      <p>
        Au total, environ <strong>{{ totalHours }} heures</strong> de travail effectif ont été
        consacrées à la réalisation technique, réparties ainsi :
      </p>
      <div
        class="my-6 space-y-4 rounded-2xl border border-slate-200 p-5 sm:p-6 dark:border-slate-800"
      >
        @for (slot of timeSlots; track slot.label) {
          <div>
            <div class="mb-1.5 flex items-baseline justify-between text-sm">
              <span class="font-medium text-slate-900 dark:text-white">{{ slot.label }}</span>
              <span class="font-mono text-slate-500">{{ slot.hours }} h</span>
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
        L'application mobile a demandé le plus de temps : c'est une application
        <strong>native</strong>, développée sans réutiliser le code du front web. Le déploiement,
        quant à lui, a consommé autant de temps que le backend à cause des difficultés rencontrées
        avec la CI/CD (voir <a routerLink="/deploiement">Déploiement Azure</a>).
      </p>

      <h2 id="lecons">Ce que la méthode a apporté</h2>
      <ul>
        <li>
          <strong>Moins de reprises :</strong> les questions posées en amont ont évité de développer
          des fonctionnalités hors sujet.
        </li>
        <li>
          <strong>Une architecture stable :</strong> posée sur papier puis validée, elle n'a pas été
          remise en cause pendant le sprint.
        </li>
        <li>
          <strong>Des contraintes assumées :</strong> coût (Mapbox plutôt que Google Maps), temps
          (déploiement SSH plutôt que CI/CD), évolutivité (mobile natif).
        </li>
        <li>
          <strong>Une IA encadrée :</strong> les outils IA ont accéléré l'exécution, mais les
          décisions sont restées humaines (voir
          <a routerLink="/workflow-ia">Workflow & outils IA</a>).
        </li>
      </ul>
    </app-doc-page>
  `,
})
export class MethodologyPage {
  protected readonly toc: TocItem[] = [
    { id: 'contexte', label: 'Contexte' },
    { id: 'echanges', label: 'Échanges avec Mme Emile' },
    { id: 'agile', label: 'Approche agile' },
    { id: 'etapes', label: 'Les 7 étapes' },
    { id: 'temps', label: 'Répartition du temps' },
    { id: 'lecons', label: 'Apports de la méthode' },
  ];

  protected readonly steps: Step[] = [
    {
      number: 1,
      title: 'Comprendre le problème',
      summary:
        'Analyser le sujet du hackathon et identifier les utilisateurs, leurs besoins et la valeur attendue.',
      details: [
        'Lecture du sujet et identification des deux univers : Club Ami et Club Affaire.',
        'Repérage des parcours essentiels : inscription, événements, mise en relation.',
      ],
    },
    {
      number: 2,
      title: 'Lever les zones d’ombre',
      summary: 'Clarifier chaque incompréhension grâce aux échanges avec Madame Emile.',
      details: [
        'Spécificités des mécanismes d’inscription des membres.',
        'Règles d’inscription aux événements.',
        'Recentrage du périmètre du hackathon sur le Club Affaire.',
      ],
    },
    {
      number: 3,
      title: 'Poser l’architecture sur papier',
      summary: 'Dessiner l’architecture client-serveur avant de toucher au clavier.',
      details: [
        'Un backend Laravel unique exposant une API.',
        'Deux modules indépendants : Club Ami et Club Affaire.',
        'Deux clients : l’application web Vue.js et l’application mobile Android.',
      ],
    },
    {
      number: 4,
      title: 'Faire reformuler, puis lister les contraintes',
      summary:
        'Soumettre l’architecture à Gemini pour obtenir une reformulation et des précisions, puis confronter le tout aux contraintes.',
      details: [
        'Reformulation par Gemini pour détecter les oublis et les ambiguïtés.',
        'Contraintes de temps : deux jours, un seul développeur.',
        'Contraintes de coût : préférer Mapbox à l’API Google Maps.',
        'Contraintes d’évolutivité : besoins natifs futurs (Bluetooth, etc.).',
      ],
    },
    {
      number: 5,
      title: 'Bâtir le web, puis le mobile natif',
      summary: 'Poser toutes les bases nécessaires côté web, puis concevoir l’architecture mobile.',
      details: [
        'Application Laravel embarquant le front Vue.js : les deux communiquent déjà ensemble.',
        'Front basé sur des composants réutilisables tout au long de la vie de l’application.',
        'Mobile en Kotlin natif plutôt qu’en cross-platform, avec une architecture à base de composables, proche de celle du front web.',
      ],
    },
    {
      number: 6,
      title: 'Penser le déploiement',
      summary:
        'Choisir Azure, provider sur lequel j’ai une solide expérience (App Service et services associés).',
      details: [
        'Difficultés rencontrées avec la CI/CD liée au compte GitHub.',
        'Décision pragmatique : déploiement par SSH pour tenir les délais.',
        'Migration de la base de données et mise en ligne des comptes de démonstration.',
      ],
    },
    {
      number: 7,
      title: 'Mettre en place le flux de travail et les outils IA',
      summary:
        'Une fois tous les éléments réunis, organiser le flux de travail et choisir les assistants IA.',
      details: [
        'GPT-5 et Gemini comme assistants principaux.',
        'Un système multi-agents exécuté en local avec Ollama.',
      ],
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
}
