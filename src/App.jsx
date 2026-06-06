import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Problema from './pages/Problema'
import Tecnologia from './pages/Tecnologia'
import Objetivos from './pages/Objetivos'
import Beneficios from './pages/Beneficios'
import Aplicacao from './pages/Aplicacao'
import Telemetria from './pages/Telemetria'

// ── Theme Context ──
export const ThemeCtx = createContext(null)

export function useTheme() { return useContext(ThemeCtx) }

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Problema />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/objetivos"  element={<Objetivos />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/aplicacao"  element={<Aplicacao />} />
          <Route path="/telemetria" element={<Telemetria />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeCtx.Provider>
  )
}
