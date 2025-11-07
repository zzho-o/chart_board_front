import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#F6406D',
    primaryHover: '#E63A65',

    primarySoft: 'rgba(246, 64, 109, 0.12)',
    primaryLine: 'rgba(246, 64, 109, 0.36)',

    text: '#1F2937',
    textMuted: '#6B7280',
    bg: '#F7F8FA',
    panel: '#FFFFFF',
    line: '#E5E7EB',
    lineAccent: '#FAD2DC',

    secondary: '#7C3AED',
    danger: '#EF4444',
    white: '#FFFFFF',
    black: '#000000',
  },
  radius: '16px',
  spacing: (n: number) => `${n * 8}px`,
  shadow: { md: '0 12px 30px rgba(0,0,0,0.12)' },
  breakpoint: { sm: '640px', md: '960px', lg: '1200px' },
} as const;

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  html { -webkit-font-smoothing: antialiased; }
  body {
    margin: 0;
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: Pretendard, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }
  a { color: inherit; text-decoration: none; }
  ::selection { background: ${theme.colors.primary}; color: ${theme.colors.white}; }
`;
