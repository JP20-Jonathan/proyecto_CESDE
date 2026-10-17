import { leerLista, guardarLista, inicializarLista } from '../../core/lib/almacenamiento'
import { generarId } from '../../core/utils/generarId'
import { empresasEjemplo } from '../lib/empresasEjemplo'

// Las funciones son async para que se usen igual que un fetch.
// Para conectar el backend, reemplazar el cuerpo de cada función
// por el fetch que aparece en el comentario (API_URL está en core/lib/api.js).

const CLAVE = 'empresas'
const CLAVE_RETOS = 'retos'

inicializarLista(CLAVE, empresasEjemplo)

// GET {API_URL}/empresa/empresas
export async function listarEmpresas() {
  return leerLista(CLAVE)
}

// GET {API_URL}/empresa/{id}
export async function buscarEmpresaPorId(id) {
  const empresa = leerLista(CLAVE).find((e) => e.id === id)
  if (!empresa) throw new Error('Empresa no encontrada')
  return empresa
}

// POST {API_URL}/empresa   body: empresa
export async function guardarEmpresa(empresa) {
  const nueva = { ...empresa, id: generarId() }
  guardarLista(CLAVE, [...leerLista(CLAVE), nueva])
  return nueva
}

// PUT {API_URL}/empresa/actualizar/{id}   body: empresa
export async function actualizarEmpresa(id, empresa) {
  const lista = leerLista(CLAVE)
  if (!lista.some((e) => e.id === id)) throw new Error('Empresa no encontrada')

  const actualizada = { ...empresa, id }
  guardarLista(CLAVE, lista.map((e) => (e.id === id ? actualizada : e)))
  return actualizada
}

// DELETE {API_URL}/empresa/{id}
export async function borrarEmpresa(id) {
  const lista = leerLista(CLAVE)
  if (!lista.some((e) => e.id === id)) throw new Error('Empresa no encontrada')

  // Igual que en el backend: no se borra si tiene retos relacionados
  const tieneRetos = leerLista(CLAVE_RETOS).some((r) => r.empresa?.id === id)
  if (tieneRetos) throw new Error('La empresa tiene retos asociados')

  guardarLista(CLAVE, lista.filter((e) => e.id !== id))
  return 'Se ha borrado con Exito'
}
