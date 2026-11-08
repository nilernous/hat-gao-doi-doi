import { useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

const formatter = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 })

/** Định dạng số kiểu Việt Nam; số âm dùng dấu trừ (−) thay cho gạch nối. */
export function formatNumber(value: number) {
  return formatter.format(value).replace('-', '−')
}

/** Số chạy mượt khi đổi kịch bản; giá trị cuối luôn chính xác. */
export default function AnimatedNumber({ value, signed = false }: { value: number; signed?: boolean }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => {
    const rounded = Math.round(v * 10) / 10
    const sign = signed && rounded > 0 ? '+' : ''
    return sign + formatNumber(rounded)
  })

  useEffect(() => {
    const controls = animate(mv, value, { duration: reduce ? 0 : 0.6, ease: 'easeOut' })
    return () => controls.stop()
  }, [mv, value, reduce])

  return <motion.span>{text}</motion.span>
}
