import { useState } from 'react'
import Button from '../../core/design-system/Button'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import { useFormulario } from '../../core/hooks/useFormulario'
import { categoriaInicial } from '../states/categoriaInicial'
import { validarCategoria } from '../utils/validarCategoria'
import { AREAS, textoArea } from '../utils/areas'

const opcionesAreas = AREAS.map((area) => ({ valor: area, texto: textoArea(area) }))

// Formulario en una línea, arriba de la lista. categoriaEditar: null para crear
function CategoriaForm({ categoriaEditar, onGuardar, onCancelar }) {
  const { valores, cambiar, reiniciar } = useFormulario(categoriaEditar || categoriaInicial)
  const [errores, setErrores] = useState({})

  async function enviar(evento) {
    evento.preventDefault()
    const erroresEncontrados = validarCategoria(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    const guardado = await onGuardar(valores)
    if (guardado) reiniciar()
  }

  return (
    <form className="form-linea" onSubmit={enviar} noValidate>
      <Input
        nombre="nombre"
        aria-label="Nombre"
        placeholder="Nombre de la categoría"
        value={valores.nombre}
        onChange={cambiar}
        error={errores.nombre}
        style={{ flexBasis: 200 }}
      />
      <Input
        nombre="descripcion"
        aria-label="Descripción"
        placeholder="Descripción"
        value={valores.descripcion}
        onChange={cambiar}
        error={errores.descripcion}
        style={{ flexBasis: 220 }}
      />
      <Select
        nombre="areaResponsable"
        aria-label="Área responsable"
        textoVacio="Área responsable"
        opciones={opcionesAreas}
        value={valores.areaResponsable}
        onChange={cambiar}
        error={errores.areaResponsable}
        style={{ flexBasis: 180 }}
      />
      <Button type="submit" icono={categoriaEditar ? 'check' : 'mas'}>
        {categoriaEditar ? 'Actualizar' : 'Agregar'}
      </Button>
      {categoriaEditar && (
        <Button variante="s" onClick={onCancelar}>
          Cancelar
        </Button>
      )}
    </form>
  )
}

export default CategoriaForm
