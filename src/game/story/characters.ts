import {
  coopSprite,
  exporterSprite,
  farmerSprite,
  grainSprite,
  polishedGrainSprite,
  traderSprite,
  workerSprite,
  type SpriteDef,
} from '../art/sprites.ts'

/** Nhân vật hư cấu, đại diện cho từng chủ thể trong chuỗi giá trị. */
export type CharId = 'gao' | 'tu' | 'nam' | 'hai' | 'bay' | 'mai'
export type SpeakerId = CharId | 'narrator'

export interface Character {
  name: string
  role: string
  sprite: SpriteDef
  /** Màu thẻ tên trong hộp thoại */
  tag: string
}

export const characters: Record<CharId, Character> = {
  gao: { name: 'Hạt Gạo', role: 'Nhân vật chính', sprite: grainSprite, tag: '#e5be65' },
  tu: { name: 'Chú Tư', role: 'Nông dân', sprite: farmerSprite, tag: '#c9a06a' },
  nam: { name: 'Cô Năm', role: 'Thương lái', sprite: traderSprite, tag: '#e58a55' },
  hai: { name: 'Chị Hai', role: 'Chủ nhiệm hợp tác xã', sprite: coopSprite, tag: '#8fbd5b' },
  bay: { name: 'Anh Bảy', role: 'Công nhân nhà máy xay xát', sprite: workerSprite, tag: '#7fb0de' },
  mai: { name: 'Chị Mai', role: 'Nhân viên xuất khẩu', sprite: exporterSprite, tag: '#d8d2c0' },
}

export function spriteFor(id: CharId, polished?: boolean) {
  return id === 'gao' && polished ? polishedGrainSprite : characters[id].sprite
}
