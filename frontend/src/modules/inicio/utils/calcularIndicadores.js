import { esRetoActivo } from '../../retos/utils/estadosReto'

// Números de las tarjetas del inicio, calculados con los datos del backend
export function calcularIndicadores({ retos, empresas, registros }) {
  const activos = retos.filter(esRetoActivo)
  const porRevisar = registros.filter((r) => r.estado === 'INSCRITO')
  const enProceso = registros.filter((r) => r.estado === 'EN_PROCESO')
  const finalizados = registros.filter((r) => r.estado === 'FINALIZADO')
  const empresasActivas = empresas.filter((e) => e.activa)
  const sectores = new Set(empresas.map((e) => e.sector))

  // Un estudiante puede estar en varios retos: se cuenta una sola vez
  const estudiantes = new Set(enProceso.map((r) => r.usuario?.id))

  return {
    retosActivos: activos.length,
    retosTotal: retos.length,
    porRevisar: porRevisar.length,
    postulacionesTotal: registros.length,
    estudiantesEnPractica: estudiantes.size,
    finalizados: finalizados.length,
    empresasActivas: empresasActivas.length,
    sectores: sectores.size,
  }
}

// Cantidad de retos activos por categoría, para las barras
export function retosPorCategoria(retos, categorias) {
  const activos = retos.filter(esRetoActivo)
  const conteo = categorias
    .map((categoria) => ({
      nombre: categoria.nombre,
      cantidad: activos.filter((r) => r.categoria?.id === categoria.id).length,
    }))
    .filter((c) => c.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)

  const maximo = conteo.length > 0 ? conteo[0].cantidad : 1
  return conteo.map((c) => ({ ...c, porcentaje: Math.round((c.cantidad / maximo) * 100) + '%' }))
}
