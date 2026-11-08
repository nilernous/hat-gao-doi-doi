import type { LucideIcon } from 'lucide-react'
import { Cpu, GraduationCap, Handshake } from 'lucide-react'

/**
 * Ba nhóm giải pháp tái cơ cấu (docs/overview.md mục 4.4).
 * Tác động chỉ mô tả định tính, không chấm điểm hay đưa ra phần trăm.
 */
export interface Solution {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  problem: string
  actions: string[]
  expectedImpact: string[]
}

export const solutions: Solution[] = [
  {
    id: 'lien-ket',
    title: 'Tăng cường liên kết sản xuất và tiêu thụ',
    icon: Handshake,
    summary: 'Phát triển hợp tác xã, liên kết chuỗi và hợp đồng minh bạch.',
    problem:
      'Sản xuất nhỏ lẻ, phân tán khiến nông dân yếu thế khi mua vật tư và khi bán lúa, phụ thuộc vào giá do khâu trung gian quyết định.',
    actions: [
      'Phát triển hợp tác xã kiểu mới, tổ chức mua chung, bán chung',
      'Liên kết chuỗi giữa nông dân, hợp tác xã và doanh nghiệp',
      'Hợp đồng bao tiêu minh bạch về giá, chất lượng và thời điểm thu mua',
    ],
    expectedImpact: [
      'Nông dân có tiếng nói lớn hơn trong thương lượng giá',
      'Giảm chi phí đầu vào nhờ quy mô mua chung',
      'Đầu ra ổn định hơn, giảm rủi ro bị ép giá',
    ],
  },
  {
    id: 'khoa-hoc-cong-nghe',
    title: 'Ứng dụng khoa học – công nghệ',
    icon: Cpu,
    summary: 'Cơ giới hóa, cải thiện quy trình, nâng cao chất lượng và giảm chi phí.',
    problem:
      'Quy trình canh tác chưa đồng bộ, tổn thất sau thu hoạch còn cao, chất lượng hạt gạo không đồng đều nên khó bán được giá tốt.',
    actions: [
      'Cơ giới hóa khâu làm đất, gieo sạ, thu hoạch và sấy',
      'Áp dụng quy trình canh tác giảm giống, giảm phân, giảm thuốc',
      'Đầu tư công nghệ chế biến sâu và truy xuất nguồn gốc',
    ],
    expectedImpact: [
      'Giảm chi phí sản xuất và tổn thất sau thu hoạch',
      'Chất lượng gạo đồng đều, đáp ứng thị trường khó tính hơn',
      'Tăng năng suất lao động trong toàn chuỗi',
    ],
  },
  {
    id: 'nhan-luc-ben-vung',
    title: 'Phát triển nguồn nhân lực và tính bền vững',
    icon: GraduationCap,
    summary: 'Đào tạo, nâng cao năng lực tổ chức sản xuất và thích ứng với yêu cầu môi trường.',
    problem:
      'Năng lực quản lý của hợp tác xã và hiểu biết thị trường của nông dân còn hạn chế, trong khi biến đổi khí hậu và yêu cầu môi trường ngày càng khắt khe.',
    actions: [
      'Đào tạo kỹ thuật canh tác và kỹ năng quản trị hợp tác xã',
      'Nâng cao hiểu biết về thị trường, hợp đồng và tiêu chuẩn chất lượng',
      'Canh tác thích ứng biến đổi khí hậu, giảm phát thải',
    ],
    expectedImpact: [
      'Nông dân chủ động hơn trong tổ chức sản xuất',
      'Chuỗi giá trị vận hành ổn định và chuyên nghiệp hơn',
      'Sản xuất lúa gạo bền vững về lâu dài',
    ],
  },
]
