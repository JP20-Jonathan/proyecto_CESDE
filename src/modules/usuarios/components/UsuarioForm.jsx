import { useState } from 'react'
import Button from '../../core/design-system/Button'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import { useFormulario } from '../../core/hooks/useFormulario'
import { validarRegistro } from '../../auth/utils/validarUsuario'
import { ROLES } from '../../auth/utils/roles'

const usuarioInicial = { nombre: '', correo: '', contrasena: '', rol: 'ESTUDIANTE' }

// Banda oscura para registrar un usuario (POST /usuario/registro)
function UsuarioForm({ onCrear }) {
  const { valores, cambiar, reiniciar } = useFormulario(usuarioInicial)
  const [errores, setErrores] = useState({})

  async function enviar(evento) {
    evento.preventDefault()
    const erroresEncontrados = validarRegistro(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    const creado = await onCrear(valores)
    if (creado) reiniciar()
  }

  return (
    <form className="banda" onSubmit={enviar} noValidate>
      <div style={{ flex: '1 1 200px', color: '#fff' }}>
        <b style={{ fontSize: 16 }}>Registrar usuario</b>
        <p style={{ color: '#D9D9DE', fontSize: 13, marginTop: 2 }}>Podrá ingresar con su correo y contraseña.</p>
      </div>
      <Input nombre="nombre" aria-label="Nombre" placeholder="Nombre completo" value={valores.nombre} onChange={cambiar} error={errores.nombre} style={{ flexBasis: 180 }} />
      <Input
        nombre="correo"
        type="email"
        aria-label="Correo"
        placeholder="correo@dominio.com"
        value={valores.correo}
        onChange={cambiar}
        error={errores.correo}
        style={{ flexBasis: 200 }}
      />
      <Input
        nombre="contrasena"
        type="password"
        aria-label="Contraseña"
        placeholder="Contraseña"
        value={valores.contrasena}
        onChange={cambiar}
        error={errores.contrasena}
        style={{ flexBasis: 150 }}
      />
      <Select nombre="rol" aria-label="Rol" opciones={ROLES} value={valores.rol} onChange={cambiar} error={errores.rol} style={{ flexBasis: 140 }} />
      <Button type="submit" variante="a">
        Registrar
      </Button>
    </form>
  )
}

export default UsuarioForm
