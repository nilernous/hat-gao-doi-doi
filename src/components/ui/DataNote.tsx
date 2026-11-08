import { FlaskConical, BookOpen } from 'lucide-react'

interface Props {
  kind: 'report' | 'assumption'
  children: React.ReactNode
  className?: string
}

/** Nhãn bắt buộc cho mọi số liệu mô phỏng (docs/overview.md mục 2.2). */
export default function DataNote({ kind, children, className = '' }: Props) {
  const Icon = kind === 'report' ? BookOpen : FlaskConical
  const styles =
    kind === 'report'
      ? 'border-leaf/40 bg-leaf/10 text-paddy'
      : 'border-grain/70 bg-grain-soft/70 text-ink'
  return (
    <p
      className={`inline-flex items-start gap-2 rounded-lg border px-3 py-2 text-xs leading-snug sm:text-sm ${styles} ${className}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  )
}
