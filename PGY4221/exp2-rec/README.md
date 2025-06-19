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

> ionic start

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