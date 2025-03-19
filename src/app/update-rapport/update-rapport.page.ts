import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, trashSharp } from 'ionicons/icons';
@Component({
  selector: 'app-update-rapport',
  templateUrl: './update-rapport.page.html',
  styleUrls: ['./update-rapport.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonDatetime,
    IonNote,
    IonTextarea,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonInput,
    IonList,
    IonIcon,
  ],
})
export class UpdateRapportPage {
  rapport: any = {
    userId: null,
    doctorId: null,
    doctorName: null,
    date: '',
    reason: '',
    summary: '',
    specimens: [],
  };

  rapportSpecimens: any = {
    medicineId: null,
    quantity: null,
  };

  isDateModalOpen: boolean = false;
  isMedecinModalOpen: boolean = false;
  isMotifModalOpen: boolean = false;
  isMedicamentModalOpen: boolean = false;

  tempDate: string = '';
  selectedDoctor: any = null;
  selectedMedicine: any = null;
  selectedMotif: string = '';

  doctors: any[] = [];
  reasons: any[] = [];
  medicines: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {
    addIcons({
      trashOutline,
      trashSharp,
    });
  }

  ionViewWillEnter() {
    if (!this.apiService.accountInfos.accessToken) {
      this.afficheToast(
        'Délai expiré. Vous devez vous reconnecter',
        3000,
        'middle'
      );
      this.router.navigate(['/login']);
    }
    this.remplirListeMedecins();
    this.remplirListeMedicaments();
    this.remplirListeRaisons();
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getUnRapport(id).subscribe({
      next: async (reponse: any) => {
        // *** réponse OK (statut 200) : authentification réussie
        if (reponse.status == 200) {
          // Récupère la liste des offres

          this.rapport = reponse.data;
          this.rapport.doctorName = this.rapport.doctorId.name;

          // Met à jour le token dans le service API
          this.apiService.accountInfos.token = reponse.data.token;
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

  onSubmit() {
    console.log('Envoi du rapport :', this.rapport);
    this.rapport.userId = this.apiService.accountInfos.user._id;

    this.apiService.updateUnRapport(this.rapport).subscribe({
      next: (res) => {
        console.log('Rapport modifié avec succès', res);
        this.router.navigate(['/mes-rapports']);
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement du rapport', err);
      },
    });
  }

  openDateModal() {
    this.tempDate = this.rapport.date || '';
    this.isDateModalOpen = true;
  }

  closeDateModal() {
    this.isDateModalOpen = false;
  }

  confirmDateSelection() {
    this.rapport.date = this.tempDate;
    this.rapport.date = new Date(
      this.rapport.date.toString()
    ).toLocaleDateString('fr-FR');

    this.closeDateModal();
  }

  openMedecinModal() {
    this.isMedecinModalOpen = true;
  }

  closeMedecinModal() {
    this.isMedecinModalOpen = false;
  }

  selectDoctor(doc: any) {
    this.selectedDoctor = doc;
    this.confirmMedecinSelection();
  }

  confirmMedecinSelection() {
    if (this.selectedDoctor) {
      this.rapport.doctorId = this.selectedDoctor._id;
      this.rapport.doctorName = this.selectedDoctor.name;
      this.closeMedecinModal();
    } else {
      console.error('Aucun médecin sélectionné');
    }
  }

  openMotifModal() {
    this.isMotifModalOpen = true;
  }

  closeMotifModal() {
    this.isMotifModalOpen = false;
  }

  selectMotif(motif: any) {
    this.selectedMotif = motif.label;
    this.confirmMotifSelection();
  }

  confirmMotifSelection() {
    if (this.selectedMotif) {
      this.rapport.reason = this.selectedMotif;
      this.closeMotifModal();
    } else {
      console.error('Aucun motif sélectionné');
    }
  }

  selectMedicine(medicine: any) {
    this.selectedMedicine = medicine;
    this.rapportSpecimens.medicineId = medicine;
  }

  confirmMedicineSelection() {
    if (
      this.rapportSpecimens.medicineId &&
      this.rapportSpecimens.quantity > 0
    ) {
      this.rapport.specimens.push({ ...this.rapportSpecimens });
      this.closeOffreMedicamentModal();
    } else {
      console.error(
        'Veuillez sélectionner un médicament et entrer une quantité'
      );
    }
  }

  private remplirListeMedecins() {
    this.apiService.getLesMedecins().subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.doctors = reponse.data;
        } else if (reponse.status == '401') {
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

  openOffreMedicamentModal() {
    this.isMedicamentModalOpen = true;
  }

  closeOffreMedicamentModal() {
    this.isMedicamentModalOpen = false;
  }

  private remplirListeMedicaments() {
    this.apiService.getLesMedicaments().subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.medicines = reponse.data;
        } else if (reponse.status == '401') {
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

  private remplirListeRaisons() {
    this.apiService.getLesRaisons().subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.reasons = reponse.data;
        } else if (reponse.status == '401') {
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

  deleteSpecimen(specimen: any) {
    console.log(specimen);
    
    this.rapport.specimens = this.rapport.specimens.filter((ele: any) => ele !== specimen);
    console.log(this.rapport.specimens);
    
  }
}
