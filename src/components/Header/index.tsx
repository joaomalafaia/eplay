import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'

import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'

import logo from '../../assets/images/logo.svg'
import cartIcon from '../../assets/images/carrinho.svg'

import * as S from './styles'

const Header = () => {
  const dispatch = useDispatch()
  const [openedMenu, setOpenedMenu] = useState(false)
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openMenu = () => {
    setOpenedMenu(!openedMenu)
  }

  const openCart = () => {
    dispatch(open())
  }

  return (
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          <S.Hamburger onClick={openMenu}>
            <span />
            <span />
            <span />
          </S.Hamburger>
          <Link to="/">
            <h1>
              <img src={logo} alt="EPLAY" />
            </h1>
          </Link>
          <nav>
            <S.Links>
              <S.LinkItem>
                <Link
                  title="Clique aqui para acessar a página de categorias"
                  to="/categorias"
                >
                  Categorias
                </Link>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de em breve"
                  to="/#coming-soon"
                >
                  Em breeve
                </HashLink>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de promoções"
                  to="/#on-sale"
                >
                  Promoções
                </HashLink>
              </S.LinkItem>
            </S.Links>
          </nav>
        </div>
        <S.CartButton role="button" onClick={openCart}>
          {items.length}
          <span> - produto(s)</span>
          <img src={cartIcon} alt="carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile className={openedMenu ? 'opened' : ''}>
        <S.Links>
          <S.LinkItem>
            <Link
              title="Clique aqui para acessar a página de categorias"
              to="/categorias"
              onClick={() => setOpenedMenu(false)}
            >
              Categorias
            </Link>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de em breve"
              to="/#coming-soon"
              onClick={() => setOpenedMenu(false)}
            >
              Novidades
            </HashLink>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de promoções"
              to="/#on-sale"
              onClick={() => setOpenedMenu(false)}
            >
              Promoções
            </HashLink>
          </S.LinkItem>
        </S.Links>
      </S.NavMobile>
    </S.HeaderBar>
  )
}

export default Header
