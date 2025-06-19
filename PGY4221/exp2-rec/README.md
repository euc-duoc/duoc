# Tutorial recapitulación hasta Experiencia de aprendizaje 2

Este tutorial te permitirá el despliegue de una app Ionic + Angular muy simple con el objetivo de conocer:

* Inicialización de proyecto.
* Creación de componentes (pages, services, etc.) con el estándar NgModule.
* Configurar rutas de acceso para la app.
* Implementar carga diferida (*lazy loading*).
* Implementar persistencia local (*local storage*).
* Implementar limitación de acceso a página mediante *guards*.
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

```javascript
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

Configuraremos la app para que, al iniciar, en vez de abrir la page `Home`, abra la page `Portada`, la cual incluirá dos segmentos conformados por las pages `Nueva1` y `Nueva2`.


