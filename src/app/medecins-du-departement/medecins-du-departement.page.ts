import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from "../services/api.service";
import {Router, RouterLink} from "@angular/router";
import {IonicModule, ToastController} from "@ionic/angular";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-medecins-du-departement',
  templateUrl: './medecins-du-departement.page.html',
  styleUrls: ['./medecins-du-departement.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class MedecinsDuDepartementPage {
  public medecins: [];
  public medecinsFiltres: [];
  public apiUrl = `${environment.baseUrl}`;
  protected readonly JSON = JSON;

  constructor(
    private toastController: ToastController,
    private api: ApiService,
    private router: Router
  ) {
    this.medecins = [];
    this.medecinsFiltres = [];
  }

  ionViewWillEnter() {
    if (!this.api.accountInfos.accessToken) {
      this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
      this.router.navigate(['/login']);
    }
    this.remplirListeMedecins();
  }

  async afficheToast(message: string, duree: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duree,
      position: position,
    });
    await toast.present();
  }

  private remplirListeMedecins() {
    this.api.getLesMedecins().subscribe({
      next: (reponse: any) => {
        // *** réponse OK (statut 200) : authentification réussie
        if (reponse.status == 200) {
          // Récupère la liste des medecins
          this.medecins = reponse.data;
          this.medecinsFiltres = reponse.data.filter((medec: any) => {
            return medec.department.toString() === this.api.accountInfos.user.department.toString();
          })
          // *** réponse PAS OK (statut 401) : unauthorised
        } else if (reponse.status == '401') {
          if (reponse.data.description == "Le jeton d’accès a expiré") {
            this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
            this.router.navigate(['/login']);
          } else {
            this.afficheToast("Un problème est survenu. Contactez l'administrateur", 3000, 'middle');
          }
          // *** réponse PAS OK (autres erreurs)
        } else {
          this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
          console.log(reponse);
        }
      },
      error: () => {
        this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
      },
    });
  }
}
