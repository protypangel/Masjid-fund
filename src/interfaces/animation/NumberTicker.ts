export interface NumberTickerProps {
  target?: number;
  duration?: number;
  disable?: boolean;
  decimals?: number;
}

export const defaultNumberTickerProps: NumberTickerProps = {
  target: 0,
  duration: 2000,
  disable: false,
  decimals: 0,
}