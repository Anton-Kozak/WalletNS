import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _rootVCRef: ViewContainerRef;
  constructor() { }
  private _drawerState = new BehaviorSubject<void>(null);
  changeItemSubject = new Subject<[string, string]>();
  setRootVCRef(vcRef: ViewContainerRef) {
    this._rootVCRef = vcRef;
  }

  get drawerState() {
    return this._drawerState.asObservable();
  }

  toggleDrawer() {
    this._drawerState.next();
  }

  getRootVCRef() {
    return this._rootVCRef;
  }


}
