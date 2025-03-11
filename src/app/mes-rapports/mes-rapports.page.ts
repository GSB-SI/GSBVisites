import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { Rapport } from '../services/interfaces';

@Component({
  selector: 'app-mes-rapports',
  templateUrl: './mes-rapports.page.html',
  styleUrls: ['./mes-rapports.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonSearchbar,
    IonLabel,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class MesRapportsPage implements OnInit {
  public rapports: any[];
  public apiUrl = `${environment.baseUrl}`;

  constructor(
    private toastController: ToastController,
    private api: ApiService,
    private router: Router
  ) {
    this.rapports = [];
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (!this.api.accountInfos.accessToken) {
      this.afficheToast(
        'Délai expiré. Vous devez vous reconnecter',
        3000,
        'middle'
      );
      this.router.navigate(['/login']);
    }
    this.remplirListeRapport();
  }

  async afficheToast(message: string, duree: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duree,
      position: position,
    });
    await toast.present();
  }

  private remplirListeRapport() {
    this.api.getMesRapports(this.api.accountInfos.user._id).subscribe({
      next: async (reponse: any) => {
        if (reponse.status == 200) {
          console.log(reponse.data);
          this.rapports = reponse.data;
          this.api.getLesMedecins().subscribe((medecins: any) => {
            this.rapports.forEach((rapport: any) => {
              const leMedecin = medecins.data.find(
                (doctor: { _id: any }) => doctor._id === rapport.doctorId
              );

              if (leMedecin) {
                rapport.doctorName = leMedecin.firstName + ' ' + leMedecin.name;
              }
            });
          });
          this.api.accountInfos.token = reponse.data.token;
        } else if (reponse.status == '401') {
          console.log(reponse);
          if (reponse.data.description == 'Le jeton d’accès a expiré') {
            this.afficheToast(
              'Délai expiré. Vous devez vous reconnecter',
              3000,
              'middle'
            );
            this.router.navigate(['/login']);
          } else {
            this.afficheToast(
              "Un problème est survenu. Contactez l'administrateur",
              3000,
              'middle'
            );
          }
        } else {
          this.afficheToast(
            "Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit",
            5000,
            'middle'
          );
          console.log(reponse);
        }
      },
      error: () => {
        this.afficheToast(
          "Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit",
          5000,
          'middle'
        );
      },
    });
  }
}
