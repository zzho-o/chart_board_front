import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { typo } from './Typo';
import { theme } from '@/styles/theme';

export type ButtonVariant = 'primary' | 'soft' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const S = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s,
    transform 0.06s;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 36px;
          padding: 0 12px;
          ${typo.bodySm};
          font-weight: 600;
        `;
      case 'lg':
        return css`
          height: 52px;
          padding: 0 18px;
          ${typo.labelLg};
        `;
      default:
        return css`
          height: 44px;
          padding: 0 14px;
          ${typo.body};
          font-weight: 600;
        `;
    }
  }}

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'soft':
        return css`
          background: ${theme.colors.primarySoft};
          color: ${theme.colors.text};
          border-color: ${theme.colors.primaryLine};
          &:hover {
            background: rgba(246, 64, 109, 0.18);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.line};
          &:hover {
            border-color: ${theme.colors.textMuted};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primaryLine};
          &:hover {
            background: ${theme.colors.primarySoft};
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: ${theme.colors.white};
          &:hover {
            filter: brightness(0.98);
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover {
            background: ${theme.colors.primaryHover};
          }
          &:active {
            transform: translateY(1px);
          }
        `;
    }
  }}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primarySoft};
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export default function Button({ variant = 'primary', size = 'md', children, ...rest }: PropsWithChildren<Props>) {
  return (
    <S $variant={variant} $size={size} {...rest}>
      {children}
    </S>
  );
}
