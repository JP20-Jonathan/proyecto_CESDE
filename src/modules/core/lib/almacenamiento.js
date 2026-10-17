// Funciones simples para leer y guardar listas en el localStorage.
// Cuando se conecte el backend, los services dejan de usar este archivo.

// Si cambian los datos de ejemplo, subir este número para borrar los datos viejos del navegador
const VERSION_DATOS = '2'

try {
  if (localStorage.getItem('version_datos') !== VERSION_DATOS) {
    ;['empresas', 'categorias', 'retos', 'registros', 'usuarios', 'sesion'].forEach((clave) =>
      localStorage.removeItem(clave)
    )
    localStorage.setItem('version_datos', VERSION_DATOS)
  }
} catch {
  // Navegador sin localStorage: la app sigue funcionando con listas vacías
}

export function leerLista(clave) {
  try {
    const datos = localStorage.getItem(clave)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}

export function guardarLista(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista))
}

// Si la clave no existe todavía, guarda los datos de ejemplo
export function inicializarLista(clave, datosIniciales) {
  if (localStorage.getItem(clave) === null) {
    guardarLista(clave, datosIniciales)
  }
}
