import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    RouterLink,
  ],
})
export class AccueilPage implements OnInit {

  constructor(
    private toastController: ToastController,
    private api: ApiService,
    private router: Router
  ) {}

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
