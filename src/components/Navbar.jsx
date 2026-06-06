import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../App'
import styles from './Navbar.module.css'

const links = [
  { to: '/',           label: 'Problema'    },
  { to: '/tecnologia', label: 'Tecnologia'  },
  { to: '/objetivos',  label: 'Objetivos'   },
  { to: '/beneficios', label: 'Benefícios'  },
  { to: '/aplicacao',  label: 'Aplicação'   },
  { to: '/telemetria', label: '🛰 Live'      },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav} role="navigation" aria-label="Navegação principal">
      <NavLink to="/" className={styles.brand} aria-label="Ir para o início">
        DRAGON <span>TELEMETRY</span>
      </NavLink>

      <ul className={`${styles.links} ${open ? styles.open : ''}`} role="list">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.themeBtn}
          onClick={toggle}
          aria-label="Alternar tema"
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button
          className={`${styles.menuBtn} ${open ? styles.menuOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
