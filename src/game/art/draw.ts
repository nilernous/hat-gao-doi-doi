/**
 * Bộ hàm vẽ pixel art trên canvas độ phân giải thấp (256 × 144).
 * Canvas sau đó được phóng to bằng CSS `image-rendering: pixelated`.
 */
export const W = 256
export const H = 144

export type Ctx = CanvasRenderingContext2D

export function rect(c: Ctx, x: number, y: number, w: number, h: number, col: string) {
  c.fillStyle = col
  c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h))
}

export function px(c: Ctx, x: number, y: number, col: string) {
  rect(c, x, y, 1, 1, col)
}

/** Hình tròn đặc vẽ theo từng hàng pixel. */
export function disc(c: Ctx, cx: number, cy: number, r: number, col: string) {
  for (let dy = -r; dy <= r; dy++) {
    const dx = Math.floor(Math.sqrt(r * r - dy * dy))
    rect(c, cx - dx, cy + dy, dx * 2 + 1, 1, col)
  }
}

/** Số giả ngẫu nhiên ổn định theo vị trí (để cảnh không nhấp nháy giữa các khung hình). */
export function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** Bầu trời theo dải màu, có dither ô cờ ở chỗ chuyển màu. */
export function sky(c: Ctx, colors: string[], height: number) {
  const band = height / colors.length
  colors.forEach((col, i) => rect(c, 0, i * band, W, band + 1, col))
  for (let i = 1; i < colors.length; i++) {
    const y0 = Math.round(i * band)
    for (let x = 0; x < W; x++) {
      if (x % 2 === 0) px(c, x, y0 - 1, colors[i])
      if (x % 2 === 1) px(c, x, y0, colors[i - 1])
      if (x % 4 === 0) px(c, x, y0 - 2, colors[i])
    }
  }
}

export function cloud(c: Ctx, x: number, y: number, s: number, col: string, shade: string) {
  disc(c, x, y, 3 * s, col)
  disc(c, x + 4 * s, y - 2 * s, 4 * s, col)
  disc(c, x + 9 * s, y, 3 * s, col)
  rect(c, x - 3 * s, y + 1 * s, 15 * s, 2 * s + 1, col)
  rect(c, x - 2 * s, y + 3 * s, 13 * s, 1, shade)
}

/** Cây dừa: thân cong nhẹ, tàu lá đung đưa theo thời gian t. */
export function palm(c: Ctx, x: number, baseY: number, h: number, t: number, trunk = '#6b4a2b', leaf = '#2f5b3a', leafLight = '#4f7f4a') {
  const lean = 3
  for (let i = 0; i < h; i++) {
    const tx = x + Math.round((i / h) * (i / h) * lean)
    rect(c, tx, baseY - i, 2, 1, i % 3 === 0 ? '#4e331f' : trunk)
  }
  const topX = x + lean
  const topY = baseY - h
  const sway = Math.round(Math.sin(t * 1.5 + x) * 1)
  const fronds: [number, number][] = [[-9, 3], [-7, -2], [-3, -5], [3, -5], [7, -2], [9, 3], [0, -6]]
  for (const [dx, dy] of fronds) {
    const steps = 10
    for (let s = 0; s <= steps; s++) {
      const k = s / steps
      const fx = topX + Math.round(dx * k) + (s > 5 ? sway : 0)
      const fy = topY + Math.round(dy * k + (dx !== 0 ? k * k * 4 : 0))
      px(c, fx, fy, s % 2 ? leaf : leafLight)
      px(c, fx, fy + 1, leaf)
    }
  }
  disc(c, topX + 1, topY + 1, 1, '#4e331f')
}

/** Ruộng lúa: các hàng bông lúa với phối cảnh, đung đưa nhẹ. */
export function riceField(
  c: Ctx,
  y0: number,
  y1: number,
  colors: { base: string; dark: string; light: string; tip?: string },
  t: number,
) {
  rect(c, 0, y0, W, y1 - y0, colors.base)
  let row = 0
  for (let y = y0 + 1; y < y1; y += 2 + Math.floor(((y - y0) / (y1 - y0)) * 3)) {
    const depth = (y - y0) / (y1 - y0)
    const gap = 6 - Math.floor(depth * 3)
    const height = 1 + Math.floor(depth * 3)
    for (let x = (row % 2) * 3; x < W; x += gap) {
      const sway = Math.round(Math.sin(t * 2 + x * 0.12 + y * 0.4) * depth * 1.4)
      for (let k = 0; k < height; k++) px(c, x + (k === height - 1 ? sway : 0), y - k, colors.dark)
      px(c, x + sway, y - height, colors.light)
      if (colors.tip && depth > 0.4 && (x + row) % 3 === 0) px(c, x + sway + 1, y - height, colors.tip)
    }
    row++
  }
}

/** Mặt nước có vệt sáng lấp lánh trôi theo thời gian. */
export function water(c: Ctx, y0: number, y1: number, base: string, dark: string, light: string, t: number) {
  rect(c, 0, y0, W, y1 - y0, base)
  for (let y = y0 + 2; y < y1; y += 3) {
    const depth = (y - y0) / (y1 - y0)
    for (let i = 0; i < 14; i++) {
      const len = 3 + Math.floor(hash(i + y) * 6 * (0.5 + depth))
      const x = (hash(i * 7 + y) * W + t * (6 + depth * 10)) % (W + 20) - 10
      rect(c, x, y, len, 1, i % 3 === 0 ? light : dark)
    }
  }
}

/** Nhà sàn mái lá nhỏ (cảnh xa). */
export function hut(c: Ctx, x: number, baseY: number, w: number, wall = '#b98a52', roof = '#8a6a3a', roofLight = '#a88650') {
  const h = Math.round(w * 0.45)
  rect(c, x + 1, baseY - h, w - 2, h, wall)
  rect(c, x + Math.round(w / 2) - 1, baseY - h + 2, 2, h - 2, '#4e331f')
  for (let i = 0; i <= Math.ceil(w / 2) + 1; i++) {
    rect(c, x - 1 + i, baseY - h - i * 0.6, w + 2 - i * 2, 1, i % 2 ? roof : roofLight)
  }
  rect(c, x, baseY, 1, 2, '#4e331f')
  rect(c, x + w - 1, baseY, 1, 2, '#4e331f')
}

/** Đường viền tối cho hình chữ nhật (khung nhà, container…). */
export function outlineRect(c: Ctx, x: number, y: number, w: number, h: number, fill: string, line = '#1b2a20') {
  rect(c, x, y, w, h, line)
  rect(c, x + 1, y + 1, w - 2, h - 2, fill)
}

/** Bao gạo nhỏ 5 × 5. */
export function sack(c: Ctx, x: number, y: number) {
  rect(c, x + 1, y, 3, 1, '#1b2a20')
  rect(c, x, y + 1, 5, 4, '#1b2a20')
  rect(c, x + 1, y + 1, 3, 3, '#efe3c2')
  px(c, x + 2, y + 2, '#c9a85c')
}

/** Đom đóm / ngôi sao lấp lánh. */
export function twinkles(c: Ctx, n: number, y0: number, y1: number, t: number, col: string, seed = 1) {
  for (let i = 0; i < n; i++) {
    const on = Math.sin(t * 3 + i * 1.7) > 0.2
    if (!on) continue
    const x = Math.floor(hash(i * 13 + seed) * W)
    const y = Math.floor(y0 + hash(i * 29 + seed) * (y1 - y0) + Math.sin(t + i) * 2)
    px(c, x, y, col)
  }
}

/** Chim bay hình chữ V. */
export function bird(c: Ctx, x: number, y: number, t: number, col = '#1b2a20') {
  const flap = Math.sin(t * 8 + x) > 0
  px(c, x, y, col)
  px(c, x - 1, y - (flap ? 1 : 0), col)
  px(c, x + 1, y - (flap ? 1 : 0), col)
  px(c, x - 2, y - (flap ? 1 : -0), col)
  px(c, x + 2, y - (flap ? 1 : 0), col)
}
