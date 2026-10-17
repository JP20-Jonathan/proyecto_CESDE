import Button from '../../core/design-system/Button'
import IconButton from '../../core/design-system/IconButton'
import Avatar from '../../core/design-system/Avatar'
import Icono from '../../core/design-system/Icono'
import Chip from '../../core/design-system/Chip'

// Tarjeta de una empresa. retosActivos y estudiantes se calculan en la página
function EmpresaCard({ empresa, retosActivos, estudiantes, onEditar, onEliminar, onVerRetos, onCrearReto }) {
  return (
    <article className="card tarjeta">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar nombre={empresa.nombre} cuadrado oscuro tamano={48} style={{ borderRadius: 12, fontSize: 15 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <b style={{ fontSize: 15 }}>{empresa.nombre}</b>
          <p className="muted" style={{ fontSize: 12 }}>
            NIT {empresa.nit}
          </p>
        </div>
        <IconButton icono="editar" etiqueta="Editar empresa" onClick={onEditar} />
        <IconButton icono="borrar" etiqueta="Eliminar empresa" variante="no" onClick={onEliminar} />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span className="tag">{empresa.sector}</span>
        <Chip clase={empresa.activa ? 's-pub' : 's-alerta'}>{empresa.activa ? 'Activa' : 'Pendiente de convenio'}</Chip>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div className="stat">
          <b>{retosActivos}</b>
          <span>Retos activos</span>
        </div>
        <div className="stat">
          <b>{estudiantes}</b>
          <span>Estudiantes</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <Icono nombre="persona" tamano={16} style={{ color: '#5A635D' }} />
        <span>
          {empresa.contacto} · {empresa.telefono}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <Icono nombre="correo" tamano={16} style={{ color: '#5A635D' }} />
        <span>{empresa.correo}</span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button variante="s" style={{ flex: 1 }} onClick={onVerRetos}>
          Ver retos
        </Button>
        <Button variante="s" style={{ flex: 1 }} onClick={onCrearReto}>
          Crear reto
        </Button>
      </div>
    </article>
  )
}

export default EmpresaCard
