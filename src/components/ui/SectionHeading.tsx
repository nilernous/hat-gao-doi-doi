import Reveal from './Reveal.tsx'

interface Props {
  eyebrow: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
}

export default function SectionHeading({ eyebrow, title, description, tone = 'light' }: Props) {
  const dark = tone === 'dark'
  return (
    <Reveal className="max-w-3xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-grain' : 'text-leaf'}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-serif text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl ${dark ? 'text-cream' : 'text-paddy'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-cream/80' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
