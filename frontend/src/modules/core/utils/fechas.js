const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function dos(numero) {
  return String(numero).padStart(2, '0')
}

// Fecha y hora actual en el formato de LocalDateTime del backend: "yyyy-MM-ddTHH:mm:ss"
export function fechaHoraActual() {
  const ahora = new Date()
  return (
    `${ahora.getFullYear()}-${dos(ahora.getMonth() + 1)}-${dos(ahora.getDate())}` +
    `T${dos(ahora.getHours())}:${dos(ahora.getMinutes())}:${dos(ahora.getSeconds())}`
  )
}

// "2026-10-30" -> "30 oct"
export function fechaCorta(fecha) {
  if (!fecha) return ''
  const [, mes, dia] = fecha.slice(0, 10).split('-')
  return `${Number(dia)} ${MESES[Number(mes) - 1]}`
}

// "2026-10-15T09:30:00" -> "15 oct · 09:30"
export function fechaHoraCorta(fecha) {
  if (!fecha) return ''
  return `${fechaCorta(fecha)} · ${fecha.slice(11, 16)}`
}

// Días que faltan para una fecha "yyyy-MM-dd" (negativo si ya pasó)
export function diasHasta(fecha) {
  const [anio, mes, dia] = fecha.slice(0, 10).split('-').map(Number)
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const destino = new Date(anio, mes - 1, dia)
  return Math.round((destino - hoy) / (1000 * 60 * 60 * 24))
}

export function textoCierre(fecha) {
  const dias = diasHasta(fecha)
  if (dias < 0) return 'Cerró hace ' + Math.abs(dias) + ' días'
  if (dias === 0) return 'Cierra hoy'
  if (dias === 1) return 'Cierra mañana'
  return `Cierra en ${dias} días`
}

export function saludo() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Buenos días'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
}
