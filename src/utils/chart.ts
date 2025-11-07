import type { CoffeeConsumptionResponse } from '@/net/type';

export function adaptCoffeeConsumption(input: any): CoffeeConsumptionResponse {
  if (!input || !Array.isArray(input.teams)) return { teams: [] };

  return {
    teams: input.teams.map((t: any) => ({
      team: t?.team ?? t?.name ?? 'Unknown',
      series: Array.isArray(t?.series) ? t.series : Array.isArray(t?.data) ? t.data : [],
    })),
  };
}

export const flattenCoffeeTeams = (resp?: CoffeeConsumptionResponse) => {
  const teams = resp?.teams ?? [];
  return teams.flatMap(team =>
    (team.series ?? []).map(d => ({
      team: team.team,
      cups: d.cups,
      bugs: d.bugs,
      productivity: d.productivity,
    })),
  );
};
