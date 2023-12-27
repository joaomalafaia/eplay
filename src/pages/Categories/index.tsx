import { useEffect, useState } from 'react'
import ProductList from '../../components/ProductList'
import { Game } from '../Home'

const Categories = () => {
  const [acao, setAcao] = useState<Game[]>([])
  const [esportes, setEsportes] = useState<Game[]>([])
  const [simulacao, setSimulacao] = useState<Game[]>([])
  const [luta, setLuta] = useState<Game[]>([])
  const [rpg, setRPG] = useState<Game[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/acao')
      .then((res) => res.json())
      .then((res) => setAcao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/esportes')
      .then((res) => res.json())
      .then((res) => setEsportes(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/simulacao')
      .then((res) => res.json())
      .then((res) => setSimulacao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/luta')
      .then((res) => res.json())
      .then((res) => setLuta(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/rpg')
      .then((res) => res.json())
      .then((res) => setRPG(res))
  }, [])

  return (
    <>
      <ProductList games={acao} title="Ação" background="black" />
      <ProductList games={esportes} title="Esportes" background="gray" />
      <ProductList games={simulacao} title="Simulação" background="black" />
      <ProductList games={luta} title="Luta" background="gray" />
      <ProductList games={rpg} title="RPG" background="black" />
    </>
  )
}

export default Categories
