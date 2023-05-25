import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonStatusService {
  private buttonPath: Subject<string> = new Subject(); // use subjects, keep them private

constructor() { }

  get buttonStatus$():Observable<string> {
    return this.buttonPath.asObservable();

  }
  changePath(path:string):void {
    this.buttonPath.next(path)
  }
}
