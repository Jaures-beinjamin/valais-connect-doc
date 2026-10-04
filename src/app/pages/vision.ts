import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';
import { WEB_APP_URL } from '../project-links';

interface RoadmapStage {
  horizon: string;
  title: string;
  items: string[];
}

@Component({
  selector: 'app-vision-page',
  imports: [DocPage, Callout],
  template: `
    <app-doc-page
      eyebrow="Perspectives"
      title="Vision long terme & comptes"
      lead="Le hackathon a posé des fondations solides. Voici comment Valais Connect peut évoluer, et en bas de page les comptes de démonstration pour tester l'application."
      [toc]="toc"
    >
      <h2 id="vision">La vision</h2>
      <p>
        Valais Connect a vocation à devenir
        <strong>le point de rencontre numérique des clubs du Valais</strong> : un seul outil pour
        adhérer, participer aux événements et, surtout, transformer chaque rencontre en opportunité
        — amicale ou professionnelle, en français comme en allemand.
      </p>

      <h2 id="feuille-de-route">Feuille de route</h2>
      <div class="not-doc my-6 space-y-4">
        @for (stage of roadmap; track stage.title) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-red-600 px-3 py-0.5 text-xs font-bold text-white">{{
                stage.horizon
              }}</span>
              <p class="font-semibold text-slate-900 dark:text-white">{{ stage.title }}</p>
            </div>
            <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm marker:text-red-500">
              @for (item of stage.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>

      <h2 id="modules">Deux clubs, une plateforme</h2>
      <p>
        Le backend a été pensé dès le départ en deux modules indépendants. Le
        <strong>Club des Amis</strong> a été au centre du hackathon ; le
        <strong>Club des Affaires</strong> pourra évoluer à son rythme (opportunités, mentorat,
        statistiques d'impact économique) sans remettre en cause le socle commun.
      </p>

      <h2 id="comptes">Comptes de démonstration</h2>
      <p>
        L'application est déployée sur
        <a [href]="webAppUrl" target="_blank" rel="noopener">Azure</a>. Les comptes ci-dessous sont
        des <strong>comptes fictifs</strong> créés pour la démonstration ; ils fonctionnent sur le
        web comme sur l'application Android.
      </p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Profil</th>
              <th>Ce que vous pourrez tester</th>
              <th>E-mail</th>
              <th>Mot de passe</th>
            </tr>
          </thead>
          <tbody>
            @for (profile of demoProfiles; track profile[0]) {
              <tr>
                <td class="font-medium whitespace-nowrap text-slate-900 dark:text-white">
                  {{ profile[0] }}
                </td>
                <td>{{ profile[1] }}</td>
                <td class="font-mono text-xs text-slate-400">à compléter</td>
                <td class="font-mono text-xs text-slate-400">à compléter</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <app-callout type="warning" title="Données fictives">
        Toutes les personnes et entreprises de démonstration sont fictives. Merci de ne pas saisir
        de données personnelles réelles dans l'environnement de démonstration.
      </app-callout>
    </app-doc-page>
  `,
})
export class VisionPage {
  protected readonly webAppUrl = WEB_APP_URL;

  protected readonly toc: TocItem[] = [
    { id: 'vision', label: 'La vision' },
    { id: 'feuille-de-route', label: 'Feuille de route' },
    { id: 'modules', label: 'Deux clubs' },
    { id: 'comptes', label: 'Comptes de démo' },
  ];

  protected readonly roadmap: RoadmapStage[] = [
    {
      horizon: 'Court terme',
      title: 'Consolider le prototype',
      items: [
        'Réactiver la CI/CD GitHub Actions vers Azure.',
        'Alerte de proximité pendant les événements sur Android (position + notification).',
        'Notifications push mobiles.',
        'Publication de l’application sur le Google Play Store.',
      ],
    },
    {
      horizon: 'Moyen terme',
      title: 'Exploiter le natif',
      items: [
        'Détection de proximité par Bluetooth Low Energy, plus précise en intérieur que le GPS.',
        'Échange de profil sans QR code entre deux téléphones proches.',
        'Mode hors ligne pour les salons à faible couverture réseau.',
      ],
    },
    {
      horizon: 'Long terme',
      title: 'Devenir la plateforme des clubs valaisans',
      items: [
        'Développement du module Club des Affaires : opportunités, mentorat, mesure de l’impact économique local.',
        'Matching enrichi par l’historique des rencontres et des mises en relation réussies.',
        'Ouverture à d’autres clubs et associations du canton.',
        'Application iOS.',
      ],
    },
  ];

  protected readonly demoProfiles: [string, string][] = [
    ['Club des Amis', 'Événements, inscriptions, profil et QR code.'],
    ['Club des Affaires', 'Réseau, suggestions de matching, mises en relation.'],
    ['Club des Affaires (DE)', 'Interface et matching en allemand.'],
    ['Collaborateur', 'Accès rattaché à une entreprise membre.'],
    ['Administration', 'Gestion des membres, des événements et check-in QR.'],
  ];
}
