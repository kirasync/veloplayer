import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VeloPlayer } from './VeloPlayer';
import './index'; // registers the element

describe('VeloPlayer Unit Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers custom element', () => {
    expect(customElements.get('video-player')).toBeDefined();
  });

  it('renders video element and shadow dom', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    document.body.appendChild(player);
    
    expect(player.shadowRoot).toBeDefined();
    const video = player.shadowRoot!.querySelector('video');
    expect(video).not.toBeNull();
  });

  it('parses basic attributes correctly', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    player.setAttribute('src', 'test.mp4');
    player.setAttribute('poster', 'test.jpg');
    player.setAttribute('muted', 'true');
    player.setAttribute('autoplay', 'true');
    player.setAttribute('loop', 'true');
    document.body.appendChild(player);

    const video = player.shadowRoot!.querySelector('video') as HTMLVideoElement;
    expect(video.src).toContain('test.mp4');
    expect(video.poster).toContain('test.jpg');
    expect(video.muted).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video.loop).toBe(true);
  });

  it('handles accent-color attribute', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    player.setAttribute('accent-color', '#ff0000');
    document.body.appendChild(player);

    expect(player.style.getPropertyValue('--velo-accent')).toBe('#ff0000');
  });

  it('handles aspect-ratio attribute', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    player.setAttribute('aspect-ratio', '4/3');
    document.body.appendChild(player);

    expect(player.style.aspectRatio.replace(/\s+/g, '')).toBe('4/3');
  });

  it('toggles controls visibility', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    player.setAttribute('controls', 'false');
    document.body.appendChild(player);

    const controls = player.shadowRoot!.querySelector('.velo-controls') as HTMLElement;
    expect(controls.style.display).toBe('none');
    
    player.setAttribute('controls', 'true');
    expect(controls.style.display).toBe('flex');
  });

  it('has default watermark', () => {
    const player = document.createElement('video-player') as VeloPlayer;
    document.body.appendChild(player);

    const watermark = player.shadowRoot!.querySelector('.velo-watermark') as HTMLElement;
    expect(watermark.textContent).toBe('VeloPlayer');
  });

  describe('Events and State Transitions', () => {
    it('dispatches play and pause events', () => {
      const player = document.createElement('video-player') as VeloPlayer;
      document.body.appendChild(player);
      const video = player.shadowRoot!.querySelector('video') as HTMLVideoElement;

      const playSpy = vi.fn();
      const pauseSpy = vi.fn();
      
      player.addEventListener('play', playSpy);
      player.addEventListener('pause', pauseSpy);

      video.dispatchEvent(new Event('play'));
      expect(playSpy).toHaveBeenCalled();
      
      video.dispatchEvent(new Event('pause'));
      expect(pauseSpy).toHaveBeenCalled();
    });

    it('updates container classes on play state change', () => {
      const player = document.createElement('video-player') as VeloPlayer;
      document.body.appendChild(player);
      const video = player.shadowRoot!.querySelector('video') as HTMLVideoElement;
      const container = player.shadowRoot!.querySelector('.velo-container') as HTMLElement;

      // Simulate play
      Object.defineProperty(video, 'paused', { value: false, configurable: true });
      video.dispatchEvent(new Event('play'));
      expect(container.classList.contains('paused')).toBe(false);

      // Simulate pause
      Object.defineProperty(video, 'paused', { value: true, configurable: true });
      video.dispatchEvent(new Event('pause'));
      expect(container.classList.contains('paused')).toBe(true);
    });

    it('changes playback speed when selector changes', () => {
      const player = document.createElement('video-player') as VeloPlayer;
      document.body.appendChild(player);
      const video = player.shadowRoot!.querySelector('video') as HTMLVideoElement;
      const speedSelect = player.shadowRoot!.querySelector('.velo-speed') as HTMLSelectElement;

      // Simulate UI selection to 2x
      speedSelect.value = '2';
      speedSelect.dispatchEvent(new Event('change'));

      expect(video.playbackRate).toBe(2);
    });
  });
});
