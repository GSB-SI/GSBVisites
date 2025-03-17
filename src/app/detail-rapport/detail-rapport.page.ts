import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {addIcons} from 'ionicons';
import {pencilOutline, pencilSharp, trashOutline, trashSharp,} from 'ionicons/icons';
import {ApiService} from '../services/api.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-detail-rapport',
  templateUrl: './detail-rapport.page.html',
  styleUrls: ['./detail-rapport.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
    RouterLink,
    IonBackButton,
    IonButtons,
    IonItem,
    IonIcon,
    IonButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonToolbar,
  ],
})
export class DetailRapportPage implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastController = inject(ToastController);
  private api = inject(ApiService);

  public rapport!: any;

  constructor() {
    addIcons({
      pencilSharp,
      pencilOutline,
      trashOutline,
      trashSharp,
    });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getUnRapport(id).subscribe({
      next: async (reponse: any) => {
        // *** réponse OK (statut 200) : authentification réussie
        if (reponse.status == 200) {
          // Récupère la liste des offres

          this.rapport = reponse.data;
          console.log(this.rapport);

          // Met à jour le token dans le service API
          this.api.accountInfos.token = reponse.data.token;
          // *** réponse PAS OK (statut 401) : unauthorised
        } else if (reponse.status == '401') {
          if (reponse.data.description == "Le jeton d'accès a expiré") {
            await this.afficheToast(
              'Délai expiré. Vous devez vous reconnecter',
              3000,
              'middle'
            );
            await this.router.navigate(['/login']);
          } else {
            await this.afficheToast(
              "Un problème est survenu. Contactez l'administrateur",
              3000,
              'middle'
            );
            console.log(reponse);
          }
          // *** réponse PAS OK (autres erreurs)
        } else {
          await this.afficheToast(
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


  async afficheToast(message: string, duree: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duree,
      position: position,
    });
    await toast.present();
  }
}
