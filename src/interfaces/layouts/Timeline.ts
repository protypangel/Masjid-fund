export const StepStatus = ['todo', 'doing', 'done'] as const
export type StepStatus = typeof StepStatus[number]

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
// type: 1|...| N
type OneToN<N extends number> = Exclude<Enumerate<N> | N, 0>
export type NumberOfFilter = OneToN<typeof StepStatus.length>

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

/* Progress */

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

/* Kanban */

export function DateToMonthYear(date: string): string {
  let year: number | null = null;
  let monthIndex: number | null = null;

  const match = date.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
  if (match) {
    year = Number(match[1]);
    monthIndex = Number(match[2]) - 1;
  } else {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      year = parsed.getFullYear();
      monthIndex = parsed.getMonth();
    }
  }

  if (year !== null && monthIndex !== null) {
    const d = new Date(Date.UTC(year, monthIndex, 1));
    const monthLongFr = d.toLocaleString('fr-FR', { month: 'long', timeZone: 'UTC' });
    const monthAscii = monthLongFr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const three = monthAscii.slice(0, 3).toLowerCase();
    const abbr = three.charAt(0).toUpperCase() + three.slice(1);
    return `${abbr}-${year}`;
  }
  return date;
}
export function firstLetterToUppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}