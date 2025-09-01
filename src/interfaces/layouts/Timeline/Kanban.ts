export { statusUI } from "./Timeline"
export type { TimelineStep, StepStatus } from "./Timeline"

import type { TimelineStep, StepStatus } from "./Timeline"

export interface KanbanProps {
  steps: TimelineStep[]
  currentFilter: Set<StepStatus>
}