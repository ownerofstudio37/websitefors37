import { Award, ExternalLink } from 'lucide-react'
import { type Credential, credentialPersonSchema, getCredentials } from '@/lib/credentials'

// Certification cards with verification links, plus matching Person/credential JSON-LD.
export default function CredentialBadges({ ids, heading = 'Certifications' }: { ids: Credential['id'][]; heading?: string }) {
  const items = getCredentials(ids)
  if (!items.length) return null

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialPersonSchema(ids)) }} />
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">{heading}</h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((credential) => (
          <li key={credential.id}>
            <a
              href={credential.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 transition hover:border-amber-300"
            >
              {credential.badge ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={credential.badge.src} alt={credential.badge.alt} width={64} height={64} className="h-16 w-16 flex-shrink-0 rounded-lg" />
              ) : (
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <Award className="h-8 w-8" aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-stone-950">{credential.name}</span>
                <span className="block text-sm text-stone-500">
                  {credential.issuer}
                  {credential.issued && ` · ${credential.issued}`}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-800 group-hover:underline">
                  Verify <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
