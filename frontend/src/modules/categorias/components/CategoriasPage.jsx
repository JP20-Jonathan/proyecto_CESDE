import { useState } from 'react'
import IconButton from '../../core/design-system/IconButton'
import Icono from '../../core/design-system/Icono'
import Mensaje from '../../core/components/Mensaje'
import { colorPorPosicion, plural } from '../../core/utils/texto'
import { useDatosRetos } from '../../retos/hooks/useDatosRetos'
import { guardarCategoria, actualizarCategoria, borrarCategoria } from '../services/categoriaService'
import { textoArea } from '../utils/areas'
import CategoriaForm from './CategoriaForm'

function CategoriasPage() {
  const { categorias, retos, recargar } = useDatosRetos()
  const [categoriaEditar, setCategoriaEditar] = useState(null)
  const [mensaje, setMensaje] = useState({ texto: '', tipo: 'exito' })

  function cantidadRetos(categoria) {
    return retos.filter((r) => r.categoria?.id === categoria.id).length
  }

  async function guardar(categoria) {
    try {
      if (categoria.id) {
        await actualizarCategoria(categoria.id, categoria)
        setMensaje({ texto: 'Categoría actualizada', tipo: 'exito' })
      } else {
        await guardarCategoria(categoria)
        setMensaje({ texto: 'Categoría creada', tipo: 'exito' })
      }
      setCategoriaEditar(null)
      await recargar()
      return true
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' })
      return false
    }
  }

  async function eliminar(categoria) {
    if (!window.confirm(`¿Eliminar la categoría «${categoria.nombre}»?`)) return
    try {
      await borrarCategoria(categoria.id)
      setMensaje({ texto: 'Categoría eliminada', tipo: 'exito' })
      await recargar()
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' })
    }
  }

  return (
    <>
      <div className="titulo">
        <h1>Categorías</h1>
        <p className="muted">Catálogo que usan las empresas al crear retos y los estudiantes al filtrarlos.</p>
      </div>

      <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />

      <section className="card" style={{ maxWidth: 900 }}>
        <div className="ch" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <h2>Categorías</h2>
          <p className="muted" style={{ fontSize: 13 }}>
            {categorias.length} categorías · agrupan los retos por área de formación
          </p>
        </div>

        <CategoriaForm
          key={categoriaEditar ? categoriaEditar.id : 'nueva'}
          categoriaEditar={categoriaEditar}
          onGuardar={guardar}
          onCancelar={() => setCategoriaEditar(null)}
        />

        {categorias.length === 0 && <p className="vacio">No hay categorías registradas.</p>}
        {categorias.map((categoria, posicion) => (
          <div key={categoria.id} className="row">
            <span className="sw" style={{ background: colorPorPosicion(posicion) }}></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b>{categoria.nombre}</b>
              <p className="muted" style={{ fontSize: 12 }}>
                {plural(cantidadRetos(categoria), 'reto')} · {textoArea(categoria.areaResponsable)} · {categoria.descripcion}
              </p>
            </div>
            <IconButton icono="editar" etiqueta={`Editar ${categoria.nombre}`} onClick={() => setCategoriaEditar(categoria)} />
            <IconButton icono="borrar" etiqueta={`Eliminar ${categoria.nombre}`} variante="no" onClick={() => eliminar(categoria)} />
          </div>
        ))}

        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            fontSize: 13,
            color: '#33373D',
            background: '#FFF3F8',
            borderRadius: '0 0 16px 16px',
          }}
        >
          <Icono nombre="info" style={{ color: '#A3195A' }} />
          Una categoría con retos no se puede eliminar: primero cambia o elimina esos retos.
        </div>
      </section>
    </>
  )
}

export default CategoriasPage
