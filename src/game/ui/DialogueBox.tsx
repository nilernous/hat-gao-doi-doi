import { useEffect } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { useTypewriter } from '../engine/useTypewriter.ts'
import Sprite from '../engine/Sprite.tsx'
import { characters, spriteFor, type SpeakerId } from '../story/characters.ts'
import type { Line, MenuOption } from '../story/script.ts'

/** Bỏ qua phím khi đang ở ô nhập hoặc nút/link (nút tự xử lý Space/Enter, tránh bấm hai lần). */
function isTypingTarget(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null
  return !!el && (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(el.tagName) || el.isContentEditable)
}

function SpeakerTag({ speaker, polished }: { speaker: SpeakerId; polished?: boolean }) {
  if (speaker === 'narrator') {
    return <span className="pixel-frame-sm bg-[#2c2a3f] px-3 py-0.5 text-lg text-[#d9d3f0] italic sm:text-xl">Người kể chuyện</span>
  }
  const c = characters[speaker]
  return (
    <span className="pixel-frame-sm inline-flex items-center gap-2 bg-outline px-2 py-0.5 text-lg sm:text-xl" style={{ color: c.tag }}>
      {/* Chân dung: người thì lấy nửa trên (phần đầu), hạt gạo thì lấy cả hình */}
      <span className="relative block h-7 w-7 shrink-0 overflow-hidden">
        <Sprite
          sprite={spriteFor(speaker, polished)}
          className={`absolute top-0 left-1/2 w-auto max-w-none -translate-x-1/2 ${speaker === 'gao' ? 'h-full' : 'h-[200%]'}`}
        />
      </span>
      {c.name}
      <span className="hidden text-base text-cream/50 sm:inline">· {c.role}</span>
    </span>
  )
}

function Frame({ children, onClick, label }: { children: React.ReactNode; onClick?: () => void; label?: string }) {
  return (
    <div
      className={`pixel-frame relative w-full bg-[#183026] px-4 pt-6 pb-4 font-pixel text-cream sm:px-6 sm:pt-7 ${onClick ? 'cursor-pointer select-none' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </div>
  )
}

/** Hộp thoại: bấm / chạm / Space / Enter để gõ nhanh hoặc sang câu kế. */
export function DialogueBox({ line, onNext, polished }: { line: Line; onNext: () => void; polished?: boolean }) {
  const { shown, done, finish } = useTypewriter(line.t)

  const advance = () => (done ? onNext() : finish())

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e) || e.repeat) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (done) onNext()
        else finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <Frame onClick={advance}>
      <div className="absolute -top-4 left-4">
        <SpeakerTag speaker={line.s} polished={polished} />
      </div>
      <p className="min-h-[4.5em] text-2xl leading-snug sm:text-[1.7rem]" aria-live="polite">
        {shown}
        <span className="sr-only">{done ? '' : line.t.slice(shown.length)}</span>
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          advance()
        }}
        className="absolute right-3 bottom-2 inline-flex min-h-11 items-center gap-1 px-2 text-lg text-grain sm:text-xl"
        aria-label={done ? 'Câu tiếp theo' : 'Hiện hết câu thoại'}
      >
        {done ? (
          <>
            <span className="hidden sm:inline">Tiếp</span>
            <ChevronRight className="animate-blink size-6" aria-hidden />
          </>
        ) : (
          <span className="text-cream/50">Bỏ qua</span>
        )}
      </button>
    </Frame>
  )
}

/** Menu lựa chọn: câu hỏi của nhân vật + danh sách câu hỏi. Phím 1–9 để chọn nhanh. */
export function ChoiceMenu({
  prompt,
  options,
  visited,
  onPick,
  polished,
}: {
  prompt: Line
  options: MenuOption[]
  visited: ReadonlySet<string>
  onPick: (opt: MenuOption) => void
  polished?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e)) return
      const n = Number(e.key)
      if (n >= 1 && n <= options.length) onPick(options[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const asks = options.filter((o) => !o.leave)
  const leave = options.find((o) => o.leave)
  const asked = asks.filter((o) => visited.has(o.goto)).length

  return (
    <Frame label="Chọn câu hỏi">
      <div className="absolute -top-4 left-4">
        <SpeakerTag speaker={prompt.s} polished={polished} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-2xl leading-snug sm:text-[1.7rem]">{prompt.t}</p>
          <p className="text-lg text-cream/60">
            Đã hỏi {asked}/{asks.length} · hỏi bao nhiêu tuỳ bạn
          </p>
        </div>
        {leave && (
          <button
            type="button"
            onClick={() => onPick(leave)}
            className="pixel-frame-sm pixel-press inline-flex min-h-11 items-center gap-2 bg-grain px-4 py-1.5 text-xl text-outline transition-colors hover:bg-[#f0cf7f] sm:text-2xl"
          >
            <span className="text-lg text-outline/60">{options.indexOf(leave) + 1}</span>
            {leave.label}
            <ChevronRight className="size-6" aria-hidden />
          </button>
        )}
      </div>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {asks.map((opt) => {
          const seen = visited.has(opt.goto)
          return (
            <li key={opt.goto}>
              <button
                type="button"
                onClick={() => onPick(opt)}
                className="pixel-frame-sm pixel-press flex min-h-11 w-full items-center gap-3 bg-[#22402f] px-3 py-1 text-left text-xl leading-tight text-cream transition-colors hover:bg-[#2c5240] sm:text-2xl"
              >
                <span className="shrink-0 text-lg text-grain">{options.indexOf(opt) + 1}</span>
                <span className="flex-1">{opt.label}</span>
                {seen && <Check className="size-5 shrink-0 text-[#8fbd5b]" aria-label="đã hỏi" />}
              </button>
            </li>
          )
        })}
      </ul>
    </Frame>
  )
}
