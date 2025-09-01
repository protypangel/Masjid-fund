export const StepStatus = ['todo', 'doing', 'done'] as const
export type StepStatus = typeof StepStatus[number]

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
// type: 1|...| N
type OneToN<N extends number> = Exclude<Enumerate<N> | N, 0>
export type NumberOfFilter = OneToN<typeof StepStatus.length>

export type FilterPageLabel = 'Kanban' | 'Gantt'


export const statusUI: Record<StepStatus, { title: string, color: string, background: string}> = {
  done: {
    title: 'Terminé',
    color: 'text-primary-foreground',
    background: 'bg-primary',
  },
  doing: {
    title: 'En cours',
    color: 'text-secondary-foreground',  
    background: 'bg-secondary',
  },
  todo: {
    title: 'A faire',
    color: 'text-accent',
    background: 'bg-muted-foreground/20',
  },
}

export interface StepProgressProps {
  status: StepStatus
  progress: number
}

export type Link = {
  label: string
  href: string
}

export interface TimelineProps {
  title: string
  steps: TimelineStep[]
}
export interface TimelineStep extends StepProgressProps {
  title: string
  subtitle?: string
  description?: string
  weight: number
  periode: {
    start: string
    end: string
  }
  budget: {
    planned: number
    spent: number
  }
  tags: string[]
  links: Link[]
}