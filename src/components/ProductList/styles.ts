import styled from 'styled-components'

import { Props } from '.'
import { colors } from '../../styles'
import { Card } from '../Product/styles'

export const CardContainer = styled.section<Omit<Props, 'title'>>`
  padding: 32px 0;
  background-color: ${(props) =>
    props.background === 'black' ? colors.black : colors.gray};

  ${Card} {
    background-color: ${(props) =>
      props.background === 'black' ? colors.gray : colors.black};
  }
`

export const List = styled.ul`
  display: grid;
  margin-top: 40px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 24px;
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
