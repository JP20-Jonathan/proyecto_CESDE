export function estaVacio(valor) {
  return valor === undefined || valor === null || String(valor).trim() === ''
}

export function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}
