import Avatar from '../../core/design-system/Avatar'
import Chip from '../../core/design-system/Chip'
import IconButton from '../../core/design-system/IconButton'
import { fechaHoraCorta } from '../../core/utils/fechas'
import { textoEstadoRegistro, claseEstadoRegistro } from '../utils/estadosRegistro'

// Fila de una postulación con los botones según su estado.
// mostrarReto: muestra a qué reto se postuló (en el inicio) o la observación (en el detalle)
function PostulacionFila({ registro, mostrarReto = true, onAceptar, onRechazar, onFinalizar }) {
  const nombre = registro.usuario ? registro.usuario.nombre : 'Usuario'

  return (
    <div className="row">
      <Avatar nombre={nombre} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <b style={{ fontSize: 14 }}>
          {nombre} <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>· {fechaHoraCorta(registro.fechaRegistro)}</span>
        </b>
        <span className="muted" style={{ fontSize: 13 }}>
          {mostrarReto && registro.reto ? `${registro.observacion} → ${registro.reto.nombre}` : registro.observacion}
        </span>
      </div>

      {registro.estado === 'INSCRITO' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton icono="check" etiqueta="Aceptar postulación" variante="ok" onClick={() => onAceptar(registro)} />
          <IconButton icono="cerrar" etiqueta="Rechazar postulación" variante="no" onClick={() => onRechazar(registro)} />
        </div>
      )}
      {registro.estado === 'EN_PROCESO' && onFinalizar && (
        <IconButton icono="check" etiqueta="Marcar como finalizado" onClick={() => onFinalizar(registro)} />
      )}
      {registro.estado !== 'INSCRITO' && (
        <Chip clase={claseEstadoRegistro(registro.estado)}>{textoEstadoRegistro(registro.estado)}</Chip>
      )}
    </div>
  )
}

export default PostulacionFila
