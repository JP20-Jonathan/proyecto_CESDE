import Button from '../../core/design-system/Button'
import Avatar from '../../core/design-system/Avatar'
import Chip from '../../core/design-system/Chip'
import { fechaCorta } from '../../core/utils/fechas'
import { claseEstadoReto } from '../../retos/utils/estadosReto'

// Tarjeta de un reto en la grilla del portal.
// puedePostularse: solo los estudiantes ven el botón "Postularme"
function RetoCard({ reto, postulado, puedePostularse, onPostular, onVerDetalle }) {
  return (
    <article className="card tarjeta">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar nombre={reto.empresa?.nombre} cuadrado oscuro />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#33373D' }}>{reto.empresa?.nombre}</p>
          <p className="muted" style={{ fontSize: 12 }}>
            {reto.categoria?.nombre}
          </p>
        </div>
      </div>
      <h3 style={{ fontSize: 17, lineHeight: 1.35 }}>{reto.nombre}</h3>
      <p className="muted" style={{ lineHeight: 1.55 }}>
        {reto.descripcion.length > 140 ? reto.descripcion.slice(0, 140) + '…' : reto.descripcion}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Chip clase={claseEstadoReto(reto.estado)} punto>
          {reto.estado}
        </Chip>
        <span className="tag">Inicia {fechaCorta(reto.fechaInicio)}</span>
        <span className="tag">Cierra {fechaCorta(reto.fechaFin)}</span>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
        {puedePostularse && (
          <Button
            variante={postulado ? 'done' : 'p'}
            icono={postulado ? 'check' : undefined}
            style={{ flex: 1 }}
            onClick={onPostular}
          >
            {postulado ? 'Postulación enviada' : 'Postularme'}
          </Button>
        )}
        <Button variante="s" style={puedePostularse ? undefined : { flex: 1 }} onClick={onVerDetalle}>
          Ver detalle
        </Button>
      </div>
    </article>
  )
}

export default RetoCard
