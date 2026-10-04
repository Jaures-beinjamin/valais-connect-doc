import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Callout } from '../shared/callout';
import { DEMO_ACCESS_URL, WEB_APP_URL } from '../project-links';

interface Card {
  path: string;
  title: string;
  text: string;
}

interface Figure {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Callout],
  template: `
    <div class="doc">
      <!-- Héros -->
      <section
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 px-6 py-12 text-white shadow-xl shadow-red-900/20 sm:px-10 sm:py-16 lg:pr-96 xl:pr-[26rem]"
      >
        <div
          class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-red-400/20 blur-3xl"
        ></div>
        <img
          src="images/Logo-Valais-Connect-mondial.png"
          alt="Logo Valais Connect"
          width="1532"
          height="1027"
          class="pointer-events-none absolute top-1/2 -right-6 hidden w-80 -translate-y-1/2 rounded-3xl bg-white/95 p-4 shadow-2xl lg:block xl:w-96"
        />
        <img
          src="images/icon-192.png"
          alt="Logo Valais Connect"
          width="72"
          height="72"
          class="relative mb-5 h-16 w-16 rounded-2xl bg-white object-contain p-1 shadow-lg lg:hidden"
        />
        <p class="relative text-sm font-semibold tracking-widest text-red-100 uppercase">
          Documentation officielle
        </p>
        <h1 class="relative mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Valais Connect
        </h1>
        <p class="relative mt-5 max-w-2xl text-lg leading-8 text-red-50">
          La plateforme qui connecte les membres du Club des Amis et du Club des Affaires :
          événements, inscriptions, matching de profils et mise en relation par QR code — sur le web
          et sur Android.
        </p>
        <div class="relative mt-8 flex flex-wrap gap-3">
          <a
            [href]="webAppUrl"
            target="_blank"
            rel="noopener"
            class="not-doc rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50"
          >
            Ouvrir l'application web ↗
          </a>
          <a
            [href]="demoAccessUrl"
            target="_blank"
            rel="noopener"
            class="not-doc rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            App mobile & comptes démo ↗
          </a>
          <a
            routerLink="/methodologie"
            class="not-doc rounded-xl px-5 py-3 text-sm font-semibold text-red-50 transition hover:text-white"
          >
            Lire la méthodologie →
          </a>
        </div>
      </section>

      <!-- Chiffres clés -->
      <section class="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        @for (figure of figures; track figure.label) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="!my-0 text-3xl font-extrabold text-slate-900 dark:text-white">
              {{ figure.value }}
            </p>
            <p class="!my-1 text-sm text-slate-500 dark:text-slate-400">{{ figure.label }}</p>
          </div>
        }
      </section>

      <h2 id="presentation">Présentation</h2>
      <p>
        <strong>Valais Connect</strong> a été réalisé dans le cadre d'un
        <strong>hackathon de deux jours</strong>. L'objectif : offrir aux membres des clubs
        valaisans un outil simple pour découvrir les événements, s'y inscrire et surtout
        <strong>rencontrer les bonnes personnes</strong>.
      </p>
      <p>Le projet se compose de trois briques :</p>
      <ul>
        <li>
          un <strong>backend Laravel</strong> qui expose une API REST et porte toute la logique
          métier (inscriptions, événements, matching, QR codes) ;
        </li>
        <li>une <strong>application web Vue.js</strong> embarquée dans l'application Laravel ;</li>
        <li>
          une <strong>application mobile Android native en Kotlin</strong> (Jetpack Compose) qui
          consomme la même API.
        </li>
      </ul>

      <h2 id="innovations">Fonctionnalités innovantes</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <p class="!my-0 text-2xl">🧩</p>
          <h3 class="!mt-2">Matching de profils</h3>
          <p class="!my-0 text-sm">
            Un score explicable de 0 à 100 qui croise besoins, offres, compétences, langues,
            secteurs et régions.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <p class="!my-0 text-2xl">📍</p>
          <h3 class="!mt-2">Géolocalisation pendant l'événement</h3>
          <p class="!my-0 text-sm">
            Cartographie Mapbox des entreprises du Valais et, en cours d'intégration sur mobile, une
            notification quand une personne pertinente est proche de vous.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <p class="!my-0 text-2xl">📷</p>
          <h3 class="!mt-2">Scan de profil en un clic</h3>
          <p class="!my-0 text-sm">
            Chaque membre possède un QR code sécurisé : un scan suffit pour afficher son profil et
            entrer en contact.
          </p>
        </div>
      </div>
      <p>
        Le détail du fonctionnement est expliqué dans
        <a routerLink="/fonctionnalites">Fonctionnalités innovantes</a>.
      </p>

      <h2 id="parcours">Par où commencer ?</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        @for (card of cards; track card.path) {
          <a
            [routerLink]="card.path"
            class="not-doc group rounded-2xl border border-slate-200 p-5 transition hover:border-red-300 hover:shadow-md dark:border-slate-800 dark:hover:border-red-800"
          >
            <p
              class="!my-0 font-semibold text-slate-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400"
            >
              {{ card.title }} →
            </p>
            <p class="!my-1 text-sm text-slate-600 dark:text-slate-400">{{ card.text }}</p>
          </a>
        }
      </div>

      <app-callout type="tip" title="Tester sans rien installer">
        L'application est déjà déployée sur Azure avec des comptes de démonstration fictifs. Le lien
        de l'application mobile et les identifiants sont sur la
        <a [href]="demoAccessUrl" target="_blank" rel="noopener">page de démonstration</a> ; ce lien
        est rappelé tout en bas de la page <a routerLink="/vision">Vision long terme</a>.
      </app-callout>
    </div>
  `,
})
export class HomePage {
  protected readonly webAppUrl = WEB_APP_URL;
  protected readonly demoAccessUrl = DEMO_ACCESS_URL;

  protected readonly figures: Figure[] = [
    { value: '2 jours', label: 'de hackathon' },
    { value: '18 h', label: 'de développement effectif' },
    { value: '3', label: 'applications : API, web, mobile' },
    { value: '309', label: 'routes déclarées côté Laravel' },
  ];

  protected readonly cards: Card[] = [
    {
      path: '/methodologie',
      title: 'Méthodologie de travail',
      text: 'Comment le projet a été mené en deux jours, étape par étape.',
    },
    {
      path: '/architecture',
      title: 'Architecture globale',
      text: 'Le modèle client-serveur et les relations entre les briques.',
    },
    {
      path: '/installation-web',
      title: 'Installer en local',
      text: 'Lancer le backend Laravel et le front Vue.js sur votre machine.',
    },
    {
      path: '/deploiement',
      title: 'Déploiement Azure',
      text: 'App Service, MySQL, déploiement SSH et script de démarrage.',
    },
  ];
}
