import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
`;

export const Hero = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.panel};
  border-radius: ${({ theme }) => theme.radius};
  padding: 20px;
  display: grid;
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Card = styled(Link)`
  flex: 1 1 280px;
  min-height: 120px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.12s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
