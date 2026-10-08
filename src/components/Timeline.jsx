import { motion } from 'framer-motion'
import RevealText from './RevealText'
import { STAGES } from '../lib/config'

// Program of the day (".section_2_stages") — label on the left, time on the
// right with a beige circle behind it (and a diagonal connector on left items).
export default function Timeline() {
  return (
    <div className="flex w-full flex-col gap-[30px]">
      {STAGES.map((stage, i) => (
        <motion.div
          key={i}
          className="flex w-full items-center justify-between"
          initial={{ opacity: 0, x: stage.side === 'right' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
        >
          <div className="w-[58%] font-frank text-[30px] leading-[1.1] text-gold">
            <RevealText text={stage.label} stagger={0.03} wordClassName="text-gold" />
          </div>

          <div className="relative w-[42%] text-end font-frank text-[clamp(2.3rem,10vw,3.125rem)] text-gold">
            {/* beige circle behind the time — gently breathes */}
            <motion.span
              className={
                'absolute top-0 bottom-0 z-[-1] m-auto h-[clamp(3.25rem,14vw,4.375rem)] w-[clamp(3.25rem,14vw,4.375rem)] rounded-full bg-beige ' +
                (stage.side === 'right' ? 'right-0 left-auto' : 'left-0 right-0')
              }
              animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: i * 0.4 }}
            />
            {/* diagonal connector under left-aligned items */}
            {/* {stage.side === 'left' && (
              <span className="absolute left-0 right-0 bottom-[-55px] z-[-1] m-auto h-[100px] w-[2px] -rotate-45 bg-beige" />
            )} */}
            {stage.time}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
