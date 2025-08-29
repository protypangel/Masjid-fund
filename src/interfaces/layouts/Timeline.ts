export const StepStatus = ['todo', 'doing', 'done'] as const
export type StepStatus = typeof StepStatus[number]

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
// type: 1|...| N
type OneToN<N extends number> = Exclude<Enumerate<N> | N, 0>
export type NumberOfFilter = OneToN<typeof StepStatus.length>

export type Link = {
  label: string
  href: string
}

export interface TimelineProps {
  title: string
  steps: TimelineStep[]
}
export interface TimelineStep {
  title: string
  subtitle?: string
  description?: string
  status: StepStatus
  progress: number
  weight: number
  periode: {
    start: string
    end: string
  }
  budget: {
    planned: number
    spent: number
  }
  tags?: string[]
  links?: Link[]
}

/* Filter */

import GanttIcon from '@/assets/project/Gantt.svg'
import KanbanIcon from '@/assets/project/Kanban.svg'

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