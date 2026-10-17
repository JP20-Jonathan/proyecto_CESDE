// Mismos valores que el enum EstadoRegistro del backend. clase: color del chip
export const ESTADOS_REGISTRO = [
  { valor: 'INSCRITO', texto: 'Inscrito', clase: 's-rev' },
  { valor: 'EN_PROCESO', texto: 'En proceso', clase: 's-cur' },
  { valor: 'FINALIZADO', texto: 'Finalizado', clase: 's-pub' },
]

function buscarEstado(estado) {
  return ESTADOS_REGISTRO.find((e) => e.valor === estado)
}

export function textoEstadoRegistro(estado) {
  const encontrado = buscarEstado(estado)
  return encontrado ? encontrado.texto : estado
}

export function claseEstadoRegistro(estado) {
  const encontrado = buscarEstado(estado)
  return encontrado ? encontrado.clase : 's-bor'
}

// Posición del estado (1, 2 o 3) para pintar la barra de avance
export function pasoEstadoRegistro(estado) {
  return ESTADOS_REGISTRO.findIndex((e) => e.valor === estado) + 1
}
