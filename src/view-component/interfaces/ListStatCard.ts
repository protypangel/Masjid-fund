export interface StatCardProps {
  title: string;
  subtitle: string;
  subtitleHover?: string;
  beforeContainer?: string;
  container: number;
  decimals?: number;
  unit: string;

  beforeContainerHover?: string;
  containerHover?: number;
  decimalsHover?: number;
  unitHover?: string;
}

export interface StatCardAndClassProps extends StatCardProps {
  class?: string;
}

export type StatCardType = 'total' | "last Jumu'ah" | 'prochain Palier' | 'global';

