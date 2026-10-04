import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Valais Connect — Documentation',
    loadComponent: () => import('./pages/home').then((m) => m.HomePage),
  },
  {
    path: 'demo',
    title: 'Démo en ligne · Valais Connect',
    loadComponent: () => import('./pages/demo').then((m) => m.DemoPage),
  },
  {
    path: 'methodologie',
    title: 'Méthodologie de travail · Valais Connect',
    loadComponent: () => import('./pages/methodology').then((m) => m.MethodologyPage),
  },
  {
    path: 'workflow-ia',
    title: 'Workflow & outils IA · Valais Connect',
    loadComponent: () => import('./pages/workflow-ai').then((m) => m.WorkflowAiPage),
  },
  {
    path: 'choix-technologiques',
    title: 'Choix technologiques · Valais Connect',
    loadComponent: () => import('./pages/tech-choices').then((m) => m.TechChoicesPage),
  },
  {
    path: 'architecture',
    title: 'Architecture globale · Valais Connect',
    loadComponent: () => import('./pages/architecture').then((m) => m.ArchitecturePage),
  },
  {
    path: 'backend',
    title: 'Backend Laravel · Valais Connect',
    loadComponent: () => import('./pages/backend').then((m) => m.BackendPage),
  },
  {
    path: 'frontend',
    title: 'Application web Vue.js · Valais Connect',
    loadComponent: () => import('./pages/frontend').then((m) => m.FrontendPage),
  },
  {
    path: 'mobile',
    title: 'Application mobile Kotlin · Valais Connect',
    loadComponent: () => import('./pages/mobile').then((m) => m.MobilePage),
  },
  {
    path: 'fonctionnalites',
    title: 'Fonctionnalités · Valais Connect',
    loadComponent: () => import('./pages/features').then((m) => m.FeaturesPage),
  },
  {
    path: 'installation-web',
    title: 'Installation web · Valais Connect',
    loadComponent: () => import('./pages/install-web').then((m) => m.InstallWebPage),
  },
  {
    path: 'installation-mobile',
    title: 'Installation mobile · Valais Connect',
    loadComponent: () => import('./pages/install-mobile').then((m) => m.InstallMobilePage),
  },
  {
    path: 'deploiement',
    title: 'Déploiement Azure · Valais Connect',
    loadComponent: () => import('./pages/deployment').then((m) => m.DeploymentPage),
  },
  {
    path: 'architecture-future',
    title: 'Architecture future · Valais Connect',
    loadComponent: () =>
      import('./pages/future-architecture').then((m) => m.FutureArchitecturePage),
  },
  {
    path: 'vision',
    title: 'Vision long terme · Valais Connect',
    loadComponent: () => import('./pages/vision').then((m) => m.VisionPage),
  },
  { path: '**', redirectTo: '' },
];
