// src/pages/home.page.tsx
import { useAuthStore } from '@/stores/store.auth';
import { Wrap, Hero, Row, Card } from '@/styles/home.page';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation('home');

  const title = user?.email ? t('greeting_named', { name: user.email }) : t('greeting');

  return (
    <Wrap>
      <Hero>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <div style={{ color: '#9aa0a6' }}>{t('subtitle')}</div>
      </Hero>

      <Row>
        <Card to="/posts">
          <h3 style={{ margin: 0 }}>{t('posts.title')}</h3>
          <p style={{ margin: '6px 0 0', color: '#9aa0a6' }}>{t('posts.desc')}</p>
        </Card>

        <Card to="/charts">
          <h3 style={{ margin: 0 }}>{t('charts.title')}</h3>
          <p style={{ margin: '6px 0 0', color: '#9aa0a6' }}>{t('charts.desc')}</p>
        </Card>
      </Row>
    </Wrap>
  );
};
export default HomePage;
