import { useNavigate } from 'react-router-dom';
import { Btn, Desc, Row, Title, Wrap } from './styles/not-found';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('notFound');

  return (
    <Wrap>
      <Title>{t('title')}</Title>
      <Desc>{t('desc')}</Desc>

      <Row>
        <Btn onClick={() => navigate(-1)}>{t('back')}</Btn>
        <Btn $primary onClick={() => navigate('/home', { replace: true })}>
          {t('home')}
        </Btn>
      </Row>
    </Wrap>
  );
};
export default NotFoundPage;
