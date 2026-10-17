import { estaVacio } from '../../core/utils/validaciones'

// Mismas reglas que las anotaciones del modelo Categoria en el backend
export function validarCategoria(categoria) {
  const errores = {}

  if (estaVacio(categoria.nombre)) errores.nombre = 'El nombre es obligatorio'
  if (estaVacio(categoria.descripcion)) errores.descripcion = 'La descripción es obligatoria'
  if (estaVacio(categoria.areaResponsable)) errores.areaResponsable = 'El área responsable es obligatoria'

  return errores
}
