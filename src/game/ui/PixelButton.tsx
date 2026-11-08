import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'choice'

const styles: Record<Variant, string> = {
  primary: 'bg-grain text-outline hover:bg-[#f0cf7f]',
  secondary: 'bg-night-700 text-cream hover:bg-[#21402f]',
  choice: 'bg-[#22402f] text-cream hover:bg-[#2c5240] text-left',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export default function PixelButton({ variant = 'secondary', className = '', children, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={`pixel-frame-sm pixel-press inline-flex min-h-11 items-center justify-center gap-2 px-4 py-1.5 font-pixel text-xl leading-tight transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:text-2xl ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function PixelLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`pixel-frame-sm pixel-press inline-flex min-h-11 items-center justify-center gap-2 bg-night-700 px-4 py-1.5 font-pixel text-xl text-cream transition-colors hover:bg-[#21402f] sm:text-2xl ${className}`}
    >
      {children}
    </a>
  )
}
