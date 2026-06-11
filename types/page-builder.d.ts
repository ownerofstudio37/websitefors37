export interface PageComponent {
  id: string
  type: string
  data?: Record<string, unknown>
  children?: PageComponent[]
}
