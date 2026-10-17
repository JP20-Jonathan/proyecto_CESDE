import { leerLista, guardarLista, inicializarLista } from '../../core/lib/almacenamiento'
import { generarId } from '../../core/utils/generarId'
import { categoriasEjemplo } from '../lib/categoriasEjemplo'

// Las funciones son async para que se usen igual que un fetch.
// Para conectar el backend, reemplazar el cuerpo de cada función
// por el fetch que aparece en el comentario (API_URL está en core/lib/api.js).

const CLAVE = 'categorias'
const CLAVE_RETOS = 'retos'

inicializarLista(CLAVE, categoriasEjemplo)

// El nombre es único en la base de datos
function validarNombreUnico(nombre, idActual) {
  const repetido = leerLista(CLAVE).some(
    (c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== idActual
  )
  if (repetido) throw new Error('Ya existe una categoría con ese nombre')
}

// GET {API_URL}/categoria/categorias
export async function listarCategorias() {
  return leerLista(CLAVE)
}

// GET {API_URL}/categoria/{id}
export async function buscarCategoriaPorId(id) {
  const categoria = leerLista(CLAVE).find((c) => c.id === id)
  if (!categoria) throw new Error('Categoria no encontrada')
  return categoria
}

// POST {API_URL}/categoria   body: categoria
export async function guardarCategoria(categoria) {
  validarNombreUnico(categoria.nombre)
  const nueva = { ...categoria, id: generarId() }
  guardarLista(CLAVE, [...leerLista(CLAVE), nueva])
  return nueva
}

// PUT {API_URL}/categoria/actualizar/{id}   body: categoria
export async function actualizarCategoria(id, categoria) {
  const lista = leerLista(CLAVE)
  if (!lista.some((c) => c.id === id)) throw new Error('Categoria no encontrada')
  validarNombreUnico(categoria.nombre, id)

  const actualizada = { ...categoria, id }
  guardarLista(CLAVE, lista.map((c) => (c.id === id ? actualizada : c)))
  return actualizada
}

// DELETE {API_URL}/categoria/{id}
export async function borrarCategoria(id) {
  const lista = leerLista(CLAVE)
  if (!lista.some((c) => c.id === id)) throw new Error('Categoria no encontrada')

  // Igual que en el backend: no se borra si tiene retos relacionados
  const tieneRetos = leerLista(CLAVE_RETOS).some((r) => r.categoria?.id === id)
  if (tieneRetos) throw new Error('La categoría tiene retos asociados')

  guardarLista(CLAVE, lista.filter((c) => c.id !== id))
  return 'Se ha borrado con Exito'
}
