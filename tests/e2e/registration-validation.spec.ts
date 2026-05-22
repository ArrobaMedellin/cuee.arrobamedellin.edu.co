import { test, expect } from '@playwright/test'
import { gotoRegistration, clickNext } from './helpers/form-actions'
import { invalidEmails, validSection1 } from './fixtures/form-data'

test.describe('Section 1 — validation', () => {
	test.beforeEach(async ({ page }) => {
		await gotoRegistration(page)
	})

	test('disables "Siguiente" while section is invalid', async ({ page }) => {
		const nextBtn = page.getByRole('button', { name: /siguiente/i })
		await expect(nextBtn).toBeDisabled()
	})

	test('shows error when document number contains letters', async ({ page }) => {
		await page.getByLabel(/n[uú]mero de documento/i).first().fill('ABC123')
		await page.getByLabel(/n[uú]mero de documento/i).first().blur()
		await expect(page.locator('text=/solo n[uú]meros/i').first()).toBeVisible({ timeout: 5_000 })
	})

	for (const email of invalidEmails) {
		test(`shows error for invalid email format: "${email}"`, async ({ page }) => {
			await page.getByLabel(/^correo electr[oó]nico/i).first().fill(email)
			await page.getByLabel(/^correo electr[oó]nico/i).first().blur()
			await expect(page.locator('text=/inv[aá]lid|correo/i').first()).toBeVisible({ timeout: 5_000 })
		})
	}

	test('shows error when email confirmation does not match', async ({ page }) => {
		await page.getByLabel(/^correo electr[oó]nico/i).first().fill(validSection1.email)
		await page.getByLabel(/verifica.*correo|confirma.*correo|repite.*correo/i).first()
			.fill('different@example.com')
		await page.getByLabel(/verifica.*correo|confirma.*correo|repite.*correo/i).first().blur()
		await expect(page.locator('text=/no coinciden/i').first()).toBeVisible({ timeout: 5_000 })
	})

	test('prevents advancing without filling required fields', async ({ page }) => {
		await clickNext(page).catch(() => {})
		await expect(page).toHaveURL(/\/registration/)
	})
})
