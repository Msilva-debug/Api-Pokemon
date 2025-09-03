import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeColorTypePokemon',
})
export class PipeColorTypePokemonPipe implements PipeTransform {
  transform(type: string): string {
    const colorMap: Record<string, string> = {
      Fuego: 'text-red-500 shadow-md shadow-red-200 p-1 ',
      Agua: 'text-blue-500 shadow-md shadow-blue-200 p-1 ',
      Planta: 'text-green-500 shadow-md shadow-green-200 p-1 ',
      Eléctrico: 'text-yellow-500 shadow-md shadow-yellow-200 p-1 ',
      Hielo: 'text-cyan-500 shadow-md shadow-cyan-200 p-1 ',
      Lucha: 'text-pink-500 shadow-md shadow-pink-200 p-1 ',
      Veneno: 'text-purple-500 shadow-md shadow-purple-200 p-1 ',
      Tierra: 'text-amber-700 shadow-md shadow-amber-200 p-1 ',
      Volador: 'text-sky-500 shadow-md shadow-sky-200 p-1 ',
      Psíquico: 'text-indigo-500 shadow-md shadow-indigo-200 p-1 ',
      Bicho: 'text-emerald-500 shadow-md shadow-emerald-200 p-1 ',
      Roca: 'text-gray-500 shadow-md shadow-gray-200 p-1 ',
      Fantasma: 'text-black shadow-md shadow-b-200 p-1 ',
      Dragón: 'text-rose-500 shadow-md shadow-rose-200 p-1 ',
      Siniestro: 'text-zinc-500 shadow-md shadow-zinc-200 p-1 ',
      Acero: 'text-slate-500 shadow-md shadow-slate-200 p-1 ',
      Hada: 'text-fuchsia-500 shadow-md shadow-fuchsia-200 p-1 ',
    };
    return colorMap[type] || 'text-black-300';
  }
}
