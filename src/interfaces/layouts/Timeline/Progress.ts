export { statusUI } from "./Timeline"

import type { StepProgressProps } from "./Timeline"


export type Purcent = Record<'doing' | 'done', number>

export function StepStatusToPurcent(steps: StepProgressProps[]): Purcent {
  return {
    doing: steps.filter(s => s.status === 'doing').reduce((acc, s) => acc + s.progress, 0) / steps.length,
    done: steps.filter(s => s.status === 'done').reduce((acc, s) => acc + s.progress, 0) / steps.length,
  }
}

export interface ProgressProps {
  steps: StepProgressProps[]
  modelTotal: number
}

export interface ProgressEmits {
  'update:modelTotal': [total: number]
}

export interface ProgressEmits {
  'update:modelTotal': [total: number]
}
