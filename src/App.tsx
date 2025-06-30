import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TechnologyPage from './pages/TechnologyPage'
import MaterialsPage from './pages/MaterialsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import OrderPage from './pages/OrderPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/technology" element={<TechnologyPage />} />
      <Route path="/materials" element={<MaterialsPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App