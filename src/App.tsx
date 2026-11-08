import ClassicSite from './ClassicSite.tsx'
import Game from './game/Game.tsx'

/**
 * Mặc định mở bản game kể chuyện pixel art.
 * Bản bài viết (website editorial) mở bằng ?che-do=bai-viet (xem modeLinks trong data/site.ts).
 */
export default function App() {
  const mode = new URLSearchParams(window.location.search).get('che-do')
  return mode === 'bai-viet' ? <ClassicSite /> : <Game />
}
