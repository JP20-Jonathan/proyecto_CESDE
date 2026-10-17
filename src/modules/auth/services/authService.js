import { leerLista, guardarLista, inicializarLista } from '../../core/lib/almacenamiento'
import { generarId } from '../../core/utils/generarId'
import { usuariosEjemplo } from '../lib/usuariosEjemplo'

// Las funciones son async para que se usen igual que un fetch.
// Para conectar el backend, reemplazar el cuerpo de registrar e iniciarSesion
// por el fetch que aparece en el comentario (API_URL está en core/lib/api.js).
// La sesión (usuario que ingresó) se sigue guardando en el navegador.

const CLAVE = 'usuarios'
const CLAVE_SESION = 'sesion'

inicializarLista(CLAVE, usuariosEjemplo)

// El backend nunca devuelve la contraseña, aquí tampoco
function sinContrasena(usuario) {
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
}

// POST {API_URL}/usuario/registro   body: { nombre, correo, contrasena, rol }
export async function registrar(usuario) {
  const lista = leerLista(CLAVE)
  const existe = lista.some((u) => u.correo.toLowerCase() === usuario.correo.toLowerCase())
  if (existe) throw new Error('Ya existe un usuario con ese correo')

  const nuevo = { ...usuario, id: generarId() }
  guardarLista(CLAVE, [...lista, nuevo])
  return sinContrasena(nuevo)
}

// GET {API_URL}/usuario/usuarios
export async function listarUsuarios() {
  return leerLista(CLAVE).map(sinContrasena)
}

// POST {API_URL}/usuario/login   body: { correo, contrasena }
export async function iniciarSesion(correo, contrasena) {
  const usuario = leerLista(CLAVE).find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena
  )
  if (!usuario) throw new Error('Correo o contraseña incorrectos')
  return sinContrasena(usuario)
}

// recordar = true: la sesión queda guardada aunque se cierre el navegador (localStorage)
// recordar = false: la sesión dura solo mientras la pestaña esté abierta (sessionStorage)
export function guardarSesion(usuario, recordar) {
  const almacen = recordar ? localStorage : sessionStorage
  almacen.setItem(CLAVE_SESION, JSON.stringify(usuario))
}

export function obtenerSesion() {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION) || sessionStorage.getItem(CLAVE_SESION)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
  sessionStorage.removeItem(CLAVE_SESION)
}
