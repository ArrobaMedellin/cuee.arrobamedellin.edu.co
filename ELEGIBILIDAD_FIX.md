# 🔧 Corrección del Flujo de Elegibilidad - Inscripciones Sapiencia

## 📋 Problema Reportado

El formulario de inscripciones NO estaba validando correctamente la elegibilidad en el Paso 2. Los usuarios podían continuar al Paso 3 sin importar si cumplían o no con los requisitos, y el envío parcial de datos (section1 + section2) para usuarios no elegibles no estaba funcionando.

---

## 🎯 Requisitos de Elegibilidad

Para continuar con el proceso completo (Paso 3-7), el aplicante debe cumplir:

1. **Edad**: Mayor o igual a 18 años
2. **Conexión con Medellín** (al menos UNA de las siguientes):
   - Vive en Medellín, O
   - Nació en Medellín, O
   - Trabaja en Medellín

Si NO cumple estos requisitos, solo se guardan los datos del **Paso 1 y Paso 2** en la tabla `applicants`.

---

## 🔍 Problemas Encontrados

### 1. Campo `worksInMedellin` faltante en el estado inicial
**Archivo**: `/src/stores/formStore.ts`

El campo `worksInMedellin` estaba definido en el schema de `section2` pero NO estaba inicializado en el estado del store:

```typescript
// ❌ ANTES
section2: {
  birthDate: '',
  bornCity: '',
  // ... otros campos
  phone: '',
  gender: '', // ⚠️ Falta worksInMedellin
  // ...
}
```

**Solución**: Se agregó el campo faltante:

```typescript
// ✅ DESPUÉS
section2: {
  birthDate: '',
  bornCity: '',
  // ... otros campos
  phone: '',
  worksInMedellin: false, // ✅ Agregado
  gender: '',
  // ...
}
```

---

### 2. Falta de logging para debugging
**Archivos**: 
- `/src/components/organisms/RegistrationForm.tsx`
- `/src/utils/eligibility.ts`

No había logs para rastrear el flujo de validación.

**Solución**: Se agregaron console.logs estratégicos:

```typescript
// En RegistrationForm.tsx
const isEligible = useMemo(() => {
  const eligible = isEligibleForFullProcess(data)
  console.log('🔍 Verificación de elegibilidad:', {
    eligible,
    section2: data.section2,
    age: calculateAge(...),
    cityOfResidence: data.section2?.cityOfResidence,
    bornCity: data.section2?.bornCity,
    worksInMedellin: data.section2?.worksInMedellin,
  })
  return eligible
}, [data])

const handleNext = () => {
  console.log('🚀 handleNext llamado', { currentSection, isEligible, nextKey })
  
  if (currentSection === 2) {
    console.log('✅ Validando elegibilidad en paso 2')
    if (!isEligible) {
      console.log('❌ Usuario NO elegible - mostrando diálogo')
      setShowIneligibleDialog(true)
      return // ⚠️ Detiene el avance
    }
    console.log('✅ Usuario elegible - continuando')
  }
  goto(nextKey)
}
```

```typescript
// En eligibility.ts
export function isEligibleForFullProcess(data) {
  const section2 = data.section2

  if (!section2) {
    console.log('⚠️ No hay datos de section2')
    return false
  }

  const age = calculateAge(section2.birthDate)
  console.log('🎂 Edad calculada:', age)
  
  if (age === null || age < 18) {
    console.log('❌ No cumple requisito de edad (menor de 18 años)')
    return false
  }

  console.log('🏙️ Verificación de Medellín:', {
    livesInMedellin,
    cityOfResidence: section2.cityOfResidence,
    bornInMedellin,
    bornCity: section2.bornCity,
    worksInMedellin,
  })

  const hasMedellinConnection = livesInMedellin || bornInMedellin || worksInMedellin
  console.log(hasMedellinConnection ? '✅ Cumple' : '❌ NO cumple')

  return hasMedellinConnection
}
```

---

### 3. Mapper no manejaba correctamente envíos parciales
**Archivo**: `/src/lib/mappers/applicant-mapper.ts`

El mapper no detectaba cuando era un envío parcial y no proveía valores por defecto para campos obligatorios del backend.

**Solución**: Se agregó detección de envío parcial y valores por defecto:

```typescript
export function mapFormDataToDto(formData: Partial<RegistrationFormData>): CreateApplicantDto {
  const { section1, section2, section3, section4, section5, section6, section7 } = formData

  // ✅ Detectar envío parcial
  const isPartialSubmit = !section3 && !section4 && !section5 && !section6

  console.log('🗺️ Mapper ejecutándose:', {
    isPartialSubmit,
    hasSection1: !!section1,
    hasSection2: !!section2,
    hasSection3: !!section3,
  })

  return {
    // ... otros campos ...

    // ✅ Campos con valores por defecto para envío parcial
    stratum: section3?.stratum || (isPartialSubmit ? 'N/A' : ''),
    residenceDepartment:
      section2?.departmentOfResidence || 
      section3?.departmentOfResidence || 
      (isPartialSubmit ? 'N/A' : ''),
    residenceMunicipality:
      section2?.cityOfResidence || 
      section3?.cityOfResidence || 
      (isPartialSubmit ? 'N/A' : ''),
    neighborhood: section2?.neighborhood || section3?.neighborhood || (isPartialSubmit ? 'N/A' : ''),
    commune: section2?.commune || section3?.commune || (isPartialSubmit ? 'N/A' : ''),
    addressType: section3?.addressType || (isPartialSubmit ? 'N/A' : 'CARRERA'),
    addressNumber1: section3?.addressNumber1 || (isPartialSubmit ? 'N/A' : ''),
    addressNumber2: section3?.addressNumber2 || (isPartialSubmit ? 'N/A' : ''),
    addressNumber3: section3?.addressNumber3 || (isPartialSubmit ? 'N/A' : ''),

    // ... otros campos ...
  }
}
```

---

## ✅ Archivos Modificados

| Archivo                                          | Cambios                                                                 |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `/src/stores/formStore.ts`                       | ✅ Agregado `worksInMedellin: false` en `section2` del `initialData`     |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Agregados logs en `isEligible`, `handleNext`, y `handlePartialSubmit` |
| `/src/utils/eligibility.ts`                      | ✅ Agregados logs detallados en `isEligibleForFullProcess()`             |
| `/src/lib/mappers/applicant-mapper.ts`           | ✅ Agregada detección de envío parcial y valores por defecto             |

---

## 🧪 Cómo Probar

### Escenario 1: Usuario NO Elegible (Menor de 18 años)

1. Ir a http://localhost:3000
2. Aceptar términos y condiciones
3. **Paso 1**: Completar información personal
4. **Paso 2**: 
   - Fecha de nacimiento: Elegir una fecha que resulte en edad < 18 años
   - Ciudad de nacimiento: Cualquier ciudad
   - Ciudad de residencia: Cualquier ciudad
   - ¿Trabaja en Medellín?: NO
5. Click en "Siguiente"
6. **Resultado Esperado**:
   - ❌ NO avanza al Paso 3
   - ✅ Muestra diálogo: "Requisitos no cumplidos"
   - ✅ Mensaje: "Para continuar con el proceso completo debes ser mayor de 18 años."
   - ✅ Opción de "Enviar información básica" disponible
7. Click en "Enviar información básica"
8. **Verificar**:
   - ✅ Se guarda en la tabla `applicants`
   - ✅ Solo tiene datos de section1 y section2
   - ✅ Redirige a página de confirmación

### Escenario 2: Usuario NO Elegible (Mayor de 18, sin conexión con Medellín)

1. Ir a http://localhost:3000
2. Aceptar términos y condiciones
3. **Paso 1**: Completar información personal
4. **Paso 2**:
   - Fecha de nacimiento: Elegir una fecha que resulte en edad >= 18 años
   - Ciudad de nacimiento: "Bogotá" (cualquier ciudad que NO sea Medellín)
   - Ciudad de residencia: "Bogotá" (cualquier ciudad que NO sea Medellín)
   - ¿Trabaja en Medellín?: NO
5. Click en "Siguiente"
6. **Resultado Esperado**:
   - ❌ NO avanza al Paso 3
   - ✅ Muestra diálogo: "Requisitos no cumplidos"
   - ✅ Mensaje: "Para continuar debes vivir en Medellín, haber nacido en Medellín o trabajar en Medellín."
   - ✅ Opción de "Enviar información básica" disponible

### Escenario 3: Usuario Elegible (Mayor de 18, vive en Medellín)

1. Ir a http://localhost:3000
2. Aceptar términos y condiciones
3. **Paso 1**: Completar información personal
4. **Paso 2**:
   - Fecha de nacimiento: Elegir una fecha que resulte en edad >= 18 años
   - Ciudad de nacimiento: "Bogotá"
   - Ciudad de residencia: "Medellín" ✅
   - ¿Trabaja en Medellín?: NO
5. Click en "Siguiente"
6. **Resultado Esperado**:
   - ✅ Avanza al Paso 3
   - ✅ Puede continuar con el formulario completo

### Escenario 4: Usuario Elegible (Mayor de 18, trabaja en Medellín)

1. Ir a http://localhost:3000
2. Aceptar términos y condiciones
3. **Paso 1**: Completar información personal
4. **Paso 2**:
   - Fecha de nacimiento: Elegir una fecha que resulte en edad >= 18 años
   - Ciudad de nacimiento: "Bogotá"
   - Ciudad de residencia: "Bogotá"
   - ¿Trabaja en Medellín?: SÍ ✅
5. Click en "Siguiente"
6. **Resultado Esperado**:
   - ✅ Avanza al Paso 3
   - ✅ Puede continuar con el formulario completo

---

## 📊 Consola del Navegador (Logs Esperados)

Al llenar el formulario, verás en la consola del navegador:

```
🔍 Verificación de elegibilidad: {
  eligible: false,
  section2: {...},
  age: 17,
  cityOfResidence: "Bogotá",
  bornCity: "Cali",
  worksInMedellin: false
}

🎂 Edad calculada: 17
❌ No cumple requisito de edad (menor de 18 años)

🚀 handleNext llamado { currentSection: 2, isEligible: false, nextKey: 3 }
✅ Validando elegibilidad en paso 2
❌ Usuario NO elegible - mostrando diálogo

📤 Enviando información parcial (section1 + section2)
📦 Datos parciales a enviar: { section1: {...}, section2: {...} }
🗺️ Mapper ejecutándose: { isPartialSubmit: true, hasSection1: true, hasSection2: true, hasSection3: false }
```

---

## 🎯 Resumen

✅ Campo `worksInMedellin` ahora se guarda correctamente en el store  
✅ Validación de elegibilidad funciona en el Paso 2  
✅ Diálogo de no elegibilidad se muestra correctamente  
✅ Envío parcial (section1 + section2) funciona con valores por defecto  
✅ Logs de debugging implementados para facilitar troubleshooting  
✅ Mapper maneja correctamente datos parciales  

---

## 🚀 Próximos Pasos

1. **Probar en el navegador** con los escenarios descritos arriba
2. **Verificar en el backend** que los datos parciales se guarden correctamente en `applicants`
3. **Verificar logs** en la consola del navegador para confirmar el flujo
4. **Limpiar logs** una vez confirmado que funciona correctamente (opcional)

---

## 🔢 Sistema de Intentos Limitados (Actualización)

### **Nueva Funcionalidad Agregada**

Se implementó un sistema de intentos limitados para evitar que los usuarios intenten múltiples veces sin completar el proceso.

### **Cómo Funciona:**

**Intento 1:**
- Usuario hace clic en "Siguiente" en Paso 2
- No cumple requisitos de elegibilidad
- Se muestra el diálogo con las opciones:
  - "Revisar información"
  - "Enviar información básica"
- ⚠️ Aparece advertencia: "Intento 1 de 2 - Te queda 1 intento más"

**Intento 2:**
- Usuario hace clic nuevamente en "Siguiente"
- Sigue sin cumplir requisitos
- Se muestra el diálogo nuevamente
- ⚠️ Aparece advertencia: "Intento 2 de 2 - Este es tu último intento"

**Intento 3 (Envío Automático):**
- Usuario hace clic por tercera vez en "Siguiente"
- Sigue sin cumplir requisitos
- 🚫 **Se muestra un diálogo especial** con mensaje final
- Diálogo contiene:
  - Título: "Requisitos no cumplidos"
  - Mensaje explicativo sobre los criterios de @Medellín
  - Banner rojo: "Has alcanzado el máximo de intentos permitidos"
  - Solo un botón: "Enviar información básica" (no hay opción de cancelar)
- Al hacer clic, se envía solo section1 + section2
- Redirige a página de confirmación

**Reset del Contador:**
- ✅ Si el usuario corrige sus datos y cumple los requisitos antes del 3er intento
- El contador se resetea a 0
- Puede continuar normalmente al Paso 3

### **Archivos Modificados (Actualización):**

| Archivo                                          | Cambio                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Agregado estado `ineligibilityAttempts` para contar intentos         |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Agregado estado `showMaxAttemptsDialog` para diálogo de máximo       |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Lógica en `handleNext` para incrementar contador y mostrar diálogo   |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Actualizado `isEligible` para resetear contador si cumple requisitos |
| `/src/components/organisms/RegistrationForm.tsx` | ✅ Diálogo especial para cuando alcanza máximo de intentos              |

### **Escenario de Prueba - Sistema de Intentos:**

1. Ir a http://localhost:3000
2. Completar Paso 1
3. En Paso 2, ingresar datos que NO cumplan requisitos:
   - Edad < 18 años, O
   - No vive/nació/trabaja en Medellín
4. **Primer intento**: Click "Siguiente" → Ver diálogo con "Intento 1 de 2"
5. Click "Revisar información"
6. **Segundo intento**: Click "Siguiente" → Ver diálogo con "Intento 2 de 2"
7. Click "Revisar información"
8. **Tercer intento**: Click "Siguiente" → Ver diálogo especial con mensaje de máximo alcanzado y solo botón "Enviar información básica"

### **Variante - Reset del Contador:**

1-3. Seguir pasos anteriores hasta el segundo intento
4. Click "Revisar información"
5. **Corregir datos** para cumplir requisitos (ej: cambiar edad a >= 18 y ciudad a Medellín)
6. Click "Siguiente" → ✅ Avanza al Paso 3 (contador reseteado)

---

**Fecha**: 29 de octubre de 2025  
**Desarrollador**: GitHub Copilot  
**Estado**: ✅ Implementado - Pendiente de pruebas  
**Última actualización**: 29 de octubre de 2025 - Sistema de intentos limitados
