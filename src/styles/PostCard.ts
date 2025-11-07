import styled from 'styled-components';

export const Card = styled.button`
  text-align: left;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  padding: 12px;
  display: grid;
  gap: 8px;
  cursor: pointer;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  line-height: 1.6;
`;
