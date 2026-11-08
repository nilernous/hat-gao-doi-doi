import type { BgId } from '../art/backgrounds.ts'
import type { CharId, SpeakerId } from './characters.ts'

/**
 * Kịch bản game. Nội dung bám theo src/data/rice-chain.ts và docs/overview.md.
 * Số liệu mô phỏng KHÔNG nằm ở đây mà lấy từ features/simulator/scenario-data.ts.
 */

export type ChapterId =
  | 'mo-dau'
  | 'canh-dong'
  | 'ben-song'
  | 'nha-may'
  | 'cang-bien'
  | 'nga-re'
  | 'tai-co-cau'
  | 'ket'

export interface CastSlot {
  who: CharId
  /** Toạ độ trái theo pixel sân khấu (0–256) */
  x: number
  flip?: boolean
  polished?: boolean
}

export interface Chapter {
  id: ChapterId
  label: string
  title: string
  bg: BgId
  cast: CastSlot[]
  start: string
}

export interface Line {
  s: SpeakerId
  t: string
}

export interface MenuOption {
  label: string
  goto: string
  leave?: boolean
}

export type StoryNode =
  | { kind: 'dialogue'; id: string; chapter: ChapterId; lines: Line[]; next: string }
  | { kind: 'menu'; id: string; chapter: ChapterId; prompt: Line; options: MenuOption[] }
  | { kind: 'simulator'; id: string; chapter: ChapterId; next: string }
  | { kind: 'restructure'; id: string; chapter: ChapterId; next: string }
  | { kind: 'ending'; id: string; chapter: ChapterId }

export const chapters: Chapter[] = [
  {
    id: 'mo-dau',
    label: 'Mở đầu',
    title: 'Hạt lúa thức giấc',
    bg: 'dawn-field',
    cast: [{ who: 'gao', x: 114 }],
    start: 'mo-dau/intro',
  },
  {
    id: 'canh-dong',
    label: 'Chương 1',
    title: 'Cánh đồng',
    bg: 'field',
    cast: [
      { who: 'gao', x: 86 },
      { who: 'tu', x: 146, flip: true },
    ],
    start: 'canh-dong/intro',
  },
  {
    id: 'ben-song',
    label: 'Chương 2',
    title: 'Bến sông',
    bg: 'river',
    cast: [
      { who: 'gao', x: 40 },
      { who: 'nam', x: 150, flip: true },
      { who: 'hai', x: 196, flip: true },
    ],
    start: 'ben-song/intro',
  },
  {
    id: 'nha-may',
    label: 'Chương 3',
    title: 'Nhà máy xay xát',
    bg: 'factory',
    cast: [
      { who: 'gao', x: 30, polished: true },
      { who: 'bay', x: 74, flip: true },
    ],
    start: 'nha-may/intro',
  },
  {
    id: 'cang-bien',
    label: 'Chương 4',
    title: 'Bến cảng',
    bg: 'port',
    cast: [
      { who: 'gao', x: 92, polished: true },
      { who: 'mai', x: 150, flip: true },
    ],
    start: 'cang-bien/intro',
  },
  {
    id: 'nga-re',
    label: 'Chương 5',
    title: 'Ngã rẽ của chú Tư',
    bg: 'crossroads',
    cast: [
      { who: 'gao', x: 70, polished: true },
      { who: 'tu', x: 112 },
    ],
    start: 'nga-re/intro',
  },
  {
    id: 'tai-co-cau',
    label: 'Chương 6',
    title: 'Làng lúa đổi mới',
    bg: 'village',
    cast: [
      { who: 'gao', x: 100, polished: true },
      { who: 'hai', x: 124 },
    ],
    start: 'tai-co-cau/intro',
  },
  {
    id: 'ket',
    label: 'Kết',
    title: 'Nhiều số phận',
    bg: 'ending',
    cast: [
      { who: 'tu', x: 20 },
      { who: 'nam', x: 54 },
      { who: 'hai', x: 88 },
      { who: 'gao', x: 122, polished: true },
      { who: 'bay', x: 152, flip: true },
      { who: 'mai', x: 186, flip: true },
    ],
    start: 'ket/intro',
  },
]

export const chapterById = Object.fromEntries(chapters.map((c) => [c.id, c])) as Record<ChapterId, Chapter>

// ---------------------------------------------------------------------------

const nodes: StoryNode[] = []

function say(id: string, chapter: ChapterId, next: string, ...lines: Line[]) {
  nodes.push({ kind: 'dialogue', id, chapter, lines, next })
}

const L = (s: SpeakerId, t: string): Line => ({ s, t })

/**
 * Một chặng phỏng vấn: hỏi nhân vật theo thứ tự tuỳ ý, rồi lên đường.
 * Mỗi câu hỏi quay lại menu sau khi trả lời.
 */
function interview(
  chapter: ChapterId,
  prompt: Line,
  asks: { key: string; label: string; lines: Line[] }[],
  leave: { label: string; lines: Line[]; next: string },
) {
  const menuId = `${chapter}/menu`
  nodes.push({
    kind: 'menu',
    id: menuId,
    chapter,
    prompt,
    options: [
      ...asks.map((a) => ({ label: a.label, goto: `${chapter}/${a.key}` })),
      { label: leave.label, goto: `${chapter}/outro`, leave: true },
    ],
  })
  asks.forEach((a) => say(`${chapter}/${a.key}`, chapter, menuId, ...a.lines))
  say(`${chapter}/outro`, chapter, leave.next, ...leave.lines)
}

// ---------- Mở đầu ----------
say(
  'mo-dau/intro',
  'mo-dau',
  'canh-dong/intro',
  L('narrator', 'Đồng bằng sông Cửu Long. Bình minh trên cánh đồng lúa chín.'),
  L('narrator', 'Giữa muôn vàn bông lúa, có một hạt lúa nhỏ vừa thức giấc…'),
  L('gao', 'Ơ… Mình là ai? Mình sẽ đi về đâu?'),
  L('narrator', 'Hạt lúa sắp bước vào một hành trình dài: từ cánh đồng đến bàn ăn, qua tay rất nhiều người.'),
  L('narrator', 'Hãy cùng đi với hạt lúa và tìm câu trả lời: Ai tạo ra giá trị, và giá trị được phân phối như thế nào?'),
)

// ---------- Chương 1: Cánh đồng ----------
say(
  'canh-dong/intro',
  'canh-dong',
  'canh-dong/menu',
  L('tu', 'Chào con! Chú là Tư, làm ruộng ở đây ba chục năm rồi.'),
  L('tu', 'Con lớn lên từ đất, từ nước và từ mồ hôi của chú đó.'),
  L('gao', 'Vậy là chú đã làm ra con! Con muốn hỏi chú nhiều chuyện lắm.'),
)
interview(
  'canh-dong',
  L('gao', 'Con hỏi chú Tư điều gì trước đây?'),
  [
    {
      key: 'viec',
      label: 'Chú làm những việc gì?',
      lines: [
        L('tu', 'Đầu vụ thì làm đất, rồi gieo sạ hoặc cấy.'),
        L('tu', 'Lúa lên thì bón phân, tưới nước, trừ sâu bệnh. Tới mùa thì gặt, phơi sấy, giữ lúa cho khô.'),
      ],
    },
    {
      key: 'chi-phi',
      label: 'Chú tốn những chi phí gì?',
      lines: [
        L('tu', 'Tiền giống, phân bón, thuốc bảo vệ thực vật. Thuê máy làm đất, máy gặt.'),
        L('tu', 'Công của người nhà với công thuê mướn. Rồi tiền thuê đất, có khi cả tiền lãi vay vốn nữa.'),
      ],
    },
    {
      key: 'thu',
      label: 'Chú thu được gì?',
      lines: [
        L('tu', 'Chú bán lúa cho thương lái, cho hợp tác xã hoặc doanh nghiệp.'),
        L('tu', 'Ruộng nhỏ, bán lẻ tẻ, ít thông tin thị trường, nên giá cả phần nhiều do người mua định.'),
      ],
    },
    {
      key: 'mac',
      label: 'Góc nhìn C. Mác',
      lines: [
        L('narrator', 'Chú Tư tự canh tác trên ruộng nhà. Thu nhập của chú phần lớn là thù lao cho chính sức lao động của chú.'),
        L('narrator', 'Vì vậy không nên đồng nhất thu nhập này với giá trị thặng dư, khái niệm gắn với quan hệ lao động làm thuê.'),
      ],
    },
  ],
  {
    label: 'Lên đường',
    next: 'ben-song/intro',
    lines: [
      L('narrator', 'Nông dân đứng ở đầu chuỗi giá trị: sản xuất nhỏ, phân tán, ít thông tin thị trường, nên thường yếu thế khi thương lượng giá.'),
      L('tu', 'Đi đi con. Ghe thương lái tới rồi kìa!'),
    ],
  },
)

// ---------- Chương 2: Bến sông ----------
say(
  'ben-song/intro',
  'ben-song',
  'ben-song/menu',
  L('narrator', 'Lúa được gom lên ghe, xuôi theo kênh rạch chằng chịt.'),
  L('nam', 'Lúa đây! Cô là Năm, đi gom lúa của mấy chục hộ quanh vùng để chở về nhà máy.'),
  L('hai', 'Còn chị là Hai, chủ nhiệm hợp tác xã. Bà con trong hợp tác xã mua chung vật tư, bán chung theo hợp đồng.'),
)
interview(
  'ben-song',
  L('gao', 'Hai cô là cầu nối giữa ruộng với nhà máy à? Con hỏi điều gì đây?'),
  [
    {
      key: 'viec',
      label: 'Hai cô làm những việc gì?',
      lines: [
        L('nam', 'Cô thu gom lúa từ nhiều hộ, thuê ghe, thuê xe chở tới nhà máy.'),
        L('hai', 'Hợp tác xã thì mua chung vật tư, tổ chức sản xuất theo quy trình chung và ký hợp đồng liên kết tiêu thụ.'),
      ],
    },
    {
      key: 'chi-phi',
      label: 'Hai cô tốn những chi phí gì?',
      lines: [
        L('nam', 'Phải có sẵn vốn để mua lúa. Rồi tiền ghe, tiền bốc xếp, lúa còn hao hụt dọc đường.'),
        L('hai', 'Hợp tác xã cũng tốn chi phí quản lý, điều hành.'),
      ],
    },
    {
      key: 'thu',
      label: 'Hai cô thu được gì?',
      lines: [
        L('nam', 'Cô hưởng phần chênh lệch giữa giá mua và giá bán.'),
        L('hai', 'Hợp tác xã thu phí dịch vụ. Lợi ích từ mua chung, bán chung được chia lại cho thành viên.'),
      ],
    },
    {
      key: 'mac',
      label: 'Góc nhìn C. Mác',
      lines: [
        L('narrator', 'Chênh lệch giữa giá mua và giá bán không mặc nhiên là giá trị thặng dư.'),
        L('narrator', 'Một phần trong đó là khoản bù đắp chi phí lưu thông và rủi ro.'),
      ],
    },
  ],
  {
    label: 'Lên đường',
    next: 'nha-may/intro',
    lines: [
      L('narrator', 'Khâu trung gian nắm thông tin về giá và đầu ra, nên có ảnh hưởng lớn tới giá mua lúa từ nông dân.'),
      L('nam', 'Lên ghe nào! Mình về nhà máy xay xát.'),
    ],
  },
)

// ---------- Chương 3: Nhà máy ----------
say(
  'nha-may/intro',
  'nha-may',
  'nha-may/menu',
  L('narrator', 'Nhà máy xay xát. Tiếng máy chạy rì rầm cả ngày lẫn đêm.'),
  L('bay', 'Chào hạt lúa! Anh là Bảy, công nhân ở đây. Tụi anh sấy, xay xát, lau bóng để biến lúa thành gạo.'),
  L('gao', 'Oa! Mình… mình thành hạt gạo trắng tinh rồi!'),
)
interview(
  'nha-may',
  L('gao', 'Anh Bảy ơi, cho em hỏi…'),
  [
    {
      key: 'viec',
      label: 'Nhà máy làm những việc gì?',
      lines: [
        L('bay', 'Sấy, xay xát, lau bóng. Rồi phân loại, đóng bao, in thương hiệu.'),
        L('bay', 'Phải kiểm soát chất lượng và ghi lại nguồn gốc từng lô gạo.'),
      ],
    },
    {
      key: 'chi-phi',
      label: 'Nhà máy tốn những chi phí gì?',
      lines: [
        L('bay', 'Chủ nhà máy phải mua lúa đầu vào, đầu tư máy móc, nhà xưởng, trả tiền điện.'),
        L('bay', 'Trả lương cho công nhân như anh. Rồi kho bãi, bao bì, khấu hao máy móc.'),
      ],
    },
    {
      key: 'thu',
      label: 'Nhà máy thu được gì?',
      lines: [L('bay', 'Nhà máy bán gạo thành phẩm, bán luôn cả phụ phẩm như cám với trấu.')],
    },
    {
      key: 'mac',
      label: 'Góc nhìn C. Mác',
      lines: [
        L('narrator', 'Đây là khâu có quan hệ lao động làm thuê: anh Bảy bán sức lao động và nhận tiền công.'),
        L('narrator', 'Giá trị mới do công nhân tạo ra có thể lớn hơn tiền công họ nhận. Phần chênh lệch đó là đối tượng phân tích trực tiếp của khái niệm giá trị thặng dư.'),
      ],
    },
  ],
  {
    label: 'Lên đường',
    next: 'cang-bien/intro',
    lines: [
      L('narrator', 'Nhà máy ở khâu giữa chuỗi: sở hữu máy móc, nhà xưởng và sử dụng lao động làm thuê.'),
      L('bay', 'Em được đóng bao rồi. Xe đang chở ra cảng đó!'),
    ],
  },
)

// ---------- Chương 4: Bến cảng ----------
say(
  'cang-bien/intro',
  'cang-bien',
  'cang-bien/menu',
  L('narrator', 'Bến cảng. Những container xếp chồng lên nhau như những khối gạch khổng lồ.'),
  L('mai', 'Chị là Mai, lo phân phối và xuất khẩu. Gạo của em sẽ theo tàu đi qua biển tới nhiều nước.'),
)
interview(
  'cang-bien',
  L('gao', 'Đi xa vậy sao chị? Em hỏi thêm nha…'),
  [
    {
      key: 'viec',
      label: 'Chị làm những việc gì?',
      lines: [
        L('mai', 'Chị đàm phán, ký hợp đồng xuất khẩu với khách hàng nước ngoài.'),
        L('mai', 'Lo kho, cảng, tàu. Trong nước thì phân phối qua đại lý, siêu thị, cửa hàng bán lẻ.'),
      ],
    },
    {
      key: 'chi-phi',
      label: 'Chị tốn những chi phí gì?',
      lines: [
        L('mai', 'Vận chuyển, lưu kho, phí cảng. Chứng nhận và kiểm định chất lượng.'),
        L('mai', 'Marketing, bán hàng. Còn phải chịu rủi ro khi giá gạo thế giới và tỷ giá biến động.'),
      ],
    },
    {
      key: 'thu',
      label: 'Chị thu được gì?',
      lines: [L('mai', 'Doanh thu từ bán gạo ở thị trường trong nước và quốc tế.')],
    },
    {
      key: 'mac',
      label: 'Góc nhìn C. Mác',
      lines: [
        L('narrator', 'Theo C. Mác, lưu thông không tự tạo ra giá trị thặng dư.'),
        L('narrator', 'Lợi nhuận thương nghiệp là một phần giá trị thặng dư tạo ra trong sản xuất, được phân chia lại cho khâu lưu thông.'),
      ],
    },
  ],
  {
    label: 'Lên đường',
    next: 'nga-re/intro',
    lines: [
      L('narrator', 'Phân phối và xuất khẩu là khâu cuối chuỗi, gần thị trường và người tiêu dùng nhất.'),
      L('gao', 'Hành trình dài quá… Nhưng mình vẫn nhớ chú Tư ngoài đồng.'),
      L('narrator', 'Hãy quay về cánh đồng. Mùa vụ mới, chú Tư đang đứng trước một ngã rẽ.'),
    ],
  },
)

// ---------- Chương 5: Ngã rẽ (mô phỏng) ----------
say(
  'nga-re/intro',
  'nga-re',
  'nga-re/sim',
  L('tu', 'Vụ này chú nên làm riêng như xưa, hay vào hợp tác xã với bà con đây?'),
  L('narrator', 'Hãy cùng chú Tư tính sổ một vụ lúa trên 1 ha ruộng. Đơn vị: triệu đồng/ha/vụ.'),
  L('narrator', 'Lưu ý: đây là số liệu minh hoạ. Con đường riêng lẻ lấy theo ví dụ trong báo cáo nhóm; con đường hợp tác xã là giả định để demo.'),
)
nodes.push({ kind: 'simulator', id: 'nga-re/sim', chapter: 'nga-re', next: 'nga-re/after' })
say(
  'nga-re/after',
  'nga-re',
  'tai-co-cau/intro',
  L('narrator', 'Doanh thu là tổng tiền bán lúa. Chi phí gồm vật tư, lao động quy đổi và sử dụng đất.'),
  L('narrator', 'Phần còn lại là “thu nhập kinh tế còn lại”, theo cách tính của ví dụ này.'),
  L('narrator', 'Nhưng nhớ nhé: thu nhập còn lại của hộ tự canh tác KHÔNG đồng nhất với giá trị thặng dư.'),
  L('narrator', 'Giá trị thặng dư theo C. Mác là phần giá trị mới do người lao động làm thuê tạo ra, vượt quá giá trị sức lao động (tiền công) của họ.'),
  L('narrator', 'Mô phỏng cũng không khẳng định hợp tác xã chắc chắn làm tăng thu nhập. Kết quả thực tế còn tuỳ cách hợp tác xã vận hành, giá thị trường và điều kiện từng địa phương.'),
  L('tu', 'Ừ… Muốn khá lên, chắc phải tổ chức lại cả cách làm ăn.'),
)

// ---------- Chương 6: Tái cơ cấu ----------
say(
  'tai-co-cau/intro',
  'tai-co-cau',
  'tai-co-cau/build',
  L('narrator', 'Muốn hạt gạo thật sự “đổi đời”, cả chuỗi giá trị cần được tổ chức lại.'),
  L('hai', 'Bà con mình cùng dựng lại làng lúa nhé! Thử bật từng nhóm giải pháp xem làng thay đổi ra sao.'),
)
nodes.push({ kind: 'restructure', id: 'tai-co-cau/build', chapter: 'tai-co-cau', next: 'ket/intro' })

// ---------- Kết ----------
say(
  'ket/intro',
  'ket',
  'ket/end',
  L('gao', 'Mình chỉ là một hạt gạo. Nhưng hành trình của mình gắn với số phận của biết bao người.'),
  L('narrator', 'Tái cơ cấu ngành lúa gạo không chỉ là tăng sản lượng.'),
  L('narrator', 'Đó còn là tổ chức lại sản xuất, nâng cao chất lượng, tăng cường liên kết và cải thiện vị thế của người nông dân trong chuỗi giá trị.'),
)
nodes.push({ kind: 'ending', id: 'ket/end', chapter: 'ket' })

export const storyNodes = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, StoryNode>
