export interface NavLink {
  path: string;
  label: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

/**
 * Structure de la barre latérale. L'ordre des liens détermine aussi
 * la navigation « Précédent / Suivant » en bas de chaque page.
 */
export const NAVIGATION: NavSection[] = [
  {
    title: 'Démarrer',
    links: [
      { path: '/', label: 'Introduction' },
      { path: '/valeur-ajoutee', label: 'Valeur ajoutée' },
      { path: '/comparaison', label: 'Club existant vs Valais Connect' },
      { path: '/demo', label: 'Démo en ligne' },
    ],
  },
  {
    title: 'Le projet',
    links: [
      { path: '/methodologie', label: 'Méthodologie de travail' },
      { path: '/workflow-ia', label: 'Workflow & outils IA' },
    ],
  },
  {
    title: 'Technique',
    links: [
      { path: '/choix-technologiques', label: 'Choix technologiques' },
      { path: '/architecture', label: 'Architecture globale' },
      { path: '/backend', label: 'Backend Laravel' },
      { path: '/frontend', label: 'Application web Vue.js' },
      { path: '/mobile', label: 'Application mobile Kotlin' },
      { path: '/fonctionnalites', label: 'Fonctionnalités (web & mobile)' },
    ],
  },
  {
    title: 'Mise en route',
    links: [
      { path: '/installation-web', label: 'Installation web (local)' },
      { path: '/installation-mobile', label: 'Installation mobile (local)' },
      { path: '/deploiement', label: 'Déploiement Azure' },
    ],
  },
  {
    title: 'Perspectives',
    links: [
      { path: '/architecture-future', label: 'Architecture future (microservices)' },
      { path: '/vision', label: 'Vision long terme & comptes' },
    ],
  },
];

export const FLAT_NAVIGATION: NavLink[] = NAVIGATION.flatMap((section) => section.links);
