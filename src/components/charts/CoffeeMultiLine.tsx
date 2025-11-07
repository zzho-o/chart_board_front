import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiCoffeeConsumption } from '@/net/api';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { adaptCoffeeConsumption, flattenCoffeeTeams } from '@/utils/chart';
import { useTranslation } from 'react-i18next';
import { ChartBox } from './ChartBox';
import type { CoffeeConsumptionResponse } from '@/net/type';

const TEAM_COLOR: Record<string, string> = {
  Frontend: '#EF4444',
  Backend: '#3B82F6',
  AI: '#10B981',
};

const TeamTooltip = ({
  active,
  payload,
  label,
  hoverTeam,
  t,
}: {
  active?: boolean;
  payload?: any[];
  label?: number | string;
  hoverTeam?: string | null;
  t: (k: string, o?: any) => string;
}) => {
  if (!active || !payload?.length) return null;

  const pickTeam =
    hoverTeam ??
    (() => {
      const dk: string | undefined = payload[0]?.dataKey;
      return dk ? dk.split('_')[0] : undefined;
    })();

  if (!pickTeam) return null;

  const bugs = payload.find(p => p.dataKey === `${pickTeam}_bugs`)?.value;
  const prod = payload.find(p => p.dataKey === `${pickTeam}_prod`)?.value;

  return (
    <div
      style={{
        background: '#111827',
        color: '#fff',
        padding: '10px 12px',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,.35)',
        border: '1px solid rgba(255,255,255,.06)',
        minWidth: 160,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{t('tooltip_team', { team: pickTeam })}</div>
      <div>{t('tooltip_cups', { value: label })}</div>
      <div>{t('tooltip_bugs', { value: bugs ?? '-' })}</div>
      <div>{t('tooltip_prod', { value: prod ?? '-' })}</div>
    </div>
  );
};

const CoffeeMultiLine = () => {
  const { t } = useTranslation('charts');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coffee-consumption'],
    queryFn: apiCoffeeConsumption,
  });

  const [hoverTeam, setHoverTeam] = useState<string | null>(null);

  const raw: CoffeeConsumptionResponse = useMemo(() => adaptCoffeeConsumption(data), [data]);

  const flat = useMemo(() => flattenCoffeeTeams(raw), [raw]);

  const teams = useMemo(() => [...new Set(flat.map(d => d.team))], [flat]);

  const xDomain = useMemo(() => [...new Set(flat.map(d => d.cups))].sort((a, b) => a - b), [flat]);

  const rows = useMemo(() => {
    return xDomain.map(cups => {
      const row: Record<string, number | string> = { cups };
      teams.forEach(tn => {
        const hit = flat.find(d => d.cups === cups && d.team === tn);
        if (hit) {
          row[`${tn}_bugs`] = hit.bugs;
          row[`${tn}_prod`] = hit.productivity;
        }
      });
      return row;
    });
  }, [xDomain, teams, flat]);

  const circleDot = (team: string) => (props: any) => {
    const { cx, cy, r = 4, stroke } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={stroke}
        stroke="none"
        onMouseEnter={() => setHoverTeam(team)}
        onMouseMove={() => setHoverTeam(team)}
      />
    );
  };

  const squareDot = (team: string) => (props: any) => {
    const { cx, cy, stroke } = props;
    const size = 8;
    return (
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        rx={1}
        fill={stroke}
        stroke="none"
        onMouseEnter={() => setHoverTeam(team)}
        onMouseMove={() => setHoverTeam(team)}
      />
    );
  };

  if (isLoading) {
    return (
      <ChartBox>
        <h3>{t('title_coffee_multi')}</h3>
        <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
          {t('loading_or_no_data', { defaultValue: 'Loading…' })}
        </div>
      </ChartBox>
    );
  }

  if (isError) {
    return (
      <ChartBox>
        <h3>{t('title_coffee_multi')}</h3>
        <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
          {t('error_loading', { defaultValue: 'Failed to load data.' })}
        </div>
      </ChartBox>
    );
  }

  if (raw.teams.length === 0 || rows.length === 0) {
    return (
      <ChartBox>
        <h3>{t('title_coffee_multi')}</h3>
        <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
          {t('no_data', { defaultValue: 'No data' })}
        </div>
      </ChartBox>
    );
  }

  return (
    <ChartBox>
      <h3>{t('title_coffee_multi')}</h3>
      <div style={{ height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={rows} onMouseLeave={() => setHoverTeam(null)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cups" label={{ value: t('axis_cups_per_day'), position: 'insideBottom', offset: -5 }} />
            <YAxis yAxisId="left" label={{ value: t('axis_bugs'), angle: -90, position: 'insideLeft' }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: t('axis_prod'), angle: -90, position: 'insideRight' }}
            />
            <Legend />
            <Tooltip content={<TeamTooltip hoverTeam={hoverTeam} t={t} />} />

            {teams.map(tn => (
              <Line
                key={`${tn}-bugs`}
                yAxisId="left"
                type="monotone"
                dataKey={`${tn}_bugs`}
                name={`${tn} Bugs`}
                stroke={TEAM_COLOR[tn] || '#999'}
                strokeWidth={2.4}
                dot={circleDot(tn)}
                activeDot={circleDot(tn)}
                onMouseOver={() => setHoverTeam(tn)}
              />
            ))}

            {teams.map(tn => (
              <Line
                key={`${tn}-prod`}
                yAxisId="right"
                type="monotone"
                dataKey={`${tn}_prod`}
                name={`${tn} Productivity`}
                stroke={TEAM_COLOR[tn] || '#777'}
                strokeWidth={2.4}
                strokeDasharray="6 6"
                dot={squareDot(tn)}
                activeDot={squareDot(tn)}
                onMouseOver={() => setHoverTeam(tn)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
};

export default CoffeeMultiLine;
