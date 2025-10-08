// Types for the registration form
import { Section1Form } from '@/schemas/section1'
import { Section2Form } from '@/schemas/section2'
import { Section21Form } from '@/schemas/section21'
import { Section3Form } from '@/schemas/section3'
import { Section4Form } from '@/schemas/section4'
import { Section5Form } from '@/schemas/section5'
import { Section6Form } from '@/schemas/section6'

export type Section1 = Section1Form
export type Section2 = Section2Form
export type Section21 = Section21Form
export type Section3 = Section3Form
export type Section4 = Section4Form
export type Section5 = Section5Form
export type Section6 = Section6Form

export interface RegistrationFormData {
	section1: Section1
	section2: Section2
	section21?: Section21
	section3: Section3
	section4: Section4
	section5: Section5
	section6: Section6
}
