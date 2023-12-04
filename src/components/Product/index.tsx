import Tag from '../Tag'
import { Card, CardTitle, Infos, Text } from './styles'

type Props = {
  title: string
  category: string
  system: string
  description: string
  infos: string[]
  image: string
}

const Product = ({
  title,
  category,
  description,
  image,
  infos,
  system
}: Props) => (
  <Card>
    <img src={image} alt={title} />
    <Infos>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </Infos>
    <CardTitle>{title}</CardTitle>
    <Tag>{category}</Tag>
    <Tag>{system}</Tag>
    <Text>{description}</Text>
  </Card>
)

export default Product
