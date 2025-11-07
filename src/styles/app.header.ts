import styled, { css } from 'styled-components';

export const Bar = styled.header<{ $scrolled?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 30;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  transition: box-shadow 0.2s ease;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    `}
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Btn = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    opacity: 0.92;
  }
`;

export const IconBtn = styled(Btn)`
  padding: 6px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  justify-content: center;
`;

export const Pill = styled.span<{ $ok?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  background: ${({ $ok }) => ($ok ? 'rgba(16,185,129,.12)' : 'rgba(239,68,68,.12)')};
  color: ${({ $ok }) => ($ok ? '#10B981' : '#EF4444')};
  border: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;
`;

/** 반응형 유틸 */
export const HideOnMobile = styled.div`
  @media (max-width: 640px) {
    display: none !important;
  }
`;
export const ShowOnMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: inline-flex;
  }
`;

/** 언어 셀렉트: 모바일 전용 드롭다운 */
export const LangSelect = styled.select`
  height: 36px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
`;
