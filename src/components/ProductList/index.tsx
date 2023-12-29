import { Game } from '../../pages/Home'
import Product from '../Product'
import { List, CardContainer } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games: Game[]
  id?: string
}

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const ProductList = ({ background, title, games, id }: Props) => {
  const getGameInfos = (game: Game) => {
    const tags = []

    if (game.release_date) {
      tags.push(game.release_date)
    }

    if (game.prices.discount) {
      tags.push(`${game.prices.discount}%`)
    }

    if (game.prices.current) {
      tags.push(formataPreco(game.prices.current))
    }

    return tags
  }

  return (
    <CardContainer id={id} background={background}>
      <div className="container">
        <h2>{title}</h2>
        <List>
          {games.map((game) => (
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
        </List>
      </div>
    </CardContainer>
  )
}

export default ProductList
