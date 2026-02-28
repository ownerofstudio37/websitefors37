import { SchemaType } from '@/lib/schema'

interface SchemaProps {
  schema: SchemaType | SchemaType[]
}

/**
 * Server component to inject JSON-LD structured data into page head
 * Usage in page.tsx:
 * <Schema schema={generateOrganizationSchema()} />
 */
export default function Schema({ schema }: SchemaProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, idx) => (
        <script
          key={`schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
