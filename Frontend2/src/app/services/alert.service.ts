import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSource = new Subject();

  constructor() { }

  get alert$(): Observable<any> {
    return this.alertSource.asObservable();

  }
  showAlert(message: string,type:string): void {
    this.alertSource.next({message,type})
  }
}
