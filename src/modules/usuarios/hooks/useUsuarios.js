import { useEffect, useState } from 'react'
import { listarUsuarios, registrar } from '../../auth/services/authService'
import { listarRegistros } from '../../registros/services/registroService'

// Usuarios del sistema (sin contraseña) y sus postulaciones para contarlas
export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [registros, setRegistros] = useState([])
  const [mensaje, setMensaje] = useState({ texto: '', tipo: 'exito' })

  useEffect(() => {
    listarUsuarios().then(setUsuarios)
    listarRegistros().then(setRegistros)
  }, [])

  async function crear(usuario) {
    try {
      await registrar(usuario)
      setMensaje({ texto: `Usuario ${usuario.nombre} registrado`, tipo: 'exito' })
      setUsuarios(await listarUsuarios())
      return true
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' })
      return false
    }
  }

  return { usuarios, registros, mensaje, crear }
}
