export { StepStatus } from './Timeline'
export type { NumberOfFilter } from './Timeline'

import GanttIcon from '@/assets/project/Gantt.svg'
import KanbanIcon from '@/assets/project/Kanban.svg'

import { StepStatus } from './Timeline'
import type { NumberOfFilter } from './Timeline'


export interface FilterPage {
  icon: string
  title: FilterPageLabel
}
export type FilterPageLabel = 'Kanban' | 'Gantt'

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
  modelFilter: Set<StepStatus>,
  numberOfFilter: NumberOfFilter
}

export interface FilterEmits {
  'update:modelPage': [page: FilterPageLabel],
  'update:modelFilter': [filter: Set<StepStatus>]
}