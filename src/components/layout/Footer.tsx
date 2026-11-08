import { Wheat } from 'lucide-react'
import { imageCredits, site } from '../../data/site.ts'

export default function Footer() {
  const info = [
    { label: 'Môn học', value: site.course },
    { label: 'Nhóm', value: site.team },
    { label: 'Thành viên', value: site.members.join(', ') },
    { label: 'Giảng viên hướng dẫn', value: site.instructor },
  ].filter((row) => row.value)

  return (
    <footer className="bg-ink text-cream/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-cream">
            <Wheat className="size-5 text-grain" aria-hidden />
            <span className="font-serif text-xl font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed">
            <span className="text-cream/50">Đề tài: </span>
            {site.topic}
          </p>
          {info.length > 0 && (
            <dl className="mt-4 space-y-1 text-sm">
              {info.map((row) => (
                <div key={row.label}>
                  <dt className="inline text-cream/50">{row.label}: </dt>
                  <dd className="inline">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-cream/55">
          <p>
            Các số liệu trong mô phỏng là số liệu minh họa/giả định phục vụ thảo luận học thuật, không phải dự báo
            hay kết luận thống kê về toàn ngành.
          </p>
          <div>
            <p className="font-medium text-cream/70">Nguồn ảnh (Wikimedia Commons)</p>
            <ul className="mt-1 space-y-1">
              {imageCredits.map((c) => (
                <li key={c.url}>
                  <a href={c.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-grain hover:underline">
                    {c.label}
                  </a>{' '}
                  · {c.author} · {c.license}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
