import {Injectable} from '@angular/core';
import {CapacitorHttp} from '@capacitor/core';
import {from} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OpencageapiService {
  private apiKey = `${environment.openCageApiKey}`;

  constructor() {
  }

  getCoordinatesFromAddress(address: string) {
    const options = {
      url:
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey
        }`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    return from(
      CapacitorHttp.get(options)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error('Error in CapacitorHttp.get:', error);
          throw error;
        })
    );
  }
}
