import { Image, Pricing, Title } from './styles'
import bannerImg from '../../assets/images/banner-homem-aranha.png'
import Tag from '../Tag'
import Button from '../Button'

const Banner = () => (
  <Image style={{ backgroundImage: `url(${bannerImg})` }}>
    <div className="container">
      <Tag size="big">Destaque do dia</Tag>
      <div>
        <Title>Marvel&apos;s Spider-Man: Miles Morales PS4 & PS5</Title>
        <Pricing>
          De: <span>R$ 250,00</span> <br />
          Por apenas: R$ 99,90
        </Pricing>
      </div>
      <Button type="link" to="/produto" title="clique para aproveitar a oferta">
        Aproveitar
      </Button>
    </div>
  </Image>
)

export default Banner
