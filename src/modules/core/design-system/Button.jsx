import Icono from './Icono'

// variante: "p" (principal) | "s" (secundario) | "a" (lima) | "done" (hecho)
function Button({ children, variante = 'p', icono, type = 'button', className = '', ...props }) {
  return (
    <button type={type} className={`btn btn-${variante} ${className}`} {...props}>
      {icono && <Icono nombre={icono} />}
      {children}
    </button>
  )
}

export default Button
