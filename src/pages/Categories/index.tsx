import ProductList from '../../components/ProductList'
import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRPGQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery
} from '../../services/api'

const Categories = () => {
  const { data: actionGames, isLoading: isLoadingAction } =
    useGetActionGamesQuery()
  const { data: sportGames, isLoading: isLoadingSport } =
    useGetSportGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } =
    useGetSimulationGamesQuery()
  const { data: fightGames, isLoading: isLoadingFight } =
    useGetFightGamesQuery()
  const { data: RPGGames, isLoading: isLoadingRPG } = useGetRPGQuery()

  return (
    <>
      <ProductList
        id="action"
        games={actionGames}
        title="Ação"
        background="black"
        isLoading={isLoadingAction}
      />
      <ProductList
        id="sports"
        games={sportGames}
        title="Esportes"
        background="gray"
        isLoading={isLoadingSport}
      />
      <ProductList
        id="simulation"
        games={simulationGames}
        title="Simulação"
        background="black"
        isLoading={isLoadingSimulation}
      />
      <ProductList
        id="fight"
        games={fightGames}
        title="Luta"
        background="gray"
        isLoading={isLoadingFight}
      />
      <ProductList
        id="rpg"
        games={RPGGames}
        title="RPG"
        background="black"
        isLoading={isLoadingRPG}
      />
    </>
  )
}

export default Categories
