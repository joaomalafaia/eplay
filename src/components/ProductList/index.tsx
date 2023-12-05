import Game from '../../models/Game'
import Product from '../Product'
import { List, CardContainer } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games: Game[]
}

const ProductList = ({ background, title, games }: Props) => (
  <CardContainer background={background}>
    <div className="container">
      <h2>{title}</h2>
      <List>
        {games.map((game) => (
          <Product
            key={game.id}
            category={game.category}
            description={game.description}
            image={game.image}
            infos={game.infos}
            system={game.system}
            title={game.title}
          />
        ))}
      </List>
    </div>
  </CardContainer>
)

export default ProductList
