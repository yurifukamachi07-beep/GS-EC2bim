import styles from './Card.module.css'

export default function Card({ icon, title, text, accent = false, children, className = '' }) {
  return (
    <article className={`${styles.card} ${accent ? styles.accent : ''} ${className}`}>
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      {text && <p className={styles.text}>{text}</p>}
      {children}
    </article>
  )
}
