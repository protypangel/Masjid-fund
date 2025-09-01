export { statusUI, StepStatus } from "./Timeline"
export type { TimelineStep, StepStatusType } from "./Timeline"

import type { TimelineStep, StepStatusType } from "./Timeline"
import type { CardProps } from "./Card"

import { StepStatus } from "./Timeline"

export interface KanbanProps {
  steps: TimelineStep[]
  currentFilter: Set<StepStatusType>
}

export function formatKanbanPropsToRecordStepStatus_CardPropsArray(kanbanProps: KanbanProps): Record<StepStatus, CardProps[]> {
  const currentFilter: Record<StepStatusType, CardProps[]> =
    StepStatus.filter((status) => kanbanProps.currentFilter.has(status))
    .reduce((acc, current) => {
      acc[current] = []
      return acc
    }, {} as Record<StepStatusType, CardProps[]>)

    return kanbanProps.steps.reduce((acc, step) => {
      if (!kanbanProps.currentFilter.has(step.status)) return acc;
      const stepProps: CardProps = { step: step }
      acc[step.status] = [...(acc[step.status] || []), stepProps] as CardProps[]
      return acc
    }, currentFilter)
}