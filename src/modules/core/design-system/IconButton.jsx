import Icono from './Icono'

// Botón cuadrado solo con ícono. variante: "" | "ok" (verde) | "no" (rojo)
function IconButton({ icono, etiqueta, variante = '', ...props }) {
  return (
    <button type="button" className={`ibtn ${variante}`} aria-label={etiqueta} title={etiqueta} {...props}>
      <Icono nombre={icono} />
    </button>
  )
}

export default IconButton
