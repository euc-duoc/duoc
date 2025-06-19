import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage: Storage) { 
    this._storage.create();
  }

  public async obtener() {
    let numActual = await this._storage?.get('numero');

    if(!numActual)
      return 0;

    return numActual;
  }

  public async incrementar() {
    let numActual = await this.obtener();
    await this._storage?.set('numero', ++numActual);    

    return numActual;
  }
}
