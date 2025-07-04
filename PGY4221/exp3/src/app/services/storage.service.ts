import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { userData } from "../datos";

const APP_PREFIX = "__my_app__";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { 
    this.storage.create();

    this.init().then(() => {
      console.log("Storage inicializado");
    });
  }

  private async init() {
    if(!(await this.has("users"))) {
      await this.set("users", userData.users);
      console.log("usuarios inicializados")
    }      

    if(!(await this.has("mascotas"))) {
      await this.set("mascotas", userData.mascotas);
      console.log("mascotas inicializadas")
    }      
  }

  public async has(key: string) {
    if(await this.storage.get(APP_PREFIX + key))
      return true;

    return false;
  }

  public async get(key: string) {
    let res = await this.storage.get(APP_PREFIX + key);
    console.log(res);
    return res;
  }

  public async set(key: string, value: any) {
    await this.storage.set(APP_PREFIX + key, value);
  }
}
