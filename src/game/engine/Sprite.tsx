import { useEffect, useRef } from 'react'
import type { SpriteDef } from '../art/sprites.ts'

interface Props {
  sprite: SpriteDef
  className?: string
  style?: React.CSSProperties
  flip?: boolean
  label?: string
}

export function spriteSize(sprite: SpriteDef) {
  return { w: Math.max(...sprite.grid.map((r) => r.length)), h: sprite.grid.length }
}

/** Vẽ sprite dạng lưới lên canvas đúng kích thước pixel gốc; CSS phóng to. */
export default function Sprite({ sprite, className = '', style, flip, label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { w, h } = spriteSize(sprite)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    sprite.grid.forEach((row, y) => {
      ;[...row].forEach((ch, x) => {
        const col = sprite.palette[ch]
        if (ch === '.' || !col) return
        ctx.fillStyle = col
        ctx.fillRect(x, y, 1, 1)
      })
    })
  }, [sprite, w, h])

  return (
    <canvas
      ref={ref}
      width={w}
      height={h}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`pixelated ${className}`}
      style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }}
    />
  )
}
