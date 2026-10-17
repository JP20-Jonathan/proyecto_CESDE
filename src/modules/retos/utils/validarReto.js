import { estaVacio } from '../../core/utils/validaciones'

// Mismas reglas que las anotaciones del modelo Reto en el backend
export function validarReto(valores) {
  const errores = {}

  if (estaVacio(valores.nombre)) errores.nombre = 'El nombre es obligatorio'
  if (estaVacio(valores.descripcion)) errores.descripcion = 'La descripción es obligatoria'
  if (estaVacio(valores.fechaInicio)) errores.fechaInicio = 'La fecha de inicio es obligatoria'
  if (estaVacio(valores.fechaFin)) errores.fechaFin = 'La fecha de finalización es obligatoria'
  if (estaVacio(valores.estado)) errores.estado = 'El estado es obligatorio'
  if (estaVacio(valores.empresaId)) errores.empresaId = 'La empresa es obligatoria'
  if (estaVacio(valores.categoriaId)) errores.categoriaId = 'La categoría es obligatoria'

  // Las fechas "yyyy-MM-dd" se pueden comparar como texto
  if (valores.fechaInicio && valores.fechaFin && valores.fechaFin < valores.fechaInicio) {
    errores.fechaFin = 'La fecha de finalización debe ser posterior a la de inicio'
  }

  return errores
}
