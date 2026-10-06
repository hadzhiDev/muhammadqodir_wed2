import { AnimatePresence, motion } from 'framer-motion'

const bars = [
  { h: 40, delay: '-0.4s' },
  { h: 60, delay: '-0.3s' },
  { h: 80, delay: '-0.2s' },
  { h: 60, delay: '-0.1s' },
  { h: 40, delay: '0s' },
]

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex items-end gap-2">
            {bars.map((bar, i) => (
              <span
                key={i}
                className="w-3 rounded-full bg-[#CABFA3]"
                style={{
                  height: `${bar.h}px`,
                  animation: 'loading 1.2s ease-in-out infinite',
                  animationDelay: bar.delay,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
