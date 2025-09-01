export type { StepStatusType } from './Timeline'
export { StepStatus } from './Timeline'
export type { NumberOfFilter } from './Timeline'
export type { FilterPageLabel } from './Timeline'

import GanttIcon from '@/assets/project/Gantt.svg'
import KanbanIcon from '@/assets/project/Kanban.svg'

import type { StepStatusType } from './Timeline'
import type { NumberOfFilter } from './Timeline'
import type { FilterPageLabel } from './Timeline'


export interface FilterPage {
  icon: string
  title: FilterPageLabel
}

export const typesPage: FilterPage[] = [
  {
    icon: KanbanIcon,
    title: 'Kanban',
  },
  {
    icon: GanttIcon,
    title: 'Gantt',
  },
]

export interface FilterProps {
  modelPage: FilterPageLabel,
  modelFilter: Set<StepStatusType>,
  numberOfFilter: NumberOfFilter
}

export interface FilterEmits {
  'update:modelPage': [page: FilterPageLabel],
  'update:modelFilter': [filter: Set<StepStatusType>]
}