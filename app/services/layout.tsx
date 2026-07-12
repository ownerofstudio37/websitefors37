import ServicesConversionTail from '@/components/ServicesConversionTail'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ServicesConversionTail />
    </>
  )
}
