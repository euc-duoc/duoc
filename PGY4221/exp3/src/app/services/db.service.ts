import { inject, Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { Platform } from '@ionic/angular'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota } from './mascota';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private database: SQLiteObject | null = null;
  private dbLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    console.log("Test");
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({ 
        name: 'mascotas.db',
        location: 'default' 
      }).then((db: SQLiteObject) => {
        this.database = db;
        console.log("BD Creada");
        this.crearTablas();
      }).catch((e) => {
        this.dbLista.next(false);
        console.log("Error al crear DB: " + e); 
      })
    });
  }

  dbState() {
    return this.dbLista;
  }
  
  async crearTablas() {
    if(this.database != null) {
      let tablaUsuario = "CREATE TABLE IF NOT EXISTS usuario(username VARCHAR(50) PRIMARY KEY, pass VARCHAR(50) NOT NULL);"
      let tablaMascota = "CREATE TABLE IF NOT EXISTS mascota(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, tipo VARCHAR(50) NOT NULL, sexo VARCHAR(50) NOT NULL, raza VARCHAR(50) NOT NULL, foto VARCHAR(200) NOT NULL, user VARCHAR(50) NOT NULL, FOREIGN KEY(user) REFERENCES user(username));"

      let datos = [
        "INSERT OR IGNORE INTO usuario(username, pass) VALUES ('enrique', '1234');",
        "INSERT OR IGNORE INTO mascota(id, nombre, tipo, sexo, raza, foto, user) VALUES (1, 'Ada','Perro','Hembra','Mestiza','assets\/img\/ada.png','enrique');",
        "INSERT OR IGNORE INTO mascota(id, nombre, tipo, sexo, raza, foto, user) VALUES (2, 'Flaco','Perro','Macho','Mestizo','assets\/img\/flaco.png','enrique');",
        "INSERT OR IGNORE INTO mascota(id, nombre, tipo, sexo, raza, foto, user) VALUES (3, 'Willy','Perro','Macho','Mestizo','assets\/img\/willy.png','enrique');",
        "INSERT OR IGNORE INTO mascota(id, nombre, tipo, sexo, raza, foto, user) VALUES (4, 'Martina','Gato','Hembra','Mestizo','assets\/img\/martina.png','enrique');"
      ];

      try {        
        await this.database.executeSql(tablaUsuario, []);
        await this.database.executeSql(tablaMascota, []);
        //await this.database.executeSql("DELETE FROM usuario;");
        //await this.database.executeSql("DELETE FROM mascota;");

        for(let i in datos) {
          await this.database.executeSql(datos[i], []);
          console.log("listo " + i)
        }

        console.log("Tabla Creada");
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

  async existeUsuario(username: string, pass: string) {
    if(this.database != null) {
      let res = await this.database.executeSql(
        `SELECT * FROM usuario WHERE username = '${username}' AND pass = '${pass}';`, []
      );

      if(res.rows.length > 0) 
        return true;
    }
    
    return false;
  }

  async buscarMascotasDeUsuario(username: string) {
    if(this.database != null) {
      let res = await this.database.executeSql(
        `SELECT * FROM mascota WHERE user = '${username}';`, []
      );

      let mascotas: Mascota[] = [];

      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          mascotas.push({
            id: res.rows.item(i).id, 
            nombre: res.rows.item(i).nombre, 
            tipo: res.rows.item(i).tipo,
            sexo: res.rows.item(i).sexo,
            raza: res.rows.item(i).raza,
            foto: res.rows.item(i).foto,
            user: null
          });
        } 
      }

      return mascotas;
    }
    
    return [];
  }
}
