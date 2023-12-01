import styled from 'styled-components'
import { TagContainer } from '../Tag/styles'

export const Image = styled.div`
  width: 100%;
  height: 560px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;

  .container {
    display: flex;
    position: relative;
    padding-top: 340px;
    justify-content: space-between;
    align-items: flex-end;
  }

  ${TagContainer} {
    position: absolute;
    top: 32px;
  }
`

export const Title = styled.h2`
  max-width: 450px;
  font-size: 36px;
  font-weight: bold;
`

export const Pricing = styled.p`
  margin-top: 24px;
  font-size: 24px;

  span {
    text-decoration: line-through;
  }
`
