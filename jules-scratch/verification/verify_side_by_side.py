import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:3000")

        # Wait for the page to load
        await page.wait_for_selector("text=Weekly Workout Schedule")

        # Navigate to the "Shoulders & Legs" day
        await page.get_by_role("tab", name="Shoulders & Legs").click()

        # Find the "Barbell Squats" exercise card
        squats_card = page.locator("div.p-4.sm\\:p-8.rounded-3xl", has_text="Barbell Squats")

        # Click the "Muscle Activation" button within the card
        muscle_activation_button = squats_card.get_by_role("button", name="Muscle Activation")
        await muscle_activation_button.click()

        # Wait for the muscle activation section to open
        await expect(squats_card.get_by_text("Primary Muscles")).to_be_visible()

        # Give time for animation
        await page.wait_for_timeout(1000)

        # Take a screenshot of the whole page
        await page.screenshot(path="jules-scratch/verification/verification_squats.png")

        await browser.close()

asyncio.run(main())
