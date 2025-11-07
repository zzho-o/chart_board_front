import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/utils/i18n';
import { useAuthStore } from '@/stores/store.auth';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '@/hooks/useHealth';
import { useEffect, useState } from 'react';
import { Bar, Btn, Group, Pill, HideOnMobile, ShowOnMobile, IconBtn, LangSelect } from '@/styles/app.header';
import { LogoutIcon } from '../icons/commons';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const cur = (i18n.resolvedLanguage || i18n.language) as 'ko' | 'en';
  const nav = useNavigate();
  const { isAuthed, user, logout } = useAuthStore();

  const { data, isLoading, isFetching, isError } = useHealth();
  const ok = !!data?.ok && !isError;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Bar $scrolled={scrolled}>
      {isAuthed ? <Btn onClick={() => nav('/home')}>{t('Home')}</Btn> : <div>{t('brand')}</div>}

      <Group>
        <Pill $ok={ok}>{isLoading || isFetching ? 'Health: 체크 중…' : ok ? 'Health: OK' : 'Health: FAIL'}</Pill>

        {/* 데스크톱: 텍스트 버튼 2개 */}
        <HideOnMobile>
          <Btn onClick={() => setLanguage('ko')} $active={cur === 'ko'}>
            {t('lang_ko')}
          </Btn>
          <Btn onClick={() => setLanguage('en')} $active={cur === 'en'}>
            {t('lang_en')}
          </Btn>
        </HideOnMobile>

        {/* 모바일: 드롭다운 한 개 */}
        <ShowOnMobile>
          <LangSelect aria-label={t('language')} value={cur} onChange={e => setLanguage(e.target.value as 'ko' | 'en')}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </LangSelect>
        </ShowOnMobile>

        {/* 로그인 상태 */}
        {isAuthed && (
          <>
            {/* 데스크톱: 텍스트 로그아웃 */}
            <HideOnMobile>
              <Btn onClick={logout} style={{ marginLeft: 8 }}>
                {t('logout')} {user?.email ? `(${user.email})` : ''}
              </Btn>
            </HideOnMobile>

            {/* 모바일: 아이콘 로그아웃 */}
            <ShowOnMobile>
              <IconBtn onClick={logout} title={t('logout')} aria-label={t('logout')}>
                <LogoutIcon />
              </IconBtn>
            </ShowOnMobile>
          </>
        )}
      </Group>
    </Bar>
  );
};

export default Header;
