# Funcionalidad de Autocompletado del Formulario por Documento

## Resumen

Se ha implementado una funcionalidad que permite a los usuarios buscar inscripciones previas mediante su número de documento de identidad. Si se encuentra una inscripción registrada en la base de datos, **las secciones 1 y 2 del formulario** se rellenan automáticamente con la información disponible.

## Componentes Implementados

### 1. Hook: `use-autofill-form.ts`

**Ubicación:** `/src/hooks/use-autofill-form.ts`

**Responsabilidades:**
- Búsqueda de applicants por número de documento en la API
- Mapeo de datos del backend al formato del formulario
- Actualización automática de **Section 1 y Section 2** del formulario
- Manejo de estados de carga y errores

**API utilizada:**
```typescript
GET /applicants/document/:document
```

**Funciones principales:**
- `searchByDocument(documentNumber: string)`: Busca y autocompleta las secciones 1 y 2
- `autofillFormData(applicant)`: Mapea los datos del applicant a Section1 y Section2

**Retorna:**
- `isSearching`: boolean - Estado de carga durante la búsqueda
- `searchByDocument`: función - Ejecuta la búsqueda y autocompletado

### 2. Actualización del Store: `formStore.ts`

**Nueva funcionalidad agregada:**
```typescript
setMultipleSections: (data: Partial<RegistrationFormData>) => void
```

Permite actualizar múltiples secciones del formulario de una sola vez, útil para el autocompletado masivo de datos.

### 3. Modificación de Section1Form

**Cambios implementados:**

1. **Botón de búsqueda:** Icono de lupa al lado del campo "Número de documento"
2. **Búsqueda por Enter:** Presionar Enter en el campo de documento ejecuta la búsqueda
3. **Estado de carga:** Muestra spinner mientras busca
4. **Texto informativo:** Mensaje que indica la funcionalidad de búsqueda
5. **Auto-actualización:** El formulario se actualiza automáticamente cuando se encuentran datos

**UI/UX:**
```tsx
<div className='flex gap-2'>
  <Input placeholder='Ingresa número' {...field} />
  <Button type='button' variant='outline' size='icon'>
    {isSearching ? <Loader2 /> : <Search />}
  </Button>
</div>
<p className='text-xs text-muted-foreground'>
  Si ya te inscribiste antes, haz clic en buscar para autocompletar el formulario
</p>
```

## Mapeo de Datos

El hook mapea los siguientes campos del backend **únicamente a las secciones 1 y 2** del formulario:

### Section 1 - Información Personal
- `firstName`, `lastName`, `email`
- `documentType`, `otherDocument`, `document`
- `birthCountry`, `birthDepartment`, `birthMunicipality`

### Section 2 - Datos Personales
- `birthDate`, `birthCity`, `age`
- `country`, `department`, `city`, `neighborhood`, `commune`
- `cellphone`, `gender`, `sexualOrientation`, `genderIdentity`
- Datos del representante legal (si aplica)

**Nota:** Las secciones 3 a 7 NO se autocompletan. El usuario debe llenarlas manualmente.

## Flujo de Usuario

1. Usuario ingresa su número de documento en Section1Form
2. Usuario hace clic en el botón de búsqueda (o presiona Enter)
3. Sistema muestra indicador de carga
4. Se ejecuta petición a `/applicants/document/:document`
5. Si se encuentra:
   - Toast de éxito: "¡Datos encontrados! El formulario se ha rellenado automáticamente"
   - **Solo las secciones 1 y 2** se actualizan con los datos encontrados
   - Usuario puede revisar, modificar y continuar llenando las secciones restantes (3-7)
6. Si no se encuentra:
   - Toast informativo: "No se encontró ninguna inscripción previa con este documento"
   - Usuario continúa llenando el formulario manualmente
7. Si hay error:
   - Toast de error: "Error al buscar en la base de datos. Intenta nuevamente"

## Notificaciones (Toasts)

El sistema utiliza `sonner` para mostrar notificaciones al usuario:

- ✅ **Éxito:** Datos encontrados y autocompletados
- ℹ️ **Informativo:** No se encontró inscripción previa
- ❌ **Error:** Error en la búsqueda o conexión

## Consideraciones Técnicas

### Validación
- El botón de búsqueda se deshabilita si no hay número de documento
- El botón se deshabilita durante la búsqueda (prevent double-click)
- Los datos se validan antes de ser guardados en el store
**Solo las secciones 1 y 2** se actualizan con los datos encontrados
   - Usuario puede revisar, modificar y continuar llenando las secciones restantes (3-7)
- Una sola llamada al API
- Actualización de secciones 1 y 2 únicamente
- Uso de localStorage para persistir datos (ya implementado en formStore)

### Seguridad
- Endpoint público (marcado con `@Public()` en el backend)
- Búsqueda solo por documento (no expone información sensible)
- Datos sanitizados en el backend

### Manejo de Datos Opcionales
- Todos los campos usan el operador `||` para mantener datos existentes si el API no retorna valores
- Arrays se inicializan vacíos si no hay datos
- Booleans se convierten correctamente desde strings "SI"/"NO"

## Próximas Mejoras (Opcional)

1. **Cache local:** Evitar búsquedas repetidas del mismo documento
2. **Búsqueda automática:** Buscar automáticamente al ingresar documento completo
3. **Comparación de datos:** Mostrar qué campos fueron autocompletados vs modificados
4. **Historial:** Mostrar múltiples inscripciones si existen para diferentes períodos
5. **Confirmación:** Diálogo de confirmación antes de sobrescribir datos ya ingresados

## Testing Manual

Para probar la funcionalidad:

1. Buscar un documento existente en la BD
2. Ingresar el número en el campo "Número de documento"
3. Hacer clic en el botón de búsqueda
4. Verificar que las **secciones 1 y 2** se completen correctamente
5. Navegar a las secciones 1 y 2 y verificar los datos
6. Verificar que las secciones 3-7 permanezcan sin autocompletar
7. Probar con un documento que no existe
8. Verificar los mensajes de error y success

## Archivos Modificados

```
✨ Nuevos archivos:
- src/hooks/use-autofill-form.ts

📝 Archivos modificados:
- src/stores/formStore.ts (agregado setMultipleSections)
- src/components/organisms/form-sections/Section1Form.tsx

🔌 Backend utilizado:
- automation-api/src/applicant/applicant.controller.ts (endpoint existente)
- automation-api/src/applicant/applicant.service.ts (método existente)
```

## Conclusión
la experiencia del usuario al permitir reutilizar la información básica (secciones 1 y 2) previamente ingresada, reduciendo el tiempo inicial necesario para comenzar el proceso de inscripción. El usuario completa las secciones restantes (3-7) de forma manual
La funcionalidad implementada mejora significativamente la experiencia del usuario al permitir reutilizar información previamente ingresada, reduciendo el tiempo y esfuerzo necesario para completar el formulario de inscripción.
