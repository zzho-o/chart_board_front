import styled, { css } from 'styled-components';
import type { TextareaHTMLAttributes } from 'react';
import { typo } from './Typo';

export type TextAreaVariant = 'default' | 'ghost' | 'danger';
export type TextAreaSize = 'sm' | 'md' | 'lg';

type Props = {
  variant?: TextAreaVariant;
  size?: TextAreaSize;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const S = styled.textarea<{ $variant: TextAreaVariant; $size: TextAreaSize }>`
  width: 100%;
  outline: none;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  resize: vertical;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          min-height: 80px;
          padding: 8px 10px;
          ${typo.bodySm};
        `;
      case 'lg':
        return css`
          min-height: 180px;
          padding: 12px 14px;
          ${typo.labelLg};
        `;
      default:
        return css`
          min-height: 140px;
          padding: 10px 12px;
          ${typo.body};
        `;
    }
  }}

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'ghost':
        return css`
          background: transparent;
          border: 1px solid ${theme.colors.line};
          &::placeholder {
            color: ${theme.colors.textMuted};
          }
          &:focus {
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
          }
        `;
      case 'danger':
        return css`
          border: 1px solid ${theme.colors.danger};
          &:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.22);
          }
        `;
      default:
        return css`
          border: 1px solid ${theme.colors.line};
          &::placeholder {
            color: ${theme.colors.textMuted};
          }
          &:focus {
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 3px ${theme.colors.primarySoft};
          }
        `;
    }
  }}
`;

export default function TextArea({ variant = 'default', size = 'md', ...rest }: Props) {
  return <S $variant={variant} $size={size} {...rest} />;
}
