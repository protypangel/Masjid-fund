export type Direction = 'down' | 'up'
export type ShouldScrollIndicatorProps = {
  message?: string
  direction?: Direction
  threshold?: number
  hidePermanently?: boolean
  initiallyVisible?: boolean
  animated?: boolean
}

export const defaultShouldScrollIndicatorProps: ShouldScrollIndicatorProps = {
  message: 'Défilez pour en voir plus',
  direction: 'down',
  threshold: 40,
  hidePermanently: true,
  initiallyVisible: true,
  animated: true
}