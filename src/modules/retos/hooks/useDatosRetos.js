import { useEffect, useState } from 'react'
import { listarRetos } from '../services/retoService'
import { listarEmpresas } from '../../empresas/services/empresaService'
import { listarCategorias } from '../../categorias/services/categoriaService'
import { listarRegistros } from '../../registros/services/registroService'

async function leerTodo() {
  const [retos, empresas, categorias, registros] = await Promise.all([
    listarRetos(),
    listarEmpresas(),
    listarCategorias(),
    listarRegistros(),
  ])
  return { retos, empresas, categorias, registros, cargando: false }
}

// Carga juntas las listas que usan las pantallas de retos, inicio y portal
export function useDatosRetos() {
  const [datos, setDatos] = useState({ retos: [], empresas: [], categorias: [], registros: [], cargando: true })

  useEffect(() => {
    leerTodo().then(setDatos)
  }, [])

  async function recargar() {
    setDatos(await leerTodo())
  }

  return { ...datos, recargar }
}
