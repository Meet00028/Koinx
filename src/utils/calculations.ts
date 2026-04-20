import type { CapitalGains, Holding } from "../types";

export interface PreHarvestingResult {
  netStcg: number;
  netLtcg: number;
  realisedCapitalGains: number;
}

export interface PostHarvestingResult {
  netStcg: number;
  netLtcg: number;
  effectiveCapitalGains: number;
  savings: number;
  updatedGains: CapitalGains;
}

export const calculatePreHarvesting = (gains: CapitalGains): PreHarvestingResult => {
  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
  const realisedCapitalGains = netStcg + netLtcg;

  return {
    netStcg,
    netLtcg,
    realisedCapitalGains
  };
};

export const calculatePostHarvesting = (
  initialGains: CapitalGains,
  holdings: Holding[],
  selectedCoinIds: Set<string> | string[]
): PostHarvestingResult => {
  const selectedSet = selectedCoinIds instanceof Set ? selectedCoinIds : new Set(selectedCoinIds);

  const updatedGains: CapitalGains = {
    stcg: { ...initialGains.stcg },
    ltcg: { ...initialGains.ltcg }
  };

  holdings.forEach(holding => {
    if (selectedSet.has(holding.coin)) {
      if (holding.stcg.gain > 0) {
        updatedGains.stcg.profits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        updatedGains.stcg.losses += Math.abs(holding.stcg.gain);
      }

      if (holding.ltcg.gain > 0) {
        updatedGains.ltcg.profits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        updatedGains.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    }
  });

  const netStcg = updatedGains.stcg.profits - updatedGains.stcg.losses;
  const netLtcg = updatedGains.ltcg.profits - updatedGains.ltcg.losses;
  const effectiveCapitalGains = netStcg + netLtcg;

  const preHarvesting = calculatePreHarvesting(initialGains);
  const savings = Math.max(0, preHarvesting.realisedCapitalGains - effectiveCapitalGains);

  return {
    netStcg,
    netLtcg,
    effectiveCapitalGains,
    savings,
    updatedGains
  };
};