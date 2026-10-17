// Mismos valores que el enum ROLES del backend
export const ROLES = [
  { valor: 'EMPRESA', texto: 'Empresa' },
  { valor: 'ESTUDIANTE', texto: 'Estudiante' },
  { valor: 'CESDE', texto: 'CESDE' },
]

export function textoRol(rol) {
  const encontrado = ROLES.find((r) => r.valor === rol)
  return encontrado ? encontrado.texto : rol
}
