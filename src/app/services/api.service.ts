import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.baseUrl}`;
  public accountInfos!: Account;
  constructor() {
    this.accountInfos = {
      login: '',
      nom: '',
      prenom: '',
      token: '',
      token_type: '',
      userId: '',
    };
  }

  login(login: string, password: string): Observable<any> {
    const options = {
      url: `${this.apiUrl}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        username: login,
        password: password,
      },
    };
    return from(
      CapacitorHttp.post(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post', error);
          throw error;
        })
    );
  }

  getLesMedecins(args?: any) {
    const options = {
      url: `${this.apiUrl}/doctors`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: args,
    };
    if (!args) {
      delete options.params;
    }
    return from(
      CapacitorHttp.get(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post:', error);
          throw error;
        })
    );
  }

  getUnMedecin(id: any) {
    const options = {
      url: `${this.apiUrl}/doctors/${id}`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: id,
    };
    if (!id) {
      delete options.params;
    }
    return from(
      CapacitorHttp.get(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post:', error);
          throw error;
        })
    );
  }

  getLesRapports(args?: any) {
    const options = {
      url: `${this.apiUrl}/reports`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: args,
    };
    if (!args) {
      delete options.params;
    }
    return from(
      CapacitorHttp.get(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post:', error);
          throw error;
        })
    );
  }

  getUnRapport(id: any) {
    const options = {
      url: `${this.apiUrl}/reports/${id}`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: id,
    };
    if (!id) {
      delete options.params;
    }
    return from(
      CapacitorHttp.get(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post:', error);
          throw error;
        })
    );
  }

  addUnRapport(args?: any) {
    const options = {
      url: `${this.apiUrl}/reports`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: args,
    };
    if (!args) {
      delete options.data;
    }
    return from(
      CapacitorHttp.post(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.post', error);
          throw error;
        })
    );
  }

  updateUnRapport(id?: any) {
    const options = {
      url: `${this.apiUrl}/reports/${id}`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: id,
    };
    if (!id) {
      delete options.params;
    }
    return from(
      CapacitorHttp.patch(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.patch', error);
          throw error;
        })
    );
  }

  deleteUnRapport(id?: any) {
    const options = {
      url: `${this.apiUrl}/reports/${id}`,
      headers: {
        Authorization: 'Bearer' + this.accountInfos.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: id,
    };
    if (!id) {
      delete options.params;
    }
    return from(
      CapacitorHttp.delete(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.delete', error);
          throw error;
        })
    );
  }
}
