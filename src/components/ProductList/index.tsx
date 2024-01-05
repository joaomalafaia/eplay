import Product from '../Product'
import Loader from '../Loader'

import { Game } from '../../pages/Home'
import { parseToBrl } from '../../utils'

import * as S from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games?: Game[]
  id?: string
  isLoading: boolean
}

const ProductList = ({ background, title, games, id, isLoading }: Props) => {
  const getGameInfos = (game: Game) => {
    const tags = []

    if (game.release_date) {
      tags.push(game.release_date)
    }

    if (game.prices.discount) {
      tags.push(`${game.prices.discount}%`)
    }

    if (game.prices.current) {
      tags.push(parseToBrl(game.prices.current))
    }

    return tags
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <S.CardContainer id={id} background={background}>
      <div className="container">
        <h2>{title}</h2>
        <S.List>
          {games &&
            games.map((game) => (
              <li key={game.id}>
                <Product
                  category={game.details.category}
                  description={game.description}
                  image={game.media.thumbnail}
                  infos={getGameInfos(game)}
                  system={game.details.system}
                  title={game.name}
                  id={game.id}
                />
              </li>
            ))}
        </S.List>
      </div>
    </S.CardContainer>
  )
}

export default ProductList
