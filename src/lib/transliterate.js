// Latin -> cyrillic letter map (ported from the Django views).
const LATIN_TO_CYRILLIC = {
  a: 'а', b: 'б', d: 'д', e: 'е', f: 'ф', g: 'г',
  h: 'ҳ', i: 'и', j: 'ж', k: 'к', l: 'л', m: 'м',
  n: 'н', o: 'о', p: 'п', q: 'қ', r: 'р', s: 'с',
  t: 'т', u: 'у', v: 'в', x: 'х', y: 'й', z: 'з',
  sh: 'ш', ch: 'ч', ng: 'нг', ya: 'я', yo: 'ё',
  yu: 'ю', 'o‘': 'ў', 'g‘': 'ғ',
}

// Turn a latin name (from ?name= in the URL) into a readable cyrillic name.
export function transliterate(name) {
  if (!name) return ''
  let result = name.toLowerCase()
  // Replace longer keys first (sh, ch, ...) so they win over single letters.
  const keys = Object.keys(LATIN_TO_CYRILLIC).sort((a, b) => b.length - a.length)
  for (const latin of keys) {
    result = result.split(latin).join(LATIN_TO_CYRILLIC[latin])
  }
  result = result.replace(/-/g, ' ').trim()
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// Read the guest name from the URL: ?name=aziz-mehmon  or  /aziz-mehmon
export function getGuestName() {
  const params = new URLSearchParams(window.location.search)
  const fromQuery = params.get('name')
  const fromPath = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return transliterate(fromQuery || fromPath)
}
