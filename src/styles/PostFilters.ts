import styled from 'styled-components';

export const Bar = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

export const TopRow = styled.div`
  display: flex;
`;

export const BottomRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1 1 auto;
  min-width: 260px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
  white-space: nowrap;
  margin-left: auto;
`;

export const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
`;
