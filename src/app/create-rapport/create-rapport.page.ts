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
    date: '',
    reason: '',
    summary: '',
    specimens: []
  };

  rapportSpecimens: any = {
    medicineId: null,
    quantity: null
  };

  isMedicamentModalOpen: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
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

  openMedecinPopup() {
    this.rapport.doctorId = "67a62cd8608e504a7685936c";
  }

  openMotifPopup() {
    this.rapport.reason = 'Consultation';
  }

  openOffreMedicamentModal() {
    this.isMedicamentModalOpen = true;
  }

  closeOffreMedicamentModal() {
    this.isMedicamentModalOpen = false;
  }

  openListeMedicamentsPopup() {
    this.rapportSpecimens.medicineId = "67a62cf5608e504a76859756";
  }

  validerOffreMedicament() {
    if (this.rapportSpecimens.medicineId && this.rapportSpecimens.quantity) {
      this.rapport.specimens.push({...this.rapportSpecimens});
      this.rapportSpecimens = {medicineId: null, quantity: null};
      this.closeOffreMedicamentModal();
    } else {
      console.error('Veuillez sélectionner un médicament et entrer une quantité');
    }
  }
}
