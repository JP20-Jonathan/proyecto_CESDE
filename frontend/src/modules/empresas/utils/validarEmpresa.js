import { estaVacio, esCorreoValido } from '../../core/utils/validaciones'

// Mismas reglas que las anotaciones del modelo Empresa en el backend
export function validarEmpresa(empresa) {
  const errores = {}

  if (estaVacio(empresa.nombre)) errores.nombre = 'El nombre es obligatorio'
  if (estaVacio(empresa.nit)) errores.nit = 'El NIT es obligatorio'
  if (estaVacio(empresa.sector)) errores.sector = 'El sector es obligatorio'
  if (estaVacio(empresa.contacto)) errores.contacto = 'El contacto es obligatorio'

  if (estaVacio(empresa.correo)) {
    errores.correo = 'El correo es obligatorio'
  } else if (!esCorreoValido(empresa.correo)) {
    errores.correo = 'El correo no tiene un formato válido'
  }

  if (estaVacio(empresa.telefono)) {
    errores.telefono = 'El teléfono es obligatorio'
  } else if (empresa.telefono.length < 7 || empresa.telefono.length > 15) {
    errores.telefono = 'El teléfono debe tener entre 7 y 15 caracteres'
  }

  return errores
}
