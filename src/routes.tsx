import { Routes, Route } from 'react-router-dom'

import Categories from './pages/Categories'
import Home from './pages/Home'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categorias" element={<Categories />} />
  </Routes>
)

export default Rotas
