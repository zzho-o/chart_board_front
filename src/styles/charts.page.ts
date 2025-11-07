import styled from 'styled-components';

export const Wrap = styled.div`
  max-width: 1080px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;

  .grid2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 960px) {
    .grid2 {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
