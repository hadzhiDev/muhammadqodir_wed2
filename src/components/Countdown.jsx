import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getWeddingDateParts } from '../lib/config'

const target = new Date(`${getWeddingDateParts().iso}T00:00:00`).getTime()

function calc() {
  const distance = target - Date.now()
  if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

const Dot = () => <div className="h-[10px] w-[10px] rounded-full bg-dot" />

// A single number that flips up when its value changes.
function Flip({ value, className }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Countdown overlaid on the decorative frame image (".block_2").
export default function Countdown() {
  const [t, setT] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative my-[50px] w-full max-w-[440px] overflow-hidden rounded-[24px] bg-[#FFFDF4] shadow-[0_16px_44px_-14px_rgba(120,100,60,0.4)] ring-1 ring-black/5">
      <img
        src="/img/block_2.png"
        alt=""
        width="416"
        height="660"
        loading="lazy"
        decoding="async"
        className="w-full"
      />

      {/* The baked-in "А & М" monogram in block_2.png is masked with a
          cream patch (#FAF4EE, sampled from the art) and replaced with a
          crisp, live "М & О" monogram so it stays sharp at any size. */}
      <div className="pointer-events-none absolute inset-0">
        {/* cream mask over the old monogram (x 34.7–67.9%, y ~25.1%) */}
        <div
          className="absolute"
          style={{ left: '28%', right: '28%', top: '22.2%', height: '5.6%', background: '#FAF4EE' }}
        />
        {/* new monogram, vertically centred on the old one */}
        <div
          className="absolute inset-x-0 flex items-center justify-center gap-[clamp(0.4rem,2.2vw,0.7rem)] font-display leading-none"
          style={{ top: '25.1%', transform: 'translateY(-50%)' }}
        >
          <span aria-hidden className="rule-gold h-px w-[clamp(1rem,5vw,1.6rem)]" />
          <span className="text-graphite text-[clamp(1.05rem,5.4vw,1.6rem)] tracking-[0.02em]">М</span>
          <span className="text-gold font-cormorant text-[clamp(0.85rem,4.4vw,1.25rem)] italic">&</span>
          <span className="text-graphite text-[clamp(1.05rem,5.4vw,1.6rem)] tracking-[0.02em]">О</span>
          <span aria-hidden className="rule-gold--rev h-px w-[clamp(1rem,5vw,1.6rem)]" />
        </div>

        {/* mask + translate baked-in "Тўйгача:" (centre y≈35.6%) → "До свадьбы:" */}
        <div className="absolute" style={{ left: '28%', right: '28%', top: '33%', height: '5.2%', background: '#FCF5EF' }} />
        <div
          className="absolute inset-x-0 text-center font-display text-graphite text-[clamp(1.25rem,6vw,1.85rem)] leading-none"
          style={{ top: '35.6%', transform: 'translateY(-50%)' }}
        >
          До свадьбы:
        </div>

        {/* mask + translate baked-in "КОЛДИ" (centre y≈75.3%) → "ОСТАЛОСЬ" */}
        <div className="absolute" style={{ left: '30%', right: '30%', top: '73.3%', height: '3.6%', background: '#FCF5EF' }} />
        <div
          className="absolute inset-x-0 text-center font-display font-semibold uppercase text-graphite text-[clamp(0.9rem,4.3vw,1.3rem)] tracking-[0.12em] leading-none"
          style={{ top: '75.3%', transform: 'translateY(-50%)' }}
        >
          Осталось
        </div>
      </div>

      <motion.div
        className="absolute bottom-[31.5%] left-0 right-0 mx-auto w-full max-w-[60%] text-graphite"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* days */}
        <div className="flex w-full flex-col items-center justify-center">
          <Flip
            value={t.days}
            className="numeral-soft font-display text-[4.75rem] italic leading-none text-graphite max-[400px]:text-[2.7rem] max-[440px]:text-[3rem]"
          />
          <p className="font-cormorant text-[1.625rem] font-medium uppercase tracking-[0.18em] max-[400px]:text-[1.2rem]">Дней</p>
        </div>

        {/* hours / minutes / seconds */}
        <div className="mt-[10px] flex w-full items-center justify-between gap-[7px] max-[360px]:justify-center max-[360px]:gap-[10px] max-[400px]:justify-around">
          <div className="flex flex-col items-center justify-center">
            <Flip
              value={t.hours}
              className="numeral-soft font-display text-[3em] italic leading-none text-graphite max-[400px]:text-[2rem] max-[440px]:text-[2.4rem]"
            />
            <div className="font-cormorant text-[1rem] font-medium uppercase tracking-[0.14em] max-[400px]:text-[1rem]">Часов</div>
          </div>
          <Dot />
          <div className="flex flex-col items-center justify-center">
            <Flip
              value={t.minutes}
              className="numeral-soft font-display text-[3rem] italic leading-none text-graphite max-[400px]:text-[2rem] max-[440px]:text-[2.4rem]"
            />
            <div className="font-cormorant text-[1rem] font-medium uppercase tracking-[0.14em] max-[400px]:text-[1rem]">Минут</div>
          </div>
          <Dot />
          <div className="flex flex-col items-center justify-center">
            <Flip
              value={t.seconds}
              className="numeral-soft font-display text-[3rem] italic leading-none text-graphite max-[400px]:text-[2rem] max-[440px]:text-[2.4rem]"
            />
            <div className="font-cormorant text-[1rem] font-medium uppercase tracking-[0.14em] max-[400px]:text-[1rem]">Секунд</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
