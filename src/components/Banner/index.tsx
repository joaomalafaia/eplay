import { useEffect, useState } from 'react'

import { Image, Pricing, Title } from './styles'
import Tag from '../Tag'
import Button from '../Button'
import { Game } from '../../pages/Home'
import { formataPreco } from '../ProductList'

import { useGetFeaturedGameQuery } from '../../services/api'

const Banner = () => {
  const { data: game, isLoading } = useGetFeaturedGameQuery()

  if (!game) {
    return <h3 className="container">Carregando...</h3>
  }

  return (
    <Image style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <Title>{game?.name}</Title>
          <Pricing>
            De: <span>{formataPreco(game.prices.old)}</span> <br />
            Por apenas: {formataPreco(game.prices.current)}
          </Pricing>
        </div>
        <Button
          type="link"
          to={`product/${game.id}`}
          title="clique para aproveitar a oferta"
        >
          Aproveitar
        </Button>
      </div>
    </Image>
  )
}

export default Banner
