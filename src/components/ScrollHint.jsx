import { useEffect, useState } from 'react'

// Shows a bouncing "scroll" hand after 10s of no scrolling (ported behaviour).
export default function ScrollHint({ active }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!active) return
    let scrolled = false
    const onScroll = () => {
      scrolled = true
      setShow(false)
    }
    window.addEventListener('scroll', onScroll)
    const t = setTimeout(() => {
      if (!scrolled) setShow(true)
    }, 10000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [active])

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-1/2 z-[9999] h-[150px] w-[150px] bg-center bg-no-repeat transition-opacity duration-500"
      style={{
        backgroundImage: "url('/img/scroll-hand.svg')",
        backgroundSize: 'contain',
        opacity: show ? 1 : 0,
        animation: 'scrollBounce 1.2s ease-in-out infinite',
      }}
    />
  )
}
