import { VeloPlayer } from './VeloPlayer';

export { VeloPlayer };

if (typeof window !== 'undefined' && !customElements.get('video-player')) {
  customElements.define('video-player', VeloPlayer);
}
