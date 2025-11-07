import TopBrands from '@/components/charts/TopBrands';
import WeeklyMood from '@/components/charts/WeeklyMood';
import CoffeeMultiLine from '@/components/charts/CoffeeMultiLine';
import { Wrap } from '@/styles/charts.page';

export default function ChartsPage() {
  return (
    <Wrap>
      <div className="grid2">
        <TopBrands />
        <WeeklyMood />
      </div>
      <CoffeeMultiLine />
    </Wrap>
  );
}
