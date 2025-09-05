export interface InformacionPaginador {
  inicio: number;
  final: number;
  total: number;
  offset: number;
  limit: number;
  anteriorUrl?: string;
  actualUrl?: string;
  siguienteUrl?: string;
}