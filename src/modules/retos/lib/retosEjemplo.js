import { empresasEjemplo } from '../../empresas/lib/empresasEjemplo'
import { categoriasEjemplo } from '../../categorias/lib/categoriasEjemplo'

// Datos simulados para probar sin backend.
// Igual que el backend, cada reto trae su empresa y su categoría completas.
export const retosEjemplo = [
  {
    id: '9d3f0b21-6c5e-4d4f-9a32-111111111111',
    nombre: 'App de pedidos para tiendas',
    descripcion:
      'Las tiendas de barrio hacen pedidos por teléfono y se pierden datos. Buscamos una aplicación web para que hagan sus pedidos en línea y vean el estado de cada uno.',
    fechaInicio: '2026-11-01',
    fechaFin: '2027-02-15',
    estado: 'Publicado',
    empresa: empresasEjemplo[0],
    categoria: categoriasEjemplo[0],
  },
  {
    id: '9d3f0b21-6c5e-4d4f-9a32-222222222222',
    nombre: 'Optimizar rutas de entrega',
    descripcion: 'Reducir los tiempos de entrega en el Valle de Aburrá con un análisis de las rutas actuales.',
    fechaInicio: '2026-10-20',
    fechaFin: '2026-12-20',
    estado: 'En curso',
    empresa: empresasEjemplo[1],
    categoria: categoriasEjemplo[2],
  },
  {
    id: '9d3f0b21-6c5e-4d4f-9a32-333333333333',
    nombre: 'Tablero de ventas regionales',
    descripcion: 'Consolidar las ventas de cada región en un tablero sencillo para la gerencia.',
    fechaInicio: '2026-10-01',
    fechaFin: '2026-10-30',
    estado: 'Publicado',
    empresa: empresasEjemplo[2],
    categoria: categoriasEjemplo[1],
  },
  {
    id: '9d3f0b21-6c5e-4d4f-9a32-444444444444',
    nombre: 'Rediseño de la tienda en línea',
    descripcion: 'Simplificar el proceso de compra de la tienda para usuarios nuevos.',
    fechaInicio: '2026-11-15',
    fechaFin: '2027-01-30',
    estado: 'Borrador',
    empresa: empresasEjemplo[2],
    categoria: categoriasEjemplo[3],
  },
  {
    id: '9d3f0b21-6c5e-4d4f-9a32-555555555555',
    nombre: 'Campaña de lanzamiento en redes',
    descripcion: 'Plan de contenidos para el lanzamiento del canal de venta directa.',
    fechaInicio: '2026-08-01',
    fechaFin: '2026-09-30',
    estado: 'Cerrado',
    empresa: empresasEjemplo[0],
    categoria: categoriasEjemplo[4],
  },
]
