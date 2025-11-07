import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primarySoft: string;
      primaryLine: string;

      text: string;
      textMuted: string;
      bg: string;
      panel: string;
      line: string;
      lineAccent: string;

      secondary: string;
      danger: string;
      white: string;
      black: string;
    };
    radius: string;
    spacing: (n: number) => string;
    shadow: { md: string };
    breakpoint: { sm: string; md: string; lg: string };
  }
}
