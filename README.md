# VeloPlayer

A lightweight, framework-agnostic HTML5 and HLS video player built as a custom element.

## Quick start

```bash
npm install
npm run dev
```

Use the player after loading the build:

```html
<script type="module" src="/player.js"></script>

<video-player
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  accent-color="#6366f1"
  aspect-ratio="16/9">
</video-player>
```

## Attributes

`src`, `poster`, `aspect-ratio`, `accent-color`, `controls`, `autoplay`, `muted`, and `loop` are supported. HLS `.m3u8` sources are detected automatically when the browser needs a fallback.

## API

The element exposes `play()`, `pause()`, `currentTime`, `duration`, `volume`, and `muted`. It forwards native `play`, `pause`, `timeupdate`, `loadedmetadata`, `volumechange`, `ended`, and `error` events.

## Scripts

- `npm run dev` — start the documentation playground
- `npm run build` — build the playground and player bundle
- `npm run lint` — run TypeScript checks
- `npm test` — run unit tests
- `npm run test:e2e` — run browser tests

Licensed under the MIT License. See [LICENSE](./LICENSE).
