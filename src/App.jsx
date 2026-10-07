import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import ScrollHint from './components/ScrollHint'
import InvitationCard from './components/InvitationCard'
import Divider from './components/Divider'
import Greeting from './components/Greeting'
import Timeline from './components/Timeline'
import Countdown from './components/Countdown'
import LocationMap from './components/LocationMap'
import LightReflector from './components/LightReflector'
import { getGuestName } from './lib/transliterate'

export default function App() {
  const [loading, setLoading] = useState(true)
  const name = getGuestName()

  useEffect(() => {
    // Hide the loader as soon as the page is ready, but keep it on screen for a
    // short minimum so the reveal never flashes. Much faster than a fixed wait.
    document.body.style.overflow = 'hidden'
    const MIN_MS = 300
    const startedAt = performance.now()

    let timer
    const finish = () => {
      const elapsed = performance.now() - startedAt
      timer = setTimeout(() => {
        setLoading(false)
        document.body.style.overflow = ''
      }, Math.max(0, MIN_MS - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', finish)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-5 max-[400px]:p-4 max-[340px]:p-3">
      <Loader visible={loading} />
      <ScrollHint active={!loading} />

      {/* Two light reflectors: one on the header, one on the footer */}
      <LightReflector position="top" delay={0} />
      <LightReflector position="bottom" delay={3.5} />

      <div className="relative z-10 w-full max-w-[440px]">
        <InvitationCard name={name} start={!loading} />
        <Divider />
        <Greeting name={name} />
        <Divider />
        <Timeline />
        <Divider />
        <Countdown />
        <Divider />
        <LocationMap />

        <footer className="mt-2 mb-8 px-6 text-center max-[400px]:mb-6">
          <p 
          // className="text-center font-display text-[clamp(1.6rem,7vw,2.125rem)] font-semibold leading-[1.25] tracking-[0.015em]"
          className="font-cormorant text-elegant text-[32px] leading-[38px] tracking-[0.02em] font-bold max-[400px]:text-[20px]"
          >
            С любовью,
            <br />
            семья Кадировых 🤍
          </p>
        </footer>
      </div>
    </div>
  )
}
