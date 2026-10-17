import { useState } from 'react'
import Button from '../../core/design-system/Button'
import Input from '../../core/design-system/Input'
import { useFormulario } from '../../core/hooks/useFormulario'
import { loginInicial } from '../states/usuarioInicial'
import { validarLogin } from '../utils/validarUsuario'

function LoginForm({ onIngresar }) {
  const { valores, cambiar } = useFormulario(loginInicial)
  const [errores, setErrores] = useState({})

  function enviar(evento) {
    evento.preventDefault()
    const erroresEncontrados = validarLogin(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    onIngresar(valores)
  }

  return (
    <form className="login-form" style={{ gap: 18 }} onSubmit={enviar} noValidate>
      <Input
        etiqueta="Correo electrónico"
        nombre="correo"
        type="email"
        placeholder="nombre@empresa.com"
        value={valores.correo}
        onChange={cambiar}
        error={errores.correo}
      />
      <Input
        etiqueta="Contraseña"
        nombre="contrasena"
        type="password"
        placeholder="••••••••"
        value={valores.contrasena}
        onChange={cambiar}
        error={errores.contrasena}
      />
      <label className="check">
        <input type="checkbox" name="recordar" checked={valores.recordar} onChange={cambiar} />
        Mantener sesión iniciada
      </label>
      <Button type="submit" className="btn-grande">
        Ingresar
      </Button>
    </form>
  )
}

export default LoginForm
