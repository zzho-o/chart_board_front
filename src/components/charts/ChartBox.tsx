import styled from 'styled-components';
export const ChartBox = styled.div`
  background: ${({ theme }) => theme.colors.panel};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px;
`;
