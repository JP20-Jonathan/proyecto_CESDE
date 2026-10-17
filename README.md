# Proyecto integrador - Front (CESDE Retos)

React + Vite. Diseño tomado de la maqueta de CESDE. Arquitectura *screaming*: cada carpeta de
`src/modules` es una parte del negocio. Hoy los datos se guardan en el `localStorage`.

## Ejecutar

```
npm install
npm run dev
```

Usuarios de prueba (contraseña `123456`). En el ingreso hay que elegir el tipo de cuenta:

| Tipo       | Correo                       | Qué ve                                 |
|------------|------------------------------|----------------------------------------|
| CESDE      | admin@cesde.edu.co           | Administración completa + portal       |
| Empresa    | empresa@tecnoandina.com      | Administración completa + portal       |
| Estudiante | estudiante@est.cesde.edu.co  | Portal: explorar retos y postularse    |

## Pantallas

| Pantalla             | Módulo       | Qué hace                                                        |
|----------------------|--------------|-----------------------------------------------------------------|
| Ingreso / registro   | `auth`       | Login con tipo de cuenta, mantener sesión, crear cuenta         |
| Inicio               | `inicio`     | Indicadores, acciones rápidas, retos por cerrar, postulaciones  |
| Retos                | `retos`      | Tabla con pestañas por estado, filtros y búsqueda               |
| Detalle del reto     | `retos`      | Resumen, postulaciones (aceptar/rechazar), actividad            |
| Nuevo / editar reto  | `retos`      | Formulario por pasos con vista previa                           |
| Empresas             | `empresas`   | Tarjetas por sector y panel lateral para crear/editar           |
| Usuarios             | `usuarios`   | Registrar usuarios y verlos por rol                             |
| Categorías           | `categorias` | Catálogo de categorías                                          |
| Portal del estudiante| `portal`     | Buscar retos, postularse y ver el avance de sus postulaciones   |

Lo que la maqueta muestra y el backend no tiene (prioridades, cupos, modalidad, habilidades,
entregables, tutores, notificaciones) no se incluyó.

## Estructura

```
src/
├── assets/
├── modules/
│   ├── core/          # lo compartido
│   │   ├── components/      AdminLayout, Mensaje
│   │   ├── design-system/   Button, IconButton, Icono, Avatar, Chip, Segmento, Input, Select, TextArea
│   │   ├── hooks/           useFormulario
│   │   ├── lib/             almacenamiento (localStorage), api (URL del backend)
│   │   └── utils/           generarId, validaciones, fechas, texto
│   ├── auth/          # ingreso, registro y sesión
│   ├── inicio/        # pantalla de inicio
│   ├── retos/         # retos (lista, detalle y formulario)
│   ├── empresas/
│   ├── categorias/
│   ├── usuarios/
│   ├── registros/     # postulación de un usuario a un reto
│   └── portal/        # portal del estudiante
├── App.jsx            # navegación entre pantallas
└── main.jsx
```

Cada módulo usa las carpetas que necesita: `components`, `hooks`, `lib` (datos de ejemplo),
`services` (acceso a datos), `states` (valores iniciales de formularios) y `utils`.

## Modelos (iguales al backend)

**Empresa**: id (UUID), nombre, nit, sector, contacto, correo (email), telefono (7-15), activa (Boolean)

**Categoria**: id (UUID), nombre (único), descripcion, areaResponsable (enum AREAS)

**Reto**: id (UUID), nombre, descripcion, fechaInicio y fechaFin (`yyyy-MM-dd`),
estado (String: Publicado, En curso, En revisión, Borrador, Cerrado), empresa, categoria

**Usuario**: id (UUID), nombre, correo (único), contrasena (mín. 6, el backend la cifra y nunca la
devuelve), rol (enum ROLES: EMPRESA, ESTUDIANTE, CESDE)

**Registro** (postulación): id (UUID), fechaRegistro (`yyyy-MM-ddTHH:mm:ss`), observacion,
estado (enum EstadoRegistro: INSCRITO, EN_PROCESO, FINALIZADO), usuario, reto.
Un usuario solo se puede postular una vez a cada reto. Aceptar = EN_PROCESO; como el backend no
tiene estado "rechazado", rechazar elimina la postulación.

Reglas de borrado (iguales en front y backend): no se borra una empresa o categoría con retos,
ni un reto con postulaciones.

## Pasar de localStorage al backend

Solo hay que cambiar los archivos de `services/`. Los hooks y componentes no cambian porque las
funciones ya son `async`. Cada función tiene un comentario con su endpoint. Ejemplo:

```js
import { API_URL } from '../../core/lib/api'

// GET {API_URL}/empresa/empresas
export async function listarEmpresas() {
  const respuesta = await fetch(`${API_URL}/empresa/empresas`)
  if (!respuesta.ok) throw new Error('No se pudieron cargar las empresas')
  return respuesta.json()
}

// POST {API_URL}/empresa
export async function guardarEmpresa(empresa) {
  const respuesta = await fetch(`${API_URL}/empresa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empresa),
  })
  if (!respuesta.ok) throw new Error('No se pudo guardar la empresa')
  return respuesta.json()
}
```

Las relaciones se envían solo con el id: `{ ..., empresa: { id }, categoria: { id } }` en el reto y
`{ ..., usuario: { id }, reto: { id } }` en el registro.

Si cambian los datos de ejemplo, subir `VERSION_DATOS` en `core/lib/almacenamiento.js` para que el
navegador borre los datos viejos.
