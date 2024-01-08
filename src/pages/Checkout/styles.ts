import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

type InputGroupProps = {
  maxWidth?: string
}

type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  active: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  margin-top: ${(props) => props.marginTop || '0'};
  column-gap: 24px;
  align-items: flex-end;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;
  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    font-size: 14px;
    color: ${colors.white};
  }

  input,
  select {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    background-color: ${colors.white};
    border: 1px solid ${colors.white};
    margin-top: 8px;

    &.error {
      border: 1px solid red;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 16px;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 24px;

  border: 1px solid ${(props) => (props.active ? colors.green : colors.black)};
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;

  color: ${colors.white};
  background-color: ${(props) => (props.active ? colors.green : colors.black)};

  cursor: pointer;

  img {
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    text-align: center;
    margin-top: 4px;

    img {
      margin: 0 auto;
    }
  }
`
