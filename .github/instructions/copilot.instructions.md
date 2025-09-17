---
applyTo: '**'
---

# Instrucciones del Proyecto: Serviseguros App

## 1. Resumen del Proyecto

Este es un proyecto Next.js (versión 15.3.2) desarrollado con TypeScript para la aplicación "Serviseguros App". Utiliza Turbopack para el desarrollo y sigue una arquitectura moderna con un enfoque en componentes reutilizables y gestión de estado eficiente.

## 2. Tecnologías Principales

*   **Framework Principal:** Next.js 15.3.2 (App Router)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS v4 (configurado en `postcss.config.mjs` y `tailwind.config.ts` - *asumiendo que existe este último, aunque no está listado, es estándar*)
*   **Componentes UI:**
    *   Primitivas de Radix UI como base.
    *   Componentes personalizados en `src/components/ui` (estilo shadcn/ui).
    *   Estructura de componentes Atómicos (atoms, molecules, organisms) en `src/components/`.
*   **Gestión de Estado:** Zustand (stores en `src/stores/`, ej: `useAuthStore.ts`)
*   **Formularios:** React Hook Form (`react-hook-form`) con validación de esquemas usando Zod (`src/schemas/`).
*   **Autenticación:** NextAuth.js v5 (configuración en `src/lib/auth.ts` y ruta de API en `src/app/api/[...nextauth]/route.ts`). El `SessionWrapper` en `src/providers/SessionWrapper` gestiona el acceso a la sesión.
*   **Fetching de Datos:** SWR (configuración del fetcher probablemente en `src/lib/fetcher/index.ts`).
*   **Linting:** ESLint (configuración en `eslint.config.mjs`).
*   **Iconos:** Lucide React (`lucide-react`) y React Icons (`react-icons`).

## 3. Estructura del Proyecto y Convenciones

*   **Rutas:** Definidas usando el App Router de Next.js en `src/app/`.
    *   Layouts y páginas específicas para roles/secciones como `(admin)` y `(auth)`.
*   **Componentes:**
    *   `src/components/atoms/`: Componentes UI más pequeños y básicos.
    *   `src/components/molecules/`: Combinaciones de átomos para funcionalidades específicas.
    *   `src/components/organisms/`: Secciones más grandes de la UI, compuestas por moléculas y átomos.
    *   `src/components/ui/`: Componentes de UI genéricos y reutilizables (estilo shadcn/ui).
*   **Lógica de Negocio y Utilidades:**
    *   `src/lib/`: Lógica central, como `auth.ts` para NextAuth y `utils.ts` para utilidades generales.
    *   `src/hooks/`: Hooks personalizados de React (ej: `use-mobile.ts`).
    *   `src/utils/`: Funciones de utilidad específicas (ej: `formatDate.ts`, `getInitials.ts`).
*   **Estado Global:** Gestionado con Zustand en `src/stores/`.
*   **Tipos:** Definiciones de TypeScript en `src/types/`, incluyendo tipos para NextAuth (`next-auth.d.ts`), respuestas de API (`result-response.ts`) y modelos de datos (`user.ts`).
*   **Esquemas de Validación:** Definidos con Zod en `src/schemas/` (ej: `src/schemas/login/index.ts`).
*   **Constantes:** Almacenadas en `src/constants/index.ts`.
*   **Middleware:** Cualquier middleware de Next.js se encuentra en `src/middleware.ts`.

## 4. Guías de Codificación y Preferencias

*   **TypeScript:** Utilizar tipado estricto. Preferir interfaces para props de componentes y tipos para otras estructuras de datos.
*   **Importaciones:** Usar alias de ruta configurados en `tsconfig.json` (ej: `@/components/...`).
*   **Estilos:** Escribir clases de Tailwind CSS directamente en los componentes. Evitar CSS personalizado a menos que sea estrictamente necesario (en `globals.css`).
*   **Componentes:**
    *   Mantener los componentes lo más pequeños y enfocados posible.
    *   Seguir la estructura Atómica (Atom, Molecule, Organism).
    *   Para componentes de UI reutilizables, considerar si deben ir en `src/components/ui/` o en la estructura atómica.
*   **Manejo de Estado:**
    *   Para estado local de componentes, usar `useState` o `useReducer` de React.
    *   Para estado global o compartido entre múltiples componentes no relacionados directamente, usar Zustand stores.
*   **Formularios:** Utilizar React Hook Form para la gestión de formularios y Zod para la validación de datos del lado del cliente y, potencialmente, del servidor.
*   **Comentarios:** Comentar el código complejo o la lógica no obvia. Usar JSDoc para documentar props de componentes y funciones importantes.
*   **Nomenclatura:**
    *   Componentes: PascalCase (ej: `MyComponent.tsx`).
    *   Funciones y variables: camelCase (ej: `myFunction`).
    *   Tipos e Interfaces: PascalCase (ej: `type UserProfile = { ... }`).
*   **ESLint:** Asegurarse de que el código cumpla con las reglas definidas en `eslint.config.mjs`. Ejecutar `npm run lint` regularmente.

## 5. Puntos Importantes a Recordar

*   **Autenticación:** La lógica de autenticación es manejada por NextAuth.js. Prestar atención a `src/lib/auth.ts`, `src/app/api/[...nextauth]/route.ts`, y el `useAuthStore` para el estado del usuario.
*   **Componentes UI (shadcn/ui style):** Los componentes en `src/components/ui/` son fundamentales para la UI. Al generar nuevos componentes, considerar si existe uno similar o si se puede extender uno existente.
*   **Variables de Entorno:** El proyecto probablemente utiliza variables de entorno (ej: para NextAuth). Estas deben estar definidas en un archivo `.env.local` (no versionado).

## 6. Objetivos del Proyecto (Opcional, añadir si es relevante)

*   [Ejemplo: Desarrollar una plataforma de gestión de seguros intuitiva y eficiente.]
*   [Ejemplo: Asegurar una alta performance y escalabilidad.]

## 7. Contribuciones y Mejora Continua
*   **Revisiones de Código:** Todas las contribuciones deben pasar por una revisión de código. Asegurarse de que el código esté bien documentado y siga las guías de codificación.
*   **Documentación:** Mantener la documentación actualizada, especialmente en `README.md` y en comentarios dentro del código.
*   **Pruebas:** Implementar pruebas unitarias y de integración donde sea necesario. Utilizar herramientas como Jest o Testing Library para React.
*   **Feedback:** Fomentar un ambiente de feedback constructivo. Las discusiones sobre mejoras y nuevas características deben ser abiertas y colaborativas.
## 8. Recursos Adicionales
*   **Documentación de Next.js:** [Next.js Documentation](https://nextjs.org/docs)
*   **Documentación de TypeScript:** [TypeScript Documentation](https://www.typescriptlang.org/docs/)
*   **Documentación de Zustand:** [Zustand Documentation](https://github.com/pmndrs/zustand)
*   **Documentación de NextAuth.js:** [NextAuth.js Documentation](https://next-auth.js.org/)
*   **Documentación de Tailwind CSS:** [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   **Documentación de React Hook Form:** [React Hook Form Documentation](https://react-hook-form.com/)
*   **Documentación de Zod:** [Zod Documentation](https://zod.dev/)
*   **Documentación de Radix UI:** [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
*   **Documentación de SWR:** [SWR Documentation](https://swr.vercel.app/docs/getting-started)
*   **Documentación de ESLint:** [ESLint Documentation](https://eslint.org/docs/latest/)
*   **Documentación de Lucide React:** [Lucide React Documentation](https://lucide.dev/)
*   **Documentación de React Icons:** [React Icons Documentation](https://react-icons.github.io/react-icons/)
*   **Documentación de Docker:** [Docker Documentation](https://docs.docker.com/)
*   **Documentación de PostCSS:** [PostCSS Documentation](https://postcss.org/)
*   **Documentación de Turbopack:** [Turbopack Documentation](https://turbo.build/pack/docs)
*   **Documentación de ESLint:** [ESLint Documentation](https://eslint.org/docs/latest/)
*   **Documentación de TypeScript:** [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

- Always respond in Spanish
`DO NOT GIVE ME HIGH LEVEL SHIT, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION!!! I DON'T WANT "Here's how you can blablabla"
- Be casual unless otherwise specified
- Be terse
- Suggest solutions that I didn't think about—anticipate my needs
- Treat me as an expert
- Be accurate and thorough
- Give the answer immediately. Provide detailed explanations and restate my query in your own words if necessary after giving the answer
- Value good arguments over authorities, the source is irrelevant
- Consider new technologies and contrarian ideas, not just the conventional wisdom
- You may use high levels of speculation or prediction, just flag it for me
- No moral lectures
- Discuss safety only when it's crucial and non-obvious
- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue afterward
- Cite sources whenever possible at the end, not inline
- No need to mention your knowledge cutoff
- No need to disclose you're an AI
- Please respect my prettier preferences when you provide code.
- Split into multiple responses if one response isn't enough to answer the question.

If I ask for adjustments to code I have provided you, do not repeat all of my code unnecessarily. Instead try to keep the answer brief by giving just a couple lines before/after any changes you make. Multiple code blocks are ok.