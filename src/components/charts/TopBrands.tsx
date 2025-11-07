import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { apiTopCoffeeBrands } from '@/net/api';
import { useTranslation } from 'react-i18next';
import { ChartBox } from './ChartBox';

const PINKS = ['#F43F5E', '#FB7185', '#FDA4AF', '#FECACA', '#FEE2E2'];

const BRAND_KEY_BY_LABEL: Record<string, string> = {
  스타벅스: 'starbucks',
  컴포즈커피: 'composecoffee',
  커피빈: 'coffeebean',
  바나프레소: 'banapresso',
  기타: 'others',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

const TopBrands = () => {
  const { t, i18n } = useTranslation('charts');
  const { data } = useQuery({ queryKey: ['top-brands'], queryFn: apiTopCoffeeBrands });
  if (!data) return null;

  const nf = new Intl.NumberFormat(i18n.language);

  const chartData = data.map((d: { brand: string; popularity: number }) => {
    const key = BRAND_KEY_BY_LABEL[d.brand] ?? slugify(d.brand);
    return {
      ...d,
      brandKey: key,
      brandLabel: t(`brands.${key}`, { defaultValue: d.brand }),
    };
  });

  return (
    <ChartBox>
      <h3>{t('title_brands_donut')}</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="popularity" nameKey="brandLabel" innerRadius={60} outerRadius={100}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={PINKS[i % PINKS.length]} />
              ))}
            </Pie>
            <Tooltip
              separator=" · "
              formatter={(v: number, name: string) => [`${nf.format(v)}%`, name]}
              labelFormatter={() => ''}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: 16 }}>{t('title_brands_bar')}</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brandLabel" />
            <YAxis tickFormatter={v => `${nf.format(v)}%`} />
            <Tooltip
              separator=" · "
              formatter={(v: number, name: string) => [`${nf.format(v)}%`, name]}
              labelFormatter={() => ''}
            />
            <Legend formatter={() => t('legend_popularity', { defaultValue: 'Popularity' })} />
            <Bar
              dataKey="popularity"
              name={t('legend_popularity', { defaultValue: 'Popularity' })}
              fill={PINKS[0]}
              radius={[6, 6, 0, 0]}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={PINKS[i % PINKS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
};

export default TopBrands;
