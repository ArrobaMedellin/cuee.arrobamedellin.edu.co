# Inscripciones Sapiencia

Sistema de inscripciones para los cursos de Sapiencia desarrollado con Next.js 15.3.2 y TypeScript.

## Características

- ✅ Formulario multi-paso con validación Zod
- ✅ Persistencia de datos en localStorage con Zustand
- ✅ Componentes UI con Tailwind CSS y Radix UI
- ✅ Integración con API REST de NestJS
- ✅ Manejo de estado reactivo
- ✅ Validación de formularios con React Hook Form

## Estructura del Proyecto

```
src/
├── app/                    # Rutas de Next.js (App Router)
├── components/            
│   ├── atoms/             # Componentes básicos
│   ├── molecules/         # Combinaciones de átomos
│   ├── organisms/         # Secciones complejas
│   └── ui/               # Componentes de UI base (shadcn/ui)
├── hooks/                 # Hooks personalizados
├── lib/                   # Lógica central y utilidades
│   ├── api.ts            # Cliente API
│   └── mappers/          # Transformación de datos
├── schemas/              # Esquemas de validación Zod
├── stores/               # Estado global con Zustand
├── types/                # Definiciones TypeScript
└── utils/                # Funciones de utilidad
```

## Integración con API

### Configuración

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env.local
```

2. Configura la URL de tu API:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Mapeo de Datos

El sistema transforma automáticamente los datos del formulario al formato esperado por la API:

- **Formulario → DTO**: Usa `mapFormDataToDto()` en `src/lib/mappers/applicant-mapper.ts`
- **Cursos**: Mapea nombres de cursos a IDs en `src/constants/courses.ts`
- **Validación**: Verifica duplicados por número de documento

### Endpoints Utilizados

- `POST /applicants` - Crear nuevo aplicante
- `GET /applicants/document/:document` - Buscar por documento
- `PATCH /applicants/:id` - Actualizar aplicante existente

### Flujo de Envío

1. Usuario completa el formulario multi-paso
2. Los datos se validan con Zod schemas
3. Se verifica si ya existe un aplicante con el mismo documento
4. Se crea o actualiza el registro según corresponda
5. Se notifica al usuario del resultado

## Getting Started

Instala las dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linting con ESLint
```

## Tecnologías Principales

- **Framework**: Next.js 15.3.2 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: Radix UI primitives
- **Formularios**: React Hook Form + Zod
- **Estado**: Zustand
- **Iconos**: Lucide React

## Configuración de Cursos

Para actualizar los cursos disponibles, modifica el archivo `src/constants/courses.ts`:

```typescript
export const COURSE_MAPPINGS: CourseMapping[] = [
  {
    value: 'curso-codigo-form',
    label: 'Nombre del Curso',
    apiId: 'uuid-del-curso-en-api' // ID real de la API
  },
  // ... más cursos
]
```

## Despliegue

El proyecto está optimizado para despliegue en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. El despliegue se hace automáticamente

Para otros proveedores:

```bash
npm run build
npm run start
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
