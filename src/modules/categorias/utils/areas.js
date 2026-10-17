// Mismos valores que el enum AREAS del backend
export const AREAS = [
  'ADMINISTRACION',
  'FINANZAS',
  'RECURSOS_HUMANOS',
  'TECNOLOGIA',
  'MARKETING',
  'VENTAS',
  'OPERACIONES',
  'LOGISTICA',
  'PRODUCCION',
  'INVESTIGACION_DESARROLLO',
  'SERVICIO_CLIENTE',
  'LEGAL',
  'COMPRAS',
  'CALIDAD',
  'SALUD',
  'SEGURIDAD',
  'EDUCACION',
  'MEDIO_AMBIENTE',
  'OTROS',
]

// "RECURSOS_HUMANOS" -> "Recursos humanos"
export function textoArea(area) {
  const texto = area.replaceAll('_', ' ').toLowerCase()
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
