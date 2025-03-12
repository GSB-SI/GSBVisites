import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {addIcons} from 'ionicons';
import {arrowBackSharp, callSharp} from 'ionicons/icons';
import * as Leaflet from 'leaflet';
import {OpencageapiService} from "../services/opencageapi.service";

@Component({
  selector: 'app-detail-medecin',
  templateUrl: './detail-medecin.page.html',
  styleUrls: ['./detail-medecin.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class DetailMedecinPage implements OnInit {
  public medecin: any;
  public map!: Leaflet.Map;
  private blueIcon!: Leaflet.Icon;
  private provider: OpencageapiService = inject(OpencageapiService);

  constructor(
    private toastController: ToastController,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    addIcons({callSharp, arrowBackSharp});

    this.blueIcon = new Leaflet.Icon({
      iconUrl: '/assets/image/map-icons/marker-icon-2x-blue.png',
      shadowUrl: '/assets/image/map-icons/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.api.getUnMedecin(id).subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.medecin = reponse.data;
        } else if (reponse.status == '401') {
          if (reponse.data.description == "Le jeton d'accès a expiré") {
            this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
            this.router.navigate(['/login']);
          } else {
            this.afficheToast("Un problème est survenu. Contactez l'administrateur", 3000, 'middle');
            console.log(reponse);
          }
        } else {
          this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
          console.log(reponse);
        }
        this.ionViewDidEnter()
      },
      error: () => {
        this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
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

  callMedecin(phone: string) {
    if (!phone) return;
    window.open(`tel:${phone}`, '_system');
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  async coordonnees() {
    this.provider.getCoordinatesFromAddress(this.medecin.address).subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200 && reponse.data.results.length > 0) {
          const coords = reponse.data.results[0].geometry;
          const titre: string = this.medecin.address;
          this.ajouteMarker(coords.lat, coords.lng, titre, this.blueIcon);
          const latlng = Leaflet.latLng(coords.lat, coords.lng);
          this.map.panTo(latlng)
        } else {
          console.log(reponse);
        }
      },
    });
  }

  loadmap() {
    this.map = Leaflet.map('map', {
      center: [48.866667, 2.333333], // latitude et longitude de Paris
      zoom: 11,
    });
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: ' &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    this.coordonnees()
  }

  ajouteMarker(latitude: number, longitude: number, title: string, icon: Leaflet.Icon) {
    // Crée le marker
    let marker = Leaflet.marker([latitude, longitude], {icon: icon});
    // Lui associe une popup s’affichant lors du clic
    marker.bindPopup(title);
    // Ajoute le marker à la carte
    marker.addTo(this.map);
  }

}
