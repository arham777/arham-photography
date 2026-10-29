import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import HomePage from "./Pages/HomePage/HomePage"
import ProductsPage from "./Pages/ProductsPage/ProductsPage"
import PortraitPage from "./Pages/PortraitPage/PortraitPage"
import NaturePage from "./Pages/NaturePage/NaturePage"
import StreetsPage from "./Pages/StreetsPage/StreetsPage"
import Header from "./Components/Header/Header"
import ContactPage from "./Pages/ContactPage/ContactPage"
import WeddingPage from "./Pages/WeddingPage/WeddingPage"

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/portraits" element={<PortraitPage />} />
        <Route path="/streets" element={<StreetsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App