import { useEffect } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
const Sheet = styled.div`
  width: 100%;
  max-width: 680px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
`;
const Head = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
const Body = styled.div`
  padding: 16px;
`;

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  Right?: React.ReactNode;
};

const Modal = ({ title, open, onClose, children, Right }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <Sheet onClick={e => e.stopPropagation()}>
        <Head>
          <div style={{ fontWeight: 600 }}>{title}</div>
          <div style={{ display: 'flex', gap: 8 }}>{Right}</div>
        </Head>
        <Body>{children}</Body>
      </Sheet>
    </Backdrop>
  );
};

export default Modal;
