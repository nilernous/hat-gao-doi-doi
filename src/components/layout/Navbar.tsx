import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Gamepad2, Menu, Wheat, X } from 'lucide-react'
import { modeLinks, navItems, site } from '../../data/site.ts'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Đánh dấu mục đang xem dựa trên section nằm giữa màn hình.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const ids = ['top', ...navItems.map((n) => n.id)]
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-paddy/95 shadow-lg shadow-paddy/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Điều hướng chính">
        <a href="#top" className="flex items-center gap-2 text-cream" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-full bg-grain text-paddy">
            <Wheat className="size-5" aria-hidden />
          </span>
          <span className="font-serif text-lg font-semibold tracking-wide">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === item.id ? 'bg-grain text-paddy' : 'text-cream/85 hover:bg-cream/10 hover:text-cream'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={modeLinks.game}
              className="inline-flex items-center gap-2 rounded-full border border-grain/60 px-4 py-2 text-sm font-medium text-grain transition-colors hover:bg-grain hover:text-paddy"
            >
              <Gamepad2 className="size-4" aria-hidden />
              Chơi bản game
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full text-cream hover:bg-cream/10 md:hidden"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cream/10 px-4 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center border-b border-cream/10 text-base font-medium ${
                    active === item.id ? 'text-grain' : 'text-cream'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={modeLinks.game} className="flex min-h-12 items-center gap-2 text-base font-medium text-grain">
                <Gamepad2 className="size-5" aria-hidden />
                Chơi bản game
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
