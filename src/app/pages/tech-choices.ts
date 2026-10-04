import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface StackItem {
  layer: string;
  technology: string;
  version: string;
  reason: string;
}

@Component({
  selector: 'app-tech-choices-page',
  imports: [DocPage, Callout],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Choix technologiques"
      lead="Chaque technologie a été choisie en fonction de trois critères : la vitesse de développement pendant le hackathon, le coût, et la capacité de l'application à évoluer après la compétition."
      [toc]="toc"
    >
      <h2 id="synthese">Vue d'ensemble</h2>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Couche</th>
              <th>Technologie</th>
              <th>Version</th>
              <th>Pourquoi</th>
            </tr>
          </thead>
          <tbody>
            @for (item of stack; track item.layer) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ item.layer }}
                </td>
                <td class="whitespace-nowrap">{{ item.technology }}</td>
                <td class="font-mono text-xs whitespace-nowrap">{{ item.version }}</td>
                <td>{{ item.reason }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="laravel-vue">Laravel + Vue.js pour le web</h2>
      <p>
        L'application web est une <strong>application Laravel</strong> qui embarque un
        <strong>front Vue.js</strong>. Les deux communiquent déjà ensemble via une API JSON : aucune
        configuration CORS ni second serveur à déployer. Vite compile le front, Laravel sert la page
        et répond aux appels d'API.
      </p>
      <ul>
        <li>
          <strong>Laravel</strong> apporte l'authentification, les migrations, les files d'attente,
          les notifications et un écosystème de tests mature.
        </li>
        <li>
          <strong>Vue 3</strong> permet une architecture par composants réutilisables, rapide à
          écrire et facile à maintenir.
        </li>
        <li>
          <strong>Tailwind CSS 4</strong> donne un design cohérent sans écrire de CSS spécifique.
        </li>
      </ul>

      <h2 id="kotlin">Kotlin natif plutôt que cross-platform</h2>
      <p>
        Pour le mobile, j'ai fait le choix d'une technologie <strong>native</strong> (Kotlin +
        Jetpack Compose) plutôt que d'un framework cross-platform. La raison est l'évolution du
        produit : à terme, l'application devra intégrer la <strong>connexion Bluetooth</strong> et
        d'autres fonctionnalités natives d'Android (détection de proximité, services en
        arrière-plan, capteurs). Un code natif donne un accès direct et fiable à ces API.
      </p>
      <app-callout type="info" title="Un point à discuter en présentiel">
        Ce choix natif / cross-platform est un vrai arbitrage d'ingénierie (coût de développement
        contre accès au matériel). Je peux le détailler davantage lors de la présentation.
      </app-callout>

      <h2 id="mapbox">Mapbox plutôt que Google Maps</h2>
      <p>
        La géolocalisation et la cartographie reposent sur <strong>Mapbox</strong>. Je n'ai pas
        retenu l'API Google Maps à cause de son <strong>coût</strong> : pour un hackathon, Mapbox
        offre un palier gratuit généreux, une bonne qualité de cartes sur la Suisse et un service de
        géocodage simple à intégrer.
      </p>
      <ul>
        <li>
          <strong>Côté serveur</strong> : géocodage des adresses des entreprises (API Geocoding v6,
          limité à la Suisse).
        </li>
        <li>
          <strong>Côté web</strong> : Mapbox GL JS pour la carte des entreprises et l'autocomplétion
          d'adresses.
        </li>
      </ul>

      <h2 id="azure">Microsoft Azure pour l'hébergement</h2>
      <p>
        J'ai opté pour <strong>Azure</strong> parce que j'ai une solide expérience de ce provider :
        App Service pour l'application web, Azure Database for MySQL pour les données, et les
        services associés. Connaître l'outil a été décisif pour livrer en deux jours (voir
        <em>Déploiement Azure</em>).
      </p>

      <h2 id="contraintes">Les contraintes qui ont guidé ces choix</h2>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-3">
        @for (constraint of constraints; track constraint.title) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="text-sm font-semibold tracking-wide text-red-600 uppercase dark:text-red-400">
              {{ constraint.title }}
            </p>
            <p class="mt-2 text-sm leading-6">{{ constraint.text }}</p>
          </div>
        }
      </div>
    </app-doc-page>
  `,
})
export class TechChoicesPage {
  protected readonly toc: TocItem[] = [
    { id: 'synthese', label: 'Vue d’ensemble' },
    { id: 'laravel-vue', label: 'Laravel + Vue.js' },
    { id: 'kotlin', label: 'Kotlin natif' },
    { id: 'mapbox', label: 'Mapbox' },
    { id: 'azure', label: 'Azure' },
    { id: 'contraintes', label: 'Contraintes' },
  ];

  protected readonly stack: StackItem[] = [
    {
      layer: 'Backend',
      technology: 'Laravel',
      version: '13',
      reason: 'API REST, authentification, migrations, tests.',
    },
    {
      layer: 'Langage serveur',
      technology: 'PHP',
      version: '8.3+ (8.4 sur Azure)',
      reason: 'Typage moderne, enums, performances.',
    },
    {
      layer: 'Authentification API',
      technology: 'Laravel Sanctum',
      version: '4',
      reason: 'Session pour le web, jetons Bearer pour le mobile.',
    },
    {
      layer: 'Front web',
      technology: 'Vue.js',
      version: '3.5',
      reason: 'Composants réutilisables, réactivité.',
    },
    {
      layer: 'Build front',
      technology: 'Vite',
      version: '8',
      reason: 'Compilation rapide, intégration Laravel.',
    },
    {
      layer: 'Style',
      technology: 'Tailwind CSS',
      version: '4',
      reason: 'Design cohérent et rapide.',
    },
    {
      layer: 'Mobile',
      technology: 'Kotlin + Jetpack Compose',
      version: 'Kotlin 2.2',
      reason: 'Natif Android, accès matériel.',
    },
    {
      layer: 'Réseau mobile',
      technology: 'Retrofit + OkHttp',
      version: '2.11 / 4.12',
      reason: 'Client HTTP typé et robuste.',
    },
    {
      layer: 'QR codes',
      technology: 'qrcode (web), ZXing (mobile)',
      version: '1.5 / 3.5',
      reason: 'Génération et scan des profils.',
    },
    {
      layer: 'Cartographie',
      technology: 'Mapbox',
      version: 'GL JS 3 / Geocoding v6',
      reason: 'Moins coûteux que Google Maps.',
    },
    {
      layer: 'Base de données',
      technology: 'MySQL',
      version: 'Azure MySQL',
      reason: 'Relationnel, managé sur Azure.',
    },
    {
      layer: 'Hébergement',
      technology: 'Azure App Service',
      version: 'Linux · PHP 8.4',
      reason: 'Expérience solide du provider.',
    },
  ];

  protected readonly constraints = [
    {
      title: 'Temps',
      text: 'Deux jours, un seul développeur : privilégier des outils maîtrisés et des choix réversibles.',
    },
    {
      title: 'Coût',
      text: 'Rester dans les paliers gratuits ou peu coûteux : Mapbox, Azure, modèles IA locaux.',
    },
    {
      title: 'Évolutivité',
      text: 'Préparer l’avenir : modules indépendants côté serveur, mobile natif pour le matériel.',
    },
  ];
}
