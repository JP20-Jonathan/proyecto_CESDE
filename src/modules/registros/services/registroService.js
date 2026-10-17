import { leerLista, guardarLista, inicializarLista } from '../../core/lib/almacenamiento'
import { generarId } from '../../core/utils/generarId'
import { registrosEjemplo } from '../lib/registrosEjemplo'

// Las funciones son async para que se usen igual que un fetch.
// Para conectar el backend, reemplazar el cuerpo de cada función
// por el fetch que aparece en el comentario (API_URL está en core/lib/api.js).
// El registro se envía así: { ..., usuario: { id }, reto: { id } }

const CLAVE = 'registros'
const CLAVE_USUARIOS = 'usuarios'
const CLAVE_RETOS = 'retos'

inicializarLista(CLAVE, registrosEjemplo)

// El backend nunca devuelve la contraseña del usuario
function buscarUsuario(id) {
  const usuario = leerLista(CLAVE_USUARIOS).find((u) => u.id === id)
  if (!usuario) return null
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
}

// Busca el usuario y el reto completos, como lo hace el backend con las relaciones
function completarRelaciones(registro) {
  const usuario = buscarUsuario(registro.usuario?.id)
  if (!usuario) throw new Error('Usuario no encontrado')

  const reto = leerLista(CLAVE_RETOS).find((r) => r.id === registro.reto?.id)
  if (!reto) throw new Error('Reto no encontrado')

  return { ...registro, usuario, reto }
}

// Un usuario solo se puede inscribir una vez a cada reto
function validarNoRepetido(registro, idActual) {
  const repetido = leerLista(CLAVE).some(
    (r) => r.usuario?.id === registro.usuario.id && r.reto?.id === registro.reto.id && r.id !== idActual
  )
  if (repetido) throw new Error('El usuario ya esta inscrito en este reto')
}

// GET {API_URL}/registro/registros
export async function listarRegistros() {
  // Se actualiza el reto por si fue editado
  const retos = leerLista(CLAVE_RETOS)
  return leerLista(CLAVE).map((r) => ({
    ...r,
    reto: retos.find((reto) => reto.id === r.reto?.id) || r.reto,
  }))
}

// GET {API_URL}/registro/{id}
export async function buscarRegistroPorId(id) {
  const registro = leerLista(CLAVE).find((r) => r.id === id)
  if (!registro) throw new Error('Registro no encontrado')
  return registro
}

// POST {API_URL}/registro   body: registro
export async function guardarRegistro(registro) {
  validarNoRepetido(registro)
  const nuevo = completarRelaciones({ ...registro, id: generarId() })
  guardarLista(CLAVE, [...leerLista(CLAVE), nuevo])
  return nuevo
}

// PUT {API_URL}/registro/actualizar/{id}   body: registro
export async function actualizarRegistro(id, registro) {
  const lista = leerLista(CLAVE)
  if (!lista.some((r) => r.id === id)) throw new Error('Registro no encontrado')
  validarNoRepetido(registro, id)

  const actualizado = completarRelaciones({ ...registro, id })
  guardarLista(CLAVE, lista.map((r) => (r.id === id ? actualizado : r)))
  return actualizado
}

// DELETE {API_URL}/registro/{id}
export async function borrarRegistro(id) {
  const lista = leerLista(CLAVE)
  if (!lista.some((r) => r.id === id)) throw new Error('Registro no encontrado')

  guardarLista(CLAVE, lista.filter((r) => r.id !== id))
  return 'El Registro ha sido eliminado correctamente'
}
