// Grupo de pestañas tipo "píldora".
// opciones: [{ valor, texto, cantidad? }]
function Segmento({ opciones, valor, onCambiar, etiqueta }) {
  return (
    <div className="seg" role="tablist" aria-label={etiqueta}>
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          role="tab"
          className={opcion.valor === valor ? 'on' : ''}
          onClick={() => onCambiar(opcion.valor)}
        >
          {opcion.texto}
          {opcion.cantidad !== undefined && <em>{opcion.cantidad}</em>}
        </button>
      ))}
    </div>
  )
}

export default Segmento
