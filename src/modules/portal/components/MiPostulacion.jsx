import Chip from '../../core/design-system/Chip'
import { fechaCorta } from '../../core/utils/fechas'
import {
  ESTADOS_REGISTRO,
  claseEstadoRegistro,
  textoEstadoRegistro,
  pasoEstadoRegistro,
} from '../../registros/utils/estadosRegistro'

// Tarjeta de una postulación del estudiante con la barra de avance
function MiPostulacion({ registro }) {
  const paso = pasoEstadoRegistro(registro.estado)

  return (
    <div className="card tarjeta">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <b style={{ fontSize: 15 }}>{registro.reto?.nombre}</b>
          <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
            {registro.reto?.empresa?.nombre} · postulado el {fechaCorta(registro.fechaRegistro)}
          </p>
        </div>
        <Chip clase={claseEstadoRegistro(registro.estado)}>{textoEstadoRegistro(registro.estado)}</Chip>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {ESTADOS_REGISTRO.map((estado, posicion) => (
          <span key={estado.valor} className={posicion < paso ? 'step on' : 'step'}></span>
        ))}
      </div>
      <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        {ESTADOS_REGISTRO.map((estado) => (
          <span key={estado.valor} style={estado.valor === registro.estado ? { color: '#A3195A', fontWeight: 700 } : undefined}>
            {estado.texto}
          </span>
        ))}
      </div>
    </div>
  )
}

export default MiPostulacion
