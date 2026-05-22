import { test, expect } from '@playwright/test'
import { APP_TITLE } from './fixtures/form-data'

test.describe('Home page', () => {
	test('loads and renders the registration form shell', async ({ page }) => {
		await page.goto('/')
		await expect(page).toHaveTitle(new RegExp(APP_TITLE, 'i'))
	})

	test('shows the terms and conditions modal on first visit', async ({ page }) => {
		await page.goto('/')
		const dialog = page.getByRole('dialog')
		await expect(dialog).toBeVisible({ timeout: 10_000 })
		await expect(dialog.getByText(/¡?Hola!?/i).first()).toBeVisible()
		await expect(dialog.getByRole('button', { name: /aceptar/i })).toBeVisible()
	})

	test('renders the page title heading', async ({ page }) => {
		await page.goto('/registration')
		await expect(page.locator(`text=/${APP_TITLE}/i`).first()).toBeVisible({ timeout: 10_000 })
	})
})
