import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {Router, RouterLink} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {environment} from '../../environments/environment';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {addSharp} from "ionicons/icons";


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
    IonLabel,
    CommonModule,
    FormsModule,
    RouterLink,
    IonSearchbar,
    IonIcon,
    IonFab,
    IonFabButton
  ],
})
export class MesRapportsPage implements OnInit {
  public rapports: any[];

  public rapportsFiltres: any[];
  public apiUrl = `${environment.baseUrl}`;
  public filtreDate: string;
  public filtreNom: string;

  constructor(
    private toastController: ToastController,
    private api: ApiService,
    protected router: Router
  ) {
    this.rapports = [];
    addIcons({addSharp})
    this.rapportsFiltres = [];
    this.filtreDate = '';
    this.filtreNom = '';
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
          this.rapports = reponse.data;
          if (this.filtreDate) {
            this.filtrerParDate(this.filtreDate);
          } else {
            if (this.filtreNom) {
              this.filtrerParNom(this.filtreNom);
            } else {
              this.rapportsFiltres = this.rapports;
            }
          }
          this.api.getLesMedecins().subscribe((medecins: any) => {
            this.rapports.forEach((rapport: any) => {
              const leMedecin = medecins.data.find(
                (doctor: { _id: any }) => doctor._id === rapport.doctorId
              );

              if (leMedecin) {
                rapport.doctorName = leMedecin.name + ' ' + leMedecin.firstName;
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

  filtrerParDate(event: any) {
    // Récupère la valeur saisie dans la barre de recherche
    let valeurCherchee = event.detail.value || '';
    // Aucune valeur cherchée, on récupère toutes les offres
    if (!valeurCherchee) {
      this.rapportsFiltres = this.rapports;
    } else {
      this.filtrerLesRapports(valeurCherchee);
    }
    valeurCherchee = valeurCherchee.toLowerCase().trim();
    // Filtrer les offres
    this.rapportsFiltres = this.rapports.filter((rapport) => {
      // Vérifie si l'adresse de départ contient la valeur cherchée
      const dateMatch = rapport.date.toLowerCase().includes(valeurCherchee);
      // Si une condition est remplie, l'offre est ajoutée à la liste des offres filtrées
      return dateMatch;
    });
  }

  filtrerParNom(event: any) {
    // Récupère la valeur saisie dans la barre de recherche
    let valeurCherchee = event.detail.value || '';
    // Aucune valeur cherchée, on récupère toutes les offres
    if (!valeurCherchee) {
      this.rapportsFiltres = this.rapports;
    } else {
      this.filtrerLesRapports(valeurCherchee);
    }
    valeurCherchee = valeurCherchee.toLowerCase().trim();
    // Filtrer les offres
    this.rapportsFiltres = this.rapports.filter((rapport) => {
      // Vérifie si l'adresse de départ contient la valeur cherchée
      const dateMatch = rapport.doctorName
        .toLowerCase()
        .includes(valeurCherchee);
      // Si une condition est remplie, l'offre est ajoutée à la liste des offres filtrées
      return dateMatch;
    });
  }

  filtrerLesRapports(valeurCherchee: string) {
    valeurCherchee = valeurCherchee.toLowerCase().trim();
    // Filtrer les offres
    this.rapportsFiltres = this.rapports.filter((rapport) => {
      // Vérifie si l'adresse de départ contient la valeur cherchée
      const nameMatch = rapport.doctorName
        .toLowerCase()
        .includes(valeurCherchee);
      // Vérifie si l'un des lieux de remassage contient la valeur cherchée
      const dateMatch = rapport.date.toLowerCase().includes(valeurCherchee);
      // Si l'une des conditions est remplie, l'offre est ajoutée à la liste des offres filtrées;
      return nameMatch || dateMatch;
    });
  }

  effacerSelection() {
    this.rapportsFiltres = this.rapports;
  }
}
