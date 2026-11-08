import { BookMarked } from 'lucide-react'

/** Phân biệt các khái niệm (docs/overview.md mục 2.2). Nhóm cần đối chiếu câu chữ với báo cáo. */
const concepts = [
  {
    term: 'Doanh thu',
    text: 'Tổng số tiền thu được khi bán lúa, bằng sản lượng nhân với giá bán.',
  },
  {
    term: 'Chi phí',
    text: 'Các khoản phải bỏ ra để sản xuất: vật tư, lao động (quy đổi thành tiền) và sử dụng đất.',
  },
  {
    term: 'Thu nhập kinh tế còn lại',
    text: 'Phần còn lại sau khi lấy doanh thu trừ các chi phí, theo cách tính của ví dụ này.',
  },
  {
    term: 'Giá trị thặng dư (C. Mác)',
    text: 'Phần giá trị mới do người lao động làm thuê tạo ra, vượt quá giá trị sức lao động (tiền công) của họ, và bị người sở hữu tư liệu sản xuất chiếm hữu.',
  },
]

export default function ConceptNote() {
  return (
    <div className="rounded-3xl border border-paddy/15 bg-paddy/5 p-6 sm:p-8">
      <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-paddy">
        <BookMarked className="size-5 text-leaf" aria-hidden />
        Bốn khái niệm cần phân biệt
      </h3>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((c) => (
          <div key={c.term} className="rounded-2xl bg-white p-4">
            <dt className="text-sm font-semibold text-paddy">{c.term}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">{c.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm leading-relaxed text-ink/85">
        <strong className="text-paddy">Lưu ý:</strong> “Thu nhập kinh tế còn lại” trong ví dụ là kết quả của hộ nông dân
        tự canh tác, <strong>không đồng nhất</strong> với giá trị thặng dư. Không phải mọi khoản chênh lệch giữa giá mua
        và giá bán, hay mọi khoản lợi nhuận, đều là giá trị thặng dư theo C. Mác.
      </p>
    </div>
  )
}
