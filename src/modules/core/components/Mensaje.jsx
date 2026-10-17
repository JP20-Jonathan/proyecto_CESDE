// tipo: "exito" | "error"
function Mensaje({ texto, tipo = 'exito' }) {
  if (!texto) return null
  return <p className={`mensaje mensaje-${tipo}`}>{texto}</p>
}

export default Mensaje
