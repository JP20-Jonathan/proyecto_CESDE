import { iniciales } from '../utils/texto'

// Círculo (o cuadrado) con las iniciales de un nombre
function Avatar({ nombre, cuadrado = false, oscuro = false, tamano, style }) {
  const clases = ['av', cuadrado ? 'cuadrado' : '', oscuro ? 'oscuro' : ''].join(' ')
  const medidas = tamano ? { width: tamano, height: tamano } : {}
  return (
    <span className={clases} style={{ ...medidas, ...style }}>
      {iniciales(nombre)}
    </span>
  )
}

export default Avatar
