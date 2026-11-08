import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { H, W } from '../art/draw.ts'
import type { DrawFn } from '../art/backgrounds.ts'

const FPS = 12

/** Canvas nền 256 × 144, vẽ lại ~12 khung hình/giây cho cảm giác pixel game. */
export default function PixelCanvas({ draw, label }: { draw: DrawFn; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.imageSmoothingEnabled = false

    if (reduce) {
      ctx.clearRect(0, 0, W, H)
      draw(ctx, 0)
      return
    }

    let raf = 0
    let last = -Infinity
    const start = performance.now()
    const loop = (now: number) => {
      if (now - last >= 1000 / FPS) {
        last = now
        ctx.clearRect(0, 0, W, H)
        draw(ctx, (now - start) / 1000)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [draw, reduce])

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      role="img"
      aria-label={label}
      className="pixelated absolute inset-0 size-full"
    />
  )
}
