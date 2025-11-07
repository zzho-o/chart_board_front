import { Company, Contact, Inner, Wrap } from '@/styles/app.footer';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <Wrap>
      <Inner>
        <Company>{t('companyBlock')}</Company>
        <Contact>
          <strong>{t('contact')}</strong>
          <div>{t('email')}</div>
        </Contact>
      </Inner>
    </Wrap>
  );
};

export default Footer;
