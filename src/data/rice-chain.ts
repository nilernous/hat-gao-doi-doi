import type { LucideIcon } from 'lucide-react'
import { Factory, Ship, Sprout, Truck } from 'lucide-react'

/**
 * Nội dung định tính cho từng chủ thể trong chuỗi giá trị lúa gạo.
 * Cố ý KHÔNG có tỷ lệ phân chia giá trị hay tỷ suất lợi nhuận
 * (docs/overview.md mục 4.2), vì chưa có dữ liệu có nguồn.
 */
export interface ChainActor {
  id: string
  step: number
  name: string
  shortName: string
  icon: LucideIcon
  role: string
  activities: string[]
  costs: string[]
  benefits: string[]
  position: string
  marxLens: string
}

export const riceChain: ChainActor[] = [
  {
    id: 'nong-dan',
    step: 1,
    name: 'Nông dân',
    shortName: 'Nông dân',
    icon: Sprout,
    role: 'Người trực tiếp sản xuất ra hạt lúa, bỏ sức lao động, vốn và đất đai vào mỗi vụ mùa.',
    activities: [
      'Chuẩn bị đất, gieo sạ hoặc cấy',
      'Bón phân, tưới tiêu, phòng trừ sâu bệnh',
      'Thu hoạch, phơi sấy và bảo quản lúa',
    ],
    costs: [
      'Giống, phân bón, thuốc bảo vệ thực vật',
      'Lao động gia đình và lao động thuê mướn',
      'Thuê đất hoặc chi phí sử dụng đất',
      'Thuê máy làm đất, máy gặt; lãi vay vốn',
    ],
    benefits: ['Tiền bán lúa cho thương lái, hợp tác xã hoặc doanh nghiệp'],
    position:
      'Khâu đầu chuỗi. Sản xuất quy mô nhỏ, phân tán và ít thông tin thị trường nên thường ở thế yếu khi thương lượng giá.',
    marxLens:
      'Thu nhập của hộ tự canh tác phần lớn là thù lao cho chính sức lao động của họ, không đồng nhất với giá trị thặng dư trong quan hệ lao động làm thuê.',
  },
  {
    id: 'thuong-lai-htx',
    step: 2,
    name: 'Thương lái / Hợp tác xã',
    shortName: 'Thương lái / HTX',
    icon: Truck,
    role: 'Cầu nối giữa hàng nghìn hộ sản xuất nhỏ lẻ với nhà máy và doanh nghiệp.',
    activities: [
      'Thu gom lúa từ nhiều hộ nông dân',
      'Tổ chức vận chuyển bằng ghe, xe đến nhà máy',
      'Hợp tác xã: mua chung vật tư, ký hợp đồng liên kết tiêu thụ',
    ],
    costs: [
      'Vốn lưu động để mua lúa',
      'Vận chuyển, bốc xếp, hao hụt',
      'Hợp tác xã: chi phí quản lý, điều hành',
    ],
    benefits: [
      'Thương lái: chênh lệch giữa giá mua và giá bán',
      'Hợp tác xã: phí dịch vụ và lợi ích mua chung, bán chung chia lại cho thành viên',
    ],
    position:
      'Khâu trung gian. Nắm thông tin về giá và đầu ra nên có ảnh hưởng lớn đến giá mua lúa từ nông dân.',
    marxLens:
      'Chênh lệch giữa giá mua và giá bán không mặc nhiên là giá trị thặng dư; một phần là khoản bù đắp chi phí lưu thông và rủi ro.',
  },
  {
    id: 'che-bien',
    step: 3,
    name: 'Doanh nghiệp chế biến',
    shortName: 'Chế biến',
    icon: Factory,
    role: 'Biến lúa thành gạo thành phẩm, nâng cao chất lượng và giá trị sản phẩm.',
    activities: [
      'Sấy, xay xát, lau bóng',
      'Phân loại, đóng gói, xây dựng thương hiệu',
      'Kiểm soát chất lượng, truy xuất nguồn gốc',
    ],
    costs: [
      'Nguyên liệu lúa đầu vào',
      'Máy móc, nhà xưởng, năng lượng',
      'Tiền lương công nhân',
      'Kho bãi, bao bì, khấu hao',
    ],
    benefits: ['Doanh thu bán gạo thành phẩm và phụ phẩm (cám, trấu)'],
    position:
      'Khâu giữa chuỗi. Sở hữu máy móc, nhà xưởng và sử dụng lao động làm thuê.',
    marxLens:
      'Đây là khâu có quan hệ lao động làm thuê: giá trị mới do công nhân tạo ra có thể lớn hơn tiền công họ nhận. Phần chênh lệch đó là đối tượng phân tích trực tiếp của khái niệm giá trị thặng dư.',
  },
  {
    id: 'phan-phoi-xuat-khau',
    step: 4,
    name: 'Phân phối / Xuất khẩu',
    shortName: 'Phân phối / XK',
    icon: Ship,
    role: 'Đưa gạo đến người tiêu dùng trong nước và các thị trường quốc tế.',
    activities: [
      'Đàm phán, ký kết hợp đồng xuất khẩu',
      'Logistics: kho, cảng, vận tải',
      'Phân phối qua đại lý, siêu thị, cửa hàng bán lẻ',
    ],
    costs: [
      'Vận chuyển, lưu kho, phí cảng',
      'Chứng nhận, kiểm định chất lượng',
      'Marketing và bán hàng',
      'Rủi ro biến động giá và tỷ giá',
    ],
    benefits: ['Doanh thu bán gạo tại thị trường trong nước và quốc tế'],
    position: 'Khâu cuối chuỗi, gần thị trường và người tiêu dùng nhất.',
    marxLens:
      'Theo C. Mác, lưu thông không tự tạo ra giá trị thặng dư. Lợi nhuận thương nghiệp là một phần giá trị thặng dư tạo ra trong sản xuất, được phân chia lại cho khâu lưu thông.',
  },
]
