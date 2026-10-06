# Wedding Invitation — React + Tailwind

A React port of the original Django/HTML wedding invitation, built with
**Vite + React + Tailwind CSS v4** and animated with **framer-motion**.

## Run

```bash
cd react-invitation
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Personalised guest link

The guest's name comes from the URL (latin → cyrillic transliteration, same
logic as the old Django view):

- `/` → generic invitation ("азиз меҳмонимиз")
- `/?name=aziz-mehmon` → personalised ("Азиз меҳмон")

## Editing the invitation

Everything editable lives in [`src/lib/config.js`](src/lib/config.js):

| Setting             | What it controls                                        |
| ------------------- | ------------------------------------------------------- |
| `WEDDING_DATE`      | Big `07/07/25` block, the prose date, and the countdown |
| `LOCATION_MAP_URL`  | The embedded Yandex map                                 |
| `LOCATION_TITLE`    | The address title above the map                         |
| `STAGES`            | The program-of-the-day timeline (label + time)          |

## Structure

```
src/
  App.jsx                 # loader timing, layout, name detection
  lib/config.js           # all editable wedding settings
  lib/transliterate.js    # latin -> cyrillic name (ported from Django)
  components/
    Loader.jsx            # animated loading bars
    InvitationCard.jsx    # hero card (frame + brand + date)
    Decorations.jsx       # flowers/leaves with scale-in animation
    RevealText.jsx        # word-by-word reveal (replaces GSAP SplitText)
    Greeting.jsx          # invitation prose
    Timeline.jsx          # program of the day
    Countdown.jsx         # live countdown to the wedding
    LocationMap.jsx       # address + Yandex map
    Divider.jsx           # thin vertical separator
    ScrollHint.jsx        # bouncing scroll hint after 10s
public/img/              # images + fonts copied from the original static/
```

## Animations

- **Loader** — bar bounce, then fades out after ~2.5 s.
- **Flowers & leaves** — staggered scale-in (framer-motion), matching the old
  GSAP `animateFlowers` timeline.
- **Text** — word-by-word blur/fade/slide reveal on scroll (the framer-motion
  equivalent of GSAP `SplitText`).
- **Sections** — fade-up as they enter the viewport.
- **Countdown** — updates every second.
