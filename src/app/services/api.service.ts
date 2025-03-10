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
}
