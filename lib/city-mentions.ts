// How many times a piece of text is really about a city. Shared by blog posts (local links) and city
// guides (related posts) so both apply the same rules.
// City names that are also ordinary words only count with a state or "Old Town" next to them.
const AMBIGUOUS_CITIES = new Set(['Spring', 'Humble', 'Porter', 'Cleveland', 'Waller', 'Willis', 'Magnolia'])
// Phrases that contain a city name but are not about that city.
const NOT_THE_CITY = /Montgomery County|Sam Houston|Lake Houston|Pinehurst studio|studio in Pinehurst/g

export function cityMentions(text: string, city: string) {
  const name = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = AMBIGUOUS_CITIES.has(city)
    ? new RegExp(`(Old Town ${name}|\\b${name},? (TX|Texas)\\b|\\bin ${name}\\b)`, 'g')
    : new RegExp(`\\b${name}\\b`, 'g')
  return (text.replace(NOT_THE_CITY, ' ').match(pattern) || []).length
}

