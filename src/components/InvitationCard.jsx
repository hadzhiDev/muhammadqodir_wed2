import { motion } from 'framer-motion'
import Decorations from './Decorations'
import RevealText from './RevealText'
import { getWeddingDateParts } from '../lib/config'

const EASE = [0.22, 1, 0.36, 1]

const numberVar = {
  hidden: { opacity: 0, y: 24, scale: 0.85, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}
const dotVar = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const Dot = ({ i = 0 }) => (
  <div
    className="h-[10px] w-[10px] rounded-full bg-gold/70"
    style={{ animation: 'dotPulse 2.8s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}
  />
)

// The hero "card": frame image + decorations + brand, title, date, note.
export default function InvitationCard({ name, start }) {
  const { dateDay, dateMonth, dateYear } = getWeddingDateParts()

  return (
    <div className="relative mx-0 my-[50px] flex h-[700px] w-full max-w-[440px] items-center justify-center max-[440px]:my-[20px] max-[440px]:max-w-[95vw]">
      {/* background frame */}
      <div
        className="absolute z-[1] max-w-[400px] min-h-[800px] w-full bg-center bg-no-repeat max-[440px]:min-h-[658px] max-[440px]:w-[90%]"
        style={{ backgroundImage: "url('/img/background-frame.webp')", backgroundSize: 'contain' }}
      />

      <Decorations start={start} />

      {/* content */}
      <div className="relative z-[2] flex h-[540px] w-[min(300px,80%)] flex-col items-center justify-start gap-[clamp(0.7rem,3.2vw,1.25rem)] text-center max-[440px]:h-auto">
        <div className="mx-auto flex items-center justify-center gap-[clamp(0.5rem,2.5vw,0.75rem)] font-display leading-none">
          <span aria-hidden className="rule-gold h-px w-[clamp(1.5rem,7vw,2.25rem)]" />
          <span className="text-onlight text-[clamp(2.1rem,10.5vw,2.875rem)] tracking-[0.02em]">М</span>
          <span className="text-gold font-cormorant text-[clamp(1.7rem,8vw,2rem)] italic">&</span>
          <span className="text-onlight text-[clamp(2.1rem,10.5vw,2.875rem)] tracking-[0.02em]">О</span>
          <span aria-hidden className="rule-gold--rev h-px w-[clamp(1.5rem,7vw,2.25rem)]" />
        </div>

        {/* Fixed-height slot so a long name (that wraps to two lines) never
            pushes the date / note below it downward — the name is centred
            within a constant space regardless of its length. */}
        {name && (
          <div className="flex h-[clamp(3.25rem,15.5vw,4rem)] w-full items-center justify-center">
            <RevealText
              as="div"
              immediate={start}
              wordClassName="text-gold"
              className="font-script text-[clamp(1.55rem,7.2vw,1.85rem)] font-normal leading-[1.08] tracking-[0.005em]"
              text={`для «${name}»`}
            />
          </div>
        )}

        <RevealText
          as="div"
          immediate={start}
          delay={0.1}
          wordClassName="text-shimmer"
          className="font-display text-[clamp(1.9rem,9vw,2.5rem)] font-semibold tracking-[0.06em]"
          text="Приглашение"
        />

        <motion.div
          className="flex flex-col items-center justify-center gap-[7px]"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } } }}
          initial="hidden"
          animate={start ? 'show' : 'hidden'}
        >
          {[dateDay, dateMonth, dateYear].map((part, i) => (
            <div key={i} className="contents">
              {i > 0 && (
                <motion.div variants={dotVar}>
                  <Dot i={i} />
                </motion.div>
              )}
              <motion.div
                variants={numberVar}
                className="text-onlight font-frank text-[clamp(2.8rem,13vw,4rem)] font-normal leading-none"
              >
                {part}
              </motion.div>
            </div>
          ))}
        </motion.div>

        <RevealText
          as="div"
          immediate={start}
          delay={0.2}
          className="max-w-[min(220px,85%)] font-sans text-[clamp(0.8rem,3.5vw,0.9375rem)] font-medium leading-[1.5] text-ink"
          text={'Этот благословенный день\nбудет неполным без вас\nи вашей семьи.'}
        />
      </div>
    </div>
  )
}
