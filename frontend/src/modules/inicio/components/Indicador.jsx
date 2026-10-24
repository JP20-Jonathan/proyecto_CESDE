import Icono from '../../core/design-system/Icono'

// Tarjeta con un número grande. colores: { fondo, texto } del ícono
function Indicador({ icono, titulo, valor, detalle, colores, colorDetalle }) {
  return (
    <div className="card kpi">
      <div className="kico" style={colores ? { background: colores.fondo, color: colores.texto } : undefined}>
        <Icono nombre={icono} />
      </div>
      <span className="muted">{titulo}</span>
      <span className="n">{valor}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: colorDetalle || '#5A635D' }}>{detalle}</span>
    </div>
  )
}

export default Indicador
