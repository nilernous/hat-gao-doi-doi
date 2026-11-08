import {
  bird,
  cloud,
  disc,
  hash,
  hut,
  outlineRect,
  palm,
  px,
  rect,
  riceField,
  sack,
  sky,
  twinkles,
  water,
  W,
  H,
  type Ctx,
} from './draw.ts'

export type BgId =
  | 'title'
  | 'dawn-field'
  | 'field'
  | 'river'
  | 'factory'
  | 'port'
  | 'crossroads'
  | 'village'
  | 'ending'

export type DrawFn = (c: Ctx, t: number) => void

const SKY_DAY = ['#78bfe0', '#95cfe8', '#b5def0', '#d6ecec']
const SKY_DAWN = ['#e99a6a', '#f2b47a', '#f7cc93', '#fae0b3']
const SKY_SUNSET = ['#3b2b57', '#7a3d66', '#c4566a', '#ec8a5f', '#f6bd6c']

const GOLDEN = { base: '#c9a443', dark: '#9c7a26', light: '#e8c766', tip: '#f6e3a0' }
const GREEN = { base: '#6c9748', dark: '#4b7633', light: '#8fbd5b', tip: '#b8d77a' }
const DUSK_FIELD = { base: '#9a6a32', dark: '#6e4a22', light: '#c99046', tip: '#e8b55e' }

/** Dải cây xa ở đường chân trời. */
function treeLine(c: Ctx, y: number, col: string, seed: number, amp = 4) {
  for (let x = 0; x < W; x++) {
    const h = 2 + Math.round(Math.abs(Math.sin(x * 0.11 + seed)) * amp + hash(Math.floor(x / 4) + seed) * 3)
    rect(c, x, y - h, 1, h + 1, col)
  }
}

function drifting(c: Ctx, t: number, y: number, seed: number, speed: number, s = 1) {
  const x = ((hash(seed) * W + t * speed) % (W + 50)) - 30
  cloud(c, x, y, s, '#ffffff', '#dfeef3')
}

/** Đường đất trên bờ ruộng: một dải chéo hoặc ngã ba. */
function dirtPath(c: Ctx, from: [number, number], to: [number, number], w0: number, w1: number) {
  const [x0, y0] = from
  const [x1, y1] = to
  for (let y = y1; y <= y0; y++) {
    const k = (y - y1) / Math.max(1, y0 - y1)
    const cx = x1 + (x0 - x1) * k
    const w = w1 + (w0 - w1) * k
    rect(c, cx - w / 2, y, w, 1, '#b8915c')
    px(c, cx - w / 2, y, '#8a6a3a')
    px(c, cx + w / 2 - 1, y, '#8a6a3a')
    if (y % 4 === 0) px(c, cx - w / 4 + hash(y) * (w / 2), y, '#d2b07a')
  }
}

function signpost(c: Ctx, x: number, baseY: number, dir: 'left' | 'right', board: string) {
  rect(c, x, baseY - 26, 2, 26, '#4e331f')
  const bx = dir === 'left' ? x - 20 : x - 2
  outlineRect(c, bx, baseY - 26, 24, 9, board)
  // mũi tên
  const ax = dir === 'left' ? bx - 3 : bx + 24
  for (let i = 0; i < 4; i++) {
    const w = 4 - i
    rect(c, dir === 'left' ? ax + i : ax, baseY - 26 + i + (4 - w) / 2 + 0.5, 1, 9 - i * 2, '#1b2a20')
  }
  rect(c, bx + 3, baseY - 23, 18, 1, '#f6f3ea')
  rect(c, bx + 3, baseY - 21, 12, 1, '#f6f3ea')
}

// ---------------------------------------------------------------------------

function drawField(c: Ctx, t: number, mode: 'dawn' | 'day' | 'fork') {
  const dawn = mode === 'dawn'
  sky(c, dawn ? SKY_DAWN : SKY_DAY, 76)
  if (dawn) disc(c, 196, 66, 12, '#fff1c4')
  else disc(c, 214, 18, 9, '#fff6d6')
  drifting(c, t, 20, 1, 3, 1)
  drifting(c, t, 34, 2, 2, 1)
  drifting(c, t, 14, 3, 1.5, 1)

  treeLine(c, 74, dawn ? '#5b6b4a' : '#3d6b4a', 2)
  palm(c, 24, 74, 18, t, '#4e331f', '#2a4a30', '#3d6b4a')
  palm(c, 46, 74, 14, t, '#4e331f', '#2a4a30', '#3d6b4a')
  palm(c, 226, 74, 20, t, '#4e331f', '#2a4a30', '#3d6b4a')
  hut(c, 150, 73, 14)
  hut(c, 168, 74, 10)

  riceField(c, 74, H, mode === 'fork' ? GREEN : GOLDEN, t)

  if (mode === 'fork') {
    dirtPath(c, [128, H], [128, 108], 34, 18)
    dirtPath(c, [118, 109], [40, 78], 16, 6)
    dirtPath(c, [138, 109], [216, 78], 16, 6)
    signpost(c, 104, 112, 'left', '#c9a443')
    signpost(c, 150, 112, 'right', '#64866b')
  } else {
    dirtPath(c, [70, H], [132, 76], 46, 4)
  }
}

function drawRiver(c: Ctx, t: number) {
  sky(c, SKY_DAY, 60)
  disc(c, 40, 16, 8, '#fff6d6')
  drifting(c, t, 18, 4, 2.5, 1)
  drifting(c, t, 30, 5, 1.8, 1)
  treeLine(c, 60, '#3d6b4a', 7, 5)
  palm(c, 70, 60, 16, t, '#4e331f', '#2a4a30', '#3d6b4a')
  palm(c, 186, 60, 19, t, '#4e331f', '#2a4a30', '#3d6b4a')
  hut(c, 120, 60, 16)
  hut(c, 210, 60, 12)

  water(c, 62, 122, '#5b9a8f', '#4a857b', '#a8d6c6', t)

  // Ghe chở lúa, nhấp nhô theo sóng
  const bx = 70 + Math.round(Math.sin(t * 0.4) * 6)
  const by = 96 + Math.round(Math.sin(t * 1.6))
  for (let i = 0; i < 7; i++) rect(c, bx + i * 1.5, by + i, 96 - i * 3, 1, i === 0 ? '#9a6a3a' : i < 3 ? '#6e4a22' : '#4e331f')
  rect(c, bx - 2, by - 1, 100, 1, '#1b2a20')
  // mắt ghe
  rect(c, bx + 6, by + 2, 3, 2, '#f6f3ea')
  px(c, bx + 7, by + 2, '#c0453a')
  // mui ghe (mái che cong) đặt trên khoang
  rect(c, bx + 54, by - 7, 26, 7, '#5a3d22')
  rect(c, bx + 58, by - 5, 4, 3, '#2e1f12')
  rect(c, bx + 72, by - 5, 4, 3, '#2e1f12')
  for (let i = 0; i < 4; i++) {
    const inset = 3 - i
    rect(c, bx + 52 + inset, by - 11 + i, 30 - inset * 2, 1, i % 2 ? '#a88650' : '#8a6a3a')
  }
  rect(c, bx + 55, by - 12, 24, 1, '#1b2a20')
  // bao lúa trên ghe
  for (let i = 0; i < 6; i++) sack(c, bx + 18 + i * 5, by - 5)
  for (let i = 0; i < 4; i++) sack(c, bx + 23 + i * 5, by - 9)
  // bóng nước dưới ghe
  for (let x = 0; x < 90; x += 3) px(c, bx + 4 + x, by + 8, '#3e7168')

  // bờ gần
  rect(c, 0, 122, W, H - 122, '#5f8a3e')
  for (let x = 0; x < W; x += 3) {
    const h = 3 + Math.round(hash(x) * 6)
    const sway = Math.round(Math.sin(t * 2 + x * 0.3))
    rect(c, x + sway, 122 - h, 1, h, '#3f6b2c')
    px(c, x + sway, 122 - h, '#8fbd5b')
  }
  for (let x = 0; x < W; x += 2) if (hash(x * 3) > 0.5) px(c, x, 124 + Math.floor(hash(x) * 18), '#4b7633')
}

function drawFactory(c: Ctx, t: number) {
  sky(c, ['#9cc7d6', '#b8d6de', '#d3e3e0', '#dfe8e2'], 108)
  drifting(c, t, 22, 6, 2, 1)
  treeLine(c, 92, '#6f8f73', 9, 3)

  // Nền xi măng
  rect(c, 0, 108, W, H - 108, '#9f9a8a')
  for (let x = 0; x < W; x += 16) rect(c, x, 108, 1, H - 108, '#8d8878')
  rect(c, 0, 108, W, 1, '#6f6b5e')

  // Ống khói và khói
  for (let y = 26; y < 108; y += 1) rect(c, 168, y, 8, 1, Math.floor(y / 8) % 2 ? '#c0453a' : '#efe7da')
  rect(c, 167, 24, 10, 3, '#5b5f59')
  for (let i = 0; i < 6; i++) {
    const phase = (t * 0.25 + i / 6) % 1
    const sx = 172 + phase * 26 + Math.sin(t + i) * 2
    const sy = 22 - phase * 24
    disc(c, Math.round(sx), Math.round(sy), Math.round(2 + phase * 4), i % 2 ? '#e8ebe6' : '#d3d8d2')
  }

  // Nhà xưởng
  outlineRect(c, 18, 52, 140, 57, '#e1dac6')
  for (let i = 0; i < 12; i++) rect(c, 16 + i, 52 - i, 144 - i * 2, 1, i % 2 ? '#7d8b84' : '#6b7972')
  rect(c, 16, 40, 144, 1, '#1b2a20')
  outlineRect(c, 66, 76, 30, 33, '#3a3f3a')
  for (let y = 79; y < 108; y += 3) rect(c, 68, y, 26, 1, '#50564f')
  for (let i = 0; i < 4; i++) outlineRect(c, 26 + i * 10, 62, 7, 7, '#9cc7d6')
  for (let i = 0; i < 4; i++) outlineRect(c, 106 + i * 12, 62, 7, 7, '#9cc7d6')
  // biển tên (xanh lúa)
  outlineRect(c, 58, 44, 46, 9, '#173f30')
  rect(c, 62, 47, 38, 1, '#e5be65')
  rect(c, 66, 49, 30, 1, '#e5be65')

  // Silo và băng chuyền
  for (const sx of [192, 220]) {
    outlineRect(c, sx, 46, 22, 62, '#b9c2c4')
    disc(c, sx + 11, 46, 11, '#1b2a20')
    disc(c, sx + 11, 47, 10, '#cfd6d8')
    rect(c, sx, 47, 22, 4, '#1b2a20')
    rect(c, sx + 1, 47, 20, 3, '#cfd6d8')
    for (let y = 56; y < 106; y += 8) rect(c, sx + 1, y, 20, 1, '#9aa4a6')
    rect(c, sx + 4, 50, 2, 56, '#e3e9ea')
  }
  for (let i = 0; i < 34; i++) rect(c, 158 + i, 72 - i * 0.6, 2, 2, '#5b5f59')
  for (let i = 0; i < 5; i++) {
    const k = ((t * 0.3 + i / 5) % 1) * 34
    sack(c, Math.round(158 + k) - 2, Math.round(72 - k * 0.6) - 5)
  }

  // Chồng bao gạo
  for (let r = 0; r < 4; r++) for (let i = 0; i < 6 - r; i++) sack(c, 112 + i * 5 + r * 2.5, 128 - r * 5)
}

function drawPort(c: Ctx, t: number) {
  sky(c, SKY_DAY, 70)
  disc(c, 30, 20, 8, '#fff6d6')
  drifting(c, t, 16, 8, 2, 1)
  drifting(c, t, 30, 9, 1.4, 1)
  for (let i = 0; i < 4; i++) {
    const bx = ((hash(i + 20) * W + t * (8 + i * 2)) % (W + 20)) - 10
    bird(c, Math.round(bx), 24 + i * 6 + Math.round(Math.sin(t * 2 + i) * 2), t, '#f6f3ea')
  }

  water(c, 70, 120, '#3f7fa8', '#2f6890', '#9fd0e8', t)
  rect(c, 0, 70, W, 1, '#9fd0e8')

  // Tàu container
  const sy = 92 + Math.round(Math.sin(t * 1.2))
  for (let i = 0; i < 10; i++) rect(c, 96 + i * 1.2, sy + i, 150 - i * 2.4, 1, i < 6 ? '#8a2f2f' : '#2b2f2c')
  rect(c, 95, sy - 1, 152, 1, '#1b2a20')
  rect(c, 98, sy + 3, 146, 1, '#f6f3ea')
  const boxColors = ['#c0453a', '#3f8f9a', '#e5be65', '#64866b', '#d9733b', '#5b7fb0']
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 9 - (row === 3 ? 3 : 0); i++) {
      const col = boxColors[Math.floor(hash(row * 11 + i) * boxColors.length)]
      outlineRect(c, 104 + i * 12, sy - 6 - row * 6, 12, 6, col)
      rect(c, 106 + i * 12, sy - 4 - row * 6, 8, 1, 'rgba(0,0,0,0.18)')
    }
  }
  outlineRect(c, 214, sy - 30, 22, 30, '#efe7da')
  for (let i = 0; i < 3; i++) rect(c, 217 + i * 6, sy - 26, 4, 3, '#2f6890')
  rect(c, 228, sy - 38, 3, 8, '#c0453a')

  // Cần cẩu
  const crane = '#e5a93a'
  rect(c, 30, 30, 3, 90, crane)
  rect(c, 58, 30, 3, 90, crane)
  for (let y = 36; y < 118; y += 8) {
    for (let i = 0; i < 25; i++) px(c, 33 + i, y + Math.floor(i / 4), '#c8892a')
  }
  rect(c, 20, 26, 100, 4, crane)
  rect(c, 20, 30, 100, 1, '#1b2a20')
  const trolley = 70 + Math.round((Math.sin(t * 0.5) * 0.5 + 0.5) * 40)
  rect(c, trolley, 30, 8, 3, '#5b5f59')
  const drop = 34 + Math.round((Math.sin(t * 0.5 + 1) * 0.5 + 0.5) * 22)
  rect(c, trolley + 3, 33, 1, drop - 33, '#1b2a20')
  outlineRect(c, trolley - 2, drop, 12, 6, '#3f8f9a')

  // Bến cảng
  rect(c, 0, 118, W, H - 118, '#8f8a7c')
  rect(c, 0, 118, W, 2, '#5b5f59')
  for (let x = 6; x < W; x += 40) {
    rect(c, x, 113, 5, 5, '#3a3f3a')
    rect(c, x - 1, 112, 7, 2, '#5b5f59')
  }
  for (let x = 0; x < W; x += 2) if (hash(x * 5) > 0.7) px(c, x, 122 + Math.floor(hash(x) * 20), '#7d786b')
}

function drawVillage(c: Ctx, t: number, selected: ReadonlySet<string>) {
  sky(c, SKY_DAY, 78)
  disc(c, 214, 18, 9, '#fff6d6')
  drifting(c, t, 20, 10, 2.5, 1)
  drifting(c, t, 36, 11, 1.6, 1)
  treeLine(c, 78, '#3d6b4a', 12)
  palm(c, 16, 78, 16, t, '#4e331f', '#2a4a30', '#3d6b4a')
  palm(c, 240, 78, 18, t, '#4e331f', '#2a4a30', '#3d6b4a')
  riceField(c, 78, H, GOLDEN, t)

  if (selected.size === 0) {
    hut(c, 60, 92, 16)
    hut(c, 178, 94, 14)
  }

  // Liên kết: trụ sở hợp tác xã + kho lúa chung
  if (selected.has('lien-ket')) {
    outlineRect(c, 30, 70, 46, 28, '#efe3c2')
    for (let i = 0; i < 10; i++) rect(c, 26 + i, 70 - i, 54 - i * 2, 1, i % 2 ? '#b8473a' : '#c95a44')
    outlineRect(c, 46, 82, 12, 16, '#6b4a2b')
    outlineRect(c, 34, 76, 8, 6, '#9cc7d6')
    outlineRect(c, 62, 76, 8, 6, '#9cc7d6')
    outlineRect(c, 38, 72, 30, 4, '#173f30')
    rect(c, 82, 50, 1, 48, '#5b5f59')
    const wave = Math.round(Math.sin(t * 4))
    // cờ hợp tác xã: nền xanh lúa, bông lúa vàng
    for (let i = 0; i < 12; i++) rect(c, 83 + i, 51 + (i > 6 ? wave : 0), 1, 7, '#2f6b4a')
    rect(c, 87, 53, 1, 3, '#e5be65')
    px(c, 88, 53, '#e5be65')
    px(c, 86, 54, '#e5be65')
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) sack(c, 86 + i * 5, 93 - r * 5)
  }

  // Khoa học – công nghệ: máy gặt đập liên hợp chạy trên ruộng, máy bay không người lái
  if (selected.has('khoa-hoc-cong-nghe')) {
    const hx = ((t * 10) % (W + 60)) - 50
    rect(c, 0, 124, Math.max(0, hx), 8, '#d8be7a')
    outlineRect(c, hx, 112, 34, 14, '#c0453a')
    outlineRect(c, hx + 20, 104, 12, 9, '#9cc7d6')
    rect(c, hx + 34, 120, 8, 4, '#5b5f59')
    for (let i = 0; i < 4; i++) px(c, hx + 35 + i * 2, 120 + ((Math.floor(t * 8) + i) % 2), '#e5be65')
    disc(c, hx + 8, 128, 4, '#1b2a20')
    disc(c, hx + 26, 128, 4, '#1b2a20')
    disc(c, hx + 8, 128, 2, '#8a8f86')
    disc(c, hx + 26, 128, 2, '#8a8f86')
    const dx = 150 + Math.round(Math.sin(t * 0.8) * 30)
    const dy = 44 + Math.round(Math.sin(t * 2) * 2)
    rect(c, dx, dy, 10, 3, '#3a3f3a')
    rect(c, dx - 3, dy - 1, 4, 1, '#5b5f59')
    rect(c, dx + 9, dy - 1, 4, 1, '#5b5f59')
    if (Math.sin(t * 6) > 0) px(c, dx + 5, dy + 3, '#c0453a')
  }

  // Nhân lực & bền vững: lớp tập huấn, pin mặt trời, cây xanh
  if (selected.has('nhan-luc-ben-vung')) {
    outlineRect(c, 160, 70, 50, 26, '#f6f3ea')
    for (let i = 0; i < 8; i++) rect(c, 156 + i, 70 - i, 58 - i * 2, 1, i % 2 ? '#2f6890' : '#3f7fa8')
    outlineRect(c, 170, 76, 30, 12, '#173f30')
    rect(c, 174, 80, 14, 1, '#f6f3ea')
    rect(c, 174, 83, 20, 1, '#f6f3ea')
    outlineRect(c, 181, 88, 8, 8, '#6b4a2b')
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 6; k++) rect(c, 216 + i * 12 + k * 0.5, 92 - k, 10, 1, k % 2 ? '#2b4f7d' : '#3b6aa0')
      rect(c, 220 + i * 12, 92, 1, 4, '#5b5f59')
    }
    for (const sx of [140, 150, 230]) {
      rect(c, sx, 94, 1, 6, '#4e331f')
      disc(c, sx, 92, 3, '#4f7f4a')
      px(c, sx - 1, 91, '#8fbd5b')
    }
  }
}

function drawSunsetBase(c: Ctx, t: number, field: typeof DUSK_FIELD) {
  sky(c, SKY_SUNSET, 82)
  twinkles(c, 26, 2, 30, t, '#fff1c4', 3)
  disc(c, 128, 82, 22, '#f9d27a')
  disc(c, 128, 82, 18, '#fbe2a0')
  for (let i = 0; i < 4; i++) rect(c, 100, 70 + i * 3, 56, 1, '#ec8a5f')
  treeLine(c, 82, '#3b2b3a', 5, 3)
  palm(c, 30, 82, 24, t, '#2a1d22', '#2a1d22', '#3b2b3a')
  palm(c, 52, 82, 16, t, '#2a1d22', '#2a1d22', '#3b2b3a')
  palm(c, 206, 82, 26, t, '#2a1d22', '#2a1d22', '#3b2b3a')
  riceField(c, 82, H, field, t)
}

export function getBackground(id: BgId, extra?: { selected?: ReadonlySet<string> }): DrawFn {
  switch (id) {
    case 'title':
      return (c, t) => {
        drawSunsetBase(c, t, DUSK_FIELD)
        twinkles(c, 16, 90, 140, t, '#f6e3a0', 9)
      }
    case 'dawn-field':
      return (c, t) => drawField(c, t, 'dawn')
    case 'field':
      return (c, t) => drawField(c, t, 'day')
    case 'crossroads':
      return (c, t) => drawField(c, t, 'fork')
    case 'river':
      return drawRiver
    case 'factory':
      return drawFactory
    case 'port':
      return drawPort
    case 'village':
      return (c, t) => drawVillage(c, t, extra?.selected ?? new Set())
    case 'ending':
      return (c, t) => {
        drawSunsetBase(c, t, GOLDEN)
        twinkles(c, 40, 86, 140, t, '#fff6c0', 5)
      }
  }
}
