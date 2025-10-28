export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Tipos de documento de identidad
export const DOCUMENT_TYPE_OPTIONS = [
	{ value: 'Registro civil', label: 'Registro civil' },
	{ value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
	{ value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
	{ value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
	{
		value: 'Permiso especial de permanencia',
		label: 'Permiso especial de permanencia'
	},
	{
		value: 'Permiso por protección temporal',
		label: 'Permiso por protección temporal'
	},
	{ value: 'Pasaporte', label: 'Pasaporte' },
	{ value: 'Otro', label: 'Otro' }
]

// Identidades de género
export const GENDER_IDENTITY_OPTIONS = [
	{ value: 'Mujer Cis', label: 'Mujer Cis' },
	{ value: 'Hombre Cis', label: 'Hombre Cis' },
	{ value: 'Mujer trans', label: 'Mujer trans' },
	{ value: 'Hombre trans', label: 'Hombre trans' },
	{ value: 'No binario', label: 'No binario' },
	{ value: 'Género fluido', label: 'Género fluido' },
	{ value: 'Travesti', label: 'Travesti' },
	{ value: 'Ninguno', label: 'Ninguno' },
	{ value: 'Prefiero no responder', label: 'Prefiero no responder' }
]

// Opciones Sí/No para MultiCheckboxField
export const YES_NO_OPTIONS = [
	{ value: 'si', label: 'Sí' },
	{ value: 'no', label: 'No' }
]

// Dispositivos tecnológicos
export const DEVICE_OPTIONS = [
	{ value: 'computador-mesa', label: 'Computador de mesa' },
	{ value: 'computador-portatil', label: 'Computador portátil' },
	{ value: 'tablet', label: 'Tablet' },
	{ value: 'celular-inteligente', label: 'Celular inteligente' },
	{ value: 'ninguno', label: 'Ninguno' }
]

// Tipo de tenencia de vivienda
export const HOUSING_TYPE_OPTIONS = [
	{ value: 'propia', label: 'Propia' },
	{ value: 'familiar', label: 'Familiar' },
	{ value: 'arrendada', label: 'Arrendada' },
	{ value: 'tenencia-comodato', label: 'Tenencia o comodato' },
	{ value: 'compartida', label: 'Compartida' }
]

// Actividades actuales (ocupaciones)
export const OCCUPATION_OPTIONS = [
	{ value: 'estudiante', label: 'Estudiante' },
	{ value: 'empleado', label: 'Empleado' },
	{ value: 'independiente', label: 'Trabajador independiente' },
	{ value: 'desempleado', label: 'Desempleado' },
	{ value: 'hogar', label: 'Oficios del hogar' },
	{ value: 'pensionado', label: 'Pensionado' },
	{ value: 'otro', label: 'Otro' }
]

// Poblaciones especiales
export const SPECIAL_POPULATIONS = [
	{
		value: 'desvinculados-conflicto',
		label: 'Desvinculados del conflicto armado'
	},
	{ value: 'reinsertado', label: 'Reinsertado' },
	{ value: 'pospenados', label: 'Pospenados' },
	{
		value: 'srpa',
		label:
			'Jóven perteneciente al Sistema de Responsabilidad Penal para Adolescentes'
	},
	{
		value: 'restablecimiento',
		label: 'Jóven perteneciente al Sistema de Restablecimiento de Derechos'
	},
	{
		value: 'violencia-genero',
		label: 'Población víctima de hechos basados en género'
	},
	{ value: 'ninguna', label: 'No pertenezco a ninguna' }
]

// Grupos étnicos
export const ETHNIC_GROUPS = [
	{ value: 'Afrodescendiente', label: 'Afrodescendiente' },
	{ value: 'Indígena', label: 'Indígena' },
	{ value: 'Rom o gitano', label: 'Rom o gitano' },
	{ value: 'Prefiero no responder', label: 'Prefiero no responder' }
]

// Subgrupos de Afrodescendientes
export const AFRO_SUBGROUPS = [
	{ value: 'Negros', label: 'Negros' },
	{ value: 'Afrocolombianos', label: 'Afrocolombianos' },
	{ value: 'Raizales', label: 'Raizales' },
	{ value: 'Palenqueros', label: 'Palenqueros' }
]

// Pueblos Indígenas
export const INDIGENOUS_PEOPLES = [
	{ value: 'Tule (Kuna)', label: 'Tule (Kuna)' },
	{
		value: 'Embera (Dobidá, Eyabidá, Katío y Chamí)',
		label: 'Embera (Dobidá, Eyabidá, Katío y Chamí)'
	},
	{ value: 'Sinú', label: 'Sinú' },
	{ value: 'Ingas', label: 'Ingas' },
	{ value: 'Kamsá', label: 'Kamsá' },
	{ value: 'Nasa (Paez)', label: 'Nasa (Paez)' },
	{ value: 'Pijaos', label: 'Pijaos' },
	{ value: 'Chibcariwak', label: 'Chibcariwak' },
	{ value: 'Quillacingas Pastos', label: 'Quillacingas Pastos' },
	{ value: 'Inga', label: 'Inga' },
	{ value: 'Nutabe', label: 'Nutabe' },
	{ value: 'Wayuu', label: 'Wayuu' },
	{ value: 'Kichwa', label: 'Kichwa' },
	{ value: 'Otro', label: 'Otro' }
]

// Hechos victimizantes
export const VICTIMIZING_ACTS = [
	{
		value: 'acto-terrorista',
		label:
			'Acto terrorista / Atentados / Combates / Enfrentamientos / Hostigamiento'
	},
	{ value: 'amenaza', label: 'Amenaza' },
	{
		value: 'delitos-sexuales',
		label:
			'Delitos contra la libertad y la integridad sexual en desarrollo del conflicto armado'
	},
	{ value: 'desaparicion-forzada', label: 'Desaparición Forzada' },
	{ value: 'desplazamiento-forzado', label: 'Desplazamiento forzado' },
	{ value: 'homicidio', label: 'Homicidio' },
	{
		value: 'minas-antipersonal',
		label:
			'Minas Antipersonal, Munición sin Explotar y Artefacto Explosivo improvisado'
	},
	{ value: 'secuestro', label: 'Secuestro' },
	{ value: 'tortura', label: 'Tortura' },
	{
		value: 'vinculacion-menores',
		label:
			'Vinculación de Niños Niñas y Adolescentes a Actividades Relacionadas con grupos armados'
	},
	{ value: 'perdida-bienes', label: 'Perdida de Bienes Muebles o Inmuebles' },
	{ value: 'lesiones-fisicas', label: 'Lesiones Personales Físicas' },
	{ value: 'victimas-terrorismo', label: 'Víctimas de actos terroristas' },
	{ value: 'lesiones-psicologicas', label: 'Lesiones Personales Psicológicas' },
	{ value: 'confinamiento', label: 'Confinamiento' },
	{ value: 'prefiero-no-responder', label: 'Prefiero no responder' }
]

// Tipos de discapacidad
export const DISABILITY_TYPES = [
	{ value: 'auditiva', label: 'Auditiva' },
	{ value: 'fisica', label: 'Física' },
	{ value: 'intelectual', label: 'Intelectual' },
	{ value: 'visual', label: 'Visual' },
	{ value: 'sordoceguera', label: 'Sordoceguera' },
	{ value: 'psicosocial', label: 'Psicosocial' },
	{ value: 'multiple', label: 'Múltiple' },
	{ value: 'prefiero-no-responder', label: 'Prefiero no responder' }
]

// Aportes a seguridad social
export const SOCIAL_SECURITY_CONTRIBUTIONS = [
	{ value: 'pension', label: 'Pensión' },
	{ value: 'salud', label: 'Salud' },
	{ value: 'arl', label: 'ARL' },
	{ value: 'cesantias', label: 'Cesantías' },
	{ value: 'caja-compensacion', label: 'Caja de compensación Familiar' }
]

// Salario emocional
export const EMOTIONAL_SALARY_OPTIONS = [
	{ value: 'incentivos', label: 'Incentivos' },
	{
		value: 'bienestar-desarrollo',
		label: 'Programas de bienestar y desarrollo'
	},
	{ value: 'creditos', label: 'Créditos' },
	{ value: 'reconocimientos', label: 'Reconocimientos' },
	{ value: 'ascensos', label: 'Posibilidades de ascensos' },
	{ value: 'otro', label: 'Otro' },
	{ value: 'ninguno', label: 'Ninguno' }
]

// Competencias no adquiridas
export const MISSING_COMPETENCIES = [
	{ value: 'idiomas', label: 'Idiomas' },
	{ value: 'emprendimiento', label: 'Emprendimiento' },
	{ value: 'liderazgo', label: 'Liderazgo y Trabajo en Equipo' },
	{
		value: 'tic',
		label: 'Tecnologías de la información y de la comunicación (TIC)'
	},
	{
		value: 'herramientas-nube',
		label: 'Manejo de herramientas de computación en la nube'
	},
	{ value: 'programacion', label: 'Habilidades de programación' },
	{ value: 'analisis-datos', label: 'Análisis de datos' },
	{ value: 'automatizacion', label: 'Procesos de automatización' }
]

// Áreas de búsqueda laboral
export const JOB_SEARCH_AREAS = [
	{ value: 'antioquia', label: 'En Antioquia' },
	{ value: 'otras-ciudades-colombia', label: 'En otras ciudades de Colombia' },
	{ value: 'latinoamerica', label: 'En LatinoAmérica' },
	{ value: 'eeuu', label: 'En EEUU' },
	{ value: 'europa', label: 'En Europa' },
	{ value: 'otro', label: 'Otro lugar' },
	{ value: 'no', label: 'No' }
]

// Niveles de inglés
export const ENGLISH_LEVELS = [
	{ value: 'basico', label: 'Básico' },
	{ value: 'intermedio', label: 'Intermedio' },
	{ value: 'avanzado', label: 'Avanzado' },
	{ value: 'nativo', label: 'Nativo' },
	{ value: 'ninguno', label: 'Ninguno' }
]

// Tiempo graduación a empleo
export const GRADUATION_TO_EMPLOYMENT_TIME = [
	{ value: '0-3-meses', label: '0 a 3 meses' },
	{ value: '4-6-meses', label: '4 a 6 meses' },
	{ value: '7-12-meses', label: '7 a 12 meses' },
	{ value: 'mas-12-meses', label: 'Más de 12 meses' },
	{ value: 'no-aplica', label: 'No aplica' }
]
