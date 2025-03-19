export interface Account {
  token_type: string;
  token: string;
  login: string;
  userId: string;
  nom: string;
  prenom: string;
}

export interface Medicine {
  id: string;
  reference: string;
  commercialName: string;
  family: string;
  composition: string;
  effects: string;
  contraindications: string;
}

export interface Doctor {
  id: string;
  name: string;
  firstName: string;
  address: string;
  phone: string;
  speciality: string;
  department: string;
}

export interface Specimen {
  id: string;
  medicine: Medicine;
  quantity: string;
}

export interface Rapport {
  id: string;
  doctor: Doctor;
  date: string;
  reason: string;
  summary: string;
  specimens: Specimen[];
}
