import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
`;

export const ModalBody = styled.div`
  width: 100%;
  max-width: 680px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  padding: 16px;
`;
