import { Component } from '@angular/core';
import { Callout } from '../shared/callout';
import { DocPage, TocItem } from '../shared/doc-page';

interface Agent {
  name: string;
  role: string;
}

@Component({
  selector: 'app-workflow-ai-page',
  imports: [DocPage, Callout],
  template: `
    <app-doc-page
      eyebrow="Le projet"
      title="Workflow & outils IA"
      lead="Une fois l'architecture et les contraintes posées, j'ai organisé un flux de travail outillé par l'IA pour tenir les délais du hackathon sans sacrifier la qualité."
      [toc]="toc"
    >
      <h2 id="outils">Les outils retenus</h2>
      <div class="not-doc my-6 grid gap-4 sm:grid-cols-3">
        @for (tool of tools; track tool.name) {
          <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <p class="font-semibold text-slate-900 dark:text-white">{{ tool.name }}</p>
            <p class="mt-2 text-sm leading-6">{{ tool.usage }}</p>
          </div>
        }
      </div>

      <h2 id="flux">Le flux de travail</h2>
      <p>Chaque fonctionnalité suivait le même cycle court :</p>
      <ol>
        <li>
          <strong>Cadrage</strong> : description du besoin, du contrat d'API et des critères
          d'acceptation.
        </li>
        <li>
          <strong>Reformulation</strong> : l'IA reformule pour révéler les ambiguïtés (étape déjà
          utilisée pour l'architecture).
        </li>
        <li>
          <strong>Implémentation</strong> : génération assistée, puis relecture et adaptation
          humaine.
        </li>
        <li>
          <strong>Vérification</strong> : tests automatisés (PHPUnit côté Laravel, tests de contrat
          d'API côté mobile).
        </li>
        <li>
          <strong>Intégration</strong> : validation dans l'application web puis dans l'application
          mobile.
        </li>
      </ol>

      <h2 id="multi-agents">Le système multi-agents local</h2>
      <p>
        En complément des assistants en ligne, j'ai intégré un
        <strong>système multi-agents exécuté en local avec Ollama</strong>. Chaque agent a un rôle
        unique et un périmètre d'outils limité ; un agent « lead manager » orchestre les autres et
        fait passer chaque livrable par des <strong>portes de validation (G0 à G4)</strong>.
      </p>
      <p>Les rôles sont décrits dans le dépôt, dans le dossier <code>.github/agents/</code> :</p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Responsabilité</th>
            </tr>
          </thead>
          <tbody>
            @for (agent of agents; track agent.name) {
              <tr>
                <td>
                  <code>{{ agent.name }}</code>
                </td>
                <td>{{ agent.role }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p>
        Un
        <strong>contrat commun</strong> (<code>.github/contracts/valais-connect-contract.md</code>)
        fixe les règles partagées par tous les agents : vocabulaire métier, conventions d'API et
        exigences de qualité.
      </p>

      <app-callout type="note" title="L'IA accélère, l'humain décide">
        Les choix d'architecture, de technologies, de déploiement et de périmètre ont été pris par
        moi. L'IA a servi à reformuler, à accélérer l'écriture du code et à multiplier les
        vérifications — jamais à remplacer le jugement d'ingénieur.
      </app-callout>

      <h2 id="benefices">Bénéfices observés</h2>
      <ul>
        <li>Un rythme soutenu : 18 h de développement pour trois applications livrées.</li>
        <li>Des rôles séparés qui évitent qu'un même agent écrive et valide son propre code.</li>
        <li>Des contrats d'API explicites partagés entre le web et le mobile.</li>
        <li>
          Un modèle local (Ollama) pour les tâches répétitives, sans coût d'API supplémentaire.
        </li>
      </ul>
    </app-doc-page>
  `,
})
export class WorkflowAiPage {
  protected readonly toc: TocItem[] = [
    { id: 'outils', label: 'Outils retenus' },
    { id: 'flux', label: 'Flux de travail' },
    { id: 'multi-agents', label: 'Système multi-agents' },
    { id: 'benefices', label: 'Bénéfices observés' },
  ];

  protected readonly tools = [
    {
      name: 'GPT-5',
      usage:
        'Assistant principal de développement : génération de code, revue, rédaction des contrats d’API.',
    },
    {
      name: 'Gemini',
      usage:
        'Reformulation de l’architecture et des besoins pour obtenir des précisions et détecter les oublis.',
    },
    {
      name: 'Ollama (local)',
      usage:
        'Exécution locale d’un système multi-agents spécialisés, orchestré par un agent chef de projet.',
    },
  ];

  protected readonly agents: Agent[] = [
    {
      name: 'valais-lead-manager',
      role: 'Orchestration, délégation, portes de validation G0→G4, arbitrages MVP.',
    },
    {
      name: 'valais-innovation',
      role: 'Proposition de valeur et idées différenciantes (matching expliqué, QR code, FR/DE).',
    },
    {
      name: 'valais-architecte',
      role: 'Modèle de données, algorithme de matching explicable, contrats front/back.',
    },
    {
      name: 'valais-backend',
      role: 'Backend Laravel : profils, matching, mises en relation, QR codes, API.',
    },
    {
      name: 'valais-dev-php',
      role: 'Logique métier PHP pure : services, value objects, enums, jetons.',
    },
    {
      name: 'valais-frontend',
      role: 'Interface Vue 3 / Tailwind, accessibilité et bilinguisme FR/DE.',
    },
    {
      name: 'valais-dev-javascript',
      role: 'Client API, scan et rendu des QR codes, i18n, composables.',
    },
    {
      name: 'valais-qa-engineer',
      role: 'Plan de test et tests automatisés (PHPUnit, bout en bout).',
    },
    {
      name: 'valais-qa-securite',
      role: 'Autorisations, protection des données (LPD suisse), consentement.',
    },
    {
      name: 'valais-devops',
      role: 'Build, migrations, seeders de démo, déploiement et plan de secours.',
    },
    { name: 'valais-pitch', role: 'Récit, script de démo et réponses aux questions du jury.' },
  ];
}
