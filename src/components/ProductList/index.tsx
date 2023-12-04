import Product from '../Product'
import { List, CardContainer } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
}

const ProductList = ({ background, title }: Props) => (
  <CardContainer background={background}>
    <div className="container">
      <h2>{title}</h2>
      <List>
        <Product
          category="ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="windows"
          title="Nome do Jogo"
        />
        <Product
          category="ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="windows"
          title="Nome do Jogo"
        />
        <Product
          category="ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="windows"
          title="Nome do Jogo"
        />
        <Product
          category="ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="windows"
          title="Nome do Jogo"
        />
      </List>
    </div>
  </CardContainer>
)

export default ProductList
