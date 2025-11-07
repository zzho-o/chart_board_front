import { Outlet, useLocation } from 'react-router-dom';
import Header from './app.header';
import Footer from './app.footer';
import { useLenis } from '@/hooks/useLenis';
import { useEffect, useRef } from 'react';
import { Main, Shell } from '@/styles/app.layout';
import AOS from 'aos';

const Layout = () => {
  const lenisRef = useLenis(); // 전역 싱글톤 Lenis를 반환하는 훅
  const loc = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      offset: 80,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    const id = requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [loc.pathname, lenisRef]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis || !mainRef.current) return;

    const ro = new ResizeObserver(() => {
      lenis.resize(); // 내부 스크롤 길이 재계산
    });
    ro.observe(mainRef.current);
    return () => ro.disconnect();
  }, [lenisRef]);

  return (
    <Shell>
      <Header />
      <Main ref={mainRef}>
        <Outlet />
      </Main>
      <Footer />
    </Shell>
  );
};
export default Layout;
