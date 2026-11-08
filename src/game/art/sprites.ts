/**
 * Sprite nhân vật dạng lưới ký tự. Mỗi ký tự là một pixel, tra màu trong palette.
 * '.' là pixel trong suốt.
 */
export type Palette = Record<string, string>
export interface SpriteDef {
  grid: string[]
  palette: Palette
}

const BASE: Palette = {
  k: '#1b2a20', // viền
  e: '#202820', // mắt
  w: '#ffffff',
  s: '#e8b48a', // da
  p: '#e98f86', // má hồng
  n: '#9c5a3c', // miệng
  x: '#2a2320', // tóc
  N: '#3e3a36', // quần
  h: '#ead49b', // nón lá
  H: '#bf9e58',
  y: '#f0c03a', // mũ bảo hộ
  g: '#64866b',
  G: '#173f30',
  l: '#8fbd5b',
  r: '#f3e6c4', // hạt lúa
  R: '#d6bf86',
}

// ---------- Hạt Gạo (nhân vật chính) ----------
const GRAIN = [
  '........kk....',
  '.......klgk...',
  '.......k......',
  '.....kkkk.....',
  '....krrrrk....',
  '...krrrrrrk...',
  '..krrwwrrrrk..',
  '..krwrrrrrrk..',
  '.krrrrrrrrrrk.',
  '.krrerrrrerrk.',
  '.krrerrrrerrk.',
  '.krprrrrrrprk.',
  '.krrrkrrkrrrk.',
  '.krrrrkkrrrrk.',
  '..krrrrrrrRk..',
  '..kRrrrrrrRk..',
  '...kRRrrRRk...',
  '....kRRRRk....',
  '.....kkkk.....',
  '....kk..kk....',
]

export const grainSprite: SpriteDef = { grid: GRAIN, palette: BASE }
/** Sau khi xay xát: hạt gạo trắng hơn. */
export const polishedGrainSprite: SpriteDef = {
  grid: GRAIN,
  palette: { ...BASE, r: '#fbf8ef', R: '#ddd6c4' },
}

// ---------- Người: ghép đầu + thân ----------
const FACE = [
  '....kssssssk....',
  '....ksessesk....',
  '....kpsssspk....',
  '....kssnnssk....',
  '.....kssssk.....',
]

const HEADS: Record<string, string[]> = {
  nonla: [
    '.......kk.......',
    '......khhk......',
    '.....khhhhk.....',
    '....khhHhhhk....',
    '...khhhhhhhhk...',
    '..khhhhhhhhhhk..',
    '.kHHHHHHHHHHHHk.',
    '..kkkkkkkkkkkk..',
    ...FACE,
  ],
  short: [
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '....kxxxxxxk....',
    '...kxxxxxxxxk...',
    '...kxxxxxxxxk...',
    '...kxssssssxk...',
    ...FACE,
  ],
  bun: [
    '......kkkk......',
    '.....kxxxxk.....',
    '.....kxxxxk.....',
    '....kxxxxxxk....',
    '...kxxxxxxxxk...',
    '...kxxxxxxxxk...',
    '...kxxxxxxxxk...',
    '...kxssssssxk...',
    '...kxssssssxk...',
    '...kxsessesxk...',
    '...kxpsssspxk...',
    '...kkssnnsskk...',
    '.....kssssk.....',
  ],
  helmet: [
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '....kyyyyyyk....',
    '...kyyywyyyyk...',
    '..kyyyyyyyyyyk..',
    '..kkkkkkkkkkkk..',
    ...FACE,
  ],
  cap: [
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '....kggggggk....',
    '...kggggggggk...',
    '...kGGGGGGGGkkk.',
    '...kxssssssxk...',
    ...FACE,
  ],
}

const BODY = [
  '....kbbbbbbk....',
  '...kbbbbbbbbk...',
  '..kbbbbbbbbbbk..',
  '..kbkbbbbbbkbk..',
  '..kbkbbbbbbkbk..',
  '..kskbbbbbbksk..',
  '..kkkNNNNNNkkk..',
  '....kNNNNNNk....',
  '....kNNkkNNk....',
  '....ksk..ksk....',
  '....kkk..kkk....',
]

function person(head: keyof typeof HEADS, colors: Partial<Palette>): SpriteDef {
  return { grid: [...HEADS[head], ...BODY], palette: { ...BASE, b: '#4f7fa8', ...colors } }
}

export const farmerSprite = person('nonla', { b: '#7a5a3a', N: '#2e3a34' }) // Chú Tư: áo bà ba nâu
export const traderSprite = person('bun', { b: '#d9733b', N: '#3e3a36' }) // Cô Năm: thương lái
export const coopSprite = person('cap', { b: '#64866b', N: '#2e3a34' }) // Chị Hai: chủ nhiệm HTX
export const workerSprite = person('helmet', { b: '#3f6f9a', N: '#2b3f55' }) // Anh Bảy: công nhân
export const exporterSprite = person('short', { b: '#f2efe6', N: '#2b3f55', x: '#3a2a22' }) // Chị Mai: xuất khẩu
