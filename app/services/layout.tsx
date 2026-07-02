import { PublicConversionStack } from '@/components/PublicConversionSections'
import ServiceExpectationCards from '@/components/ServiceExpectationCards'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ServiceExpectationCards serviceName="photography" />
      <PublicConversionStack serviceName="photography" />
    </>
  )
}
