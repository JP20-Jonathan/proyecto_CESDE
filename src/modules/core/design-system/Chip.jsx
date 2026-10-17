// clase: color del chip (s-pub, s-cur, s-bor, s-rev, s-cer, s-alerta)
function Chip({ clase = 's-bor', punto = false, children }) {
  return (
    <span className={`chip ${clase}`}>
      {punto && <i></i>}
      {children}
    </span>
  )
}

export default Chip
