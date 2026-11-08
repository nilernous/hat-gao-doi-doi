import { useEffect } from 'react'
import { BookOpen, List, X } from 'lucide-react'
import { modeLinks } from '../../data/site.ts'
import { chapters, type ChapterId } from '../story/script.ts'

interface HudProps {
  chapter?: ChapterId
  onOpenChapters: () => void
}

/** Thanh trên cùng: tên game, chương hiện tại, tiến độ, menu chương. */
export function Hud({ chapter, onOpenChapters }: HudProps) {
  const index = chapter ? chapters.findIndex((c) => c.id === chapter) : -1
  const current = index >= 0 ? chapters[index] : undefined

  return (
    <header className="flex w-full items-center justify-between gap-3 font-pixel text-cream">
      <div className="min-w-0">
        <p className="font-pixel-title text-sm tracking-wider text-grain sm:text-base">HẠT GẠO ĐỔI ĐỜI</p>
        {current && (
          <p className="truncate text-lg leading-tight sm:text-xl">
            <span className="text-cream/60">{current.label} · </span>
            {current.title}
          </p>
        )}
      </div>

      {current && (
        <ol className="hidden items-center gap-1.5 md:flex" aria-label="Tiến độ hành trình">
          {chapters.map((c, i) => (
            <li
              key={c.id}
              title={`${c.label}: ${c.title}`}
              className={`h-3 w-3 ${i < index ? 'bg-[#8fbd5b]' : i === index ? 'animate-blink bg-grain' : 'bg-cream/20'}`}
              aria-current={i === index ? 'step' : undefined}
            >
              <span className="sr-only">
                {c.label}: {c.title}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenChapters}
          className="pixel-frame-sm pixel-press inline-flex min-h-10 items-center gap-1.5 bg-night-700 px-3 text-lg hover:bg-[#21402f] sm:text-xl"
        >
          <List className="size-5" aria-hidden />
          Chương
        </button>
        <a
          href={modeLinks.classic}
          className="pixel-frame-sm pixel-press inline-flex min-h-10 items-center gap-1.5 bg-night-700 px-3 text-lg hover:bg-[#21402f] sm:text-xl"
          title="Mở bản bài viết (website)"
        >
          <BookOpen className="size-5" aria-hidden />
          <span className="hidden sm:inline">Bản bài viết</span>
        </a>
      </div>
    </header>
  )
}

interface MenuProps {
  open: boolean
  current?: ChapterId
  onClose: () => void
  onJump: (id: ChapterId) => void
}

/** Chọn chương: tiện cho người thuyết trình nhảy thẳng tới phần cần nói. */
export function ChapterMenu({ open, current, onClose, onJump }: MenuProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Chọn chương"
      onClick={onClose}
    >
      <div
        className="pixel-frame max-h-[90svh] w-full max-w-lg overflow-y-auto bg-[#183026] p-5 font-pixel text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-pixel-title text-xl text-grain">CHỌN CHƯƠNG</h2>
          <button type="button" onClick={onClose} className="flex size-11 items-center justify-center hover:text-grain" aria-label="Đóng">
            <X className="size-6" />
          </button>
        </div>
        <ul className="mt-3 grid gap-2.5">
          {chapters.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                autoFocus={c.id === current}
                onClick={() => onJump(c.id)}
                className={`pixel-frame-sm pixel-press flex min-h-11 w-full items-baseline gap-3 px-3 py-1.5 text-left text-xl sm:text-2xl ${
                  c.id === current ? 'bg-grain text-outline' : 'bg-[#22402f] hover:bg-[#2c5240]'
                }`}
              >
                <span className={`w-24 shrink-0 text-lg ${c.id === current ? 'text-outline/70' : 'text-grain'}`}>{c.label}</span>
                <span>{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
