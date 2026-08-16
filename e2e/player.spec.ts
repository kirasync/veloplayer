import { test, expect } from '@playwright/test';

test.describe('VeloPlayer E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Inject HTMLMediaElement mocks to ensure media play/pause transitions work flawlessly in headless CI
    await page.addInitScript(() => {
      Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
        get() {
          return this._mockPaused !== false;
        },
        configurable: true
      });

      HTMLMediaElement.prototype.play = async function() {
        this._mockPaused = false;
        this.dispatchEvent(new Event('play'));
        return Promise.resolve();
      };

      HTMLMediaElement.prototype.pause = function() {
        this._mockPaused = true;
        this.dispatchEvent(new Event('pause'));
      };
    });
  });

  test('demo page loads player correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if the component is mounted
    const player = page.locator('video-player').first();
    await expect(player).toBeVisible();

    // The shadow root should contain the video
    const video = player.locator('css=video');
    await expect(video).toBeAttached();

    // Check watermark
    const watermark = player.locator('css=.velo-watermark');
    await expect(watermark).toHaveText('VeloPlayer');
  });

  test('play button starts video', async ({ page }) => {
    await page.goto('/');
    const player = page.locator('video-player').first();
    const playBtn = player.locator('css=.velo-play');
    
    // It should start paused
    const container = player.locator('css=.velo-container');
    await expect(container).toHaveClass(/paused/);

    // Click play with retry for mobile stability
    await expect(async () => {
      const isPaused = await container.evaluate((el) => el.classList.contains('paused'));
      if (isPaused) {
        await playBtn.click({ force: true });
      }
      await expect(container).not.toHaveClass(/paused/, { timeout: 2000 });
    }).toPass({ timeout: 10000 });
  });

  test('volume control works', async ({ page }) => {
    await page.goto('/');
    const player = page.locator('video-player').first();
    const muteBtn = player.locator('css=.velo-mute');
    
    // Click mute
    await muteBtn.click({ force: true });
    const video = player.locator('css=video');
    const isMuted = await video.evaluate((node: HTMLVideoElement) => node.muted);
    expect(isMuted).toBe(true);
  });

  test('external embed script works', async ({ page }) => {
    await page.goto('/embed-test.html');
    
    const player = page.locator('video-player#test-player');
    await expect(player).toBeVisible();

    const video = player.locator('css=video');
    await expect(video).toBeAttached();

    // Verify the source was passed down
    const src = await video.evaluate((node: HTMLVideoElement) => node.src);
    expect(src).toContain('ForBiggerJoyrides.mp4');

    // Make sure controls are rendered
    const controls = player.locator('css=.velo-controls');
    await expect(controls).toBeVisible();
  });
});
