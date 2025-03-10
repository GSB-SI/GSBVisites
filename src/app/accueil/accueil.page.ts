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
import {RouterLink} from '@angular/router';

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
  constructor() {
  }

  ngOnInit() {
  }
}
