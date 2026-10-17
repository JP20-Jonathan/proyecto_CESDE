import { retosEjemplo } from '../../retos/lib/retosEjemplo'
import { usuariosEjemplo } from '../../auth/lib/usuariosEjemplo'

// El backend nunca devuelve la contraseña del usuario
const usuario = {
  id: usuariosEjemplo[2].id,
  nombre: usuariosEjemplo[2].nombre,
  correo: usuariosEjemplo[2].correo,
  rol: usuariosEjemplo[2].rol,
}

// Datos simulados para probar sin backend.
// Igual que el backend, cada registro trae su usuario y su reto completos.
export const registrosEjemplo = [
  {
    id: '5e4a1c32-7d6f-4e5a-8b43-111111111111',
    fechaRegistro: '2026-10-15T09:30:00',
    observacion: 'Equipo de 3 estudiantes de desarrollo de software',
    estado: 'INSCRITO',
    usuario,
    reto: retosEjemplo[0],
  },
  {
    id: '5e4a1c32-7d6f-4e5a-8b43-222222222222',
    fechaRegistro: '2026-10-16T16:40:00',
    observacion: 'Tengo experiencia en análisis de rutas con Excel',
    estado: 'EN_PROCESO',
    usuario,
    reto: retosEjemplo[1],
  },
]
