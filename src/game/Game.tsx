import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getBackground } from './art/backgrounds.ts'
import Stage from './ui/Stage.tsx'
import { ChoiceMenu, DialogueBox } from './ui/DialogueBox.tsx'
import { ChapterMenu, Hud } from './ui/Hud.tsx'
import SimulatorPanel from './scenes/SimulatorPanel.tsx'
import RestructurePanel from './scenes/RestructurePanel.tsx'
import EndingPanel from './scenes/EndingPanel.tsx'
import { TitleOverlay, TitlePanel } from './scenes/TitlePanel.tsx'
import { chapterById, chapters, storyNodes, type CastSlot, type ChapterId } from './story/script.ts'
import type { SpeakerId } from './story/characters.ts'

const TITLE_CAST: CastSlot[] = [{ who: 'gao', x: 114 }]

export default function Game() {
  const [nodeId, setNodeId] = useState<string | null>(null)
  const [lineIdx, setLineIdx] = useState(0)
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const [village, setVillage] = useState<Set<string>>(new Set())
  const [focus, setFocus] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const node = nodeId ? storyNodes[nodeId] : null
  const chapter = node ? chapterById[node.chapter] : null
  const bgId = chapter?.bg ?? 'title'
  const draw = useMemo(() => getBackground(bgId, { selected: village }), [bgId, village])
  const cast = chapter?.cast ?? TITLE_CAST
  const polished = cast.find((c) => c.who === 'gao')?.polished

  const go = (id: string) => {
    setNodeId(id)
    setLineIdx(0)
    setVisited((v) => new Set(v).add(id))
  }
  const jump = (id: ChapterId) => {
    setMenuOpen(false)
    go(chapterById[id].start)
  }
  const restart = () => {
    setNodeId(null)
    setLineIdx(0)
    setVisited(new Set())
    setVillage(new Set())
    setFocus(null)
  }
  const toggleSolution = (id: string) => {
    const next = new Set(village)
    if (next.has(id)) {
      next.delete(id)
      if (focus === id) setFocus([...next].pop() ?? null)
    } else {
      next.add(id)
      setFocus(id)
    }
    setVillage(next)
  }

  let speaker: SpeakerId | undefined
  if (node?.kind === 'dialogue') speaker = node.lines[lineIdx].s
  if (node?.kind === 'menu') speaker = node.prompt.s

  const showBanner = !!chapter && node?.id === chapter.start && lineIdx === 0

  return (
    <div className="min-h-svh bg-night bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:12px_12px] px-3 py-3 sm:px-6 sm:py-5">
      <div
        className="mx-auto flex w-full flex-col gap-5"
        // Sân khấu 16:9 co lại theo chiều cao màn hình để hộp thoại luôn nằm trong khung nhìn
        style={{ maxWidth: 'min(1100px, max(22rem, calc((100svh - 21rem) * 16 / 9)))' }}
      >
        <Hud chapter={chapter?.id} onOpenChapters={() => setMenuOpen(true)} />

        <Stage draw={draw} label={chapter ? `${chapter.label}: ${chapter.title}` : 'Cánh đồng lúa lúc hoàng hôn'} cast={cast} speaker={speaker}>
          {!node && <TitleOverlay />}
          <AnimatePresence>
            {showBanner && chapter && (
              <motion.div
                key={chapter.id}
                className="absolute inset-x-0 top-[10%] flex justify-center"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="pixel-frame-sm bg-outline px-5 py-1.5 text-center font-pixel">
                  <p className="text-[clamp(0.9rem,2vw,1.25rem)] text-grain">{chapter.label}</p>
                  <p className="mt-1 font-pixel-title text-[clamp(1rem,3vw,2rem)] leading-[1.4] text-cream">{chapter.title.toUpperCase()}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Stage>

        <div className="pb-4">
          {!node && <TitlePanel onStart={() => go(chapters[0].start)} onChapters={() => setMenuOpen(true)} />}

          {node?.kind === 'dialogue' && (
            <DialogueBox
              line={node.lines[lineIdx]}
              polished={polished}
              onNext={() => (lineIdx < node.lines.length - 1 ? setLineIdx(lineIdx + 1) : go(node.next))}
            />
          )}

          {node?.kind === 'menu' && (
            <ChoiceMenu
              prompt={node.prompt}
              options={node.options}
              visited={visited}
              polished={polished}
              onPick={(opt) => go(opt.goto)}
            />
          )}

          {node?.kind === 'simulator' && <SimulatorPanel onDone={() => go(node.next)} />}

          {node?.kind === 'restructure' && (
            <RestructurePanel selected={village} focus={focus} onToggle={toggleSolution} onDone={() => go(node.next)} />
          )}

          {node?.kind === 'ending' && <EndingPanel onRestart={restart} onChapters={() => setMenuOpen(true)} />}
        </div>
      </div>

      <ChapterMenu open={menuOpen} current={chapter?.id} onClose={() => setMenuOpen(false)} onJump={jump} />
    </div>
  )
}
