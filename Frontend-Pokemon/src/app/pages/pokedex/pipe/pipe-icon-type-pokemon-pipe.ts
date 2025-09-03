import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeIconTypePokemon',
})
export class PipeIconTypePokemonPipe implements PipeTransform {
  transform(type: string): string {
    const iconMap: Record<string, string> = {
      Fuego: 'fa-solid fa-fire',
      Agua: 'fa-solid fa-droplet',
      Planta: 'fa-solid fa-leaf',
      Eléctrico: 'fa-solid fa-bolt',
      Hielo: 'fa-regular fa-snowflake',
      Lucha: 'fa-solid fa-hand-fist',
      Veneno: 'fa-solid fa-skull-crossbones',
      Tierra: 'fa-solid fa-mountain',
      Volador: 'fa-solid fa-dove',
      Psíquico: 'fa-solid fa-brain',
      Bicho: 'fa-solid fa-bug',
      Roca: 'fa-solid fa-gem',
      Fantasma: 'fa-solid fa-ghost',
      Dragón: 'fa-solid fa-dragon',
      Siniestro: 'fa-solid fa-mask',
      Acero: 'fa-solid fa-gear',
      Hada: 'fa-solid fa-wand-magic-sparkles',
    };
    return iconMap[type] || 'fa-solid fa-question';
  }
}
