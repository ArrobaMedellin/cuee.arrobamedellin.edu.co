import { z } from 'zod'
import { section1Schema } from './section1'
import { section2Schema } from './section2'
import { section21Schema } from './section21'
import { section3Schema } from './section3'
import { section4Schema } from './section4'
import { section5Schema } from './section5'
import { section6Schema } from './section6'

export const formSchema = z.object({
	section1: section1Schema,
	section2: section2Schema,
	section21: section21Schema.optional(),
	section3: section3Schema,
	section4: section4Schema,
	section5: section5Schema,
	section6: section6Schema,
})

export type FormSchema = z.infer<typeof formSchema>
