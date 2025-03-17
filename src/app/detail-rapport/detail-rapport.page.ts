import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonIcon,
  IonButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  pencilSharp,
  pencilOutline,
  trashOutline,
  trashSharp,
} from 'ionicons/icons';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-detail-rapport',
  templateUrl: './detail-rapport.page.html',
  styleUrls: ['./detail-rapport.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
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
  ],
})
export class DetailRapportPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastController = inject(ToastController);
  private api = inject(ApiService);

  public rapport!: any;
  public apiUrl = `${environment.baseUrl}`;
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
            console.log(reponse);
          }
          // *** réponse PAS OK (autres erreurs)
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
  ngOnDestroy() {}

  async afficheToast(message: string, duree: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duree,
      position: position,
    });
    await toast.present();
  }

  async afficheToastAvecBouton(
    leMessage: string,
    laPosition: any,
    texteBouton: string
  ) {
    const toast = await this.toastController.create({
      message: leMessage,
      position: laPosition,
      buttons: [
        {
          text: texteBouton,
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  protected readonly JSON = JSON;
}
