# Tutorial recapitulación hasta Experiencia de aprendizaje 2

Este tutorial te permitirá el despliegue de una app Ionic + Angular muy simple con el objetivo de conocer:

* Inicialización de proyecto.
* Creación de componentes (pages, services, etc.) con el estándar NgModule.
* Configurar rutas de acceso para la app.
* Implementar persistencia local (*local storage*).
* Implementar persistencia con SQLite funcional en dispositivo Android (con emulador).
* Implementar consumo de API Rest.

Todos los comandos se ejecutan en una ventana de Powershell o equivalente **con permisos de administrador** del equipo (ver [link de referencia](https://www.geeksforgeeks.org/techtips/how-to-open-windows-powershell-as-admin-in-windows-11/?ref=asr5)).

## 1. Instalar Ionic (global en tu equipo)

> `npm i -g @ionic/cli`

Probar ejecutando el comando `ionic`. Debe aparecer la ayuda del comando.

## 2. Crear un proyecto desde cero, con template en blanco

> `ionic start [nombre_proyecto]`

Aparecerán diversas opciones para escoger. Seleccionar:

* **Angular** como framework Javascript
* **blank** como starter template (u otro si quieres experimentar).
* **NgModules** como mecanismos de módulos. Puedes usar **Standalone** para experimentar, pero acá ejemplificaremos con el 1ro.

Esperar el despliegue del proyecto, el cual **quedará alojado en la carpeta [nombre_proyecto]**.

Probar instalación sobre versión web ejecutando:

> ionic serve

o

> ionic s

Podrás acceder a la app en ejecución a través de http://localhost:8100/.

## 3. Agregar nuevas páginas a tu app

> ionic generate page

o

> ionic g page

En el prompt, escogemos el nombre de nuestra página nueva, digamos `Nueva`, y se generará automáticamente una estructura dentro de la carpeta [app](/PGY4221/exp2-rec/src/app/) con los siguientes archivos:

* `nueva-routing.module.ts`
* `nueva.module.ts`
* `nueva.page.html`
* `nueva.page.scss`
* `nueva.page.spec.ts`
* `nueva.page.ts`

Además, se modificará el archivo [`app-routing.module.ts`](/PGY4221/exp2-rec/src/app/app-routing.module.ts) con la nueva página, para incluirlo en las rutas.

Para que sea compatible con NgModules, debes modificar el archivo [`nueva.page.ts`](/PGY4221/exp2-rec/src/app/nueva/nueva.page.ts) incorporando la configuración `standalone = false`:

```typescript
@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
  standalone: false // <- acá
})
```

Podrás verificar la creación de la nueva page en http://localhost:8100/nueva.

En este proyecto se agregaron dos pages adicionales llamadas `Nueva2` y `Portada`.

> Todos los cambios hasta acá estarán publicados en el branch `tutorial-exp2-rec`, commit con descripción "*Hasta sección 3*".

## 4. Organización y redireccionamiento

Configuraremos la app para que, al iniciar, en vez de abrir la page `Home`, abra la page `Portada`, la cual incluirá dos tabs con las pages `Nueva1` y `Nueva2`.

* Editamos [`app-routing.module.ts`](/PGY4221/exp2-rec/src/app/app-routing.module.ts):

```typescript
  {
    path: '',
    redirectTo: 'portada', // <- aquí
    pathMatch: 'full'
  },
```

* Agregamos las tabs en [`home.page.html`](/PGY4221/exp2-rec/src/app/home/home.page.html)...

```typescript
<ion-content [fullscreen]="true">
  //...

  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="nueva">
        <ion-icon name="library"></ion-icon>
        Nueva
      </ion-tab-button>
      <ion-tab-button tab="nueva2">
        <ion-icon name="library"></ion-icon>
        Nueva 2
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</ion-content>
```

* Actualizamos [`home-routing.module.ts`](/PGY4221/exp2-rec/src/app/home/home-routing.module.ts) para activar las tabs en la página `home`:

```typescript
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'nueva',
        loadChildren: () => import('../nueva/nueva.module').then(m => m.NuevaPageModule)
      },
      {
        path: 'nueva2',
        loadChildren: () => import('../nueva2/nueva2.module').then(m => m.Nueva2PageModule)
      },
      {
        path: '',
        redirectTo: '/home/nueva',
        pathMatch: 'full'
      }
    ]
  }
];
```

* Agregamos algún contenido en [`nueva.page.html`](/PGY4221/exp2-rec/src/app/nueva/nueva.page.html) y [`nueva2.page.html`](/PGY4221/exp2-rec/src/app/nueva2/nueva2.page.html) para probar las tabs.

* Finalmente, quitamos de [`app-routing.module.ts`](/PGY4221/exp2-rec/src/app/app-routing.module.ts) las entradas `nueva` y `nueva2`, para que solo sean accesibles a través de `home`.

De esta forma, la url http://localhost:8100/home queda funcional con las tabs. Sin embargo, como la raíz de la app es `portada`, y está se encuentra en blanco. Crearemos un botón para redireccionar a `home`.

* Creamos el método `irAHome()` en  [`portada.page.ts`](/PGY4221/exp2-rec/src/app/portada/portada.page.ts):

```typescript
import { Router } from '@angular/router';
// ...
export class PortadaPage implements OnInit {
  constructor(private router: Router) { }
// ...
  irAHome() {
    this.router.navigate(['/home']);
  }
}
```
* Creamos un botón en  [`portada.page.html`](/PGY4221/exp2-rec/src/app/portada/portada.page.html) para invocar dicha función y redirigir:

```typescript
<ion-content [fullscreen]="true">
  // ...
  <ion-button (click)="irAHome()">Ir a Home</ion-button>
</ion-content>
```

> Todos los cambios hasta acá estarán publicados en el branch `tutorial-exp2-rec`, commit con descripción "*Hasta sección 4*".

## 5. Implementar persistencia con *localStorage*

Instalamos los módulos necesarios:

> `npm install @ionic/storage`

> `npm install @ionic/storage-angular`

Creamos un servicio llamado `Storage` alojado en la carpeta [`services`](/PGY4221/exp2-rec/src/app/services/), con código en el archivo [`storage.service.ts`](/PGY4221/exp2-rec/src/app/services/storage.service.ts):

> `ionic g service services/Storage`

Implementamos una persistencia simple de un contador que podrá ser incrementado con un botón. Para eso agregamos algunos métodos en [`storage.service.ts`](/PGY4221/exp2-rec/src/app/services/storage.service.ts):

```typescript
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
    await this._storage?.set('numero', numActual++);    

    return numActual;
  }
}
```

Incorporaremos esta funcionalidad en la pestaña `Nueva`, partiendo por una variable que guarde el número que se obtiene desde el storage y una función que se use para actualizar el número en el storage y actualizarlo en la UI.

Primero es necesario incorporar `StorageService` como un servicio que provee funcionalidad a la page `Nueva`, esto sumado a todas sus dependencias. Esto se realiza incorporando las referencias en la entrada `providers` del respectivo módulo [`nueva.module.ts`](/PGY4221/exp2-rec/src/app/nueva/nueva.module.ts):

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPageRoutingModule
  ],
  declarations: [NuevaPage],
  providers: [StorageService, Storage] // <- acá se permite que los servicios requeridos se inyecten
})
export class NuevaPageModule {}
```

Modificamos [`nueva.page.ts`](/PGY4221/exp2-rec/src/app/nueva/nueva.page.ts):

```typescript
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
  standalone: false
})
export class NuevaPage implements OnInit {
  numero: Number = 0;


  constructor(
    private storage: StorageService // <- Acá se inyecta el servicio
  ) 
  { }

  async ngOnInit() {
    this.numero = await this.storage.obtener();
  }

  async actualizar() {
    this.numero = await this.storage.incrementar();
    return true;
  }
}
```

Luego modificamos [`nueva.page.html`](/PGY4221/exp2-rec/src/app/nueva/nueva.page.html) para incorporar los elementos visuales necesarios:

```typescript
<ion-content [fullscreen]="true">
  // ..

  Contador actual: 
  <span style="font-weight: bolder; color: red;">
    {{numero}}
  </span><br>
  <ion-button (click)="actualizar()">Actualizar número</ion-button>
</ion-content>
```

> Todos los cambios hasta acá estarán publicados en el branch `tutorial-exp2-rec`, commit con descripción "*Hasta sección 5*".

## 6. Implementar persistencia con *SQLite* (emulador y/o dispositivo)

### 6.1 Habilitación de entorno y emulador

Instalamos los módulos necesarios para utilizar SQLite, que corresponden a plugins **cordova**:

(*nota*: con estas versiones he podido testear sin problemas en conjunto a las más recientes de ionic y node)

> `npm install cordova-sqlite-storage`

> `npm install @awesome-cordova-plugins/sqlite@5.44.0`

> `npm install @awesome-cordova-plugins/core@5.44.0`

La persistencia en SQLite sólo se puede operar a través de un dispositivo móvil real, o en su defecto, un **emulador**. Para acceder a un emulador (en particular, Android) y a poder testearlo, es necesario que descargues e instales **Android Studio** desde https://developer.android.com/studio.

Hecho lo anterior, puedes instalar algunas librerías necesarias para generar una versión versión *nativa* de tu proyecto actual para que el emulador la pueda ejecutar. Esto se hace con las utilidades de **capacitor**:

> `npm install @capacitor/android`

Hecho esto, ejecutamos el comando necesario para generar la versión nativa desde Ionic:

> `ionic capacitor sync android`

Lo que se generará será una carpeta [android](/PGY4221/exp2-rec/android/) con la versión nativa y una carpeta [www](/PGY4221/exp2-rec/www/) con los archivos necesarios para su ejecución.

Si instalaste Android Studio, puedes abrir el proyecto versión nativa con el siguiente comando:

> `ionic cap open android`

En Android Studio puedes compilar y ensamblar el proyecto (*Build*) y ejecutarlo (*Run*) para ver la app en su versión nativa. Considera que especialmente las primeras ejecuciones toman su tiempo.

> **_IMPORTANTE_**: Cada vez que quieras hacer cambios a tu app original (versión web) y ver reflejados esos cambios en la versión nativa, debes volver a ejecutar el comando `ionic capacitor sync android`.

### 6.2 Implementación de servicio de persistencia

En este paso ya puedes empezar a implementar en tu código la persistencia en SQLite, para luego probarla en el emulador. En la pestaña `Nueva2` implementaremos un input simple que guardará un texto en la base de datos de forma persistente.

Primero implementamos un nuevo servicio para storage con SQlite:

> `ionic g service services/DB`

En este caso, hay que modificar el archivo [`db.service.ts`](/PGY4221/exp2-rec/src/app/app.module.ts) e incorporar en `providers` el componente `SQLite` para habilitar su inyección en la app:

```typescript
// ..
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite], // <- acá se incorporó
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Modificamos [`db.service.ts`](/PGY4221/exp2-rec/src/app/services/db.service.ts) para incorporar métodos relevantes a través de las librerías necesarias:

```typescript
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
        `SELECT * FROM datos;`, []
      );

      if(res.rows.length > 0) 
        return res.rows.item(0).texto;        
    }

    return 'No hay datos';
  }
}
```

Modificamos [`nueva2.page.ts`](/PGY4221/exp2-rec/src/app/nueva2/nueva2.page.ts) para incorporar la captura del texto que se obtendrá de la BD:

```typescript
import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-nueva2',
  templateUrl: './nueva2.page.html',
  styleUrls: ['./nueva2.page.scss'],
  standalone: false
})
export class Nueva2Page implements OnInit {
  texto: string = '';

  constructor(private db: DBService) { }

  async ngOnInit() {
    this.db.dbState().subscribe({
      next: async () => {
        this.texto = await this.db.obtenerTexto()
      }
    }); 
  }
}
```

Modificamos [`nueva2.page.html`](/PGY4221/exp2-rec/src/app/nueva2/nueva2.page.html) para reflejar en la UI:

```typescript
<ion-content [fullscreen]="true">
  // ...

   <span>Texto desde la BD:</span>
   <p style="font-weight: bolder; color: blue;">{{ texto }}</p>
</ion-content>
```

Con estos cambios, actualizamos la versión nativa con `ionic cap sync android` y probamos en nuestro emulador, para asegurarnos que el texto almacenado en la BD se muestra en la pestaña `Nueva2`.

> Todos los cambios hasta acá estarán publicados en el branch `tutorial-exp2-rec`, commit con descripción "*Hasta sección 6*".

## 7. Consumo de API

Ver en repositorio, branch [exp2-sem2-api](https://github.com/euc-duoc/duoc/tree/exp2-sem2-api/PGY4221) junto a video publicado en foro de semana 5 en AVA.