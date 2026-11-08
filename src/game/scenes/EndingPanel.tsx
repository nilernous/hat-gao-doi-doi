import { BookOpen, List, RotateCcw } from 'lucide-react'
import { modeLinks, site } from '../../data/site.ts'
import PixelButton, { PixelLink } from '../ui/PixelButton.tsx'

export default function EndingPanel({ onRestart, onChapters }: { onRestart: () => void; onChapters: () => void }) {
  const info = [
    { label: 'Môn học', value: site.course },
    { label: 'Nhóm', value: site.team },
    { label: 'Thành viên', value: site.members.join(', ') },
    { label: 'Giảng viên hướng dẫn', value: site.instructor },
  ].filter((r) => r.value)

  return (
    <div className="pixel-frame w-full bg-[#183026] px-4 py-5 font-pixel text-cream sm:px-6">
      <p className="font-pixel-title text-2xl text-grain">— HẾT —</p>
      <p className="mt-2 text-xl leading-snug text-cream/85 sm:text-2xl">
        <span className="text-cream/55">Đề tài: </span>
        {site.topic}
      </p>
      {info.length > 0 && (
        <dl className="mt-2 text-lg text-cream/80">
          {info.map((r) => (
            <div key={r.label}>
              <dt className="inline text-cream/50">{r.label}: </dt>
              <dd className="inline">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-3 text-lg leading-snug text-cream/55">
        Nhân vật trong game là hư cấu. Số liệu mô phỏng là số liệu minh hoạ/giả định phục vụ thảo luận học thuật,
        không phải dự báo hay kết luận thống kê về toàn ngành.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <PixelButton variant="primary" onClick={onRestart} autoFocus>
          <RotateCcw className="size-5" aria-hidden />
          Chơi lại
        </PixelButton>
        <PixelButton onClick={onChapters}>
          <List className="size-5" aria-hidden />
          Chọn chương
        </PixelButton>
        <PixelLink href={modeLinks.classic}>
          <BookOpen className="size-5" aria-hidden />
          Bản bài viết
        </PixelLink>
      </div>
    </div>
  )
}
