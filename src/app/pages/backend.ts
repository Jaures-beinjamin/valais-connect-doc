import { Component } from '@angular/core';
import { CodeBlock } from '../shared/code-block';
import { DocPage, TocItem } from '../shared/doc-page';

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

@Component({
  selector: 'app-backend-page',
  imports: [DocPage, CodeBlock],
  template: `
    <app-doc-page
      eyebrow="Technique"
      title="Backend Laravel"
      lead="Le backend est le cœur de Valais Connect : il porte toute la logique métier et l'expose sous forme d'API REST au web et au mobile."
      [toc]="toc"
    >
      <h2 id="structure">Organisation du code</h2>
      <app-code-block language="text" title="app/" [code]="structure" />
      <ul>
        <li>
          <strong>Controllers/Api</strong> : environ 45 contrôleurs fins, plus 17 contrôleurs
          d'administration.
        </li>
        <li>
          <strong>Requests</strong> : une trentaine de Form Requests qui centralisent la validation.
        </li>
        <li><strong>Resources</strong> : la mise en forme JSON des réponses.</li>
        <li><strong>Domain</strong> : les règles métier en PHP pur, indépendantes du framework.</li>
      </ul>

      <h2 id="donnees">Modèle de données</h2>
      <p>
        Le modèle central est <code>MemberProfile</code>. Il est relié à l'utilisateur, à son
        entreprise, à ses langues, à ses offres et besoins, à ses jetons QR, à ses inscriptions aux
        événements et à ses mises en relation.
      </p>
      <div class="not-doc my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of tables; track group.title) {
          <div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ group.title }}</p>
            <p class="mt-2 font-mono text-xs leading-5 text-slate-500">{{ group.items }}</p>
          </div>
        }
      </div>

      <h2 id="authentification">Authentification</h2>
      <ul>
        <li>
          <strong>Web</strong> : connexion par session (<code>POST /api/auth/login</code>) avec
          cookie et protection CSRF.
        </li>
        <li>
          <strong>Mobile</strong> : jeton Bearer Laravel Sanctum (<code
            >POST /api/v1/auth/token</code
          >), limité à 10 tentatives par minute.
        </li>
        <li>Un middleware <code>active</code> refuse les comptes en attente de validation.</li>
        <li>Un middleware <code>admin</code> protège l'espace d'administration du club.</li>
      </ul>

      <h2 id="evenements">Événements et inscriptions</h2>
      <p>La règle d'inscription a été définie avec Madame Emile :</p>
      <ol>
        <li>
          Si le nombre d'inscrits confirmés est inférieur à la capacité, l'inscription est
          <strong>confirmée</strong>.
        </li>
        <li>Sinon, le membre est placé en <strong>liste d'attente</strong>.</li>
        <li>
          Lorsqu'un inscrit se désiste, le premier de la liste d'attente est
          <strong>promu automatiquement</strong>.
        </li>
        <li>Un événement peut être réservé au Club des Affaires.</li>
        <li>Le jour J, l'administration fait le <strong>check-in par QR code</strong>.</li>
      </ol>

      <h2 id="api">Principaux points d'API</h2>
      <p>Extrait des 309 routes déclarées (préfixe <code>/api/v1</code> pour le mobile) :</p>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Méthode</th>
              <th>Route</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            @for (endpoint of endpoints; track endpoint.method + endpoint.path) {
              <tr>
                <td>
                  <span
                    class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800"
                    >{{ endpoint.method }}</span
                  >
                </td>
                <td class="font-mono text-xs whitespace-nowrap">{{ endpoint.path }}</td>
                <td>{{ endpoint.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <h2 id="taches">Tâches planifiées et notifications</h2>
      <ul>
        <li><code>digest:weekly</code> : résumé hebdomadaire par e-mail, chaque lundi à 07:00.</li>
        <li>
          <code>connections:send-reminders</code> : relances des mises en relation, chaque jour à
          08:00.
        </li>
        <li>
          <code>presences:purge</code> : suppression, chaque heure, des positions partagées pendant
          les événements terminés.
        </li>
        <li>
          Notifications stockées en base (affichées dans l'application) et envoyées par e-mail selon
          les préférences du membre, en français ou en allemand.
        </li>
      </ul>

      <h2 id="qualite">Qualité</h2>
      <p>
        Les tests sont écrits avec <strong>PHPUnit</strong> et s'exécutent sur une base SQLite en
        mémoire. Le code est formaté avec <strong>Laravel Pint</strong>.
      </p>
      <app-code-block code="composer test" />
    </app-doc-page>
  `,
})
export class BackendPage {
  protected readonly toc: TocItem[] = [
    { id: 'structure', label: 'Organisation du code' },
    { id: 'donnees', label: 'Modèle de données' },
    { id: 'authentification', label: 'Authentification' },
    { id: 'evenements', label: 'Événements' },
    { id: 'api', label: 'Points d’API' },
    { id: 'taches', label: 'Tâches planifiées' },
    { id: 'qualite', label: 'Qualité' },
  ];

  protected readonly structure = `app/
├── Console/Commands/      # Résumé hebdomadaire, relances
├── Domain/                # Règles métier en PHP pur
│   ├── Matching/          # MatchingService, MatchingConfig, TextNormalizer
│   ├── Connections/       # Machine à états des mises en relation
│   ├── Membership/        # MembershipTier (ami / affaires), saisons
│   ├── Qr/                # QrTokenService (jetons signés)
│   └── Translation/       # Glossaire FR ↔ DE
├── Http/
│   ├── Controllers/Api/   # Contrôleurs fins (+ Admin/)
│   ├── Middleware/        # active, admin, network
│   ├── Requests/          # Validation
│   └── Resources/         # Mise en forme JSON
├── Models/                # Eloquent
├── Notifications/
├── Policies/
└── Services/              # MapboxGeocoder, InvitationService…`;

  protected readonly tables = [
    {
      title: 'Membres & profils',
      items:
        'users, member_profiles, member_languages, profile_entries, profile_photos, member_favorites',
    },
    { title: 'Événements', items: 'events, event_registrations, event_appointments' },
    {
      title: 'Mises en relation',
      items: 'member_connections, connection_messages, monthly_matches, member_reviews',
    },
    {
      title: 'Entreprises',
      items: 'companies, company_cards, opportunities, opportunity_responses',
    },
    {
      title: 'Communauté',
      items: 'groups, group_members, posts, post_comments, mentor_applications',
    },
    {
      title: 'Système',
      items:
        'member_qr_tokens, invitations, pass_shares, notifications, personal_access_tokens, admin_audit_logs',
    },
  ];

  protected readonly endpoints: Endpoint[] = [
    { method: 'POST', path: 'auth/register', description: 'Demande d’adhésion avec photo.' },
    {
      method: 'POST',
      path: 'auth/token',
      description: 'Connexion mobile, renvoie un jeton Sanctum.',
    },
    {
      method: 'GET',
      path: 'events',
      description: 'Liste des événements (filtres : accès, catégorie, mode).',
    },
    {
      method: 'POST',
      path: 'events/{id}/registrations',
      description: 'Inscription (confirmée ou liste d’attente).',
    },
    {
      method: 'DELETE',
      path: 'events/{id}/registrations',
      description: 'Désinscription et promotion de la liste d’attente.',
    },
    {
      method: 'GET',
      path: 'events/{id}/participants',
      description: 'Participants d’un événement.',
    },
    {
      method: 'GET',
      path: 'suggestions',
      description: 'Profils suggérés, classés par score de matching.',
    },
    {
      method: 'GET',
      path: 'members/{id}/match',
      description: 'Score et raisons du match avec un membre.',
    },
    {
      method: 'POST',
      path: 'events/{id}/presence',
      description:
        'Partage de position pendant l’événement ; renvoie les membres pertinents proches.',
    },
    {
      method: 'DELETE',
      path: 'events/{id}/presence',
      description: 'Arrêt de la détection et suppression de la position.',
    },
    { method: 'GET', path: 'profiles/me/qr', description: 'QR code personnel du membre connecté.' },
    {
      method: 'GET',
      path: 'qr/{token}',
      description: 'Profil public associé à un QR code scanné.',
    },
    { method: 'GET', path: 'notifications', description: 'Notifications dans l’application.' },
    { method: 'GET', path: 'up', description: 'Contrôle de santé (déploiement, mobile).' },
  ];
}
