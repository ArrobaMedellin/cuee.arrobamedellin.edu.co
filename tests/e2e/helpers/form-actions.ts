import { Page, expect } from '@playwright/test'
import { validSection1 } from '../fixtures/form-data'

export async function acceptTerms(page: Page) {
	const acceptButton = page.getByRole('button', { name: /aceptar/i })
	if (await acceptButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
		await acceptButton.click()
		await expect(acceptButton).toBeHidden({ timeout: 5_000 })
	}
}

export async function gotoRegistration(page: Page) {
	await page.goto('/registration')
	await acceptTerms(page)
}

export async function selectRadixOption(
	page: Page,
	triggerLabel: string | RegExp,
	optionText: string | RegExp,
) {
	const trigger = page
		.getByRole('combobox', { name: triggerLabel })
		.or(page.locator(`button:has-text("${triggerLabel}")`))
		.first()
	await trigger.click()
	await page.getByRole('option', { name: optionText }).first().click()
}

export async function fillSection1(page: Page, overrides: Partial<typeof validSection1> = {}) {
	const data = { ...validSection1, ...overrides }

	await page.getByLabel(/^nombres/i).first().fill(data.firstName)
	await page.getByLabel(/^apellidos/i).first().fill(data.lastName)

	await selectRadixOption(page, /tipo de documento/i, new RegExp(data.documentType, 'i'))

	await page.getByLabel(/n[uú]mero de documento/i).first().fill(data.documentNumber)
	await page.getByLabel(/^correo electr[oó]nico/i).first().fill(data.email)
	await page.getByLabel(/verifica.*correo|confirma.*correo|repite.*correo/i).first().fill(data.emailVerification)
}

export async function clickNext(page: Page) {
	await page.getByRole('button', { name: /siguiente/i }).click()
}

export async function clickPrev(page: Page) {
	await page.getByRole('button', { name: /anterior/i }).click()
}
