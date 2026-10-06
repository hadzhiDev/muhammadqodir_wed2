import { motion } from 'framer-motion'

// The thin vertical line separator (".Leneee" in the original), dressed up
// with a soft gold gradient line, tiny end dots and a slowly breathing
// diamond ornament at its centre for an engraved, invitation-like feel.
export default function Divider() {
  return (
    <div className="my-[50px] flex w-full flex-col items-center justify-center">
      <motion.div
        className="relative w-[2px] rounded-full"
        style={{ background: 'linear-gradient(180deg, transparent, #c9ad78 42%, #e6cf98 50%, #c9ad78 58%, transparent)' }}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 84, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* tiny dots capping each end of the line */}
        <span className="absolute left-1/2 top-0 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-gold/70" />
        <span className="absolute left-1/2 bottom-0 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-gold/70" />

        {/* centred diamond ornament: an outlined rhombus with a filled core */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="block h-[13px] w-[13px] border border-gold/80 bg-parchment/5"
            style={{ animation: 'ornamentPulse 3.4s ease-in-out infinite' }}
          />
          <span className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold" />
        </span>
      </motion.div>
    </div>
  )
}
