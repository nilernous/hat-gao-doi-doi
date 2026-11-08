import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

/** Hiện nội dung nhẹ nhàng khi cuộn tới. Tự tắt khi người xem bật giảm chuyển động. */
export default function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
