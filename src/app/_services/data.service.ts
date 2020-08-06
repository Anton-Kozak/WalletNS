import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _rootVCRef: ViewContainerRef;
  constructor() { }


  setRootVCRef(vcRef: ViewContainerRef) {
    this._rootVCRef = vcRef;
  }

  getRootVCRef() {
    return this._rootVCRef;
  }

}
