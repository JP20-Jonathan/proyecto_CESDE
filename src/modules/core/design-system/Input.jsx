// Campo de texto con etiqueta, ayuda y error
function Input({ etiqueta, nombre, error, ayuda, style, ...props }) {
  return (
    <div className="fld" style={style}>
      {etiqueta && <label htmlFor={nombre}>{etiqueta}</label>}
      <input id={nombre} name={nombre} className="inp" {...props} />
      {ayuda && !error && <span className="hint">{ayuda}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default Input
