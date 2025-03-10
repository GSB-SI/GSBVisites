import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    loadComponent: () =>
      import('./accueil/accueil.page').then((m) => m.AccueilPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'medecins-du-departement',
    loadComponent: () => import('./medecins-du-departement/medecins-du-departement.page').then(m => m.MedecinsDuDepartementPage)
  },

];
