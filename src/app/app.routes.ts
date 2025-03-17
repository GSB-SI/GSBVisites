import { Routes } from '@angular/router';

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

    loadComponent: () =>
      import('./medecins-du-departement/medecins-du-departement.page').then(
        (m) => m.MedecinsDuDepartementPage
      ),
  },
  {
    path: 'detail-medecin/:id',
    loadComponent: () =>
      import('./detail-medecin/detail-medecin.page').then(
        (m) => m.DetailMedecinPage
      ),
  },
  {
    path: 'mes-rapports',
    loadComponent: () =>
      import('./mes-rapports/mes-rapports.page').then((m) => m.MesRapportsPage),
  },
  {
    path: 'detail-rapport/:id',
    loadComponent: () =>
      import('./detail-rapport/detail-rapport.page').then(
        (m) => m.DetailRapportPage
      ),
  },
  {
    path: 'update-rapport/:id',
    loadComponent: () => import('./update-rapport/update-rapport.page').then( m => m.UpdateRapportPage)
  },
  {
    path: 'delete-rapport/:id',
    loadComponent: () => import('./delete-rapport/delete-rapport.page').then( m => m.DeleteRapportPage)
  },


];
