import Input from '@/components/common/ui/Input';
import Button from '@/components/common/ui/Button';
import { useTranslation } from 'react-i18next';
import { Actions, Bar, BottomRow, Controls, Select, TopRow } from '@/styles/PostFilters';

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: 'NOTICE' | 'QNA' | 'FREE' | '';
  setCategory: (v: any) => void;
  sort: 'createdAt' | 'title';
  setSort: (v: any) => void;
  order: 'asc' | 'desc';
  setOrder: (v: any) => void;
  onNew: () => void;
  onClearAll: () => void;
};

const PostFilters = (p: Props) => {
  const { t } = useTranslation('posts');

  return (
    <Bar>
      <TopRow>
        <Input
          placeholder={t('searchPlaceholder')}
          value={p.search}
          onChange={e => p.setSearch(e.target.value)}
          size="md"
          style={{ flex: 1 }}
        />
      </TopRow>

      <BottomRow>
        <Controls>
          {/* Category */}
          <Select value={p.category} onChange={e => p.setCategory(e.target.value as any)}>
            <option value="">{t('category_all')}</option>
            <option value="NOTICE">{t('category_NOTICE')}</option>
            <option value="QNA">{t('category_QNA')}</option>
            <option value="FREE">{t('category_FREE')}</option>
          </Select>

          {/* Sort field */}
          <Select value={p.sort} onChange={e => p.setSort(e.target.value as any)}>
            <option value="createdAt">{t('sort_createdAt')}</option>
            <option value="title">{t('sort_title')}</option>
          </Select>

          {/* Order */}
          <Select value={p.order} onChange={e => p.setOrder(e.target.value as any)}>
            <option value="desc">{t('order_desc')}</option>
            <option value="asc">{t('order_asc')}</option>
          </Select>
        </Controls>

        <Actions>
          <Button variant="ghost" onClick={p.onClearAll}>
            {t('btn_delete')}
          </Button>
          <Button variant="primary" onClick={p.onNew}>
            {t('new')}
          </Button>
        </Actions>
      </BottomRow>
    </Bar>
  );
};
export default PostFilters;
