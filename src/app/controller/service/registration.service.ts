import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../model/registration.model';
import {Retenue} from '../model/retenue.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private urlBase = 'http://localhost:8036';
  private url = '/api/v1/registration';

  constructor(private http: HttpClient) {
  }

  private _registration: Registration = new Registration();

  get registration(): Registration {
    if (this._registration === null){
      this._registration = new Registration();
    }
    return this._registration;
  }

  set registration(value: Registration) {
    this._registration = value;
  }


  public save() {
    this.http.post(this.urlBase + this.url + '/', this.registration).subscribe(
      data => {
        alert('success');
      }, error => {
        alert('error');
        console.log(error);
      }
    );
    // @ts-ignore
    this.registration = null;
  }

}
