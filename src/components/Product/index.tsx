import Tag from '../Tag'

import * as S from './styles'

type Props = {
  title: string
  category: string
  system: string
  description: string
  infos: string[]
  image: string
  id: number
}

const Product = ({
  title,
  category,
  description,
  image,
  infos,
  system,
  id
}: Props) => {
  const getDescription = (text: string) => {
    if (text.length > 95) {
      return text.slice(0, 92) + '...'
    }
    return text
  }
  return (
    <S.Card
      title={`Clique para ver mais detalhes sobre ${title}`}
      to={`/product/${id}`}
    >
      <img src={image} alt={title} />
      <S.Infos>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </S.Infos>
      <S.CardTitle>{title}</S.CardTitle>
      <Tag>{category}</Tag>
      <Tag>{system}</Tag>
      <S.Description>{getDescription(description)}</S.Description>
    </S.Card>
  )
}
export default Product
