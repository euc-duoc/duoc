import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formato',
  standalone: false
})
export class FormatoPipe implements PipeTransform {

  transform(value: any): String {
    return `El nombre de usuario es "${value.user}" y la contraseña es "${value.pwd}".`;
  }
}
