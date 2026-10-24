import { useState } from 'react'
import Button from '../../core/design-system/Button'
import IconButton from '../../core/design-system/IconButton'
import Input from '../../core/design-system/Input'
import { useFormulario } from '../../core/hooks/useFormulario'
import { empresaInicial } from '../states/empresaInicial'
import { validarEmpresa } from '../utils/validarEmpresa'

// Panel lateral para crear o editar una empresa.
// sectores: sugerencias para el campo sector (en el backend es texto libre)
function EmpresaDrawer({ empresaEditar, sectores, onGuardar, onCerrar }) {
  const { valores, cambiar } = useFormulario(empresaEditar || empresaInicial)
  const [errores, setErrores] = useState({})

  async function enviar(evento) {
    evento.preventDefault()
    const erroresEncontrados = validarEmpresa(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    await onGuardar(valores)
  }

  return (
    <>
      <div className="veil" onClick={onCerrar}></div>
      <aside className="drawer" role="dialog" aria-label={empresaEditar ? 'Editar empresa' : 'Nueva empresa'}>
        <div className="drawer-cabeza">
          <h2 style={{ fontSize: 20 }}>{empresaEditar ? 'Editar empresa' : 'Nueva empresa'}</h2>
          <IconButton icono="cerrar" etiqueta="Cerrar" onClick={onCerrar} />
        </div>

        <form id="form-empresa" className="drawer-cuerpo" onSubmit={enviar} noValidate>
          <Input
            etiqueta="Razón social"
            nombre="nombre"
            placeholder="Ej.: Andina Logística S.A.S."
            value={valores.nombre}
            onChange={cambiar}
            error={errores.nombre}
          />
          <div className="fila-campos" style={{ gap: 12 }}>
            <Input
              etiqueta="NIT"
              nombre="nit"
              placeholder="900.000.000-0"
              value={valores.nit}
              onChange={cambiar}
              error={errores.nit}
              style={{ flexBasis: 160 }}
            />
            <Input
              etiqueta="Sector"
              nombre="sector"
              list="sectores"
              value={valores.sector}
              onChange={cambiar}
              error={errores.sector}
              style={{ flexBasis: 160 }}
            />
            <datalist id="sectores">
              {sectores.map((sector) => (
                <option key={sector} value={sector} />
              ))}
            </datalist>
          </div>

          <p style={{ fontSize: 13, fontWeight: 800, marginTop: 8 }}>Persona de contacto</p>
          <Input etiqueta="Nombre completo" nombre="contacto" value={valores.contacto} onChange={cambiar} error={errores.contacto} />
          <Input
            etiqueta="Correo"
            nombre="correo"
            type="email"
            placeholder="contacto@empresa.com"
            value={valores.correo}
            onChange={cambiar}
            error={errores.correo}
          />
          <Input
            etiqueta="Teléfono"
            nombre="telefono"
            type="tel"
            placeholder="3000000000"
            value={valores.telefono}
            onChange={cambiar}
            error={errores.telefono}
          />
          <label className="check">
            <input type="checkbox" name="activa" checked={valores.activa} onChange={cambiar} />
            Empresa activa (convenio vigente)
          </label>
        </form>

        <div className="drawer-pie">
          <Button variante="s" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button type="submit" form="form-empresa">
            Guardar empresa
          </Button>
        </div>
      </aside>
    </>
  )
}

export default EmpresaDrawer
