/**
 * Cấu hình tập trung cho mô phỏng kinh tế (docs/overview.md mục 4.3).
 * Mọi số liệu của mô phỏng chỉ nằm ở file này.
 * Thu nhập kinh tế còn lại KHÔNG lưu sẵn mà được tính bằng computeBreakdown().
 */

export const UNIT = 'triệu đồng/ha/vụ'
export const UNIT_SHORT = 'tr.đ'

export type ScenarioId = 'rieng-le' | 'lien-ket-htx'

export type DataSource =
  | { kind: 'report'; label: string }
  | { kind: 'assumption'; label: string }

export interface Scenario {
  id: ScenarioId
  label: string
  shortLabel: string
  summary: string
  source: DataSource
  revenue: number
  materialCost: number
  laborCost: number
  landCost: number
}

export const scenarios: Record<ScenarioId, Scenario> = {
  'rieng-le': {
    id: 'rieng-le',
    label: 'Canh tác và tiêu thụ riêng lẻ',
    shortLabel: 'Riêng lẻ',
    summary:
      'Hộ nông dân tự mua vật tư theo giá bán lẻ, tự canh tác và bán lúa cho thương lái theo giá thời điểm thu hoạch.',
    source: {
      kind: 'report',
      label: 'Theo ví dụ trong báo cáo nhóm (trang 29). Số liệu minh họa.',
    },
    revenue: 36,
    materialCost: 22,
    laborCost: 8,
    landCost: 2,
  },
  'lien-ket-htx': {
    id: 'lien-ket-htx',
    label: 'Liên kết thông qua hợp tác xã',
    shortLabel: 'Liên kết HTX',
    summary:
      'Hộ nông dân tham gia hợp tác xã: mua chung vật tư, sản xuất theo quy trình thống nhất và bán lúa theo hợp đồng liên kết.',
    source: {
      kind: 'assumption',
      label: 'Giả định minh họa để demo. Không phải số liệu khảo sát hay số liệu thực tế đã kiểm chứng.',
    },
    revenue: 39,
    materialCost: 20,
    laborCost: 8,
    landCost: 2,
  },
}

export const scenarioOrder: ScenarioId[] = ['rieng-le', 'lien-ket-htx']

export type MetricKey = 'revenue' | 'materialCost' | 'laborCost' | 'landCost' | 'residual'

export interface Metric {
  key: MetricKey
  label: string
  kind: 'revenue' | 'cost' | 'result'
  value: number
}

export const metricLabels: Record<MetricKey, string> = {
  revenue: 'Doanh thu',
  materialCost: 'Chi phí vật tư',
  laborCost: 'Chi phí lao động quy đổi',
  landCost: 'Chi phí sử dụng đất',
  residual: 'Thu nhập kinh tế còn lại',
}

/** Thu nhập kinh tế còn lại = Doanh thu − Vật tư − Lao động quy đổi − Sử dụng đất */
export function computeResidual(s: Scenario): number {
  return s.revenue - s.materialCost - s.laborCost - s.landCost
}

export function computeBreakdown(s: Scenario): Metric[] {
  return [
    { key: 'revenue', label: metricLabels.revenue, kind: 'revenue', value: s.revenue },
    { key: 'materialCost', label: metricLabels.materialCost, kind: 'cost', value: s.materialCost },
    { key: 'laborCost', label: metricLabels.laborCost, kind: 'cost', value: s.laborCost },
    { key: 'landCost', label: metricLabels.landCost, kind: 'cost', value: s.landCost },
    { key: 'residual', label: metricLabels.residual, kind: 'result', value: computeResidual(s) },
  ]
}

/** Giải thích khác biệt giữa hai kịch bản. Các lý do đều là giả định minh họa. */
export const differenceNotes: { metric: MetricKey; text: string }[] = [
  {
    metric: 'revenue',
    text: 'Bán theo hợp đồng liên kết, chất lượng lúa đồng đều hơn nên giá bán được giả định cao hơn.',
  },
  {
    metric: 'materialCost',
    text: 'Mua chung vật tư với số lượng lớn và áp dụng quy trình thống nhất nên chi phí vật tư được giả định thấp hơn.',
  },
  {
    metric: 'laborCost',
    text: 'Chi phí lao động quy đổi và chi phí sử dụng đất được giữ nguyên để dễ so sánh.',
  },
]
