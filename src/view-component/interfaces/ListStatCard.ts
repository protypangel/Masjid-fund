export interface StatCardProps {
  title: string;
  subtitle: string;
  subtitleHover?: string;
  container: number;
  containerHover?: number;
  unit: string;
  unitHover?: string;
}

export interface StatCardAndClassProps extends StatCardProps {
  class?: string;
}

export type StatCardType = 'total' | "last Jumu'ah" | 'prochain Palier' | 'global';

