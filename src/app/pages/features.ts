import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface MatchCriterion {
  criterion: string;
  points: string;
}

@Component({
  selector: 'app-features-page',
  imports: [DocPage, Callout],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Fonctionnalités innovantes"
      lead="Trois fonctionnalités distinguent Valais Connect : le matching explicable des profils, la géolocalisation pendant les événements et le scan d'un profil en un clic."
      [toc]="toc"
    >
      <!-- 1. Matching -->
      <h2 id="matching">1. Le matching des profils</h2>
      <p>
        Le matching répond à une question simple : <em>« Qui dois-je rencontrer ? »</em>. Pour
        chaque paire de membres, le serveur calcule un <strong>score de 0 à 100</strong> et,
        surtout, <strong>explique pourquoi</strong> les deux profils se correspondent.
      </p>

      <h3>Étape 1 — Normalisation du texte</h3>
      <p>
        Les offres, besoins et compétences sont saisis librement, en français ou en allemand. Le
        texte est d'abord normalisé : mots vides FR/DE retirés et synonymes regroupés (par exemple
        <em>Treuhand</em> et <em>comptabilité</em> deviennent <em>fiduciaire</em>). Deux membres qui
        ne parlent pas la même langue peuvent donc tout de même se correspondre.
      </p>

      <h3>Étape 2 — Calcul du score</h3>
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
        La somme est plafonnée à <strong>100</strong>. Un profil est <strong>suggéré</strong> dès
        que son score atteint <strong>35</strong>.
      </p>

      <h3>Étape 3 — Classement et explication</h3>
      <ul>
        <li>
          Les profils sont classés par score, puis par nombre de correspondances directes
          besoin/offre, puis par bonus inter-régions.
        </li>
        <li>Les membres déjà en relation sont exclus des suggestions.</li>
        <li>
          Chaque raison est renvoyée avec une clé de traduction : l'interface affiche en clair, en
          FR ou en DE, <em>pourquoi</em> le match est proposé.
        </li>
      </ul>
      <app-callout type="note" title="Un matching explicable">
        Pas de boîte noire : le membre voit les raisons du score (besoins couverts, langues
        communes, secteurs complémentaires…). C'est ce qui donne confiance pour engager la
        conversation.
      </app-callout>

      <!-- 2. Géolocalisation -->
      <h2 id="geolocalisation">2. La géolocalisation pendant un événement</h2>
      <p>
        L'idée : pendant un événement,
        <strong>être averti par une notification sur son mobile</strong> lorsqu'une personne avec
        qui l'on a un bon score de matching se trouve <strong>près de soi</strong>. On passe du «
        qui dois-je rencontrer ? » au « il est à dix mètres, allez lui parler ».
      </p>

      <h3>Ce qui est en place</h3>
      <ul>
        <li>
          <strong>Géocodage des entreprises</strong> : à l'enregistrement d'une adresse, le serveur
          interroge Mapbox (Geocoding v6, limité à la Suisse) et stocke latitude et longitude.
        </li>
        <li>
          <strong>Carte interactive</strong> : l'application web affiche les entreprises membres sur
          une carte Mapbox centrée sur le Valais.
        </li>
        <li><strong>Autocomplétion d'adresses</strong> dans les formulaires.</li>
        <li>
          <strong>Score de matching</strong> disponible pour chaque paire de membres, base du
          filtrage des alertes.
        </li>
      </ul>

      <h3>Fonctionnement de l'alerte de proximité</h3>
      <ol>
        <li>Le participant confirmé active la détection à l'entrée de l'événement.</li>
        <li>
          L'application mobile partage sa position, uniquement pendant la durée de l'événement.
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
        La cartographie et le géocodage Mapbox sont opérationnels côté serveur et web. L'alerte de
        proximité sur mobile (partage de position et notifications système) est la prochaine étape
        de l'application Android : c'est l'une des raisons du choix du natif.
      </app-callout>

      <!-- 3. QR -->
      <h2 id="scan">3. Le scan d'un profil en un clic</h2>
      <p>
        Chaque membre dispose d'un <strong>QR code personnel</strong>, affiché sur le web et dans
        l'application mobile. Lors d'une rencontre, il suffit de le scanner : le profil s'ouvre
        immédiatement, avec le score de matching et la possibilité de demander une mise en relation.
      </p>
      <h3>Sécurité du QR code</h3>
      <ul>
        <li>
          Le QR code contient un <strong>jeton aléatoire de 32 octets</strong>, pas l'identifiant du
          membre.
        </li>
        <li>
          Seule une <strong>empreinte HMAC-SHA256</strong> du jeton est stockée en base : une fuite
          de la base ne permet pas de reconstituer les QR codes.
        </li>
        <li>
          Le jeton peut être <strong>régénéré</strong> par l'administration à tout moment, ce qui
          invalide l'ancien QR code.
        </li>
        <li>
          Le même mécanisme sert au <strong>check-in</strong> des participants le jour de
          l'événement.
        </li>
      </ul>
      <h3>Côté clients</h3>
      <ul>
        <li>
          <strong>Web</strong> : caméra arrière + API <code>BarcodeDetector</code> du navigateur.
        </li>
        <li>
          <strong>Mobile</strong> : scanner ZXing intégré ; le code peut aussi être saisi à la main.
        </li>
      </ul>
    </app-doc-page>
  `,
})
export class FeaturesPage {
  protected readonly toc: TocItem[] = [
    { id: 'matching', label: 'Matching des profils' },
    { id: 'geolocalisation', label: 'Géolocalisation' },
    { id: 'scan', label: 'Scan de profil' },
  ];

  protected readonly criteria: MatchCriterion[] = [
    { criterion: 'Mes besoins correspondent à ses offres', points: '8 / terme · max 50' },
    {
      criterion: 'Mes besoins apparaissent dans la description de son entreprise',
      points: '3 / terme · max 9',
    },
    { criterion: 'Mes besoins correspondent à ses compétences', points: '5 / terme · max 15' },
    {
      criterion: 'Projets ouverts couverts par les offres de l’autre (dans les deux sens)',
      points: '6 / terme · max 18',
    },
    { criterion: 'Réciprocité : mes offres répondent à ses besoins', points: '5 / terme · max 15' },
    { criterion: 'Langues communes', points: '10 (une) · 15 (deux et +)' },
    { criterion: 'Centres d’intérêt communs', points: '5 chacun · max 15' },
    { criterion: 'Secteurs complémentaires', points: '6' },
    { criterion: 'Même secteur (si non complémentaire)', points: '10' },
    { criterion: 'Régions différentes (bonus inter-régions)', points: '10' },
    { criterion: 'Même région', points: '6' },
  ];
}
