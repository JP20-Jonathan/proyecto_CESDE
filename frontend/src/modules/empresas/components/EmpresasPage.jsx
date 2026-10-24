import { useState } from 'react'
import Button from '../../core/design-system/Button'
import Segmento from '../../core/design-system/Segmento'
import Mensaje from '../../core/components/Mensaje'
import { useDatosRetos } from '../../retos/hooks/useDatosRetos'
import { esRetoActivo } from '../../retos/utils/estadosReto'
import { guardarEmpresa, actualizarEmpresa, borrarEmpresa } from '../services/empresaService'
import EmpresaCard from './EmpresaCard'
import EmpresaDrawer from './EmpresaDrawer'

const SECTORES_SUGERIDOS = ['Tecnología', 'Salud', 'Logística', 'Agro', 'Construcción', 'Alimentos']

function EmpresasPage({ navegar }) {
  const { empresas, retos, registros, recargar } = useDatosRetos()
  const [sector, setSector] = useState('Todas')
  // null: panel cerrado · 'nueva': crear · objeto empresa: editar
  const [panel, setPanel] = useState(null)
  const [mensaje, setMensaje] = useState({ texto: '', tipo: 'exito' })

  const sectores = [...new Set([...empresas.map((e) => e.sector), ...SECTORES_SUGERIDOS])]
  const pestanas = ['Todas', ...new Set(empresas.map((e) => e.sector))].map((s) => ({ valor: s, texto: s }))
  const visibles = sector === 'Todas' ? empresas : empresas.filter((e) => e.sector === sector)
  const activas = empresas.filter((e) => e.activa).length

  function retosDe(empresa) {
    return retos.filter((r) => r.empresa?.id === empresa.id)
  }

  // Estudiantes distintos inscritos en los retos de la empresa
  function estudiantesDe(empresa) {
    const usuarios = registros.filter((r) => r.reto?.empresa?.id === empresa.id).map((r) => r.usuario?.id)
    return new Set(usuarios).size
  }

  async function guardar(empresa) {
    try {
      if (empresa.id) {
        await actualizarEmpresa(empresa.id, empresa)
        setMensaje({ texto: 'Empresa actualizada', tipo: 'exito' })
      } else {
        await guardarEmpresa(empresa)
        setMensaje({ texto: 'Empresa creada', tipo: 'exito' })
      }
      setPanel(null)
      await recargar()
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' })
    }
  }

  async function eliminar(empresa) {
    if (!window.confirm(`¿Eliminar la empresa «${empresa.nombre}»?`)) return
    try {
      await borrarEmpresa(empresa.id)
      setMensaje({ texto: 'Empresa eliminada', tipo: 'exito' })
      await recargar()
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' })
    }
  }

  return (
    <>
      <div className="head">
        <div className="titulo">
          <h1>Empresas</h1>
          <p className="muted">{activas} empresas aliadas activas publican retos en la plataforma.</p>
        </div>
        <Button icono="mas" onClick={() => setPanel('nueva')}>
          Nueva empresa
        </Button>
      </div>

      <Segmento opciones={pestanas} valor={sector} onCambiar={setSector} etiqueta="Sector" />

      <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />

      <div className="grid-tarjetas">
        {visibles.map((empresa) => (
          <EmpresaCard
            key={empresa.id}
            empresa={empresa}
            retosActivos={retosDe(empresa).filter(esRetoActivo).length}
            estudiantes={estudiantesDe(empresa)}
            onEditar={() => setPanel(empresa)}
            onEliminar={() => eliminar(empresa)}
            onVerRetos={() => navegar('retos', { empresaId: empresa.id })}
            onCrearReto={() => navegar('retoForm', { empresaId: empresa.id })}
          />
        ))}
      </div>
      {visibles.length === 0 && <p className="card vacio">No hay empresas registradas.</p>}

      {panel && (
        <EmpresaDrawer
          empresaEditar={panel === 'nueva' ? null : panel}
          sectores={sectores}
          onGuardar={guardar}
          onCerrar={() => setPanel(null)}
        />
      )}
    </>
  )
}

export default EmpresasPage
