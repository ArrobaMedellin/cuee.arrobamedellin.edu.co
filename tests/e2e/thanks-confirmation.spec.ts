import { test, expect } from '@playwright/test'

test.describe('Confirmation and Thanks pages', () => {
	test('/thanks renders a thank-you message', async ({ page }) => {
		await page.goto('/thanks')
		await expect(page.locator('text=/gracias|thanks/i').first()).toBeVisible({ timeout: 10_000 })
	})

	test('/confirmation renders a confirmation message', async ({ page }) => {
		await page.goto('/confirmation')
		await expect(page.locator('text=/confirmaci[oó]n|registrado|inscripci[oó]n/i').first())
			.toBeVisible({ timeout: 10_000 })
	})

	test('/underconstruction page renders if visited directly', async ({ page }) => {
		const response = await page.goto('/underconstruction', { waitUntil: 'load' })
		if (response && response.ok()) {
			await expect(page.locator('body')).not.toBeEmpty()
		}
	})
})
