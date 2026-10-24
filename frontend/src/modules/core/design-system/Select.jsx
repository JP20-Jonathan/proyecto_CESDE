// opciones: [{ valor, texto }]
function Select({ etiqueta, nombre, opciones, error, textoVacio = 'Seleccione...', style, ...props }) {
  return (
    <div className="fld" style={style}>
      {etiqueta && <label htmlFor={nombre}>{etiqueta}</label>}
      <select id={nombre} name={nombre} className="inp" {...props}>
        <option value="">{textoVacio}</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default Select
