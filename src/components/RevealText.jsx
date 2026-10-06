import { motion } from 'framer-motion'

// Word-by-word reveal — the React/framer-motion equivalent of the original
// GSAP SplitText "quote" animation (opacity + scale + blur + y stagger).
// Soft "ease-out-expo" feel for a graceful settle.
const EASE = [0.22, 1, 0.36, 1]

const wordVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 14, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE },
  },
}

/**
 * Renders `text` split into animated words. Newlines (\n) become <br/>.
 * By default it plays when scrolled into view; pass `immediate` for the hero.
 */
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  immediate = false,
  stagger = 0.08,
  gradient = false,
  wordClassName = '',
}) {
  // A gradient/clip effect must live on each word span (background-clip:text
  // needs real glyphs), otherwise the split words render transparent/invisible.
  // `gradient` is a shortcut for the graphite look; `wordClassName` lets callers
  // pass any per-word class (e.g. text-shimmer, text-gold).
  const wordClass = `${gradient ? 'text-elegant' : ''} ${wordClassName}`.trim()
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const lines = String(text).split('\n')

  const MotionTag = motion[Tag] ?? motion.span

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((line, li) => (
        <span key={li} className="inline">
          {line.split(' ').map((word, wi) => (
            <motion.span
              key={`${li}-${wi}`}
              variants={wordVariants}
              className={`inline-block whitespace-pre ${wordClass}`}
            >
              {word}
              {wi < line.split(' ').length - 1 ? ' ' : ''}
            </motion.span>
          ))}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </MotionTag>
  )
}
