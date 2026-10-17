import { useState } from 'react'

// Maneja los valores de un formulario sencillo
export function useFormulario(valoresIniciales) {
  const [valores, setValores] = useState(valoresIniciales)

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    setValores({ ...valores, [name]: type === 'checkbox' ? checked : value })
  }

  function reiniciar() {
    setValores(valoresIniciales)
  }

  return { valores, setValores, cambiar, reiniciar }
}
