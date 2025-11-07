import styled from 'styled-components';

export const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  flex: 1 0 auto;
  min-height: 0; /* overflow 계산에 중요 */
`;
