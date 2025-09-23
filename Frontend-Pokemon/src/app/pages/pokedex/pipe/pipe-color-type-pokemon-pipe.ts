import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeColorTypePokemon',
})
export class PipeColorTypePokemonPipe implements PipeTransform {
  transform(type: string): string {
    const colorMap: Record<string, string> = {
      Fuego: 'text-red-500 shadow-sm shadow-red-400 p-1 ',
      Agua: 'text-blue-500 shadow-sm shadow-blue-400 p-1 ',
      Planta: 'text-green-500 shadow-sm shadow-green-400 p-1 ',
      Eléctrico: 'text-yellow-500 shadow-sm shadow-yellow-400 p-1 ',
      Hielo: 'text-cyan-500 shadow-sm shadow-cyan-400 p-1 ',
      Lucha: 'text-pink-500 shadow-sm shadow-pink-400 p-1 ',
      Veneno: 'text-purple-500 shadow-sm shadow-purple-400 p-1 ',
      Tierra: 'text-amber-700 shadow-sm shadow-amber-400 p-1 ',
      Volador: 'text-sky-500 shadow-sm shadow-sky-400 p-1 ',
      Psíquico: 'text-indigo-500 shadow-sm shadow-indigo-400 p-1 ',
      Bicho: 'text-emerald-500 shadow-sm shadow-emerald-400 p-1 ',
      Fantasma: 'text-black shadow-sm shadow-b-400 p-1 ',
      Dragón: 'text-rose-500 shadow-sm shadow-rose-400 p-1 ',
      Roca: 'text-gray-600 shadow-sm shadow-gray-300 p-1 ',
      Siniestro: 'text-zinc-700 shadow-sm shadow-zinc-400 p-1 ',
      Acero: 'text-slate-400 shadow-sm shadow-slate-200 p-1 ',
      Hada: 'text-fuchsia-500 shadow-sm shadow-fuchsia-400 p-1 ',
      Normal: 'text-white shadow-sm shadow-white p-1',
    };
    return colorMap[type] || 'text-gray-300 shadow-sm shadow-gray-300 p-1';
  }
}
