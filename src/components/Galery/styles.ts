import styled from 'styled-components'
import { colors } from '../../styles'

export const Items = styled.ul`
  display: flex;
`

export const Action = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.73);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;

  img {
    cursor: pointer;
  }
`

export const Item = styled.li`
  position: relative;

  > img {
    height: 150px;
    width: 150px;
    border: 2px solid ${colors.white};
    border-radius: 8px;
    object-fit: cover;
  }

  &:not(:last-child) {
    margin-right: 16px;
  }

  &:hover {
    ${Action} {
      opacity: 1;
      transition: opacity 0.25s ease;
    }
  }
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;

  &.visible {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

export const ModalContent = styled.div`
  max-width: 960px;
  position: relative;
  z-index: 1;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h4 {
      font-size: 18;
      font-weight: bold;
    }

    img {
      cursor: pointer;
    }
  }

  img,
  iframe {
    display: block;
    max-width: 100%;
  }

  iframe {
    width: 100%;
    height: 480px;
  }
`
