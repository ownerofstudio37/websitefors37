import { PublicConversionStack } from '@/components/PublicConversionSections'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PublicConversionStack serviceName="photography" />
    </>
  )
}
