import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSource = new BehaviorSubject<boolean>(false);

  constructor() { }

  get loading$(): Observable<boolean> {
    return this.loadingSource.asObservable();
  }
  setLoading(loading:boolean): void {
    this.loadingSource.next(loading)
  }
}
