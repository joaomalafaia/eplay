import { HeaderBar, Links, LinkItem, LinkCart } from './styles'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

const Header = () => (
  <HeaderBar>
    <div>
      <img src={logo} alt="logo eplay" />
      <nav>
        <Links>
          <LinkItem>
            <Link to="/categorias">Categorias</Link>
          </LinkItem>
          <LinkItem>
            <a href="#">Novidades</a>
          </LinkItem>
          <LinkItem>
            <a href="#">Promoções</a>
          </LinkItem>
        </Links>
      </nav>
    </div>
    <LinkCart href="">
      0 - produto(s)
      <img src={carrinho} alt="carrinho" />
    </LinkCart>
  </HeaderBar>
)

export default Header
