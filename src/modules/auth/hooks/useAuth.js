import { useState } from 'react'
import {
  registrar,
  iniciarSesion,
  guardarSesion,
  obtenerSesion,
  cerrarSesion,
} from '../services/authService'
import { textoRol } from '../utils/roles'

export function useAuth() {
  // Si ya había una sesión guardada, el usuario entra directo
  const [usuario, setUsuario] = useState(obtenerSesion)
  const [error, setError] = useState('')

  function entrar(usuarioIngresado, recordar) {
    guardarSesion(usuarioIngresado, recordar)
    setUsuario(usuarioIngresado)
    setError('')
  }

  // rolElegido: la opción marcada en el selector Empresa / Estudiante / CESDE
  async function ingresar({ correo, contrasena, recordar }, rolElegido) {
    try {
      const usuarioIngresado = await iniciarSesion(correo, contrasena)
      if (usuarioIngresado.rol !== rolElegido) {
        setError(`Esta cuenta es de tipo ${textoRol(usuarioIngresado.rol)}. Elige esa opción arriba.`)
        return
      }
      entrar(usuarioIngresado, recordar)
    } catch (e) {
      setError(e.message)
    }
  }

  // Después de registrarse queda con la sesión iniciada
  async function registrarse(datos) {
    try {
      entrar(await registrar(datos), true)
    } catch (e) {
      setError(e.message)
    }
  }

  function salir() {
    cerrarSesion()
    setUsuario(null)
  }

  return { usuario, error, setError, ingresar, registrarse, salir }
}
