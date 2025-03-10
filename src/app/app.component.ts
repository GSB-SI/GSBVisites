import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeSharp,
  homeOutline,
  documentTextSharp,
  documentTextOutline,
  peopleSharp,
  peopleOutline,
  medkitOutline,
  medkitSharp,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public isMenuDisabled = false;
  public appPages = [
    { title: 'Accueil', url: '/accueil', icon: 'home' },
    { title: 'Mes rapports de visite', url: '', icon: 'document-text' },
    {
      title: 'Médecins du département',
      url: '',
      icon: 'people',
    },
    { title: 'Les médicaments', url: '', icon: 'medkit' },
  ];
  constructor() {
    addIcons({
      homeSharp,
      homeOutline,
      documentTextSharp,
      documentTextOutline,
      peopleSharp,
      peopleOutline,
      medkitSharp,
      medkitOutline,
    });
  }
}
