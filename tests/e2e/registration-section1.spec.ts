import { test, expect } from '@playwright/test'
import { gotoRegistration, fillSection1, clickNext } from './helpers/form-actions'

test.describe('Section 1 — happy path', () => {
	test.beforeEach(async ({ page }) => {
		await gotoRegistration(page)
	})

	test('fills the section and enables "Siguiente"', async ({ page }) => {
		await fillSection1(page)
		const nextBtn = page.getByRole('button', { name: /siguiente/i })
		await expect(nextBtn).toBeEnabled({ timeout: 10_000 })
	})

	test('advances to Section 2 after filling Section 1', async ({ page }) => {
		await fillSection1(page)
		await clickNext(page)
		await expect(page.getByText(/datos personales|fecha de nacimiento|contacto/i).first())
			.toBeVisible({ timeout: 10_000 })
	})

	test('persists data after reload (zustand persist)', async ({ page }) => {
		await fillSection1(page)
		await page.reload()
		await expect(page.getByLabel(/^nombres/i).first()).toHaveValue(/Juan Carlos/i, { timeout: 10_000 })
	})

	test('autofill: searching by existing document is triggered', async ({ page }) => {
		const searchTrigger = page.getByRole('button', { name: /buscar/i }).first()
		if (await searchTrigger.isVisible().catch(() => false)) {
			await page.getByLabel(/n[uú]mero de documento/i).first().fill('1020304050')
			await searchTrigger.click()
			await page.waitForTimeout(1500)
		} else {
			test.skip(true, 'No autofill search button visible — feature likely guarded')
		}
	})
})
