import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

type ExistingStatus = 'yes' | 'partial' | 'none';
type AppStatus = 'yes' | 'soon';

interface KeptBenefit {
  benefit: string;
  club: string;
  addition: string;
}

interface Capability {
  category: string;
  capability: string;
  existing: ExistingStatus;
  existingNote: string;
  app: AppStatus;
  appNote: string;
}

interface JourneyMoment {
  period: string;
  before: string;
  after: string;
}

interface Highlight {
  rank: number;
  title: string;
  before: string;
  after: string;
}

@Component({
  selector: 'app-comparison-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Démarrer"
      title="Club existant vs Valais Connect"
      lead="Une comparaison directe entre l'offre actuelle du Club de la Foire du Valais et ce que Valais Connect y ajoute. Tous les avantages actuels sont conservés ; l'application ajoute un réseau d'affaires actif, toute l'année."
      [toc]="toc"
    >
      <!-- Face à face -->
      <div class="not-doc grid gap-4 md:grid-cols-2">
        <div class="rounded-3xl border-2 border-slate-200 p-6 dark:border-slate-800">
          <p class="text-xs font-bold tracking-widest text-slate-500 uppercase">Aujourd'hui</p>
          <p class="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            Club de la Foire du Valais
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            @for (item of todaySummary; track item) {
              <li class="flex gap-2">
                <span class="text-slate-400">•</span><span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
        <div
          class="rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-6 text-white shadow-lg shadow-red-900/20"
        >
          <p class="text-xs font-bold tracking-widest text-red-100 uppercase">
            Avec Valais Connect
          </p>
          <p class="mt-2 text-2xl font-extrabold">Le Club, toute l'année</p>
          <ul class="mt-4 space-y-2 text-sm">
            @for (item of tomorrowSummary; track item) {
              <li class="flex gap-2">
                <span>✓</span><span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Score -->
      <div class="not-doc my-8 grid grid-cols-3 gap-4">
        <div class="rounded-2xl border border-slate-200 p-5 text-center dark:border-slate-800">
          <p class="text-4xl font-extrabold text-slate-900 dark:text-white">
            {{ keptBenefits.length }}
          </p>
          <p class="mt-1 text-sm text-slate-500">avantages actuels conservés et renforcés</p>
        </div>
        <div class="rounded-2xl border-2 border-red-300 p-5 text-center dark:border-red-800">
          <p class="text-4xl font-extrabold text-red-600 dark:text-red-400">
            +{{ newCapabilities() }}
          </p>
          <p class="mt-1 text-sm text-slate-500">nouvelles capacités disponibles</p>
        </div>
        <div class="rounded-2xl border border-slate-200 p-5 text-center dark:border-slate-800">
          <p class="text-4xl font-extrabold text-slate-900 dark:text-white">365</p>
          <p class="mt-1 text-sm text-slate-500">jours de valeur par an, au lieu de 10</p>
        </div>
      </div>

      <!-- Avantages conservés -->
      <h2 id="conserves">1. Les avantages actuels : tous conservés, tous renforcés</h2>
      <p>
        Valais Connect ne retire rien à l'offre du club. Chaque avantage existant reste en place, et
        l'application lui donne une dimension supplémentaire.
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Avantage existant</th>
              <th>Formule</th>
              <th class="text-center">Conservé</th>
              <th>Ce que Valais Connect ajoute</th>
            </tr>
          </thead>
          <tbody>
            @for (row of keptBenefits; track row.benefit) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ row.benefit }}</td>
                <td class="text-xs whitespace-nowrap">{{ row.club }}</td>
                <td class="text-center text-emerald-600">✓</td>
                <td>{{ row.addition }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Matrice -->
      <h2 id="matrice">2. La matrice des capacités : avant / après</h2>
      <p>
        Le tableau ci-dessous compare, capacité par capacité, l'offre actuelle décrite sur la page
        officielle du club et ce que propose Valais Connect.
      </p>
      <div class="not-doc my-4 flex flex-wrap gap-3 text-xs">
        <span class="flex items-center gap-1.5"
          ><span
            class="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            >✓</span
          >
          Disponible</span
        >
        <span class="flex items-center gap-1.5"
          ><span
            class="rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            >◐</span
          >
          Partiel</span
        >
        <span class="flex items-center gap-1.5"
          ><span
            class="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-500 dark:bg-slate-800"
            >—</span
          >
          Non mentionné dans l'offre actuelle</span
        >
        <span class="flex items-center gap-1.5"
          ><span
            class="rounded bg-sky-100 px-1.5 py-0.5 font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            >⏳</span
          >
          En cours d'intégration</span
        >
      </div>

      @for (group of capabilityGroups(); track group.category) {
        <h3>{{ group.category }}</h3>
        <div
          class="not-doc overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th class="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">Capacité</th>
                <th class="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">
                  Club actuel
                </th>
                <th class="px-4 py-2.5 font-semibold text-red-600 dark:text-red-400">
                  Valais Connect
                </th>
              </tr>
            </thead>
            <tbody>
              @for (row of group.rows; track row.capability) {
                <tr class="border-t border-slate-100 align-top dark:border-slate-800">
                  <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {{ row.capability }}
                  </td>
                  <td class="px-4 py-3">
                    <span
                      class="mr-1.5 inline-block rounded px-1.5 py-0.5 text-xs font-bold"
                      [class]="existingBadge(row.existing)"
                      >{{ existingSymbol(row.existing) }}</span
                    >
                    <span class="text-slate-600 dark:text-slate-400">{{ row.existingNote }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span
                      class="mr-1.5 inline-block rounded px-1.5 py-0.5 text-xs font-bold"
                      [class]="appBadge(row.app)"
                      >{{ row.app === 'yes' ? '✓' : '⏳' }}</span
                    >
                    <span>{{ row.appNote }}</span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
      <p class="text-xs text-slate-500">
        Colonne « Club actuel » : établie à partir de la page officielle du Club de la Foire du
        Valais (foireduvalais.ch). « Non mentionné » signifie que la capacité ne figure pas dans
        l'offre publiée.
      </p>

      <!-- Parcours -->
      <h2 id="parcours">3. Une année de membre, avant et après</h2>
      <p>
        Prenons Claire, dirigeante d'un cabinet de conseil et membre du Club des Affaires. Voici son
        année avec le club, aujourd'hui et avec Valais Connect.
      </p>
      <div class="not-doc my-6 space-y-3">
        @for (moment of journey; track moment.period) {
          <div
            class="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[9rem_1fr_1fr] dark:border-slate-800"
          >
            <p class="font-bold text-slate-900 dark:text-white">{{ moment.period }}</p>
            <div class="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900">
              <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Aujourd'hui</p>
              <p class="mt-1">{{ moment.before }}</p>
            </div>
            <div class="rounded-xl bg-red-50 p-3 text-sm dark:bg-red-950/30">
              <p class="text-xs font-bold tracking-wider text-red-600 uppercase dark:text-red-400">
                Avec Valais Connect
              </p>
              <p class="mt-1">{{ moment.after }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Ce qui me démarque -->
      <h2 id="demarque">4. Ce qui démarque Valais Connect</h2>
      <p>Les cinq apports qui changent le plus l'expérience du Club des Affaires :</p>
      <div class="not-doc my-6 space-y-4">
        @for (item of highlights; track item.rank) {
          <div class="flex gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <span
              class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-600 text-lg font-extrabold text-white"
            >
              {{ item.rank }}
            </span>
            <div class="min-w-0">
              <p class="text-lg font-bold text-slate-900 dark:text-white">{{ item.title }}</p>
              <div class="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                <p><span class="font-semibold text-slate-500">Avant : </span>{{ item.before }}</p>
                <p>
                  <span class="font-semibold text-red-600 dark:text-red-400">Après : </span
                  >{{ item.after }}
                </p>
              </div>
            </div>
          </div>
        }
      </div>

      <app-callout type="note" title="En résumé pour le jury">
        Le Club de la Foire offre aujourd'hui des <strong>privilèges</strong> : accès, invitations,
        apéritifs, cadeaux. Valais Connect y ajoute un <strong>réseau</strong> : savoir qui
        rencontrer, le rencontrer, échanger, conclure des affaires et mesurer les résultats. Les
        membres actuels obtiennent davantage sans payer plus, les nouveaux membres trouvent une
        raison concrète d'adhérer, et le club dispose enfin d'indicateurs pour prouver sa valeur.
      </app-callout>
      <p>
        Pour l'analyse détaillée par public et les mécanismes de fidélisation, voir
        <a routerLink="/valeur-ajoutee">Valeur ajoutée</a>.
      </p>
    </app-doc-page>
  `,
})
export class ComparisonPage {
  protected readonly toc: TocItem[] = [
    { id: 'conserves', label: 'Avantages conservés' },
    { id: 'matrice', label: 'Matrice avant / après' },
    { id: 'parcours', label: 'Une année de membre' },
    { id: 'demarque', label: 'Ce qui démarque' },
  ];

  protected readonly todaySummary = [
    'Plus de 500 membres, deux formules (Amis CHF 150, Affaires CHF 500).',
    'Carte de membre envoyée chaque année en juillet.',
    'Avantages concentrés sur les 10 jours de la Foire.',
    'Invitations aux événements officiels et à la Soirée WOW.',
    'Liste des membres du Club des Affaires, sans coordonnées.',
    'Inscription par formulaire, gestion par le secrétariat.',
    'Site du club disponible en français et en allemand.',
  ];

  protected readonly tomorrowSummary = [
    'Tous les avantages actuels, conservés.',
    'Entièrement en français et en allemand, sur le web et sur mobile.',
    'Carte de membre digitale et QR code dans le téléphone.',
    'Suggestions de rencontres par matching explicable.',
    'Mise en relation, messagerie bilingue et rendez-vous d’affaires.',
    'Opportunités, communauté et mentorat toute l’année.',
    'Affaires conclues et impact mesurés ; back-office pour le club.',
  ];

  protected readonly keptBenefits: KeptBenefit[] = [
    {
      benefit: 'Carte membre personnalisée (10 jours de Foire)',
      club: 'Amis · Affaires',
      addition:
        'Carte digitale avec saison et validité, toujours dans la poche, et QR code personnel sécurisé.',
    },
    {
      benefit: 'Invitation à l’avant-première officielle',
      club: 'Amis · Affaires',
      addition:
        'Événement visible dans l’application, inscription en un clic et rappel par notification.',
    },
    {
      benefit: 'Coffret collector de l’édition',
      club: 'Amis · Affaires',
      addition: 'Rappelé dans la page Avantages, avec les informations de retrait.',
    },
    {
      benefit: 'Apéritif quotidien des partenaires',
      club: 'Amis · Affaires',
      addition: 'Liste des partenaires et programme des apéritifs accessibles dans l’application.',
    },
    {
      benefit: 'Avantages surprises durant l’année',
      club: 'Amis · Affaires',
      addition:
        'Annoncés par notification et dans le résumé hebdomadaire, dans la langue du membre.',
    },
    {
      benefit: 'Accès gratuit aux manifestations myexpo',
      club: 'Amis · Affaires',
      addition: 'Inscription, liste d’attente automatique et check-in par QR code.',
    },
    {
      benefit: 'Accès à l’Espace Partenaires',
      club: 'Affaires',
      addition: 'Scan de profil en un clic pour transformer chaque rencontre en contact.',
    },
    {
      benefit: 'Places réservées au Rendez-vous économique',
      club: 'Affaires',
      addition:
        'Liste des participants et rendez-vous d’affaires planifiés à l’avance (table, horaire, message).',
    },
    {
      benefit: 'Journées officielles Agrovina et Your Challenge',
      club: 'Affaires',
      addition:
        'Événements réservés au Club des Affaires, avec inscription et participants visibles.',
    },
    {
      benefit: 'Accès privilégié à d’autres événements',
      club: 'Affaires',
      addition: 'Filtre « réservé Affaires » et notification en cas de place libérée.',
    },
    {
      benefit: 'Liste des membres du Club des Affaires',
      club: 'Affaires',
      addition: 'Annuaire filtrable, matching et coordonnées dévoilées après accord mutuel.',
    },
    {
      benefit: 'Soirée WOW',
      club: 'Affaires',
      addition:
        'Scan de QR code pendant la soirée, puis suite de la conversation dans la messagerie.',
    },
  ];

  protected readonly capabilities: Capability[] = [
    // Adhésion
    {
      category: 'Adhésion et carte de membre',
      capability: 'Carte de membre',
      existing: 'yes',
      existingNote: 'Carte physique envoyée en juillet.',
      app: 'yes',
      appNote: 'Carte digitale avec saison, validité et QR code.',
    },
    {
      category: 'Adhésion et carte de membre',
      capability: 'Adhésion en ligne',
      existing: 'partial',
      existingNote: 'Bouton « Je m’inscris » vers un formulaire.',
      app: 'yes',
      appNote: 'Parcours complet avec photo, entreprise, offres et besoins ; suivi du statut.',
    },
    {
      category: 'Adhésion et carte de membre',
      capability: 'Cartes supplémentaires (Affaires)',
      existing: 'yes',
      existingNote: 'Jusqu’à 2 cartes non nominatives à acheter.',
      app: 'yes',
      appNote: 'Demande et suivi des cartes en ligne (demandée, active, révoquée).',
    },
    {
      category: 'Adhésion et carte de membre',
      capability: 'Suivi de l’adhésion et renouvellement',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Statut, validité, alerte 45 jours avant l’échéance et lien de renouvellement.',
    },
    {
      category: 'Adhésion et carte de membre',
      capability: 'Accueil des nouveaux membres',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Parcours Club guidé en 8 étapes avec progression.',
    },
    // Réseau
    {
      category: 'Réseau d’affaires',
      capability: 'Liste des membres',
      existing: 'partial',
      existingNote: 'Accès à la liste, sans coordonnées.',
      app: 'yes',
      appNote: 'Annuaire filtrable par région, secteur, langue, compétences, offres et besoins.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Coordonnées des membres',
      existing: 'none',
      existingNote: 'Non communiquées.',
      app: 'yes',
      appNote: 'Dévoilées dès que les deux membres acceptent la mise en relation.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Suggestions de rencontres',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Matching explicable : score de 0 à 100 et raisons affichées.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Rencontre du mois',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Un membre mis en avant chaque mois par le club.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Mise en relation et introduction',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Demande consentie, présentation par un tiers, suivi jusqu’à l’affaire conclue.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Messagerie entre membres',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Conversations privées, pièces jointes, accusés de lecture.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Réputation des membres',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Avis de 1 à 5 étoiles après une rencontre.',
    },
    {
      category: 'Réseau d’affaires',
      capability: 'Carte des entreprises du Valais',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Carte Mapbox des entreprises membres.',
    },
    // Langues
    {
      category: 'Langues : français et allemand',
      capability: 'Langue de la plateforme',
      existing: 'yes',
      existingNote: 'Page du club disponible en français et en allemand.',
      app: 'yes',
      appNote:
        'Application web et application Android entièrement en français et en allemand ; la langue se choisit en un clic et suit le membre sur tous ses appareils.',
    },
    {
      category: 'Langues : français et allemand',
      capability: 'Contenus et communications',
      existing: 'partial',
      existingNote: 'Informations du club sur le site, en FR et DE.',
      app: 'yes',
      appNote:
        'Événements, groupes, notifications, e-mails et résumé hebdomadaire dans la langue de chaque membre.',
    },
    {
      category: 'Langues : français et allemand',
      capability: 'Rapprocher francophones et germanophones',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote:
        'Matching qui rapproche les offres et besoins écrits en FR et en DE (synonymes, ex. Treuhand = fiduciaire).',
    },
    {
      category: 'Langues : français et allemand',
      capability: 'Traduction des échanges',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Bouton « Traduire » dans la messagerie pour le vocabulaire métier FR ↔ DE.',
    },
    {
      category: 'Langues : français et allemand',
      capability: 'Mesure des liens entre les deux régions linguistiques',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote:
        'Le tableau de bord du club compte les mises en relation entre francophones et germanophones.',
    },
    // Événements
    {
      category: 'Événements',
      capability: 'Invitations aux événements du club',
      existing: 'yes',
      existingNote: 'Avant-première, Journées officielles, Soirée WOW.',
      app: 'yes',
      appNote: 'Tous les événements dans l’application, filtrables par période, format et accès.',
    },
    {
      category: 'Événements',
      capability: 'Inscription et liste d’attente',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Inscription en un clic, liste d’attente et promotion automatique.',
    },
    {
      category: 'Événements',
      capability: 'Voir les participants',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Liste des participants confirmés, pour préparer ses rencontres.',
    },
    {
      category: 'Événements',
      capability: 'Rendez-vous d’affaires planifiés',
      existing: 'partial',
      existingNote: 'Places réservées au Rendez-vous économique.',
      app: 'yes',
      appNote: 'Proposer une table, un horaire et un message à un autre participant.',
    },
    {
      category: 'Événements',
      capability: 'Échange de contact sur place',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Scan du QR code d’un membre en un clic.',
    },
    {
      category: 'Événements',
      capability: 'Alerte de proximité',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Notification quand un membre pertinent est à proximité.',
    },
    {
      category: 'Événements',
      capability: 'Check-in à l’entrée',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Check-in par QR code, y compris pour les pass partagés.',
    },
    {
      category: 'Événements',
      capability: 'Représenter son entreprise',
      existing: 'partial',
      existingNote: 'Cartes non nominatives à prêter.',
      app: 'yes',
      appNote: 'Pass d’événement partagé avec un collaborateur, avec son propre QR code.',
    },
    // Toute l'année
    {
      category: 'Toute l’année',
      capability: 'Opportunités d’affaires',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Besoins, offres, appels d’offres, consortiums, transmissions d’entreprise.',
    },
    {
      category: 'Toute l’année',
      capability: 'Communauté et groupes',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Actualités, recrutements, groupes thématiques, commentaires.',
    },
    {
      category: 'Toute l’année',
      capability: 'Mentorat',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Mentors approuvés et membres en recherche de mentor.',
    },
    {
      category: 'Toute l’année',
      capability: 'Informations régulières',
      existing: 'partial',
      existingNote: '« Avantages surprises » et flyer annuel.',
      app: 'yes',
      appNote: 'Notifications, résumé hebdomadaire et relances après rencontre.',
    },
    {
      category: 'Toute l’année',
      capability: 'Application mobile',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Application Android native.',
    },
    // Club
    {
      category: 'Pour le club',
      capability: 'Gestion des membres',
      existing: 'partial',
      existingNote: 'Secrétariat.',
      app: 'yes',
      appNote: 'Back-office : validation, paiements, cartes, invitations, renouvellements.',
    },
    {
      category: 'Pour le club',
      capability: 'Mesure de la valeur du club',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Rencontres, affaires conclues, montants, liens entre régions et entre langues.',
    },
    {
      category: 'Pour le club',
      capability: 'Traçabilité',
      existing: 'none',
      existingNote: 'Non mentionné.',
      app: 'yes',
      appNote: 'Journal d’audit et exports CSV.',
    },
  ];

  protected readonly capabilityGroups = computed(() => {
    const groups: { category: string; rows: Capability[] }[] = [];
    for (const capability of this.capabilities) {
      let group = groups.find((item) => item.category === capability.category);
      if (!group) {
        group = { category: capability.category, rows: [] };
        groups.push(group);
      }
      group.rows.push(capability);
    }
    return groups;
  });

  protected readonly newCapabilities = computed(
    () => this.capabilities.filter((row) => row.existing === 'none' && row.app === 'yes').length,
  );

  protected readonly journey: JourneyMoment[] = [
    {
      period: 'Juillet',
      before: 'Claire reçoit sa carte de membre par courrier.',
      after:
        'Sa carte digitale est déjà dans son téléphone. Elle met à jour ses offres et ses besoins : le matching lui propose immédiatement des membres à rencontrer.',
    },
    {
      period: 'Avant la Foire',
      before: 'Elle sait qu’elle a des places réservées au Rendez-vous économique.',
      after:
        'Elle consulte les participants confirmés et planifie trois rendez-vous d’affaires avec table et horaire.',
    },
    {
      period: 'Pendant la Foire',
      before:
        'Elle profite de l’apéritif et de la Soirée WOW, et rencontre les personnes qu’elle croise.',
      after:
        'Une notification lui signale que Nathalie, fiduciaire avec qui elle a une forte compatibilité, est à quelques mètres ; elle scanne ensuite son QR code en un clic.',
    },
    {
      period: 'Après la Foire',
      before: 'Les cartes de visite échangées restent souvent dans un tiroir.',
      after:
        'Elle poursuit les échanges dans la messagerie, traduit un message en allemand d’un membre du Haut-Valais et reçoit une relance 14 jours après la rencontre.',
    },
    {
      period: 'Toute l’année',
      before: 'Quelques avantages surprises et invitations ponctuelles.',
      after:
        'Résumé chaque lundi, rencontre du mois, opportunités d’affaires, groupes, mentorat : elle revient régulièrement.',
    },
    {
      period: 'Renouvellement',
      before: 'Elle renouvelle par habitude, sans savoir ce que le club lui a rapporté.',
      after:
        'Elle est prévenue 45 jours avant l’échéance et voit son bilan : mises en relation, rencontres, affaires conclues et leur montant.',
    },
  ];

  protected readonly highlights: Highlight[] = [
    {
      rank: 1,
      title: 'Le matching explicable',
      before: 'Une liste de membres, sans indication de qui rencontrer.',
      after: 'Des suggestions classées par score, avec les raisons du match.',
    },
    {
      rank: 2,
      title: 'La mise en relation et la messagerie',
      before: 'Pas de coordonnées dans la liste des membres.',
      after: 'Contact consenti, messagerie privée et traduction FR ↔ DE.',
    },
    {
      rank: 3,
      title: 'Le scan de profil et la géolocalisation',
      before: 'Les rencontres de la Foire dépendent du hasard.',
      after: 'Une alerte signale le bon contact à proximité, et un scan suffit pour le garder.',
    },
    {
      rank: 4,
      title: 'Les rendez-vous d’affaires planifiés',
      before: 'Des places réservées au Rendez-vous économique.',
      after: 'Des rendez-vous préparés à l’avance avec les bons participants.',
    },
    {
      rank: 5,
      title: 'La valeur mesurée',
      before: 'Impossible de chiffrer ce que l’adhésion rapporte.',
      after: 'Rencontres, affaires conclues et montants suivis pour chaque membre et pour le club.',
    },
  ];

  protected existingSymbol(status: ExistingStatus): string {
    return { yes: '✓', partial: '◐', none: '—' }[status];
  }

  protected existingBadge(status: ExistingStatus): string {
    return {
      yes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      partial: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      none: 'bg-slate-100 text-slate-500 dark:bg-slate-800',
    }[status];
  }

  protected appBadge(status: AppStatus): string {
    return status === 'yes'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
      : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300';
  }
}
