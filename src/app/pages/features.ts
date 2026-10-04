import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface MatchCriterion {
  criterion: string;
  points: string;
}

interface FeatureDomain {
  id: string;
  icon: string;
  title: string;
  summary: string;
  rules: string[];
  web: string[];
  mobile: string[];
}

interface NativeCapability {
  title: string;
  text: string;
}

interface ComparisonRow {
  feature: string;
  web: string;
  mobile: string;
}

@Component({
  selector: 'app-features-page',
  imports: [DocPage, Callout, RouterLink],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Fonctionnalités"
      lead="Cette page décrit précisément tout ce que Valais Connect permet de faire : d'abord les trois fonctionnalités innovantes, puis l'ensemble des fonctionnalités, domaine par domaine, sur l'application web et sur l'application mobile Android native."
      [toc]="toc"
    >
      <!-- Principe -->
      <h2 id="principe">Comment lire cette page</h2>
      <p>
        Le web et le mobile s'appuient sur <strong>la même API</strong> et donc sur
        <strong>les mêmes règles métier</strong>. Une inscription faite sur le téléphone apparaît
        immédiatement sur le web, et inversement. Pour chaque domaine, vous trouverez :
      </p>
      <div class="not-doc my-6 grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Règles</p>
          <p class="mt-1 text-sm">Ce que le serveur garantit, quel que soit l'appareil.</p>
        </div>
        <div
          class="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950/30"
        >
          <p class="text-xs font-bold tracking-wider text-sky-700 uppercase dark:text-sky-300">
            Web
          </p>
          <p class="mt-1 text-sm">Ce que l'utilisateur voit et fait dans le navigateur.</p>
        </div>
        <div
          class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30"
        >
          <p
            class="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-300"
          >
            Mobile natif
          </p>
          <p class="mt-1 text-sm">
            Ce que l'application Android apporte, avec ses capacités natives.
          </p>
        </div>
      </div>
      <p>
        Trois profils d'utilisateurs coexistent : le <strong>membre</strong> (Club des Amis ou Club
        des Affaires), le <strong>collaborateur</strong> d'une entreprise membre, et l'<strong
          >administration du club</strong
        >. L'accès au réseau d'affaires (annuaire, matching, mises en relation, messagerie,
        communauté, opportunités) est réservé aux membres du <strong>Club des Affaires</strong> dont
        l'adhésion est valide.
      </p>

      <!-- ===================== INNOVATIONS ===================== -->
      <h2 id="innovations">Les trois fonctionnalités innovantes</h2>

      <!-- 1. Matching -->
      <h3 id="matching">1. Le matching explicable des profils</h3>
      <p>
        Le matching répond à la question : <em>« Qui dois-je rencontrer ? »</em>. Pour chaque paire
        de membres du Club des Affaires, le serveur calcule un <strong>score de 0 à 100</strong> et,
        surtout, <strong>explique pourquoi</strong> les deux profils se correspondent.
      </p>
      <p>
        <strong>Étape 1 — Normalisation du texte.</strong>
        Offres, besoins et compétences sont saisis librement, en français ou en allemand. Le texte
        est normalisé : mots vides FR/DE retirés et synonymes regroupés (par exemple
        <em>Treuhand</em> et <em>comptabilité</em> deviennent <em>fiduciaire</em>). Deux membres qui
        n'écrivent pas dans la même langue peuvent donc se correspondre.
      </p>
      <p><strong>Étape 2 — Calcul du score.</strong> Chaque critère rapporte des points :</p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Critère</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            @for (row of criteria; track row.criterion) {
              <tr>
                <td>{{ row.criterion }}</td>
                <td class="font-mono text-xs whitespace-nowrap">{{ row.points }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p>
        La somme est plafonnée à <strong>100</strong>. Un profil est
        <strong>suggéré dès 35 points</strong>. Les « projets » sont les opportunités ouvertes
        publiées par le membre : elles alimentent directement le matching.
      </p>
      <p>
        <strong>Étape 3 — Classement et explication.</strong>
        Les profils sont classés par score, puis par nombre de correspondances directes
        besoin/offre, puis par bonus inter-régions. Les membres avec qui une mise en relation existe
        déjà sont exclus. Chaque raison est traduite et affichée : « son offre répond à votre besoin
        », « langue commune », « secteur complémentaire »…
      </p>
      <p>
        <strong>La rencontre du mois.</strong>
        Chaque mois, l'administration du club met en avant un membre, avec une note personnalisée.
        Cette « rencontre du mois » s'affiche en bannière sur la page des suggestions et sur
        l'espace Club.
      </p>
      <div class="not-doc my-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-sky-200 p-5 dark:border-sky-900">
          <p class="text-xs font-bold tracking-wider text-sky-700 uppercase dark:text-sky-300">
            Web
          </p>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm">
            <li>
              Page Suggestions : score, raisons traduites et bouton « Demander une mise en relation
              » avec message facultatif.
            </li>
            <li>Bannière « Rencontre du mois ».</li>
          </ul>
        </div>
        <div class="rounded-2xl border border-emerald-200 p-5 dark:border-emerald-900">
          <p
            class="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-300"
          >
            Mobile natif
          </p>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm">
            <li>Onglet Suggestions : score en points et jusqu'à 4 raisons « Pourquoi ».</li>
            <li>
              Fiche d'un membre : <strong>score et raisons du match</strong> calculés à la demande.
            </li>
            <li>Carte « Rencontre du mois » sur l'accueil Club.</li>
          </ul>
        </div>
      </div>
      <app-callout type="note" title="Un matching explicable, pas une boîte noire">
        Le membre voit pourquoi un profil lui est proposé. C'est ce qui donne confiance pour engager
        la conversation.
      </app-callout>

      <!-- 2. Géolocalisation -->
      <h3 id="geolocalisation">2. La géolocalisation pendant un événement</h3>
      <p>
        L'idée : pendant un événement,
        <strong>être averti par une notification sur son mobile</strong> lorsqu'une personne avec
        qui l'on a un bon score de matching se trouve <strong>près de soi</strong>. On passe de «
        qui dois-je rencontrer ? » à « elle est à dix mètres, allez lui parler ».
      </p>
      <p><strong>Ce qui fonctionne déjà :</strong></p>
      <ul>
        <li>
          <strong>Géocodage des entreprises</strong> : lorsqu'un administrateur saisit une adresse,
          le serveur interroge Mapbox (limité à la Suisse, orienté vers le Valais) et enregistre
          latitude et longitude. Sans choix explicite dans l'autocomplétion, l'adresse est géocodée
          automatiquement à l'enregistrement.
        </li>
        <li>
          <strong>Carte interactive des entreprises</strong> (web) : vue liste ou carte Mapbox,
          points regroupés par zone, fiche au clic, style sombre en thème sombre. Chaque fiche
          entreprise affiche une carte de localisation.
        </li>
        <li>
          <strong>Score de matching</strong> disponible pour chaque paire de membres : c'est le
          filtre qui évitera les alertes inutiles.
        </li>
        <li>
          <strong>Check-in par QR code</strong> : il sait déjà qui est physiquement présent à
          l'événement.
        </li>
      </ul>
      <p><strong>Fonctionnement prévu de l'alerte de proximité :</strong></p>
      <ol>
        <li>
          Le participant fait son check-in : la détection est activée pour la durée de l'événement
          uniquement.
        </li>
        <li>
          L'application mobile partage sa position (GPS en extérieur, Bluetooth en intérieur).
        </li>
        <li>
          Le serveur compare les positions des participants présents et ne retient que les profils
          au score de matching suffisant.
        </li>
        <li>
          Une <strong>notification</strong> signale la personne proche ; un clic ouvre son profil et
          les raisons du match.
        </li>
      </ol>
      <app-callout type="warning" title="Statut : en cours d'intégration">
        La cartographie, le géocodage, le matching et le check-in sont opérationnels. L'alerte de
        proximité (partage de position et notification système sur Android) est la prochaine étape :
        c'est l'une des raisons du choix d'une application native. Son architecture est décrite dans
        <a routerLink="/architecture-future">Architecture future</a>.
      </app-callout>

      <!-- 3. QR -->
      <h3 id="scan">3. Le scan d'un profil en un clic</h3>
      <p>
        Chaque membre possède un <strong>QR code personnel</strong>. Lors d'une rencontre, il suffit
        de le scanner : le profil s'ouvre immédiatement, avec un bouton pour demander une mise en
        relation.
      </p>
      <ul>
        <li>
          <strong>Un QR code toujours frais</strong> : chaque affichage génère un nouveau jeton et
          révoque l'ancien. Une capture d'écran ancienne ne fonctionne plus.
        </li>
        <li>
          <strong>Aucune donnée personnelle dans le code</strong> : il contient un jeton aléatoire
          de 32 octets ; seule son empreinte HMAC-SHA256 est stockée en base.
        </li>
        <li>
          <strong>Une page publique de profil</strong> : le lien du QR affiche entreprise, fonction,
          secteur, région, ville, langues et offres, avec un bouton « Demander une mise en relation
          » (connexion requise).
        </li>
        <li>
          <strong>Le même mécanisme sert au check-in</strong> des participants aux événements et aux
          pass partagés.
        </li>
      </ul>
      <div class="not-doc my-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-sky-200 p-5 dark:border-sky-900">
          <p class="text-xs font-bold tracking-wider text-sky-700 uppercase dark:text-sky-300">
            Web
          </p>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm">
            <li>Page « Mon QR » imprimable.</li>
            <li>
              Page Scanner : caméra arrière et API <code>BarcodeDetector</code> du navigateur.
            </li>
            <li>Si le navigateur ne la supporte pas, le lien peut être collé manuellement.</li>
          </ul>
        </div>
        <div class="rounded-2xl border border-emerald-200 p-5 dark:border-emerald-900">
          <p
            class="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-300"
          >
            Mobile natif
          </p>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm">
            <li>
              QR code dessiné directement sur le téléphone (ZXing), accessible depuis l'accueil.
            </li>
            <li>
              <strong>Scanner caméra natif</strong> (ZXing) : QR uniquement, sans bip, rotation
              libre.
            </li>
            <li>
              Saisie manuelle du code possible ; le résultat affiche une carte de profil avec «
              Demander une mise en relation ».
            </li>
          </ul>
        </div>
      </div>

      <!-- ===================== CATALOGUE ===================== -->
      <h2 id="catalogue">Toutes les fonctionnalités, domaine par domaine</h2>
      <div class="not-doc my-4 flex flex-wrap gap-2">
        @for (domain of domains; track domain.id) {
          <a
            [routerLink]="[]"
            [fragment]="domain.id"
            class="rounded-full border border-slate-200 px-3 py-1 text-sm transition hover:border-red-400 hover:text-red-600 dark:border-slate-700"
          >
            {{ domain.icon }} {{ domain.title }}
          </a>
        }
      </div>

      <div class="not-doc mt-8 space-y-6">
        @for (domain of domains; track domain.id) {
          <section
            [id]="domain.id"
            class="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <div
              class="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                <span class="mr-1">{{ domain.icon }}</span> {{ domain.title }}
              </h3>
              <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {{ domain.summary }}
              </p>
            </div>
            <div class="space-y-5 p-5 text-sm leading-6">
              @if (domain.rules.length) {
                <div>
                  <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Règles</p>
                  <ul class="mt-2 list-disc space-y-1.5 pl-5 marker:text-red-500">
                    @for (rule of domain.rules; track rule) {
                      <li>{{ rule }}</li>
                    }
                  </ul>
                </div>
              }
              <div class="grid gap-4 md:grid-cols-2">
                <div class="rounded-xl bg-sky-50 p-4 dark:bg-sky-950/30">
                  <p
                    class="text-xs font-bold tracking-wider text-sky-700 uppercase dark:text-sky-300"
                  >
                    Web
                  </p>
                  @if (domain.web.length) {
                    <ul class="mt-2 list-disc space-y-1.5 pl-5 marker:text-sky-500">
                      @for (item of domain.web; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  } @else {
                    <p class="mt-2 text-slate-500">Non disponible sur le web.</p>
                  }
                </div>
                <div class="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p
                    class="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-300"
                  >
                    Mobile natif
                  </p>
                  @if (domain.mobile.length) {
                    <ul class="mt-2 list-disc space-y-1.5 pl-5 marker:text-emerald-500">
                      @for (item of domain.mobile; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  } @else {
                    <p class="mt-2 text-slate-500">Réservé au web.</p>
                  }
                </div>
              </div>
            </div>
          </section>
        }
      </div>

      <!-- ===================== NATIF ===================== -->
      <h2 id="natif">Ce que l'application native apporte en plus</h2>
      <p>
        Au-delà des écrans, l'application Android exploite des capacités propres au système, que le
        web ne peut pas offrir de la même façon :
      </p>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-2">
        @for (capability of nativeCapabilities; track capability.title) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="font-semibold text-slate-900 dark:text-white">{{ capability.title }}</p>
            <p class="mt-2 text-sm leading-6">{{ capability.text }}</p>
          </div>
        }
      </div>

      <!-- ===================== COMPARATIF ===================== -->
      <h2 id="comparatif">Web et mobile : tableau comparatif</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Fonctionnalité</th>
              <th>Web</th>
              <th>Mobile natif</th>
            </tr>
          </thead>
          <tbody>
            @for (row of comparison; track row.feature) {
              <tr>
                <td class="font-medium text-slate-900 dark:text-white">{{ row.feature }}</td>
                <td>{{ row.web }}</td>
                <td>{{ row.mobile }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- ===================== À VENIR ===================== -->
      <h2 id="a-venir">Ce qui n'est pas encore disponible</h2>
      <p>Par transparence, voici les fonctionnalités prévues mais pas encore livrées :</p>
      <ul>
        <li>
          Alerte de proximité et <strong>notifications push</strong> sur mobile (aujourd'hui :
          notifications dans l'application et par e-mail).
        </li>
        <li>
          Messagerie en <strong>temps réel</strong> par WebSocket (aujourd'hui : actualisation
          automatique toutes les quelques secondes).
        </li>
        <li>
          Traduction automatique complète des messages (aujourd'hui : glossaire métier FR ↔ DE).
        </li>
        <li>
          Scanner caméra dans l'espace d'administration pour le check-in (aujourd'hui : collage du
          code QR ou check-in manuel).
        </li>
        <li>
          Export des événements vers un agenda, mentions « @ » dans la communauté, création de
          groupes par les membres.
        </li>
        <li>
          Paiement en ligne de l'adhésion (aujourd'hui : formulaire de renouvellement externe).
        </li>
      </ul>
    </app-doc-page>
  `,
})
export class FeaturesPage {
  protected readonly toc: TocItem[] = [
    { id: 'principe', label: 'Comment lire cette page' },
    { id: 'innovations', label: 'Fonctionnalités innovantes' },
    { id: 'matching', label: '· Matching' },
    { id: 'geolocalisation', label: '· Géolocalisation' },
    { id: 'scan', label: '· Scan de profil' },
    { id: 'catalogue', label: 'Toutes les fonctionnalités' },
    { id: 'messagerie', label: '· Messagerie' },
    { id: 'evenements', label: '· Événements' },
    { id: 'administration', label: '· Administration' },
    { id: 'natif', label: 'Apports du natif' },
    { id: 'comparatif', label: 'Comparatif web / mobile' },
    { id: 'a-venir', label: 'Pas encore disponible' },
  ];

  protected readonly criteria: MatchCriterion[] = [
    { criterion: 'Ses offres répondent à mes besoins', points: '8 / terme · max 50' },
    {
      criterion: 'Mes besoins apparaissent dans la description de son entreprise',
      points: '3 / terme · max 9',
    },
    { criterion: 'Ses compétences répondent à mes besoins', points: '5 / terme · max 15' },
    {
      criterion: 'Projets ouverts couverts par les offres de l’autre (dans les deux sens)',
      points: '6 / terme · max 18',
    },
    { criterion: 'Réciprocité : mes offres répondent à ses besoins', points: '5 / terme · max 15' },
    { criterion: 'Langues communes', points: '10 (une) · 15 (deux)' },
    { criterion: 'Centres d’intérêt communs', points: '5 chacun · max 15' },
    { criterion: 'Secteurs complémentaires', points: '6' },
    { criterion: 'Même secteur (si non complémentaire)', points: '10' },
    { criterion: 'Régions différentes (bonus inter-régions)', points: '10' },
    { criterion: 'Même région', points: '6' },
  ];

  protected readonly domains: FeatureDomain[] = [
    {
      id: 'adhesion',
      icon: '📝',
      title: 'Adhésion et inscription',
      summary:
        'Devenir membre du Club des Amis (CHF 150 par an) ou du Club des Affaires (CHF 500 par an), directement depuis l’application.',
      rules: [
        'Formulaire complet : formule, identité, adresse, téléphone, e-mail, mot de passe, langue (FR/DE), région (Bas-Valais, Valais central, Haut-Valais).',
        'Photo pour la carte de membre obligatoire (JPG, PNG ou WebP, 10 Mo maximum).',
        'Club des Affaires : entreprise choisie dans la liste du club (recherche dès 2 caractères) ou demandée si absente, secteur parmi 24, au moins une offre et un besoin.',
        'Club des Affaires : jusqu’à 2 cartes entreprise supplémentaires non nominatives (total CHF 1000 ou CHF 1500).',
        'Moyens de paiement : sur place, Twint, facture (TVA 8,1 %) ou prépaiement ; parrain et remarques facultatifs.',
        'Le compte est créé « en attente » : l’administration est notifiée et le valide. Un compte Club des Amis ne peut être activé qu’une fois le paiement reçu.',
        'L’administration peut demander un complément d’information : le candidat reçoit un lien par e-mail et répond sans se connecter.',
        'Invitation d’entreprise : un lien valable 14 jours permet de s’inscrire avec un compte actif immédiatement.',
        'La saison va du 15 août au 14 août ; l’adhésion est valable jusqu’à la fin de la saison.',
        'Protection anti-abus : 5 tentatives d’inscription par minute.',
      ],
      web: [
        'Page d’inscription avec autocomplétion des entreprises.',
        'Page de complément d’information accessible par lien, sans connexion.',
        'Inscription par invitation, avec e-mail prérempli et verrouillé.',
      ],
      mobile: [
        'Formulaire en cartes : choix de la formule avec prix, puis sections compte, contact, photo.',
        'Photo choisie avec le sélecteur de photos natif d’Android, avec aperçu.',
        'Recherche d’entreprise en temps réel pendant la saisie.',
        'Écran de résultat indiquant si le compte est actif ou en attente, et la prochaine étape de paiement.',
      ],
    },
    {
      id: 'connexion',
      icon: '🔐',
      title: 'Connexion et sécurité du compte',
      summary: 'Une connexion sûre, adaptée au navigateur comme au téléphone.',
      rules: [
        '5 tentatives par e-mail et par adresse IP, puis blocage de 60 secondes.',
        'Les comptes non validés ou désactivés sont refusés ; un compte désactivé après connexion est immédiatement déconnecté.',
        'Mot de passe oublié : lien de réinitialisation par e-mail (6 demandes par minute). La réinitialisation révoque tous les jetons des appareils.',
        'La langue choisie est enregistrée sur le compte.',
      ],
      web: [
        'Connexion par session sécurisée (cookie et protection CSRF).',
        'Pages « Mot de passe oublié » et « Réinitialisation ».',
      ],
      mobile: [
        'Connexion par jeton, avec le nom de l’appareil (fabricant et modèle) enregistré.',
        'Champs compatibles avec le remplissage automatique d’Android ; affichage du mot de passe à la demande.',
        'Choix de la langue FR/DE dès l’écran d’accueil.',
        'Mot de passe oublié : envoi de l’e-mail depuis l’application.',
      ],
    },
    {
      id: 'club',
      icon: '🏔️',
      title: 'Espace Club et carte de membre',
      summary:
        'Le tableau de bord du membre : sa carte digitale, son parcours dans le club et ses raccourcis.',
      rules: [
        'Parcours en 8 étapes : adhérer → compléter son profil → découvrir ses avantages → participer à un événement → rencontrer → échanger → développer son réseau (3 mises en relation) → toute l’année.',
        'Les étapes liées au réseau sont verrouillées pour le Club des Amis.',
      ],
      web: ['Page Club avec le parcours et sa progression.', 'Bannière « Rencontre du mois ».'],
      mobile: [
        'Accueil avec une photo, la carte de membre digitale rouge (nom, formule, saison, date de validité, mention « expirée »).',
        'Carte du parcours avec barre de progression et bouton « Ouvrir » sur chaque étape à faire.',
        'Carte « Rencontre du mois » et raccourcis vers Avantages, Événements et Réseau (cadenas si l’accès n’est pas inclus).',
        'Accès direct au QR code et aux notifications depuis la barre du haut.',
      ],
    },
    {
      id: 'abonnement',
      icon: '🎫',
      title: 'Adhésion, cartes entreprise et avantages',
      summary:
        'Suivre son adhésion, gérer les cartes supplémentaires de son entreprise et profiter des avantages du club.',
      rules: [
        'Statut affiché : formule, prix, membre depuis, badges (vérifié, exposant de la Foire), saison et date de validité.',
        'Alerte de renouvellement 45 jours avant l’échéance, avec lien vers le formulaire de renouvellement.',
        'Cartes entreprise : numéro au format CF-XXXXXXXX, statut demandée / active / révoquée ; 2 maximum pour le Club des Affaires. Une carte peut être annulée tant qu’elle est « demandée ».',
        '13 avantages du club, chacun disponible ou verrouillé (formule insuffisante ou adhésion expirée), partenaires apéritifs et documents officiels.',
      ],
      web: [
        'Pages Adhésion et Avantages.',
        'Proposition de passer au Club des Affaires pour les membres du Club des Amis.',
      ],
      mobile: [
        'Écran Adhésion avec carte de membre, statut, cartes entreprise (demander / annuler) et lien de renouvellement ouvert dans le navigateur.',
        'Écran Avantages avec icônes, motif de verrouillage et liens externes.',
      ],
    },
    {
      id: 'profil',
      icon: '👤',
      title: 'Profil membre et médias',
      summary:
        'Le profil est la matière première du matching : plus il est complet, meilleures sont les suggestions.',
      rules: [
        'Informations publiques : nom du contact, fonction, secteur, activité, région, ville, bio (2000 caractères), site web, vidéo, langues (au moins une).',
        'Club des Affaires : offres et besoins (titre et description), jusqu’à 5 centres d’intérêt parmi 10, jusqu’à 10 compétences, souhait d’être mentoré.',
        'Informations privées visibles par le seul membre : civilité, date de naissance, adresse, option « masquer de l’annuaire ».',
        'E-mail et téléphone de contact visibles uniquement par les membres avec qui la mise en relation est acceptée.',
        'Médias : logo (4 Mo maximum) et galerie de 8 photos ; sans logo, le favicon du site de l’entreprise ou des initiales sont utilisés.',
        'Jusqu’à 20 collaborateurs affichés sur le profil (nom, rôle, e-mail, téléphone).',
      ],
      web: ['Page Profil : consultation et édition de toutes les informations, logo et galerie.'],
      mobile: [
        'Écran Profil en consultation, puis écran d’édition avec messages d’erreur sous chaque champ.',
        'Logo et galerie gérés avec le sélecteur de photos natif.',
        'Éditeurs d’offres, de besoins, de centres d’intérêt et de collaborateurs.',
      ],
    },
    {
      id: 'annuaire',
      icon: '📇',
      title: 'Annuaire, favoris et entreprises',
      summary: 'Trouver les bons membres et les bonnes entreprises du réseau.',
      rules: [
        'L’annuaire liste les membres actifs du Club des Affaires, sauf ceux qui ont choisi d’être masqués.',
        'Filtres : région, secteur, langue, compétence, besoin, offre, texte libre, favoris uniquement.',
        'Chaque fiche affiche badges, note moyenne, état de la mise en relation et état favori.',
        'Fonction « Présenter » : un membre peut présenter deux autres membres l’un à l’autre.',
        'Annuaire des entreprises avec recherche, secteur, nombre de membres et filtre « avec membres uniquement ».',
      ],
      web: [
        'Pages Membres et fiche membre avec panneau « Présenter ».',
        'Page Entreprises en vue liste ou en carte Mapbox (points regroupés, fiche au clic).',
        'Fiche entreprise avec ses membres et une carte de localisation.',
      ],
      mobile: [
        'Onglet Membres : recherche, filtres en puces (favoris, mentors disponibles, régions, langues) et secteur.',
        'Bouton cœur pour les favoris.',
        'Fiche membre complète : contact, site, vidéo, raisons du match, offres, besoins, galerie, avis reçus.',
        'Dialogue « Présenter » pour recommander un autre membre.',
        'Annuaire des entreprises et fiche entreprise avec adresse, site et membres.',
      ],
    },
    {
      id: 'relations',
      icon: '🤝',
      title: 'Mises en relation',
      summary:
        'Le cœur du Club des Affaires : transformer une suggestion en rencontre, puis en affaire.',
      rules: [
        'Cycle de vie : demandée → acceptée ou refusée → rencontrée → affaire conclue.',
        'Seul le destinataire peut accepter ou refuser, avec un message facultatif (500 caractères).',
        'Chacun des deux peut marquer « rencontrés », puis « affaire conclue » avec une note et un montant.',
        'Une seule mise en relation active par paire de membres ; après un refus ou une affaire conclue, une nouvelle demande est possible.',
        'Présentation par un tiers : les deux membres présentés sont notifiés.',
        'Après la rencontre, chacun peut laisser un avis de 1 à 5 étoiles avec commentaire ; la moyenne s’affiche sur le profil.',
        'Relance automatique : 14 jours après une rencontre sans affaire déclarée, les deux membres reçoivent un rappel (tâche quotidienne à 8 h).',
      ],
      web: [
        'Page Mises en relation : onglets reçues / envoyées / toutes, filtres par statut, coordonnées dévoilées, montant de l’affaire.',
      ],
      mobile: [
        'Onglet Relations avec filtres en puces par direction et statut.',
        'Actions selon le statut : Accepter, Refuser, Ouvrir la conversation, Marquer rencontrés, Affaire conclue (note et montant en CHF), Laisser un avis.',
        'Coordonnées cliquables : un appui ouvre l’application e-mail ou téléphone.',
      ],
    },
    {
      id: 'messagerie',
      icon: '💬',
      title: 'Messagerie',
      summary:
        'Une messagerie privée entre membres mis en relation, avec pièces jointes et traduction français ↔ allemand.',
      rules: [
        'Qui peut écrire à qui : uniquement les deux membres d’une mise en relation acceptée, rencontrée ou conclue, et disposant de l’accès réseau. Il n’est pas possible d’écrire à un inconnu.',
        'Si l’un des deux profils est désactivé, la conversation reste lisible mais passe en lecture seule.',
        'Messages : texte jusqu’à 2000 caractères et/ou une pièce jointe ; 60 messages par minute maximum.',
        'Pièces jointes : PDF, JPG, PNG ou WebP, 8 Mo maximum. Elles sont stockées dans un espace privé et servies uniquement aux deux participants.',
        'Accusé de lecture : ouvrir une conversation marque les messages comme lus ; l’expéditeur voit « Lu ».',
        'Compteurs de messages non lus par conversation et au global.',
        'Historique chargé par blocs de 50 messages (« Charger les messages précédents »).',
        'Traduction : un bouton « Traduire » convertit un message vers la langue du lecteur grâce à un glossaire d’environ 55 termes métier FR ↔ DE. Aucun service externe : les messages ne quittent pas la plateforme.',
        'Notification par e-mail : une seule par série de messages non lus, pour ne pas inonder la boîte de réception.',
      ],
      web: [
        'Page Messages : liste des conversations triée par activité (entreprise, contact, dernier message, non lus).',
        'Conversation : touche Entrée pour envoyer, aperçu des images dans le fil.',
        'Actualisation automatique : la conversation ouverte toutes les 2,5 s, la liste toutes les 5 s, le badge de non-lus toutes les 10 s.',
      ],
      mobile: [
        'Onglet Messages : aperçu du dernier message (préfixe « Vous : », 📎 pour une pièce jointe), heure, badge de non-lus ; actualisation toutes les 15 s.',
        'Bulles de discussion (les miennes en rouge, à droite), heure et mention « Lu ».',
        'Pièce jointe choisie avec le sélecteur de documents natif d’Android, affichée en puce supprimable avant l’envoi.',
        'Images en miniature ; les autres fichiers s’ouvrent dans l’application adaptée du téléphone (téléchargement sécurisé puis ouverture via le partage de fichiers Android).',
        'Bouton « Traduire / Masquer la traduction » sur les messages reçus.',
        'Nouveaux messages récupérés toutes les 4 s, défilement automatique ; bouton pour voir le profil de l’interlocuteur.',
      ],
    },
    {
      id: 'evenements',
      icon: '📅',
      title: 'Événements, inscriptions et rendez-vous',
      summary:
        'Découvrir les événements du club, s’y inscrire et organiser des rendez-vous d’affaires sur place.',
      rules: [
        'Événements de la Foire du Valais ou de partenaires, en présentiel, en ligne ou hybrides ; titres et descriptions en FR et en DE.',
        'Un événement peut être réservé au Club des Affaires ; une adhésion valide est nécessaire pour s’inscrire.',
        'Inscription confirmée tant qu’il reste des places, sinon placement en liste d’attente.',
        'En cas de désistement, la première personne de la liste d’attente est promue et notifiée. Si la capacité augmente, la liste d’attente est promue automatiquement.',
        'Si un événement est annulé, tous les inscrits sont notifiés.',
        'Le lien de visioconférence n’est visible que par les inscrits confirmés.',
        'Liste des participants visible uniquement par les inscrits confirmés.',
        'Rendez-vous d’affaires : proposer à un autre participant confirmé une table, un horaire et un message ; statuts proposé → confirmé ou refusé, annulable par les deux.',
      ],
      web: [
        'Page Événements : recherche, catégorie, accès, période (semaine, mois, plus tard), format, « mes inscriptions ».',
        'Places restantes, « complet + liste d’attente », badge « Affaires ».',
      ],
      mobile: [
        'Liste avec recherche et filtres en puces, nombre de résultats, bannières et statut (confirmé, en attente, places restantes).',
        'Détail : S’inscrire ou Rejoindre la liste d’attente, Annuler (avec confirmation), Rejoindre en ligne, heure de check-in.',
        'Mes rendez-vous : accepter, refuser ou annuler.',
        'Participants : proposer un rendez-vous (heure, durée 15/30/45/60 min, table, message).',
        'Partager son pass avec un collaborateur depuis l’événement.',
      ],
    },
    {
      id: 'pass',
      icon: '🎟️',
      title: 'Pass partagés et collaborateurs',
      summary:
        'Un membre du Club des Affaires peut envoyer un collaborateur de son entreprise à un événement à sa place.',
      rules: [
        'Le membre doit être inscrit et confirmé à un événement à venir ; un seul partage actif par événement, uniquement vers un collaborateur de la même entreprise.',
        'Deux façons de partager : choisir un collaborateur existant (pass actif immédiatement) ou l’inviter par e-mail (le pass attend l’acceptation de l’invitation).',
        'Règle « même entreprise » : le domaine de l’e-mail doit correspondre à celui de l’entreprise ; sinon l’invitation est soumise à validation par le club.',
        'Une fois le pass transmis, le QR code du membre est refusé au check-in pour cet événement.',
        'Le collaborateur crée son compte depuis l’invitation et retrouve ses pass dans « Mes pass ».',
      ],
      web: [
        'Page Collaborateurs : comptes, invitations (renvoyer, annuler), pass partagés (révoquer).',
        'Page « Mes pass » pour le collaborateur.',
      ],
      mobile: [
        'Écrans Collaborateurs et Pass partagés (partage par la plateforme ou par e-mail, révocation).',
        'Pour le collaborateur : « Mes pass » avec affichage du QR du pass et mention « check-in effectué ».',
      ],
    },
    {
      id: 'communaute',
      icon: '👥',
      title: 'Communauté et mentorat',
      summary:
        'Faire vivre le réseau entre deux événements : actualités, groupes thématiques et mentorat.',
      rules: [
        'Publications de type actualité, recrutement ou général : texte jusqu’à 2000 caractères et image facultative (5 Mo).',
        'L’auteur peut modifier ou supprimer sa publication ; l’administration peut épingler ou supprimer.',
        'J’aime et commentaires (1000 caractères) ; l’auteur est notifié des nouveaux commentaires.',
        'Groupes thématiques bilingues : rejoindre, quitter, publier dans le fil du groupe.',
        'Mentorat : liste des mentors approuvés et des membres qui cherchent un mentor ; contact par une demande de mise en relation.',
        'Devenir mentor : spécialisation, motivation (30 à 3000 caractères), CV obligatoire et 1 à 5 diplômes ; validation par l’administration.',
      ],
      web: ['Pages Actualités, Groupes, Mentorat et Devenir mentor.'],
      mobile: [
        'Onglets Fil, Groupes et Mentorat ; filtres Tout / Mes publications / par type ; pagination « Charger plus ».',
        'Publication avec image depuis le sélecteur de photos natif.',
        'Candidature de mentor avec CV et diplômes choisis dans le sélecteur de documents (sélection multiple).',
      ],
    },
    {
      id: 'opportunites',
      icon: '💼',
      title: 'Opportunités d’affaires',
      summary: 'Une place de marché interne au Club des Affaires.',
      rules: [
        'Types : besoin, offre, appel d’offres, consortium, partage de ressources, transmission d’entreprise.',
        'Champs : titre, description (5000 caractères), secteur, région, budget estimé, date limite.',
        'L’auteur peut modifier, fermer, rouvrir ou supprimer, et consulter les réponses.',
        'Les autres membres répondent par un message ; l’auteur est notifié.',
        'Les opportunités ouvertes alimentent le matching comme « projets ».',
      ],
      web: [
        'Page Opportunités avec filtres (type, secteur, région, statut, « mes opportunités »).',
      ],
      mobile: [
        'Liste avec recherche, filtres et bouton flottant « Publier ».',
        'Détail avec budget en CHF, date limite et réponses ; formulaire de création et de modification.',
      ],
    },
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notifications et résumé hebdomadaire',
      summary: 'Être informé de tout ce qui concerne son réseau, dans sa langue.',
      rules: [
        'Notifications envoyées notamment pour : demande, présentation, acceptation ou refus de mise en relation ; nouveau message ; promotion depuis la liste d’attente ; annulation d’événement ; rendez-vous ; réponse à une opportunité ; commentaire ; carte activée ; pass partagé ou révoqué ; décision de mentorat ; relance après rencontre.',
        'Chaque notification existe dans l’application et, si le membre l’a activé, par e-mail (FR ou DE).',
        'Résumé hebdomadaire chaque lundi à 7 h : nouvelles suggestions, demandes reçues, demandes acceptées et messages non lus (non envoyé s’il n’y a rien de nouveau).',
      ],
      web: [
        'Cloche dans l’en-tête et page Notifications (30 dernières, marquer comme lue).',
        'Interrupteur des notifications par e-mail.',
      ],
      mobile: [
        'Badges de non-lus actualisés toutes les 30 s.',
        'Liste des notifications ; un appui la marque comme lue et ouvre directement l’écran concerné dans l’application.',
        'Interrupteur des notifications par e-mail.',
      ],
    },
    {
      id: 'confidentialite',
      icon: '🛡️',
      title: 'Confidentialité et données personnelles',
      summary:
        'Le membre garde la maîtrise de ses données, conformément à la loi suisse sur la protection des données.',
      rules: [
        'Export complet des données au format JSON : compte, profil, entreprise, pass, mises en relation, messages envoyés, inscriptions.',
        'Suppression du compte : mot de passe et saisie de SUPPRIMER (ou LÖSCHEN) obligatoires ; les traces d’audit sont anonymisées.',
        'Gestion des appareils connectés : voir les appareils et tous les déconnecter.',
      ],
      web: ['Page Confidentialité : export et suppression du compte.'],
      mobile: [
        'Appareils connectés (nom, dernière utilisation, « cet appareil ») et « Déconnecter tous les appareils ».',
        'Export enregistré via la boîte de dialogue native « Enregistrer sous » d’Android.',
        'Suppression du compte avec double confirmation.',
      ],
    },
    {
      id: 'langues',
      icon: '🌐',
      title: 'Langues, thème et accessibilité',
      summary: 'Une plateforme pensée pour tout le Valais, du Bas-Valais au Haut-Valais.',
      rules: [
        'Interface entièrement en français et en allemand ; événements, groupes, notifications et e-mails bilingues.',
        'La langue choisie est enregistrée sur le compte et suit le membre d’un appareil à l’autre.',
      ],
      web: [
        'Sélecteur de langue dans l’en-tête ; thème clair, sombre ou automatique.',
        'Accessibilité : libellés ARIA, textes pour lecteurs d’écran, contours de focus visibles, touche Échap pour fermer les menus.',
        'Conception mobile d’abord avec barre d’onglets en bas ; application web installable.',
      ],
      mobile: [
        'Langue initiale selon le téléphone, modifiable dans les réglages.',
        'Thème clair ou sombre automatique selon le système, aux couleurs du Valais.',
      ],
    },
    {
      id: 'administration',
      icon: '🗂️',
      title: 'Administration du club',
      summary: 'Un back-office complet pour le secrétariat du club, disponible sur le web.',
      rules: [
        'Tableau de bord d’impact : membres (total, actifs, nouveaux), taux d’acceptation, rencontres, affaires conclues et montant total, liens inter-régions, liens FR ↔ DE ; répartition par région, secteur et langue ; graphique sur 8 semaines.',
        'Boîte de tâches : inscriptions à valider, cartes à activer, invitations à examiner, paiements à enregistrer, candidatures de mentors, renouvellements à venir.',
        'Membres : créer, modifier, activer, désactiver, enregistrer un paiement, renouveler, demander un complément, régénérer le QR code, réinitialiser le mot de passe, supprimer.',
        'Entreprises avec adresse géocodée par Mapbox ; cartes entreprise ; invitations ; mentors (approbation avec téléchargement du CV et des diplômes).',
        'Événements : création bilingue, bannière, capacité, format, accès minimum ; liste des inscrits et check-in par code QR ou manuel.',
        'Rencontre du mois, exports CSV des membres et des mises en relation, journal d’audit de toutes les actions sensibles.',
        'Sécurité : un administrateur ne peut pas se rétrograder, se désactiver ou se supprimer lui-même.',
      ],
      web: ['Espace /admin complet, avec badge du nombre de tâches en attente.'],
      mobile: [],
    },
  ];

  protected readonly nativeCapabilities: NativeCapability[] = [
    {
      title: 'Scanner caméra natif',
      text: 'Lecture des QR codes par la caméra via ZXing, plus rapide et plus fiable que le scanner du navigateur, sur tous les téléphones Android.',
    },
    {
      title: 'Sélecteurs système',
      text: 'Photos via le sélecteur de photos d’Android, documents via le sélecteur de fichiers (y compris sélection multiple), export via « Enregistrer sous ».',
    },
    {
      title: 'Ouverture sécurisée des fichiers',
      text: 'Les pièces jointes sont téléchargées avec le jeton du membre puis ouvertes dans l’application adaptée grâce au partage de fichiers Android (FileProvider).',
    },
    {
      title: 'Bascule automatique de serveur',
      text: 'Si le serveur principal ne répond plus, l’application bascule seule vers un serveur de secours et l’indique par un message. Une action n’est jamais exécutée deux fois.',
    },
    {
      title: 'Session protégée',
      text: 'Une session par serveur ; les jetons sont exclus des sauvegardes cloud et des transferts d’appareil. Une session expirée déconnecte proprement.',
    },
    {
      title: 'Navigation adaptée au rôle',
      text: 'Barre de navigation flottante animée, avec des onglets différents pour le Club des Affaires, le Club des Amis et les collaborateurs, et des badges de non-lus.',
    },
    {
      title: 'Intégration au téléphone',
      text: 'Écran de démarrage, thème sombre du système, remplissage automatique des identifiants, liens e-mail et téléphone ouverts dans les applications natives.',
    },
    {
      title: 'Ergonomie terrain',
      text: 'Tirer pour actualiser, messages de confirmation, recherche instantanée : pensé pour être utilisé debout, dans les allées d’un événement.',
    },
  ];

  protected readonly comparison: ComparisonRow[] = [
    {
      feature: 'Inscription et adhésion',
      web: 'Oui',
      mobile: 'Oui, avec sélecteur de photos natif',
    },
    {
      feature: 'Matching et suggestions',
      web: 'Oui',
      mobile: 'Oui, plus le détail du match sur chaque fiche',
    },
    { feature: 'Mises en relation et avis', web: 'Oui', mobile: 'Oui' },
    {
      feature: 'Messagerie',
      web: 'Actualisation 2,5 s',
      mobile: 'Actualisation 4 s, pièces jointes ouvertes nativement',
    },
    { feature: 'Traduction FR ↔ DE des messages', web: 'Oui', mobile: 'Oui' },
    { feature: 'Événements et liste d’attente', web: 'Oui', mobile: 'Oui' },
    { feature: 'Rendez-vous d’affaires', web: 'Oui', mobile: 'Oui' },
    { feature: 'Mon QR code', web: 'Oui, imprimable', mobile: 'Oui, généré sur le téléphone' },
    { feature: 'Scan de QR code', web: 'Selon le navigateur', mobile: 'Scanner caméra natif' },
    { feature: 'Carte des entreprises (Mapbox)', web: 'Oui', mobile: 'Liste et fiches' },
    { feature: 'Communauté et mentorat', web: 'Oui', mobile: 'Oui' },
    { feature: 'Opportunités', web: 'Oui', mobile: 'Oui' },
    { feature: 'Pass partagés et collaborateurs', web: 'Oui', mobile: 'Oui' },
    {
      feature: 'Export et suppression des données',
      web: 'Oui',
      mobile: 'Oui, plus gestion des appareils',
    },
    { feature: 'Administration du club', web: 'Oui', mobile: 'Non (web uniquement)' },
  ];
}
