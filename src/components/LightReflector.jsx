// A soft animated "light reflector" — a warm glare that sweeps across, plus a
// gentle glow pooled against the edge. Used at the page header and footer.
export default function LightReflector({ position = 'top', delay = 0 }) {
  const glow =
    position === 'top'
      ? 'radial-gradient(120% 100% at 50% 0%, rgba(247,236,210,0.20), rgba(247,236,214,0) 70%)'
      : 'radial-gradient(120% 100% at 50% 100%, rgba(247,236,210,0.20), rgba(247,236,214,0) 70%)'

  return (
    <div aria-hidden className={`reflector reflector--${position}`}>
      <div className="absolute inset-0" style={{ background: glow }} />
      <div className="reflector__beam" style={{ animationDelay: `${delay}s` }} />
    </div>
  )
}
