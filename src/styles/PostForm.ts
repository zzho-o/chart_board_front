import { typo } from '@/components/common/ui/Typo';
import styled from 'styled-components';

export const Wrap = styled.form`
  display: grid;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  padding: 16px;
`;
export const Label = styled.label`
  ${typo.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
export const Row = styled.div`
  display: grid;
  gap: 6px;
`;
