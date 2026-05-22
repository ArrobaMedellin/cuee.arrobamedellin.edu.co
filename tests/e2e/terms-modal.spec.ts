import { test, expect } from '@playwright/test'

test.describe('Terms and Conditions modal', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/registration')
	})

	test('blocks form interaction until terms are accepted', async ({ page }) => {
		await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10_000 })
		await expect(page.getByText(/acepta los términos y condiciones/i)).toBeVisible()
	})

	test('closes modal after pressing "Aceptar" and exposes form steps', async ({ page }) => {
		const dialog = page.getByRole('dialog')
		await expect(dialog).toBeVisible({ timeout: 10_000 })
		await dialog.getByRole('button', { name: /aceptar/i }).click()
		await expect(dialog).toBeHidden({ timeout: 10_000 })
		await expect(page.getByRole('button', { name: /siguiente/i })).toBeVisible()
	})

	test('persists acceptance on reload (zustand persist)', async ({ page }) => {
		const dialog = page.getByRole('dialog')
		await expect(dialog).toBeVisible({ timeout: 10_000 })
		await dialog.getByRole('button', { name: /aceptar/i }).click()
		await expect(dialog).toBeHidden()
		await page.reload()
		await expect(page.getByRole('button', { name: /siguiente/i })).toBeVisible({ timeout: 10_000 })
	})
})
