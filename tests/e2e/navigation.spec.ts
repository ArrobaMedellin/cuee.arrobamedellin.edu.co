import { test, expect } from '@playwright/test'
import { gotoRegistration, fillSection1, clickNext, clickPrev } from './helpers/form-actions'

test.describe('Stepper navigation', () => {
	test.beforeEach(async ({ page }) => {
		await gotoRegistration(page)
	})

	test('renders all 7 steps in the sidebar', async ({ page }) => {
		const stepper = page.locator('aside').first()
		await expect(stepper).toBeVisible()
		const expected = [
			/informaci[oó]n personal/i,
			/datos personales/i,
			/ubicaci[oó]n/i,
			/socioecon[oó]mica/i,
			/poblaci[oó]n.*etnia/i,
			/elecci[oó]n de cursos|cursos/i,
			/resumen/i,
		]
		for (const re of expected) {
			await expect(stepper.getByText(re).first()).toBeVisible()
		}
	})

	test('"Anterior" button is disabled in the first step', async ({ page }) => {
		await expect(page.getByRole('button', { name: /anterior/i })).toBeDisabled()
	})

	test('can go back from step 2 to step 1', async ({ page }) => {
		await fillSection1(page)
		await clickNext(page)
		await expect(page.getByText(/datos personales|fecha de nacimiento/i).first()).toBeVisible({ timeout: 10_000 })
		await clickPrev(page)
		await expect(page.getByLabel(/^nombres/i).first()).toBeVisible()
	})

	test('clicking a future step in the stepper does not skip ahead', async ({ page }) => {
		const stepper = page.locator('aside').first()
		const futureStep = stepper.getByText(/resumen/i).first()
		await futureStep.click({ trial: false }).catch(() => {})
		await expect(page.getByLabel(/^nombres/i).first()).toBeVisible()
	})
})
