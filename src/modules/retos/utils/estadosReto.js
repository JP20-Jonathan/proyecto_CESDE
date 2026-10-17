// En el backend el estado del reto es un String; estos son los valores que usa la maqueta.
// clase: color del chip, plural: texto de la pestaña en la lista de retos
export const ESTADOS_RETO = [
  { valor: 'Publicado', plural: 'Publicados', clase: 's-pub', descripcion: 'Visible en el portal de estudiantes' },
  { valor: 'En curso', plural: 'En curso', clase: 's-cur', descripcion: 'Estudiantes trabajando en el reto' },
  { valor: 'En revisión', plural: 'En revisión', clase: 's-rev', descripcion: 'Resultados por revisar' },
  { valor: 'Borrador', plural: 'Borradores', clase: 's-bor', descripcion: 'Solo lo ve el equipo' },
  { valor: 'Cerrado', plural: 'Cerrados', clase: 's-cer', descripcion: 'Convocatoria finalizada' },
]

// Retos que cuentan como "activos" en el inicio
export const ESTADOS_ACTIVOS = ['Publicado', 'En curso', 'En revisión']

export function claseEstadoReto(estado) {
  const encontrado = ESTADOS_RETO.find((e) => e.valor === estado)
  return encontrado ? encontrado.clase : 's-bor'
}

export function esRetoActivo(reto) {
  return ESTADOS_ACTIVOS.includes(reto.estado)
}
