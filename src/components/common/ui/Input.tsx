import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { typo } from './Typo';

export type InputVariant = 'default' | 'ghost' | 'danger';
export type InputSize = 'sm' | 'md' | 'lg';

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

type Props = NativeProps & {
  variant?: InputVariant;
  size?: InputSize;
};

const S = styled.input<{ $variant: InputVariant; $size: InputSize }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius};
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background 0.15s;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 36px;
          padding: 0 10px;
          ${typo.bodySm};
        `;
      case 'lg':
        return css`
          height: 52px;
          padding: 0 14px;
          ${typo.labelLg};
        `;
      default:
        return css`
          height: 44px;
          padding: 0 12px;
          ${typo.body};
        `;
    }
  }}

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'ghost':
        return css`
          background: transparent;
          border: 1px solid ${theme.colors.lineAccent};
          &::placeholder {
            color: ${theme.colors.textMuted};
          }
          &:focus {
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 3px ${theme.colors.primarySoft};
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.panel};
          border: 1px solid ${theme.colors.danger};
          &:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.22);
          }
        `;
      default:
        return css`
          background: ${theme.colors.panel};
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

export default function Input({ variant = 'default', size = 'md', ...rest }: Props) {
  return <S $variant={variant} $size={size} {...rest} />;
}
