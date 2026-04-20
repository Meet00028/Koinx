export interface GainBalance {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainBalance;
  ltcg: GainBalance;
}

export interface GainLoss {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainLoss;
  ltcg: GainLoss;
}
