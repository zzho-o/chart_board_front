import { typo } from '@/components/common/ui/Typo';
import styled from 'styled-components';

export const Wrap = styled.form`
  max-width: 420px;
  margin: 120px auto;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  display: grid;
  gap: 14px;
`;

export const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 24px;
`;

export const Helper = styled.p`
  ${typo?.bodySm ?? ''};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 10px;
`;

export const ErrorText = styled.p`
  ${typo?.bodySm ?? ''};
  color: ${({ theme }) => theme.colors.danger};
  margin: 4px 0 0;
`;
