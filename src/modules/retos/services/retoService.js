import { leerLista, guardarLista, inicializarLista } from '../../core/lib/almacenamiento'
import { generarId } from '../../core/utils/generarId'
import { retosEjemplo } from '../lib/retosEjemplo'

// Las funciones son async para que se usen igual que un fetch.
// Para conectar el backend, reemplazar el cuerpo de cada función
// por el fetch que aparece en el comentario (API_URL está en core/lib/api.js).
// El reto se envía así: { ..., empresa: { id }, categoria: { id } }

const CLAVE = 'retos'
const CLAVE_EMPRESAS = 'empresas'
const CLAVE_CATEGORIAS = 'categorias'
const CLAVE_REGISTROS = 'registros'

inicializarLista(CLAVE, retosEjemplo)

// Busca la empresa y la categoría completas, como lo hace el backend con las relaciones
function completarRelaciones(reto) {
  const empresa = leerLista(CLAVE_EMPRESAS).find((e) => e.id === reto.empresa?.id)
  if (!empresa) throw new Error('Empresa no encontrada')

  const categoria = leerLista(CLAVE_CATEGORIAS).find((c) => c.id === reto.categoria?.id)
  if (!categoria) throw new Error('Categoria no encontrada')

  return { ...reto, empresa, categoria }
}

// GET {API_URL}/reto
export async function listarRetos() {
  // Se actualizan empresa y categoría por si fueron editadas
  const empresas = leerLista(CLAVE_EMPRESAS)
  const categorias = leerLista(CLAVE_CATEGORIAS)
  return leerLista(CLAVE).map((r) => ({
    ...r,
    empresa: empresas.find((e) => e.id === r.empresa?.id) || r.empresa,
    categoria: categorias.find((c) => c.id === r.categoria?.id) || r.categoria,
  }))
}

// GET {API_URL}/reto/{id}
export async function buscarRetoPorId(id) {
  const reto = leerLista(CLAVE).find((r) => r.id === id)
  if (!reto) throw new Error('Reto no encontrado')
  return reto
}

// POST {API_URL}/reto   body: reto
export async function guardarReto(reto) {
  const nuevo = completarRelaciones({ ...reto, id: generarId() })
  guardarLista(CLAVE, [...leerLista(CLAVE), nuevo])
  return nuevo
}

// PUT {API_URL}/reto/{id}   body: reto
export async function actualizarReto(id, reto) {
  const lista = leerLista(CLAVE)
  if (!lista.some((r) => r.id === id)) throw new Error('Reto no encontrado')

  const actualizado = completarRelaciones({ ...reto, id })
  guardarLista(CLAVE, lista.map((r) => (r.id === id ? actualizado : r)))
  return actualizado
}

// DELETE {API_URL}/reto/{id}
export async function borrarReto(id) {
  const lista = leerLista(CLAVE)
  if (!lista.some((r) => r.id === id)) throw new Error('Reto no encontrado')

  // Igual que en el backend: no se borra si tiene inscripciones
  const tieneRegistros = leerLista(CLAVE_REGISTROS).some((r) => r.reto?.id === id)
  if (tieneRegistros) throw new Error('El reto tiene registros asociados')

  guardarLista(CLAVE, lista.filter((r) => r.id !== id))
  return 'Se ha borrado con exito'
}
