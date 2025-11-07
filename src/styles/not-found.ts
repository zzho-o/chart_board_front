import styled from 'styled-components';

export const Wrap = styled.section`
  max-width: 720px;
  margin: 120px auto;
  padding: 32px 24px;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 40px;
  line-height: 1.2;
`;

export const Desc = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Btn = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ $primary, theme }) => ($primary ? theme.colors.primary : 'transparent')};
  color: ${({ $primary, theme }) => ($primary ? theme.colors.white : theme.colors.text)};
  cursor: pointer;
`;
