import ProductList from '../../components/ProductList'
import Game from '../../models/Game'
import residentIMG from '../../assets/images/resident.png'
import diabloIMG from '../../assets/images/diablo.png'
import zeldaIMG from '../../assets/images/zelda.png'
import starWarsIMG from '../../assets/images/star_wars.png'

const promocoes: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['10%', 'R$ 250,00'],
    image: residentIMG
  },
  {
    id: 2,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['10%', 'R$ 250,00'],
    image: residentIMG
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4',
    system: 'PS5',
    infos: ['5%', 'R$ 290,00'],
    image: residentIMG
  },
  {
    id: 4,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['10%', 'R$ 250,00'],
    image: residentIMG
  }
]

const emBreve: Game[] = [
  {
    id: 5,
    category: 'RPG',
    description:
      'Diablo IV é um RPG de ação em desenvolvimento pela Blizzard Entertainment.',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diabloIMG
  },
  {
    id: 6,
    category: 'RPG',
    description:
      'Diablo IV é um RPG de ação em desenvolvimento pela Blizzard Entertainment.',
    title: 'Zelda',
    system: 'Nintendo Switch',
    infos: ['17/05'],
    image: zeldaIMG
  },
  {
    id: 7,
    category: 'RPG',
    description:
      'Diablo IV é um RPG de ação em desenvolvimento pela Blizzard Entertainment.',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diabloIMG
  },
  {
    id: 8,
    category: 'RPG',
    description:
      'Diablo IV é um RPG de ação em desenvolvimento pela Blizzard Entertainment.',
    title: 'Star Wars',
    system: 'Windows',
    infos: ['17/05'],
    image: starWarsIMG
  }
]

const Categories = () => (
  <>
    <ProductList games={promocoes} title="RPG" background="gray" />
    <ProductList games={emBreve} title="Ação" background="black" />
    <ProductList games={promocoes} title="Aventura" background="gray" />
    <ProductList games={emBreve} title="FPS" background="black" />
  </>
)

export default Categories
