import RevealText from './RevealText'

// Greeting block (".section_2_title") with the invitation prose.
export default function Greeting({ name }) {
  const greeting = name
    ? `«${name}», с любовью приглашаем вас разделить с нами один из самых важных и счастливых дней нашей жизни 🤍`
    : 'С любовью приглашаем вас разделить с нами один из самых важных и счастливых дней нашей жизни 🤍'

  const body =
    'Будем очень рады видеть вас рядом в этот особенный день.\nВаше присутствие сделает наш праздник ещё теплее и прекраснее.'

  return (
    <div className="w-full">
      <RevealText
        as="h1"
        gradient
        className="mb-[26px] font-display text-[clamp(1.6rem,6.8vw,2.2rem)] font-semibold leading-[1.2] tracking-[0.005em] max-[400px]:mb-5"
        text={greeting}
      />
      <RevealText
        as="p"
        stagger={0.03}
        className="mb-[30px] font-body text-[clamp(1rem,4.2vw,1.125rem)] font-normal leading-[1.6] text-parchment/90 max-[400px]:mb-5"
        text={body}
      />
    </div>
  )
}
