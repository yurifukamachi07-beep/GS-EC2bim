import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.brand}>
        DRAGON <span>TELEMETRY</span>
      </div>
      <nav className={styles.links} aria-label="Links do rodapé">
        <Link to="/">Problema</Link>
        <Link to="/tecnologia">Tecnologia</Link>
        <Link to="/telemetria">Live</Link>
      </nav>
      <p className={styles.copy}>FIAP · Engenharia de Software · Global Solution 2026</p>
    </footer>
  )
}
