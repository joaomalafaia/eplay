import { useDispatch } from 'react-redux'

import { Game } from '../../pages/Home'
import Button from '../Button'
import Tag from '../Tag'
import { Banner, ProductInfos } from './styles'
import { formataPreco } from '../ProductList'
import { add, open } from '../../store/reducers/cart'

export type Props = {
  game: Game
}

const Hero = ({ game }: Props) => {
  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(add(game))
    dispatch(open())
  }

  return (
    <Banner style={{ backgroundImage: `url(${game.media.cover}` }}>
      <div className="container">
        <div>
          <Tag>{game.details.category}</Tag>
          <Tag>{game.details.system}</Tag>
        </div>
        <ProductInfos>
          <h2>{game.name}</h2>
          <p>
            {game.prices.discount && (
              /* aqui, o && substitui o ternário ? : */
              <span>De {formataPreco(game.prices.old)}</span>
            )}
            {game.prices.current && (
              <>Por {formataPreco(game.prices.current)}</>
            )}
          </p>
          {game.prices.current && (
            <Button
              variant="primary"
              type="button"
              title="clique aqui para adicionar ao carrinho"
              onClick={addToCart}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </ProductInfos>
      </div>
    </Banner>
  )
}

export default Hero
