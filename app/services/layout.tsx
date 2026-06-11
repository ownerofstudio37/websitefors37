import { PublicConversionStack } from '@/components/PublicConversionSections'
import ServiceExpectationCards from '@/components/ServiceExpectationCards'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceExpectationCards serviceName="photography" />
      {children}
      <PublicConversionStack serviceName="photography" />
    </>
  )
}
