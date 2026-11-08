import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const CHARS_PER_SECOND = 45

/** Hiện chữ dần như máy đánh chữ. Gọi finish() để hiện hết ngay. */
export function useTypewriter(text: string) {
  const reduce = useReducedMotion()
  const [state, setState] = useState({ text, count: 0 })

  // Đổi câu thoại thì bắt đầu gõ lại từ đầu.
  if (state.text !== text) setState({ text, count: 0 })

  const count = reduce ? text.length : state.text === text ? state.count : 0
  const done = count >= text.length

  useEffect(() => {
    if (done || reduce) return
    const id = window.setInterval(() => {
      setState((s) => (s.text === text ? { ...s, count: Math.min(text.length, s.count + 1) } : s))
    }, 1000 / CHARS_PER_SECOND)
    return () => window.clearInterval(id)
  }, [text, done, reduce])

  const finish = () => setState({ text, count: text.length })
  return { shown: text.slice(0, count), done, finish }
}
