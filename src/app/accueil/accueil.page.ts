import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
    RouterLinkActive,
  ],
})
export class AccueilPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
