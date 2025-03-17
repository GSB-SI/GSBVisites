import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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
  IonToolbar
} from '@ionic/angular/standalone';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-create-rapport',
  templateUrl: './create-rapport.page.html',
  styleUrls: ['./create-rapport.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonItem, IonLabel, IonDatetime, IonNote, IonTextarea, IonButton, IonGrid, IonRow, IonCol, IonModal, IonInput, IonList]
})
export class CreateRapportPage {
  rapport: any = {
    userId: null,
    doctorId: null,
    doctorName: null,
    date: '',
    reason: '',
    summary: '',
    specimens: []
  };

  rapportSpecimens: any = {
    medicineId: null,
    quantity: null
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

  constructor(private apiService: ApiService, private router: Router, private toastController: ToastController) {
  }

  ionViewWillEnter() {
    if (!this.apiService.accountInfos.accessToken) {
      this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
      this.router.navigate(['/login']);
    }
    this.remplirListeMedecins();
    this.remplirListeMedicaments();
    this.remplirListeRaisons();
  }

  async afficheToast(message: string, duree: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duree,
      position: position,
    });
    await toast.present();
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
    this.closeDateModal();
  }

  onSubmit() {
    console.log('Envoi du rapport :', this.rapport);
    this.rapport.userId = this.apiService.accountInfos.user._id;
    this.rapport.date = new Date(this.rapport.date.toString()).toLocaleDateString('fr-FR');
    this.apiService.addUnRapport(this.rapport).subscribe(
      res => {
        console.log('Rapport enregistré avec succès', res);
        this.router.navigate(['/accueil']);
      },
      err => {
        console.error('Erreur lors de l’enregistrement du rapport', err);
      }
    );
  }

  cancel() {
    this.router.navigate(['/accueil']);
  }

  /* ======== Fonctions pour la modal médecin ======== */
  openMedecinModal() {
    this.isMedecinModalOpen = true;
  }

  closeMedecinModal() {
    this.isMedecinModalOpen = false;
  }

  selectDoctor(doc: any) {
    this.selectedDoctor = doc;
    this.confirmMedecinSelection()
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
    this.rapportSpecimens.medicineId = medicine._id;
  }

  confirmMedicineSelection() {
    if (this.rapportSpecimens.medicineId && this.rapportSpecimens.quantity > 0) {
      this.rapport.specimens.push({...this.rapportSpecimens});
      this.closeOffreMedicamentModal();
    } else {
      console.error('Veuillez sélectionner un médicament et entrer une quantité');
    }
  }

  private remplirListeMedecins() {
    this.apiService.getLesMedecins().subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.doctors = reponse.data;
        } else if (reponse.status == '401') {
          if (reponse.data.description == "Le jeton d’accès a expiré") {
            this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
            this.router.navigate(['/login']);
          } else {
            this.afficheToast("Un problème est survenu. Contactez l'administrateur", 3000, 'middle');
          }
        } else {
          this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
          console.log(reponse);
        }
      },
      error: () => {
        this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
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
          if (reponse.data.description == "Le jeton d’accès a expiré") {
            this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
            this.router.navigate(['/login']);
          } else {
            this.afficheToast("Un problème est survenu. Contactez l'administrateur", 3000, 'middle');
          }
        } else {
          this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
          console.log(reponse);
        }
      },
      error: () => {
        this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
      },
    });
  }

  private remplirListeRaisons() {
    this.apiService.getLesRaisons().subscribe({
      next: (reponse: any) => {
        if (reponse.status == 200) {
          this.reasons = reponse.data;
        } else if (reponse.status == '401') {
          if (reponse.data.description == "Le jeton d’accès a expiré") {
            this.afficheToast('Délai expiré. Vous devez vous reconnecter', 3000, 'middle');
            this.router.navigate(['/login']);
          } else {
            this.afficheToast("Un problème est survenu. Contactez l'administrateur", 3000, 'middle');
          }
        } else {
          this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
          console.log(reponse);
        }
      },
      error: () => {
        this.afficheToast("Un problème est survenu. Veuillez ouvrir un ticket d'incident si le problème se reproduit", 5000, 'middle');
      },
    });
  }
}
