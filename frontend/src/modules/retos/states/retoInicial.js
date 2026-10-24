// Modelo Reto del backend:
// id: UUID (string), nombre: String, descripcion: String,
// fechaInicio y fechaFin: LocalDate (texto "yyyy-MM-dd"), estado: String,
// empresa: Empresa, categoria: Categoria (un reto pertenece a una empresa y a una categoría)

// Valores del formulario. La empresa y la categoría se manejan solo con su id.
export const retoInicial = {
  nombre: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  estado: 'Borrador',
  empresaId: '',
  categoriaId: '',
}

// Convierte los valores del formulario al formato del backend:
// { id, nombre, descripcion, fechaInicio, fechaFin, estado, empresa: { id }, categoria: { id } }
export function aReto(valores) {
  return {
    id: valores.id,
    nombre: valores.nombre,
    descripcion: valores.descripcion,
    fechaInicio: valores.fechaInicio,
    fechaFin: valores.fechaFin,
    estado: valores.estado,
    empresa: { id: valores.empresaId },
    categoria: { id: valores.categoriaId },
  }
}

// Convierte un reto guardado a valores del formulario
export function aFormulario(reto) {
  return {
    id: reto.id,
    nombre: reto.nombre,
    descripcion: reto.descripcion,
    fechaInicio: reto.fechaInicio,
    fechaFin: reto.fechaFin,
    estado: reto.estado,
    empresaId: reto.empresa ? reto.empresa.id : '',
    categoriaId: reto.categoria ? reto.categoria.id : '',
  }
}
