import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBorderColor',
})
export class PipeBorderColor implements PipeTransform {
  public borderColorMap: Record<string, string> = {
    Fuego: 'rgba(248,113,113,0.8)',
    Agua: 'rgba(96,165,250,0.8)',
    Planta: 'rgba(74,222,128,0.8)',
    Eléctrico: 'rgba(250,204,21,0.8)',
    Hielo: 'rgba(34,211,238,0.8)',
    Lucha: 'rgba(236,72,153,0.8)',
    Veneno: 'rgba(168,85,247,0.8)',
    Tierra: 'rgba(251,191,36,0.8)',
    Volador: 'rgba(56,189,248,0.8)',
    Psíquico: 'rgba(99,102,241,0.8)',
    Bicho: 'rgba(16,185,129,0.8)',
    Fantasma: 'rgba(163,163,163,0.8)',
    Dragón: 'rgba(244,63,94,0.8)',
    Roca: 'rgba(120, 124, 136, 0.8)',
    Siniestro: 'rgba(66, 66, 74, 0.8)',
    Acero: 'rgba(176, 192, 208, 0.8)',
    Hada: 'rgba(217,70,239,0.8)',
    Normal: 'rgba(255,255,255,0.8)',
  };

  transform(types: string[] | undefined): string {
    if (!types?.length) return 'none';

    if (types.length === 1) {
      const color = this.borderColorMap[types[0]] ?? 'rgba(0,0,0,0.4)';
      return `0 0 20px 5px ${color}`;
    }

    // si hay 2+ tipos, devolvemos dos sombras para simular gradiente
    const c1 = this.borderColorMap[types[0]] ?? 'rgba(0,0,0,0.4)';
    const c2 = this.borderColorMap[types[1]] ?? c1;
    return `0 0 20px 5px ${c1}, 0 0 30px 10px ${c2}`;
  }
}
