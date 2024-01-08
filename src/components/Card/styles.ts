import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const CardContainer = styled.div`
  width: 100%;
  padding: 24px;
  margin-bottom: 40px;
  border-radius: 8px;
  background-color: ${colors.gray};

  h2,
  h3 {
    font-weight: bold;
    font-size: 18px;
    color: ${colors.white};
    margin-bottom: 24px;
  }

  h3 {
    margin-top: 24px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
  }

  .buttonContainer {
    display: flex;
    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .margin-top {
    margin-top: 24px;
  }
`
