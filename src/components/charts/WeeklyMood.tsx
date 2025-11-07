import { useQuery } from '@tanstack/react-query';
import { apiWeeklyMoodTrend } from '@/net/api';
import { ChartBox } from './ChartBox';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const MOOD = {
  happy: '#60A5FA',
  tired: '#93C5FD',
  stressed: '#BFDBFE',
};

const WeeklyMood = () => {
  const { t } = useTranslation('charts');
  const { data } = useQuery({ queryKey: ['weekly-mood'], queryFn: apiWeeklyMoodTrend });
  if (!data) return null;

  const pct = (v: number) => t('tooltip_percent', { value: Math.round(v * 100) });

  return (
    <ChartBox>
      <h3>{t('title_weekly_area')}</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={data} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={pct as any} />
            <Tooltip formatter={(v: number) => [pct(v), '']} />
            <Legend />
            <Area
              type="monotone"
              dataKey="happy"
              name={t('series_happy')}
              stackId="1"
              stroke={MOOD.happy}
              fill={MOOD.happy}
            />
            <Area
              type="monotone"
              dataKey="tired"
              name={t('series_tired')}
              stackId="1"
              stroke={MOOD.tired}
              fill={MOOD.tired}
            />
            <Area
              type="monotone"
              dataKey="stressed"
              name={t('series_stressed')}
              stackId="1"
              stroke={MOOD.stressed}
              fill={MOOD.stressed}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: 16 }}>{t('title_weekly_bar')}</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={pct as any} />
            <Tooltip formatter={(v: number) => [pct(v), '']} />
            <Legend />
            <Bar dataKey="happy" name={t('series_happy')} stackId="a" fill={MOOD.happy} />
            <Bar dataKey="tired" name={t('series_tired')} stackId="a" fill={MOOD.tired} />
            <Bar dataKey="stressed" name={t('series_stressed')} stackId="a" fill={MOOD.stressed} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
};

export default WeeklyMood;
