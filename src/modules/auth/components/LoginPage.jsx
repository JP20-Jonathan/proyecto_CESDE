import { useState } from 'react'
import Icono from '../../core/design-system/Icono'
import Segmento from '../../core/design-system/Segmento'
import Mensaje from '../../core/components/Mensaje'
import { ROLES } from '../utils/roles'
import LoginForm from './LoginForm'
import RegistroForm from './RegistroForm'

const beneficios = [
  'Empresas: publican un reto en minutos',
  'Estudiantes: se postulan con un clic',
  'CESDE: acompaña cada postulación',
]

// Pantalla de ingreso: panel oscuro a la izquierda y formulario a la derecha
function LoginPage({ error, setError, onIngresar, onRegistrar }) {
  const [vista, setVista] = useState('login')
  const [rol, setRol] = useState('EMPRESA')

  function cambiarVista(nuevaVista) {
    setVista(nuevaVista)
    setError('')
  }

  const esLogin = vista === 'login'

  return (
    <div className="login">
      <section className="login-hero">
        <div className="login-marca">
          <div className="mark">c</div>
          <div>
            cesde <small>Retos empresariales</small>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520 }}>
          <h1>
            Problemas reales de empresas. <span className="lima">Prácticas</span> que dejan huella.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#D9D9DE' }}>
            Las empresas publican retos, los estudiantes los resuelven y CESDE acompaña todo el proceso en un
            solo lugar.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            {beneficios.map((texto) => (
              <div key={texto} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#EEEEF1' }}>
                <Icono nombre="check" style={{ color: '#CDF42A' }} />
                {texto}
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#9A9AA1' }}>© 2026 CESDE · Formación para el trabajo</p>
      </section>

      <section className="login-lado">
        <div className="login-form">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2>{esLogin ? 'Ingresa a tu cuenta' : 'Crea tu cuenta'}</h2>
            <p className="muted">
              {esLogin ? 'Elige cómo participas y usa tu correo registrado.' : 'Elige cómo participas y completa tus datos.'}
            </p>
          </div>

          <Segmento opciones={ROLES} valor={rol} onCambiar={setRol} etiqueta="Tipo de cuenta" />

          <Mensaje texto={error} tipo="error" />

          {esLogin ? (
            <LoginForm onIngresar={(datos) => onIngresar(datos, rol)} />
          ) : (
            <RegistroForm rol={rol} onRegistrar={onRegistrar} />
          )}

          <p style={{ textAlign: 'center', fontSize: 14 }} className="muted">
            {esLogin ? '¿Aún no tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <a onClick={() => cambiarVista(esLogin ? 'registro' : 'login')} style={{ fontWeight: 700 }}>
              {esLogin ? 'Regístrate' : 'Ingresa'}
            </a>
          </p>

          {esLogin && (
            <p className="hint" style={{ textAlign: 'center' }}>
              Pruebas (clave 123456): admin@cesde.edu.co · empresa@tecnoandina.com · estudiante@est.cesde.edu.co
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default LoginPage
