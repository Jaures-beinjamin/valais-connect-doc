import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface ExistingBenefit {
  benefit: string;
  detail: string;
  amis: boolean;
  affaires: boolean;
}

interface Upgrade {
  existing: string;
  withApp: string;
  where: string;
}

interface ValueCard {
  title: string;
  text: string;
}

interface Audience {
  title: string;
  subtitle: string;
  color: string;
  points: ValueCard[];
}

interface LoopStep {
  name: string;
  text: string;
}

interface RetentionLever {
  lever: string;
  how: string;
  rhythm: string;
}

interface Differentiator {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-value-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Démarrer"
      title="Valeur ajoutée"
      lead="Le Club de la Foire du Valais existe et fonctionne déjà. Cette page explique ce qu'il offre aujourd'hui, et ce que Valais Connect ajoute concrètement pour les membres actuels, les nouveaux membres du Club des Affaires et le club lui-même."
      [toc]="toc"
    >
      <!-- Message clé -->
      <div
        class="not-doc rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-6 text-white shadow-lg shadow-red-900/20 sm:p-8"
      >
        <p class="text-xs font-bold tracking-widest text-red-100 uppercase">En une phrase</p>
        <p class="mt-3 text-xl leading-8 font-semibold sm:text-2xl">
          Aujourd'hui, l'adhésion au club se vit surtout pendant les 10 jours de la Foire. Valais
          Connect la fait vivre 365 jours par an, et transforme une carte de membre en un réseau
          d'affaires actif, mesurable et bilingue français / allemand.
        </p>
      </div>

      <!-- Existant -->
      <h2 id="existant">Ce qui existe aujourd'hui</h2>
      <p>
        Le <strong>Club Foire du Valais</strong>, créé avec ses partenaires, réunit aujourd'hui
        <strong>plus de 500 membres</strong>. Il propose deux formules, valables un an, de mi-août à
        mi-août :
      </p>
      <div class="not-doc my-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <p class="text-sm font-semibold tracking-wide text-slate-500 uppercase">Club des Amis</p>
          <p class="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">CHF 150.– / an</p>
          <p class="mt-2 text-sm leading-6">
            Pour les particuliers : avantages exclusifs pendant la Foire (soirée de pré-ouverture,
            apéritif quotidien) et entrée offerte aux autres manifestations myexpo.
          </p>
        </div>
        <div class="rounded-2xl border-2 border-red-300 p-5 dark:border-red-800">
          <p class="text-sm font-semibold tracking-wide text-red-600 uppercase dark:text-red-400">
            Club des Affaires
          </p>
          <p class="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">CHF 500.– / an</p>
          <p class="mt-2 text-sm leading-6">
            Pour les entrepreneurs, dirigeants et commerciaux : événements à vocation business, et
            jusqu'à deux cartes supplémentaires non nominatives pour inviter collaborateurs, clients
            ou partenaires.
          </p>
        </div>
      </div>

      <h3>Les avantages actuels</h3>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Avantage</th>
              <th class="text-center">Amis</th>
              <th class="text-center">Affaires</th>
            </tr>
          </thead>
          <tbody>
            @for (row of existingBenefits; track row.benefit) {
              <tr>
                <td>
                  <span class="font-medium text-slate-900 dark:text-white">{{ row.benefit }}</span>
                  @if (row.detail) {
                    <span class="block text-xs text-slate-500">{{ row.detail }}</span>
                  }
                </td>
                <td class="text-center">{{ row.amis ? '✓' : '—' }}</td>
                <td class="text-center">{{ row.affaires ? '✓' : '—' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p class="text-xs text-slate-500">
        Source : page officielle du Club de la Foire du Valais (foireduvalais.ch). * sous réserve de
        disponibilité · ** informations de contact non communiquées.
      </p>

      <!-- Constats -->
      <h2 id="constats">Ce que l'on peut encore améliorer</h2>
      <p>
        Les avantages actuels sont attractifs. Mais en regardant le parcours d'un membre sur
        l'année, plusieurs opportunités apparaissent :
      </p>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-2">
        @for (finding of findings; track finding.title) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="font-semibold text-slate-900 dark:text-white">{{ finding.title }}</p>
            <p class="mt-2 text-sm leading-6">{{ finding.text }}</p>
          </div>
        }
      </div>
      <app-callout type="note" title="L'enjeu">
        Un membre du Club des Affaires paie CHF 500.– par an. Pour qu'il renouvelle, il doit pouvoir
        répondre à une question simple : « Qu'est-ce que le club m'a rapporté cette année ? ».
        Valais Connect lui donne la réponse.
      </app-callout>

      <!-- Existant → App -->
      <app-callout type="tip" title="Comparaison complète">
        La matrice détaillée « avant / après », capacité par capacité, est présentée dans
        <a routerLink="/comparaison">Club existant vs Valais Connect</a>.
      </app-callout>

      <h2 id="avant-apres">Chaque avantage existant, renforcé par l'application</h2>
      <p>
        Valais Connect ne remplace aucun avantage du club : il les <strong>prolonge</strong> et les
        rend <strong>utilisables au quotidien</strong>.
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Aujourd'hui</th>
              <th>Avec Valais Connect</th>
              <th>Où</th>
            </tr>
          </thead>
          <tbody>
            @for (upgrade of upgrades; track upgrade.existing) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ upgrade.existing }}</td>
                <td>{{ upgrade.withApp }}</td>
                <td class="text-xs whitespace-nowrap">{{ upgrade.where }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Publics -->
      <h2 id="publics">La valeur, pour chaque public</h2>
      @for (audience of audiences; track audience.title) {
        <div
          class="not-doc my-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          <div class="px-5 py-4 text-white {{ audience.color }}">
            <p class="text-lg font-bold">{{ audience.title }}</p>
            <p class="text-sm opacity-90">{{ audience.subtitle }}</p>
          </div>
          <div class="grid gap-px bg-slate-200 sm:grid-cols-2 dark:bg-slate-800">
            @for (point of audience.points; track point.title) {
              <div class="bg-white p-5 dark:bg-slate-950">
                <p class="font-semibold text-slate-900 dark:text-white">{{ point.title }}</p>
                <p class="mt-1.5 text-sm leading-6">{{ point.text }}</p>
              </div>
            }
          </div>
        </div>
      }

      <!-- Rétention -->
      <h2 id="retention">Comment l'application garde les membres actifs toute l'année</h2>
      <p>
        Garder un membre, ce n'est pas lui envoyer une facture en juillet : c'est lui apporter de la
        valeur <strong>régulièrement</strong>. Valais Connect s'appuie sur une
        <strong>boucle d'engagement</strong> : chaque étape amène naturellement à la suivante.
      </p>
      <div class="not-doc my-8 grid gap-3 sm:grid-cols-5">
        @for (step of loop; track step.name; let index = $index; let last = $last) {
          <div
            class="relative rounded-2xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/30"
          >
            <span
              class="mx-auto grid h-8 w-8 place-items-center rounded-full bg-red-600 text-sm font-bold text-white"
            >
              {{ index + 1 }}
            </span>
            <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ step.name }}</p>
            <p class="mt-1 text-xs leading-5">{{ step.text }}</p>
            @if (!last) {
              <span class="absolute top-1/2 -right-3 hidden -translate-y-1/2 text-red-400 sm:block"
                >→</span
              >
            }
          </div>
        }
      </div>
      <p class="text-center text-sm text-slate-500">
        … et la boucle recommence : chaque affaire conclue est une raison de renouveler.
      </p>

      <h3>Les leviers de fidélisation intégrés</h3>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Levier</th>
              <th>Comment il agit</th>
              <th>Rythme</th>
            </tr>
          </thead>
          <tbody>
            @for (lever of retentionLevers; track lever.lever) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ lever.lever }}</td>
                <td>{{ lever.how }}</td>
                <td class="text-xs whitespace-nowrap">{{ lever.rhythm }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <app-callout type="tip" title="Le renouvellement devient une évidence">
        Au moment de renouveler, le membre voit dans l'application ses mises en relation, ses
        rencontres, ses affaires conclues et leur montant. Le club peut lui montrer, chiffres à
        l'appui, ce que son adhésion lui a rapporté.
      </app-callout>

      <!-- Mobile vs web -->
      <h2 id="mobile-web">La valeur du mobile et du web</h2>
      <p>
        Les deux applications ne font pas doublon : elles couvrent deux moments différents de la vie
        du membre.
      </p>
      <div class="not-doc my-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-emerald-200 p-5 dark:border-emerald-900">
          <p class="text-2xl">📱</p>
          <p class="mt-2 text-lg font-bold text-slate-900 dark:text-white">
            Le mobile : sur le terrain
          </p>
          <p class="mt-1 text-sm text-slate-500">
            Pendant la Foire, le Rendez-vous économique, la Soirée WOW, les apéritifs.
          </p>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm marker:text-emerald-500">
            @for (item of mobileValue; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div class="rounded-2xl border border-sky-200 p-5 dark:border-sky-900">
          <p class="text-2xl">💻</p>
          <p class="mt-2 text-lg font-bold text-slate-900 dark:text-white">Le web : au bureau</p>
          <p class="mt-1 text-sm text-slate-500">
            Avant et après les événements, et toute l'année.
          </p>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm marker:text-sky-500">
            @for (item of webValue; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
      </div>

      <!-- Différenciation -->
      <h2 id="innovations">Les innovations qui font la différence pour le Club des Affaires</h2>
      <p>
        Au-delà de ce qui existe déjà, voici ce que Valais Connect apporte et qu'aucun avantage
        actuel du club ne propose :
      </p>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (item of differentiators; track item.title) {
          <div
            class="rounded-2xl border border-slate-200 p-5 transition hover:border-red-300 dark:border-slate-800"
          >
            <p class="text-2xl">{{ item.icon }}</p>
            <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
            <p class="mt-1.5 text-sm leading-6">{{ item.text }}</p>
          </div>
        }
      </div>
      <p>
        Le détail de chaque fonctionnalité est décrit dans
        <a routerLink="/fonctionnalites">Fonctionnalités (web & mobile)</a>.
      </p>

      <!-- Indicateurs -->
      <h2 id="mesure">Une valeur mesurable</h2>
      <p>
        L'espace d'administration calcule en continu les indicateurs qui prouvent la valeur du club,
        pour les membres comme pour les partenaires et sponsors :
      </p>
      <ul>
        <li>nombre de membres actifs, nouveaux membres et renouvellements à venir ;</li>
        <li>taux d'acceptation des demandes de mise en relation ;</li>
        <li>nombre de rencontres réalisées ;</li>
        <li><strong>nombre d'affaires conclues et montant total généré entre membres</strong> ;</li>
        <li>
          liens entre régions (Bas-Valais, Valais central, Haut-Valais) et entre francophones et
          germanophones ;
        </li>
        <li>évolution sur 8 semaines des demandes, acceptations et affaires conclues.</li>
      </ul>
      <app-callout type="note" title="Un argument pour le club et ses partenaires">
        Pour la première fois, le Club des Affaires peut dire : « cette année, nos membres ont
        réalisé X rencontres et conclu Y affaires pour un montant de Z francs ». C'est un argument
        fort pour fidéliser les membres, en attirer de nouveaux et valoriser les partenaires.
      </app-callout>
    </app-doc-page>
  `,
})
export class ValuePage {
  protected readonly toc: TocItem[] = [
    { id: 'existant', label: 'Ce qui existe aujourd’hui' },
    { id: 'constats', label: 'Ce que l’on peut améliorer' },
    { id: 'avant-apres', label: 'Avantages renforcés' },
    { id: 'publics', label: 'Valeur par public' },
    { id: 'retention', label: 'Garder les membres actifs' },
    { id: 'mobile-web', label: 'Mobile et web' },
    { id: 'innovations', label: 'Innovations' },
    { id: 'mesure', label: 'Une valeur mesurable' },
  ];

  protected readonly existingBenefits: ExistingBenefit[] = [
    {
      benefit: 'Carte membre personnalisée',
      detail: 'Accès durant les 10 jours de la Foire du Valais',
      amis: true,
      affaires: true,
    },
    {
      benefit: 'Invitation à l’avant-première officielle',
      detail: 'Verre de bienvenue, raclette, musique live, visite exclusive de l’Expo',
      amis: true,
      affaires: true,
    },
    {
      benefit: 'Coffret collector de l’édition',
      detail: 'À retirer lors de l’avant-première ou au secrétariat',
      amis: true,
      affaires: true,
    },
    {
      benefit: 'Apéritif quotidien du Club',
      detail: 'Offert par les partenaires Axius, Bornet, Groupe Volet et QoQa',
      amis: true,
      affaires: true,
    },
    { benefit: 'Avantages surprises durant l’année', detail: '', amis: true, affaires: true },
    {
      benefit: 'Accès gratuit aux autres manifestations myexpo *',
      detail: '',
      amis: true,
      affaires: true,
    },
    {
      benefit: 'Accès à l’Espace Partenaires durant la Foire',
      detail: '',
      amis: false,
      affaires: true,
    },
    {
      benefit: 'Places réservées au Rendez-vous économique',
      detail: '',
      amis: false,
      affaires: true,
    },
    {
      benefit: 'Invitation aux Journées officielles Agrovina et Your Challenge',
      detail: '',
      amis: false,
      affaires: true,
    },
    { benefit: 'Accès privilégié à d’autres événements', detail: '', amis: false, affaires: true },
    {
      benefit: 'Accès à la liste des membres « Club des Affaires » **',
      detail: '',
      amis: false,
      affaires: true,
    },
    { benefit: 'Soirée WOW', detail: '', amis: false, affaires: true },
  ];

  protected readonly findings: ValueCard[] = [
    {
      title: 'Une valeur concentrée sur 10 jours',
      text: 'La plupart des avantages se vivent pendant la Foire. Le reste de l’année, le lien entre le membre et le club est plus ténu.',
    },
    {
      title: 'Une liste de membres sans contact',
      text: 'Les membres du Club des Affaires ont accès à la liste des membres, mais sans informations de contact. Savoir qui est membre ne suffit pas pour savoir qui rencontrer, ni comment le joindre.',
    },
    {
      title: 'Des rencontres laissées au hasard',
      text: 'Au Rendez-vous économique ou à la Soirée WOW, on rencontre souvent les personnes qu’on connaît déjà, ou celles qu’on croise par hasard.',
    },
    {
      title: 'Une valeur difficile à mesurer',
      text: 'Ni le membre ni le club ne peuvent chiffrer ce que l’adhésion a rapporté : contacts, rencontres, affaires conclues.',
    },
    {
      title: 'Un club bilingue, des échanges séparés',
      text: 'Le Valais romand et le Haut-Valais germanophone se côtoient à la Foire, mais la langue reste une barrière pour faire des affaires ensemble.',
    },
    {
      title: 'Une gestion encore manuelle',
      text: 'Inscriptions, paiements, cartes, invitations, renouvellements : autant de tâches qui reposent sur le secrétariat.',
    },
  ];

  protected readonly upgrades: Upgrade[] = [
    {
      existing: 'Carte membre personnalisée (physique)',
      withApp:
        'Carte de membre digitale toujours dans la poche, avec saison, validité et QR code personnel sécurisé.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Accès à la liste des membres, sans contact',
      withApp:
        'Annuaire filtrable (région, secteur, langue, compétences, offres, besoins), suggestions par matching expliqué, et coordonnées dévoilées dès que la mise en relation est acceptée par les deux.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Places réservées au Rendez-vous économique',
      withApp:
        'Liste des participants confirmés et rendez-vous d’affaires planifiés à l’avance : table, horaire, message.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Accès privilégié aux événements',
      withApp:
        'Inscription en un clic, liste d’attente automatique, rappel par notification et check-in par QR code.',
      where: 'Mobile · Web',
    },
    {
      existing: '2 cartes supplémentaires non nominatives',
      withApp:
        'Demande et suivi des cartes dans l’application, et partage de pass d’événement avec les collaborateurs de l’entreprise.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Apéritif quotidien et partenaires',
      withApp:
        'Page Avantages avec la liste des partenaires, les apéritifs et les documents officiels du club.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Avantages surprises durant l’année',
      withApp:
        'Notifications et résumé hebdomadaire pour ne rien manquer, dans la langue du membre.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Soirée WOW, Espace Partenaires',
      withApp:
        'Scan d’un profil en un clic pendant la soirée, puis suite de la conversation dans la messagerie.',
      where: 'Mobile',
    },
    {
      existing: 'Site du club en français et en allemand',
      withApp:
        'Application web et mobile entièrement en français et en allemand : interface, événements, notifications, e-mails, matching entre les deux langues et traduction des messages.',
      where: 'Mobile · Web',
    },
    {
      existing: 'Inscription par formulaire',
      withApp:
        'Adhésion en ligne avec photo, choix de l’entreprise, offres et besoins ; validation par le club dans son back-office.',
      where: 'Mobile · Web',
    },
  ];

  protected readonly audiences: Audience[] = [
    {
      title: 'Pour les membres actuels du Club des Affaires',
      subtitle: 'Ils paient déjà leur adhésion : ils obtiennent davantage, sans payer plus.',
      color: 'bg-gradient-to-r from-red-600 to-red-700',
      points: [
        {
          title: 'Des rencontres ciblées',
          text: 'Le matching leur indique qui rencontrer et pourquoi, au lieu de compter sur le hasard.',
        },
        {
          title: 'Un réseau joignable',
          text: 'La liste des membres devient un annuaire vivant, avec mise en relation consentie et messagerie privée.',
        },
        {
          title: 'Des événements plus rentables',
          text: 'Ils préparent le Rendez-vous économique en planifiant leurs rendez-vous et en consultant les participants.',
        },
        {
          title: 'Des affaires concrètes',
          text: 'Ils publient leurs besoins et leurs offres, répondent aux opportunités et suivent leurs affaires conclues.',
        },
        {
          title: 'Leur entreprise mieux représentée',
          text: 'Ils partagent leurs pass avec leurs collaborateurs et gèrent leurs cartes supplémentaires eux-mêmes.',
        },
        {
          title: 'Un retour sur investissement visible',
          text: 'Mises en relation, rencontres, affaires et montants : ils voient ce que leur adhésion leur rapporte.',
        },
      ],
    },
    {
      title: 'Pour les nouveaux membres du Club des Affaires',
      subtitle: 'Une intégration rapide, et une valeur dès le premier jour.',
      color: 'bg-gradient-to-r from-slate-800 to-slate-900',
      points: [
        {
          title: 'Une adhésion simple',
          text: 'Inscription en ligne depuis le téléphone ou l’ordinateur, avec choix de l’entreprise, offres et besoins.',
        },
        {
          title: 'Un accueil guidé',
          text: 'Un parcours en 8 étapes accompagne le nouveau membre : compléter son profil, découvrir ses avantages, participer, rencontrer, échanger.',
        },
        {
          title: 'Des contacts dès le premier jour',
          text: 'Ses offres et besoins alimentent immédiatement le matching : il reçoit des suggestions sans attendre la prochaine Foire.',
        },
        {
          title: 'Une visibilité immédiate',
          text: 'Son profil apparaît dans l’annuaire, les suggestions des autres membres et la carte des entreprises.',
        },
        {
          title: 'Un accompagnement',
          text: 'Il peut chercher un mentor parmi les membres expérimentés du club.',
        },
        {
          title: 'Une raison claire d’adhérer',
          text: 'Le club peut présenter aux prospects des résultats concrets : rencontres et affaires conclues par ses membres.',
        },
      ],
    },
    {
      title: 'Pour les membres du Club des Amis',
      subtitle: 'Une adhésion plus pratique, et une porte ouverte vers le Club des Affaires.',
      color: 'bg-gradient-to-r from-rose-500 to-red-500',
      points: [
        {
          title: 'Tout dans la poche',
          text: 'Carte digitale, QR code, avantages et partenaires toujours accessibles.',
        },
        {
          title: 'Les événements sans effort',
          text: 'Inscription, liste d’attente et rappels pour les manifestations myexpo.',
        },
        {
          title: 'Un lien toute l’année',
          text: 'Notifications et parcours Club entre deux éditions de la Foire.',
        },
        {
          title: 'Une évolution naturelle',
          text: 'Les fonctionnalités réseau sont visibles mais verrouillées : l’intérêt de passer au Club des Affaires devient évident.',
        },
      ],
    },
    {
      title: 'Pour le club et myexpo',
      subtitle: 'Moins de tâches manuelles, plus de membres fidèles.',
      color: 'bg-gradient-to-r from-sky-700 to-sky-800',
      points: [
        {
          title: 'Un back-office centralisé',
          text: 'Inscriptions, paiements, cartes, invitations, renouvellements et mentors dans une seule boîte de tâches.',
        },
        {
          title: 'Des événements maîtrisés',
          text: 'Capacité, liste d’attente automatique, check-in par QR code et liste des inscrits.',
        },
        {
          title: 'Des indicateurs d’impact',
          text: 'Rencontres, affaires conclues et montants : des chiffres à présenter aux membres, aux partenaires et aux sponsors.',
        },
        {
          title: 'Une meilleure fidélisation',
          text: 'Alertes de renouvellement 45 jours avant l’échéance, et membres engagés toute l’année.',
        },
        {
          title: 'Un Valais uni',
          text: 'Plateforme entièrement bilingue, qui crée des liens entre le Valais romand et le Haut-Valais.',
        },
        {
          title: 'Une traçabilité complète',
          text: 'Journal d’audit des actions sensibles et exports CSV des membres et des relations.',
        },
      ],
    },
  ];

  protected readonly loop: LoopStep[] = [
    { name: 'Découvrir', text: 'Suggestions, rencontre du mois, annuaire, opportunités.' },
    { name: 'Rencontrer', text: 'Événements, rendez-vous planifiés, scan de QR code.' },
    { name: 'Échanger', text: 'Mise en relation consentie, messagerie, traduction FR ↔ DE.' },
    { name: 'Conclure', text: 'Affaire déclarée avec son montant, avis entre membres.' },
    { name: 'Renouveler', text: 'Valeur visible, alerte de renouvellement, saison suivante.' },
  ];

  protected readonly retentionLevers: RetentionLever[] = [
    {
      lever: 'Parcours Club en 8 étapes',
      how: 'Donne au membre un objectif clair et une progression visible, de l’adhésion jusqu’au réseau actif.',
      rhythm: 'En continu',
    },
    {
      lever: 'Résumé hebdomadaire',
      how: 'Rappelle les nouvelles suggestions, les demandes reçues, les demandes acceptées et les messages non lus.',
      rhythm: 'Chaque lundi',
    },
    {
      lever: 'Rencontre du mois',
      how: 'Le club met en avant un membre à rencontrer : un rendez-vous éditorial régulier.',
      rhythm: 'Chaque mois',
    },
    {
      lever: 'Relance après rencontre',
      how: '14 jours après une rencontre sans affaire déclarée, les deux membres reçoivent un rappel pour concrétiser.',
      rhythm: 'Automatique',
    },
    {
      lever: 'Notifications',
      how: 'Demandes, messages, places libérées, rendez-vous, réponses aux opportunités, commentaires.',
      rhythm: 'En temps utile',
    },
    {
      lever: 'Communauté et groupes',
      how: 'Actualités, recrutements et groupes thématiques font vivre le réseau entre deux événements.',
      rhythm: 'En continu',
    },
    {
      lever: 'Opportunités d’affaires',
      how: 'Besoins, appels d’offres, consortiums, transmissions d’entreprise : une raison concrète de revenir.',
      rhythm: 'En continu',
    },
    {
      lever: 'Mentorat',
      how: 'Crée des liens durables entre membres expérimentés et nouveaux membres.',
      rhythm: 'En continu',
    },
    {
      lever: 'Réputation',
      how: 'Les avis et la note moyenne valorisent les membres les plus actifs.',
      rhythm: 'Après chaque rencontre',
    },
    {
      lever: 'Alerte de renouvellement',
      how: 'Le membre est prévenu 45 jours avant la fin de sa saison, avec le lien de renouvellement.',
      rhythm: 'Avant échéance',
    },
    {
      lever: 'Bilan chiffré',
      how: 'Mises en relation, rencontres et affaires conclues justifient le renouvellement.',
      rhythm: 'Fin de saison',
    },
  ];

  protected readonly mobileValue = [
    'Carte de membre digitale et QR code toujours disponibles.',
    'Scan d’un profil en un clic avec la caméra, au milieu de la foule.',
    'Liste des participants et rendez-vous d’affaires de l’événement.',
    'Messagerie pour fixer un rendez-vous sur place.',
    'Pass partagé pour le collaborateur qui représente l’entreprise.',
    'Alerte quand un membre pertinent est à proximité, par notification sur le téléphone.',
  ];

  protected readonly webValue = [
    'Profil complet : offres, besoins, compétences, logo, galerie.',
    'Préparation des événements et des rendez-vous.',
    'Carte des entreprises du Valais.',
    'Publication et suivi des opportunités d’affaires.',
    'Gestion des collaborateurs, des cartes et des pass.',
    'Back-office complet pour le secrétariat du club.',
  ];

  protected readonly differentiators: Differentiator[] = [
    {
      icon: '🧩',
      title: 'Matching explicable',
      text: 'Un score de 0 à 100 qui croise offres, besoins, compétences, langues, secteurs et régions, avec les raisons affichées en clair.',
    },
    {
      icon: '📷',
      title: 'Scan de profil en un clic',
      text: 'Un QR code personnel sécurisé et renouvelé à chaque affichage : une rencontre devient un contact en une seconde.',
    },
    {
      icon: '📍',
      title: 'Géolocalisation pendant les événements',
      text: 'Pendant un événement, une notification signale le membre pertinent qui est près de vous ; carte des entreprises en complément.',
    },
    {
      icon: '🤝',
      title: 'Mise en relation consentie',
      text: 'Les coordonnées ne sont dévoilées qu’avec l’accord des deux membres : un réseau ouvert, mais respectueux.',
    },
    {
      icon: '💬',
      title: 'Messagerie bilingue',
      text: 'Conversations privées avec pièces jointes et traduction FR ↔ DE du vocabulaire métier, sans service externe.',
    },
    {
      icon: '📅',
      title: 'Rendez-vous d’affaires planifiés',
      text: 'Table, horaire et message proposés à l’avance aux autres participants d’un événement.',
    },
    {
      icon: '🎟️',
      title: 'Pass partagés',
      text: 'Un membre peut envoyer un collaborateur de son entreprise à un événement, avec son propre QR code.',
    },
    {
      icon: '💼',
      title: 'Opportunités d’affaires',
      text: 'Une place de marché interne : besoins, offres, appels d’offres, consortiums, transmissions d’entreprise.',
    },
    {
      icon: '📊',
      title: 'Impact mesuré',
      text: 'Rencontres, affaires conclues et montants générés : la valeur du club devient visible et chiffrée.',
    },
  ];
}
