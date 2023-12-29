import ProductList from '../../components/ProductList'
import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRPGQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery
} from '../../services/api'

const Categories = () => {
  const { data: actionGames } = useGetActionGamesQuery()
  const { data: sportGames } = useGetSportGamesQuery()
  const { data: simulationGames } = useGetSimulationGamesQuery()
  const { data: fightGames } = useGetFightGamesQuery()
  const { data: RPGGames } = useGetRPGQuery()

  if (actionGames && fightGames && sportGames && simulationGames && RPGGames) {
    return (
      <>
        <ProductList
          id="action"
          games={actionGames}
          title="Ação"
          background="black"
        />
        <ProductList
          id="sports"
          games={sportGames}
          title="Esportes"
          background="gray"
        />
        <ProductList
          id="simulation"
          games={simulationGames}
          title="Simulação"
          background="black"
        />
        <ProductList
          id="fight"
          games={fightGames}
          title="Luta"
          background="gray"
        />
        <ProductList id="rpg" games={RPGGames} title="RPG" background="black" />
      </>
    )
  }

  return <h4 className="container">Carregando...</h4>
}

export default Categories
