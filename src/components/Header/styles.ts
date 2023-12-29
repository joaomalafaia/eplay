import styled from 'styled-components'

import { colors } from '../../styles'

export const HeaderBar = styled.header`
  display: flex;
  margin-bottom: 80px;
  padding: 24px;
  background-color: ${colors.gray};
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  a {
    color: ${colors.white};
    text-decoration: none;
    font-weight: bold;
  }
`

export const Links = styled.ul`
  display: flex;
  margin-left: 40px;
`

export const LinkItem = styled.li`
  margin-right: 16px;
`

export const CartButton = styled.a`
  display: flex;

  img {
    margin-left: 16px;
  }
`
