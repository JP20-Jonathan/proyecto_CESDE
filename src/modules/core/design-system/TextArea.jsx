function TextArea({ etiqueta, nombre, error, ayuda, ...props }) {
  return (
    <div className="fld">
      {etiqueta && <label htmlFor={nombre}>{etiqueta}</label>}
      <textarea id={nombre} name={nombre} className="inp" {...props} />
      {ayuda && !error && <span className="hint">{ayuda}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default TextArea
