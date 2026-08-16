import { playIcon, pauseIcon, volumeOnIcon, volumeOffIcon, fullscreenIcon, pipIcon, loadingIcon, helpIcon } from './icons';

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    display: block;
    --velo-accent: #6366f1;
    --velo-bg: #000;
    --velo-text: #fff;
    --velo-control-bg: rgba(0, 0, 0, 0.6);
    --velo-font: system-ui, -apple-system, sans-serif;
    font-family: var(--velo-font);
    position: relative;
    background: var(--velo-bg);
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;
  }
  
  .velo-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--velo-bg);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: var(--velo-bg);
    cursor: pointer;
  }

  .velo-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .velo-error {
    color: #ef4444;
    background: rgba(0,0,0,0.8);
    padding: 1rem;
    border-radius: 0.5rem;
    display: none;
    text-align: center;
    pointer-events: auto;
  }
  
  .velo-loading {
    color: var(--velo-text);
    display: none;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }

  .velo-watermark {
    position: absolute;
    bottom: 60px;
    right: 20px;
    color: rgba(255,255,255,0.4);
    font-size: 14px;
    font-weight: 600;
    pointer-events: none;
    user-select: none;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    transition: opacity 0.3s;
    z-index: 15;
  }

  .velo-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.38) 72%, transparent);
    padding: 28px 16px 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 20;
  }

  .velo-container.active .velo-controls,
  .velo-container.paused .velo-controls,
  .velo-controls:focus-within {
    opacity: 1;
  }

  .velo-container.active .velo-watermark {
    opacity: 0.8;
  }

    .velo-btn {
    background: transparent;
    border: none;
    color: var(--velo-text);
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    transition: background 0.2s, transform 0.1s;
    outline: none;
  }
  .velo-btn:hover {
    background: rgba(255,255,255,0.2);
  }
  .velo-btn:focus-visible {
    box-shadow: 0 0 0 2px var(--velo-accent);
  }
  .velo-btn svg {
    width: 24px;
    height: 24px;
  }

  .velo-time {
    color: var(--velo-text);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    user-select: none;
  }

  .velo-spacer {
    flex-grow: 1;
  }

  .velo-range {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    height: 6px;
    border-radius: 3px;
  }

  .velo-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.3);
    border-radius: 3px;
  }

  .velo-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--velo-accent);
    margin-top: -4px;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    transition: transform 0.1s;
  }
  .velo-range::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  
  .velo-range::-moz-range-track {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.3);
    border-radius: 3px;
  }
  
  .velo-range::-moz-range-thumb {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--velo-accent);
    border: none;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    transition: transform 0.1s;
  }
  .velo-range::-moz-range-thumb:hover {
    transform: scale(1.2);
  }

  .velo-seek-container {
    width: 100%;
    margin-bottom: 4px;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .velo-seek {
    width: 100%;
    margin: 0;
  }

  .velo-seek-progress {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    background: var(--velo-accent);
    border-radius: 3px;
    pointer-events: none;
    width: 0%;
  }

  .velo-volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100px;
  }
  
  .velo-volume {
    width: 100%;
    margin: 0;
  }

  .velo-speed {
    background: transparent;
    color: var(--velo-text);
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    padding: 4px;
    border-radius: 4px;
    appearance: none;
  }
  .velo-speed:focus-visible {
    box-shadow: 0 0 0 2px var(--velo-accent);
  }
  .velo-speed option {
    background: #222;
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    .velo-controls, .velo-btn, .velo-range::-webkit-slider-thumb {
      transition: none;
    }
    .velo-loading {
      animation: none;
    }
  }

  .velo-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .velo-tooltip {
    position: relative;
  }

  .velo-tooltip::after {
    content: attr(data-title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: pre;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: none;
    z-index: 30;
    text-align: left;
    line-height: 1.5;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  }

  .velo-tooltip:hover::after,
  .velo-tooltip:focus-visible::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }

  @media (max-width: 600px) {
    .velo-controls {
      padding: 10px 8px;
      gap: 8px;
    }
    .velo-volume-container {
      display: none;
    }
    .velo-watermark {
      bottom: 50px;
      right: 10px;
    }
  }
</style>

<div class="velo-container paused" aria-describedby="velo-shortcuts">
  <div class="velo-sr-only" id="velo-shortcuts" aria-live="polite">
    Keyboard shortcuts: Space for play/pause, Left/Right arrows to seek, Up/Down arrows for volume, M to mute, F for fullscreen.
  </div>
  <video></video>
  
  <div class="velo-watermark">VeloPlayer</div>
  
  <div class="velo-overlay">
    <div class="velo-loading">${loadingIcon}</div>
    <div class="velo-error"></div>
  </div>

  <div class="velo-controls">
    <div class="velo-seek-container">
      <div class="velo-seek-progress"></div>
      <input type="range" class="velo-range velo-seek" min="0" max="100" value="0" step="0.1" aria-label="Seek time" />
    </div>
    
    <button class="velo-btn velo-play" aria-label="Play">${playIcon}</button>
    <div class="velo-time"><span class="velo-current">0:00</span> / <span class="velo-duration">0:00</span></div>
    
    <div class="velo-spacer"></div>
    
    <button class="velo-btn velo-mute" aria-label="Mute">${volumeOnIcon}</button>
    <div class="velo-volume-container">
      <input type="range" class="velo-range velo-volume" min="0" max="1" value="1" step="0.05" aria-label="Volume" />
    </div>
    
    <select class="velo-speed" aria-label="Playback speed">
      <option value="0.5">0.5x</option>
      <option value="1" selected>1x</option>
      <option value="1.5">1.5x</option>
      <option value="2">2x</option>
    </select>
    
    <button class="velo-btn velo-pip" aria-label="Picture in Picture" aria-keyshortcuts="p">${pipIcon}</button>
    <button class="velo-btn velo-fullscreen" aria-label="Fullscreen" aria-keyshortcuts="f">${fullscreenIcon}</button>
  </div>
</div>
`;

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export class VeloPlayer extends HTMLElement {
  private video!: HTMLVideoElement;
  private container!: HTMLElement;
  private playBtn!: HTMLButtonElement;
  private muteBtn!: HTMLButtonElement;
  private fullscreenBtn!: HTMLButtonElement;
  private pipBtn!: HTMLButtonElement;
  private seekBar!: HTMLInputElement;
  private seekProgress!: HTMLElement;
  private volumeBar!: HTMLInputElement;
  private speedSelect!: HTMLSelectElement;
  private timeCurrent!: HTMLElement;
  private timeDuration!: HTMLElement;
  private errorDisplay!: HTMLElement;
  private loadingDisplay!: HTMLElement;
  private isScrubbing = false;
  private activityTimeout?: number;
  private hlsInstance: any = null;

  static get observedAttributes() {
    return ['src', 'poster', 'autoplay', 'muted', 'loop', 'aspect-ratio', 'accent-color', 'controls'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.initElements();
    this.bindEvents();
  }

  private initElements() {
    const root = this.shadowRoot!;
    this.container = root.querySelector('.velo-container') as HTMLElement;
    this.video = root.querySelector('video') as HTMLVideoElement;
    this.playBtn = root.querySelector('.velo-play') as HTMLButtonElement;
    this.muteBtn = root.querySelector('.velo-mute') as HTMLButtonElement;
    this.fullscreenBtn = root.querySelector('.velo-fullscreen') as HTMLButtonElement;
    this.pipBtn = root.querySelector('.velo-pip') as HTMLButtonElement;
    this.seekBar = root.querySelector('.velo-seek') as HTMLInputElement;
    this.seekProgress = root.querySelector('.velo-seek-progress') as HTMLElement;
    this.volumeBar = root.querySelector('.velo-volume') as HTMLInputElement;
    this.speedSelect = root.querySelector('.velo-speed') as HTMLSelectElement;
    this.timeCurrent = root.querySelector('.velo-current') as HTMLElement;
    this.timeDuration = root.querySelector('.velo-duration') as HTMLElement;
    this.errorDisplay = root.querySelector('.velo-error') as HTMLElement;
    this.loadingDisplay = root.querySelector('.velo-loading') as HTMLElement;

    if (typeof document !== 'undefined' && !document.pictureInPictureEnabled) {
      this.pipBtn.style.display = 'none';
    }
  }

  private bindEvents() {
    // Video events
    this.video.addEventListener('play', () => this.updatePlayState());
    this.video.addEventListener('pause', () => this.updatePlayState());
    this.video.addEventListener('timeupdate', () => this.updateTime());
    this.video.addEventListener('loadedmetadata', () => this.updateDuration());
    this.video.addEventListener('volumechange', () => this.updateVolumeState());
    this.video.addEventListener('error', (e) => this.handleError(e));
    this.video.addEventListener('loadstart', () => this.loadingDisplay.style.display = 'block');
    this.video.addEventListener('waiting', () => this.loadingDisplay.style.display = 'block');
    this.video.addEventListener('playing', () => this.loadingDisplay.style.display = 'none');
    this.video.addEventListener('canplay', () => this.loadingDisplay.style.display = 'none');
    this.video.addEventListener('canplaythrough', () => this.loadingDisplay.style.display = 'none');

    // Forward events
    const forwardEvents = ['play', 'pause', 'timeupdate', 'ended', 'volumechange', 'error', 'loadedmetadata'];
    forwardEvents.forEach(evt => {
      this.video.addEventListener(evt, () => {
        this.dispatchEvent(new Event(evt));
      });
    });
    this.container.addEventListener('fullscreenchange', () => {
      this.dispatchEvent(new Event('fullscreenchange'));
    });

    // Control events
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.container.addEventListener('keydown', () => this.resetActivity());
    this.video.addEventListener('click', () => this.togglePlay());
    this.muteBtn.addEventListener('click', () => this.toggleMute());
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    this.pipBtn.addEventListener('click', () => this.togglePip());
    
    // Seek
    this.seekBar.addEventListener('input', () => {
      this.isScrubbing = true;
      this.updateSeekVisuals(Number(this.seekBar.value));
    });
    this.seekBar.addEventListener('change', () => {
      const time = (Number(this.seekBar.value) / 100) * this.video.duration;
      if (isFinite(time)) this.video.currentTime = time;
      this.isScrubbing = false;
    });

    // Volume
    this.volumeBar.addEventListener('input', () => {
      this.video.volume = Number(this.volumeBar.value);
      this.video.muted = this.video.volume === 0;
    });

    // Speed
    this.speedSelect.addEventListener('change', () => {
      this.video.playbackRate = Number(this.speedSelect.value);
    });

    // Keyboard
    this.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Activity
    this.container.addEventListener('mousemove', () => this.resetActivity());
    this.container.addEventListener('touchstart', () => this.resetActivity(), { passive: true });
    this.container.addEventListener('mouseleave', () => this.setInactive());
  }

  private togglePlay() {
    if (this.video.paused || this.video.ended) {
      this.video.play().catch(() => {});
    } else {
      this.video.pause();
    }
  }

  private updatePlayState() {
    if (this.video.paused) {
      this.playBtn.innerHTML = playIcon;
      this.playBtn.setAttribute('aria-label', 'Play');
      this.playBtn.setAttribute('aria-pressed', 'false');
      this.container.classList.add('paused');
    } else {
      this.playBtn.innerHTML = pauseIcon;
      this.playBtn.setAttribute('aria-label', 'Pause');
      this.playBtn.setAttribute('aria-pressed', 'true');
      this.container.classList.remove('paused');
      this.resetActivity();
    }
  }

  private updateTime() {
    if (this.isScrubbing) return;
    const current = this.video.currentTime;
    const duration = this.video.duration || 0;
    this.timeCurrent.textContent = formatTime(current);
    if (duration > 0) {
      const percent = (current / duration) * 100;
      this.seekBar.value = percent.toString();
      this.updateSeekVisuals(percent);
    }
  }

  private updateDuration() {
    this.timeDuration.textContent = formatTime(this.video.duration);
    this.updateTime();
  }

  private updateSeekVisuals(percent: number) {
    this.seekProgress.style.width = `${percent}%`;
  }

  private toggleMute() {
    this.video.muted = !this.video.muted;
  }

  private updateVolumeState() {
    if (this.video.muted || this.video.volume === 0) {
      this.muteBtn.innerHTML = volumeOffIcon;
      this.muteBtn.setAttribute('aria-label', 'Unmute');
      this.volumeBar.value = '0';
    } else {
      this.muteBtn.innerHTML = volumeOnIcon;
      this.muteBtn.setAttribute('aria-label', 'Mute');
      this.volumeBar.value = this.video.volume.toString();
    }
  }

  private toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  private async togglePip() {
    try {
      if (document.pictureInPictureElement !== this.video) {
        await this.video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error('PiP failed', error);
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    const active = this.shadowRoot!.activeElement || document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'SELECT') && active !== this.seekBar && active !== this.volumeBar) return;
    
    switch(e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        this.togglePlay();
        break;
      case 'f':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case 'm':
        e.preventDefault();
        this.toggleMute();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.video.currentTime = Math.min(this.video.currentTime + 5, this.video.duration);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.video.currentTime = Math.max(this.video.currentTime - 5, 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.video.volume = Math.min(this.video.volume + 0.1, 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.video.volume = Math.max(this.video.volume - 0.1, 0);
        break;
    }
  }

  private resetActivity() {
    this.container.classList.add('active');
    if (this.activityTimeout) window.clearTimeout(this.activityTimeout);
    this.activityTimeout = window.setTimeout(() => {
      if (!this.video.paused) {
        this.setInactive();
      }
    }, 2500);
  }

  private setInactive() {
    this.container.classList.remove('active');
  }

  private handleError(e: Event) {
    this.errorDisplay.style.display = 'block';
    this.loadingDisplay.style.display = 'none';
    const error = this.video.error;
    let msg = 'Error loading video.';
    if (error) {
      switch (error.code) {
        case 1: msg = 'Video loading aborted.'; break;
        case 2: msg = 'Network error while loading video.'; break;
        case 3: msg = 'Video decoding failed.'; break;
        case 4: msg = 'Video format not supported or CORS issue.'; break;
      }
    }
    this.errorDisplay.textContent = msg;
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.applyAttributes();
  }

  disconnectedCallback() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.applyAttribute(name, newValue);
    }
  }

  private applyAttributes() {
    const attrs = VeloPlayer.observedAttributes;
    attrs.forEach(attr => {
      if (this.hasAttribute(attr)) {
        this.applyAttribute(attr, this.getAttribute(attr));
      }
    });
  }

  private applyAttribute(name: string, value: string | null) {
    switch (name) {
      case 'src':
        this.loadSource(value || '');
        this.errorDisplay.style.display = 'none';
        break;
      case 'poster':
        this.video.poster = value || '';
        break;
      case 'autoplay':
        this.video.autoplay = value !== 'false' && value !== null;
        break;
      case 'muted':
        this.video.muted = value !== 'false' && value !== null;
        this.updateVolumeState();
        break;
      case 'loop':
        this.video.loop = value !== 'false' && value !== null;
        break;
      case 'aspect-ratio':
        if (value) this.style.aspectRatio = value;
        break;
      case 'accent-color':
        if (value) this.style.setProperty('--velo-accent', value);
        break;
      case 'controls':
        const controlsEl = this.shadowRoot?.querySelector('.velo-controls') as HTMLElement;
        if (controlsEl) {
          controlsEl.style.display = (value === 'false') ? 'none' : 'flex';
        }
        break;
    }
  }

  play() { return this.video.play(); }
  pause() { this.video.pause(); }
  get currentTime() { return this.video.currentTime; }
  set currentTime(v: number) { this.video.currentTime = v; }
  get duration() { return this.video.duration; }
  get volume() { return this.video.volume; }
  set volume(v: number) { this.video.volume = v; }

  private async loadSource(src: string) {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    if (!src) {
      this.video.removeAttribute('src');
      return;
    }

    this.loadingDisplay.style.display = 'block';

    const isM3U8 = src.includes('.m3u8');
    const canPlayNative = this.video.canPlayType('application/vnd.apple.mpegurl');

    if (isM3U8 && !canPlayNative) {
      try {
        // Lazy load hls.js when needed
        // @ts-ignore
        const hlsModule = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/hls.js@1/+esm');
        const Hls = hlsModule.default;
        
        if (Hls.isSupported()) {
          this.hlsInstance = new Hls();
          this.hlsInstance.loadSource(src);
          this.hlsInstance.attachMedia(this.video);
          
          this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            if (this.hasAttribute('autoplay') && this.getAttribute('autoplay') !== 'false') {
              this.video.play().catch(() => {});
            }
          });
          
          this.hlsInstance.on(Hls.Events.ERROR, (event: any, data: any) => {
            if (data.fatal) {
              this.handleError(new Event('error'));
            }
          });
        } else {
          this.video.src = src; // Fallback
        }
      } catch (e) {
        console.error('Failed to load hls.js', e);
        this.video.src = src; // Fallback
      }
    } else {
      this.video.src = src;
    }
  }
}
