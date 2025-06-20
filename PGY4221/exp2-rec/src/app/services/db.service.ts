import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private database: SQLiteObject | null = null;
  private dbLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) { 
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({ 
        name: 'ejemplo.db',
        location: 'default' 
      }).then((db: SQLiteObject) => {
        this.database = db;
        console.log("BD Creada");
        this.crearTabla();
      }).catch((e) => {
        this.dbLista.next(false);
        console.log("Error al crear DB: " + e); 
      })
    });
  }

  dbState() {
    return this.dbLista;
  }

  async crearTabla() {
    if(this.database != null) {
      try {      
        // OJO: importante que las consultas terminen con ;
        await this.database.executeSql("CREATE TABLE IF NOT EXISTS datos(texto VARCHAR(50));", []);
        await this.database.executeSql("INSERT OR IGNORE INTO datos(texto) VALUES ('Texto inicial');", []);
        this.dbLista.next(true);
      } 
      catch (error) {
        console.error(error);
      } 
    }
    else {
      this.dbLista.next(false);
    }
  }

  async obtenerTexto() {
    if(this.database != null) {
      let res = await this.database.executeSql(
        "SELECT * FROM datos;", []
      );

      if(res.rows.length > 0) 
        return res.rows.item(0).texto;        
    }

    return 'No hay datos';
  }
}