export const PORTRAIT_HOURLY_RATE_CENTS = 500_00
export const EXTRA_PERSON_OVER_FIVE_CENTS = 50_00

const SHORT_SESSION_MINIMUMS_CENTS: Record<number, number> = {
  15: 250_00,
  30: 350_00,
  45: 425_00,
}

export function calculatePortraitSessionBaseCents(minutes: number) {
  const shortSessionPrice = SHORT_SESSION_MINIMUMS_CENTS[minutes]
  if (shortSessionPrice) return shortSessionPrice

  return Math.round((PORTRAIT_HOURLY_RATE_CENTS * minutes) / 60)
}

export function calculatePortraitSessionTotalCents({
  minutes,
  category,
  people,
}: {
  minutes: number
  category: 'solo' | 'couple' | 'family'
  people: number
}) {
  const base = calculatePortraitSessionBaseCents(minutes)
  const extraPersonFee =
    category === 'family' && people > 5
      ? (people - 5) * EXTRA_PERSON_OVER_FIVE_CENTS
      : 0

  return base + extraPersonFee
}
