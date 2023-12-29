import styled from 'styled-components'
import { HashLink } from 'react-router-hash-link'

import { colors } from '../../styles'

export const FooterContainer = styled.footer`
  background-color: ${colors.gray};
  padding: 32px 0;
  font-size: 14px;
`

export const SectionTitle = styled.h4`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`

export const FooterLinks = styled.ul`
  display: flex;
`

export const Link = styled(HashLink)`
  color: ${colors.lightGray};
  text-decoration: none;
  margin-right: 8px;
`

export const FooterSection = styled.div`
  margin-bottom: 64px;
`
