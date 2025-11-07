import styled from 'styled-components';

export const Wrap = styled.footer`
  width: 100%;
  background: #1d1f23;
  color: #ffffff;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 20px 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  white-space: pre-line; /* 멀티라인 문자열 줄바꿈 유지 */
`;

export const Company = styled.div`
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.9;
`;

export const Contact = styled.div`
  text-align: right;
  font-size: 14px;
  line-height: 1.7;
  strong {
    display: block;
    margin-bottom: 8px;
  }
`;
