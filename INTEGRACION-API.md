# Integración con API - Guía de Configuración

## 📋 Resumen

Esta integración transforma automáticamente los datos del formulario de inscripción al formato exacto de la base de datos MySQL. El mapeo se ajusta completamente a la estructura de la tabla `applicants` que proporcionaste.

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Configura la URL de tu API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
# O tu URL de producción:
# NEXT_PUBLIC_API_URL=https://tu-api-domain.com
```

### 2. Actualizar IDs de Cursos

Los cursos actualmente tienen IDs temporales. Debes actualizarlos en `src/constants/courses.ts`:

```typescript
export const COURSE_MAPPINGS: CourseMapping[] = [
  {
    value: 'big-data-none-little',
    label: 'Big data; None data y Little data',
    apiId: 'aquí-va-el-uuid-real-del-curso' // ← Cambiar esto
  },
  // ... resto de cursos
]
```

**Para obtener los IDs reales de cursos:**

1. Consulta tu API: `GET /courses` 
2. O consulta directamente la base de datos de cursos
3. Reemplaza cada `apiId` con el UUID correspondiente

## 🔄 Mapeo de Datos

### Campos Principales Mapeados

| Formulario                   | Base de Datos   | Descripción                    |
| ---------------------------- | --------------- | ------------------------------ |
| `section1.firstName`         | `firstName`     | Nombres                        |
| `section1.lastName`          | `lastName`      | Apellidos                      |
| `section1.documentNumber`    | `document`      | Número de documento            |
| `section1.documentType`      | `documentType`  | Tipo de documento              |
| `section1.otherDocumentType` | `otherDocument` | Otro tipo de documento         |
| `section2.birthDate`         | `birthDate`     | Fecha de nacimiento            |
| `calculated age`             | `age`           | Edad calculada automáticamente |
| `section2.phone`             | `cellphone`     | Teléfono principal             |
| `section1.email`             | `email`         | Correo electrónico             |

### Campos de Dispositivos

Los dispositivos se mapean de un array a campos individuales:

```typescript
// Formulario: ['Laptop', 'Smartphone']
// Base de datos:
{
  hasLaptop: 'SI',
  hasSmartphone: 'SI',
  hasDesktopComputer: 'NO',
  hasTablet: 'NO',
  hasNoDevice: 'NO'
}
```

### Campos de Discapacidad

Similar transformación para tipos de discapacidad:

```typescript
// Formulario: disabilityTypes: ['Visual', 'Auditiva']
// Base de datos:
{
  hasVisualDisability: 'SI',
  hasAuditoryDisability: 'SI',
  hasPhysicalDisability: 'NO',
  // ... otros en 'NO'
}
```

### Campos de Etnia

Se mapea según la selección del usuario:

```typescript
// Si belongsToEthnicGroup = true y ethnicGroups = 'Negro o de ascendencia afrocolombiana'
{
  isBlackPopulation: 'SI',
  isAfrodescendant: 'NO', // Depende del subgrupo
  isNotInAnyGroup: 'NO'
}
```

### Dirección

Los componentes de dirección se mapean a campos individuales:

```typescript
// section3.addressType → addressField1
// section3.addressNumber1 → addressField2
// section3.addressLetter1 → addressField3
// ... hasta addressField9
// También se genera showAddress con la dirección completa
```

## 🚀 Flujo de Envío

1. **Validación**: Se valida que `documentNumber` esté presente
2. **Verificación**: Se busca aplicante existente por documento y período
3. **Transformación**: Los datos se mapean usando `mapFormDataToDto()`
4. **Envío**: 
   - Si existe → `PATCH /applicants/:id` (actualizar)
   - Si no existe → `POST /applicants` (crear)
5. **Notificación**: Toast success/error según resultado

## 📝 Restricción de Unicidad

La base de datos tiene la restricción:
```sql
constraint idx_document_period unique (document, period)
```

Por esto, la API verifica por `document` + `period` antes de crear.

## 🔧 Testing

Para probar la integración:

1. **Desarrollo Local**: 
   ```bash
   npm run dev
   ```

2. **Completar el formulario** con datos de prueba

3. **Verificar en logs** del navegador el payload enviado

4. **Verificar en base de datos** que los datos se guardaron correctamente

## 🐛 Debugging

### Logs importantes

- **Datos enviados**: `console.log('Applicant saved:', result)` en `use-form-submission.ts`
- **Errores de API**: Se muestran en toast y console
- **Mapeo de datos**: Puedes agregar `console.log` en `mapFormDataToDto()`

### Problemas comunes

1. **Error 400**: Verificar que los `courseIds` sean válidos UUIDs
2. **Error 409**: Aplicante ya existe (esperado, se actualiza automáticamente)
3. **Error de tipos**: Verificar que todos los campos requeridos estén presentes

## 📊 Campos Opcionales vs Requeridos

### Requeridos en la API
- `firstName`, `lastName`, `document`, `email`
- `birthDate`, `age`, `cellphone`
- `residenceCountry`, `residenceDepartment`, `residenceMunicipality`

### Opcionales
- Todos los campos de poblaciones especiales
- Todos los campos de discapacidad  
- Todos los campos de víctima de violencia
- `otherDocument`, `secondaryCellphone`, etc.

## 🔄 Actualizaciones Futuras

Para agregar nuevos campos:

1. **Actualizar interfaz** `CreateApplicantDto` en `applicant-mapper.ts`
2. **Agregar mapeo** en función `mapFormDataToDto()`
3. **Verificar que coincida** con estructura de base de datos
4. **Probar** con datos reales

---

La integración está lista para producción una vez que actualices los IDs de cursos reales. ¡Todo lo demás funciona automáticamente!