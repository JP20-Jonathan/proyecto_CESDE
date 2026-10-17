// "Andina Logística S.A.S." -> "AL"
export function iniciales(nombre = '') {
  const palabras = nombre.trim().split(/\s+/).filter(Boolean)
  return palabras
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join('')
}

// Busca un texto sin importar mayúsculas
export function contieneTexto(valor, busqueda) {
  return String(valor || '')
    .toLowerCase()
    .includes(busqueda.trim().toLowerCase())
}

// 1 -> "1 postulado", 3 -> "3 postulados"
export function plural(cantidad, palabra) {
  return `${cantidad} ${palabra}${cantidad === 1 ? '' : 's'}`
}

// Colores de la maqueta para diferenciar categorías
const PALETA = ['#A3195A', '#0E9384', '#652D90', '#FF5D31', '#475467', '#1CB8FF', '#CDF42A']

export function colorPorPosicion(posicion) {
  return PALETA[posicion % PALETA.length]
}
