import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.baseUrl}`;
  public accountInfos!: any;

  constructor() {
    this.accountInfos = {
      accessToken: '',
      userId: '',
      name: '',
      firstName: '',
      username: '',
      hireDate: '',
      department: '',
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
          this.accountInfos.accessToken = res.data.accessToken;
          this.accountInfos.userId = res.data.user._id;
          this.accountInfos.name = res.data.user.name;
          this.accountInfos.username = res.data.user.username;
          this.accountInfos.hireDate = res.data.user.hireDate;
          this.accountInfos.department = res.data.user.department;
          this.accountInfos.firstName = res.data.user.firstName;
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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

  getLesRaisons(args?: any) {
    const options = {
      url: `${this.apiUrl}/reasons`,
      headers: {
        'Authorization': 'Bearer ' + this.accountInfos.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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

  getLesMedicaments(args?: any) {
    const options = {
      url: `${this.apiUrl}/medicines`,
      headers: {
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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

  getMesRapports(userId: any) {
    const options = {
      url: `${this.apiUrl}/reports/user/${userId}`,
      headers: {
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: userId,
    };
    if (!userId) {
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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
        'Authorization': 'Bearer ' + this.accountInfos.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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
        Authorization: 'Bearer ' + this.accountInfos.accessToken,
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
