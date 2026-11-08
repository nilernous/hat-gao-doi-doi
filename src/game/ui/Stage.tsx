import type { ReactNode } from 'react'
import PixelCanvas from '../engine/PixelCanvas.tsx'
import Sprite, { spriteSize } from '../engine/Sprite.tsx'
import { H, W } from '../art/draw.ts'
import type { DrawFn } from '../art/backgrounds.ts'
import { characters, spriteFor, type SpeakerId } from '../story/characters.ts'
import type { CastSlot } from '../story/script.ts'

/** Nhân vật được phóng 2 lần so với pixel nền để nổi bật như visual novel. */
const SPRITE_SCALE = 2
const GROUND = 5

interface Props {
  draw: DrawFn
  label: string
  cast: CastSlot[]
  speaker?: SpeakerId
  children?: ReactNode
}

export default function Stage({ draw, label, cast, speaker, children }: Props) {
  return (
    <div className="pixel-frame relative aspect-video w-full overflow-hidden bg-night">
      <PixelCanvas draw={draw} label={label} />
      {cast.map((slot) => {
        const sprite = spriteFor(slot.who, slot.polished)
        const { h } = spriteSize(sprite)
        const talking = speaker === slot.who
        const dimmed = speaker !== undefined && speaker !== 'narrator' && !talking
        return (
          <div
            key={slot.who}
            className="absolute transition-[filter] duration-200"
            style={{
              left: `${(slot.x / W) * 100}%`,
              bottom: `${(GROUND / H) * 100}%`,
              height: `${((h * SPRITE_SCALE) / H) * 100}%`,
              filter: dimmed ? 'brightness(0.8)' : undefined,
            }}
          >
            <Sprite
              sprite={sprite}
              flip={slot.flip}
              label={characters[slot.who].name}
              className={`h-full w-auto ${talking ? 'animate-bob' : ''}`}
            />
          </div>
        )
      })}
      {children}
    </div>
  )
}
