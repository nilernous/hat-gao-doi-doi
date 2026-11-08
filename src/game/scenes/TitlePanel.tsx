import { BookOpen, List, Play } from 'lucide-react'
import { modeLinks } from '../../data/site.ts'
import PixelButton, { PixelLink } from '../ui/PixelButton.tsx'

/** Chữ tiêu đề đè lên sân khấu ở màn hình mở đầu. */
export function TitleOverlay() {
  return (
    <div className="absolute inset-x-0 top-[8%] flex flex-col items-center px-4 text-center">
      <h1
        className="font-pixel-title text-[clamp(1.6rem,6.5vw,4.5rem)] leading-none text-grain"
        style={{ textShadow: '0.08em 0.08em 0 #1b2a20, -0.04em -0.04em 0 #1b2a20, 0.04em -0.04em 0 #1b2a20, -0.04em 0.04em 0 #1b2a20' }}
      >
        HẠT GẠO ĐỔI ĐỜI
      </h1>
      <p
        className="mt-[2%] font-pixel text-[clamp(1rem,2.6vw,1.9rem)] leading-tight text-cream"
        style={{ textShadow: '2px 2px 0 #1b2a20' }}
      >
        Một hạt gạo. Một hành trình. Nhiều số phận.
      </p>
    </div>
  )
}

export function TitlePanel({ onStart, onChapters }: { onStart: () => void; onChapters: () => void }) {
  return (
    <div className="pixel-frame w-full bg-[#183026] px-4 py-5 font-pixel text-cream sm:px-6">
      <p className="text-xl leading-snug text-cream/85 sm:text-2xl">
        Theo chân một hạt gạo đi từ cánh đồng Đồng bằng sông Cửu Long đến bến cảng, gặp những con người tạo ra giá
        trị trên đường đi, rồi cùng chú Tư tính sổ một vụ lúa.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <PixelButton variant="primary" onClick={onStart} autoFocus className="px-6">
          <Play className="size-5" aria-hidden />
          Bắt đầu hành trình
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
      <p className="mt-4 text-lg text-cream/55">
        Cách chơi: chạm, bấm chuột hoặc nhấn Space / Enter để đọc tiếp. Phím 1–5 để chọn câu hỏi.
      </p>
    </div>
  )
}
