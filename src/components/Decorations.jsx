import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Decorative flowers + leaves around the hero card.
// Positions/sizes are ported 1:1 from the original CSS (arbitrary Tailwind values).
// Flowers scale in and settle to rotate:0; leaves scale in keeping their tilt —
// matching the original GSAP `animateFlowers` timeline.

const bg = (file) => ({
  backgroundImage: `url('/img/${file}')`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
})

const flowers = [
  { cls: 'top-[-49px] left-[3px] w-[220px] h-[220px] z-[2]', img: 'flower.webp' },
  { cls: 'top-[31px] left-[-37px] w-[165px] h-[165px] z-[1]', img: 'flower.webp' },
  { cls: 'top-[137px] left-[-16px] w-[90px] h-[90px] z-[3]', img: 'flower.webp' },
]

const leaves = [
  { cls: 'top-[-60px] left-[104px] w-[145px] h-[145px] z-[1]', img: 'leaf.webp', rot: 318 },
  { cls: 'top-[-19px] left-[125px] w-[145px] h-[145px] z-[1]', img: 'leaf.webp', rot: 2 },
  { cls: 'top-[174px] left-[1px] w-[70px] h-[70px] z-[1]', img: 'leaf-rev.webp', rot: 278 },
  { cls: 'top-[171px] left-[-18px] w-[63px] h-[63px] z-[1]', img: 'leaf-rev.webp', rot: 290 },
  { cls: 'top-[149px] left-[-31px] w-[63px] h-[63px] z-[1]', img: 'leaf-rev.webp', rot: 317 },
]

export default function Decorations({ start }) {
  const anim = start ? 'show' : 'hidden'

  // Subtle scroll parallax for the corner flowers (composed on outer wrappers
  // so it never fights the entrance transform or the idle float).
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, -60])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }
  const flowerVar = {
    hidden: { scale: 0, rotate: -45 },
    show: { scale: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }
  const leafVar = (rot) => ({
    hidden: { scale: 0, rotate: rot },
    show: { scale: 1, rotate: rot, transition: { duration: 0.8, ease: 'easeOut' } },
  })
  const lineVar = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  // Gentle idle float applied *after* the entrance finishes (CSS on a wrapper,
  // so it composes with framer-motion's transform instead of fighting it).
  const floatA = start
    ? { animation: 'floatSoft 6s ease-in-out infinite', animationDelay: '0.9s' }
    : undefined
  const floatB = start
    ? { animation: 'floatSoft2 7.5s ease-in-out infinite', animationDelay: '1.1s' }
    : undefined

  return (
    <div ref={ref} className="pointer-events-none absolute h-full w-full">
      {/* bottom-right flower on the whole card — with scroll parallax */}
      <motion.div
        className="absolute bottom-[-10px] right-[-10px] h-[220px] w-[220px] z-[2] max-[420px]:h-[180px] max-[420px]:w-[180px] max-[420px]:bottom-[30px]"
        style={{ y: yBottom }}
      >
        <div className="h-full w-full" style={floatB}>
          <motion.div
            className="h-full w-full"
            style={bg('flower-down.webp')}
            variants={flowerVar}
            initial="hidden"
            animate={anim}
          />
        </div>
      </motion.div>

      {/* decorative vertical accent lines */}
      <motion.img
        src="/img/line.svg"
        alt=""
        width="6"
        height="215"
        className="absolute left-[10px] top-1/2 z-[3] -translate-y-1/2 max-[420px]:left-0"
        variants={lineVar}
        initial="hidden"
        animate={anim}
      />
      <motion.img
        src="/img/line1.svg"
        alt=""
        width="6"
        height="215"
        className="absolute left-[25px] top-[40%] z-[1] max-[420px]:left-[10px]"
        variants={lineVar}
        initial="hidden"
        animate={anim}
      />

      {/* cluster of flowers + leaves (top-left) */}
      <motion.div
        className="absolute left-[10px] top-0 h-[260px] w-[265px] max-[400px]:left-[-10px] max-[400px]:top-[25px] max-[400px]:scale-[0.8] max-[440px]:top-[25px]"
        style={floatA}
        variants={container}
        initial="hidden"
        animate={anim}
      >
        {leaves.map((l, i) => (
          <motion.div
            key={`leaf-${i}`}
            className={`absolute ${l.cls}`}
            style={bg(l.img)}
            variants={leafVar(l.rot)}
          />
        ))}
        {flowers.map((f, i) => (
          <motion.div
            key={`flower-${i}`}
            className={`absolute ${f.cls}`}
            style={bg(f.img)}
            variants={flowerVar}
          />
        ))}
      </motion.div>
    </div>
  )
}
