import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Account } from '../services/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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

  onSubmit() {
    // Le formulaire est valide (selon les validators définis)
    if (this.loginForm.valid) {
      // on récupère les valeurs saisies dans les constantes username et password
      const { username, password } = this.loginForm.value;
      // Appel de la méthode login du service ApiService
      this.api.login(username, password).subscribe({
        next: (reponse: any) => {
          // Réponse OK (statut 200) : authentification réussie
          if (reponse.status == 200) {
            // On place les données retournées par la requête dans la propriété accountInfos du service Api
            this.api.accountInfos = reponse.data;
            // on affiche un message sur l'écran
            this.afficheToast('Connecté !', 5000, 'bottom');
            // on redirige vers la page accueil
            this.router.navigate(['/accueil']);
            // Réponse PAS OK (statut 403) : forbidden
          } else if (reponse.status == '403') {
            this.afficheToast(
              'Vous ne disposez pas des habilitations nécessaires',
              5000,
              'middle'
            );
            // Réponse PAS OK (autres erreurs)
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
}
