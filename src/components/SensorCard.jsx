import styles from './SensorCard.module.css'

export default function SensorCard({ sensor }) {
  return (
    <article className={styles.card} aria-label={`Sensor ${sensor.nome}`}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">{sensor.icone}</span>
        <div>
          <h3 className={styles.nome}>{sensor.nome}</h3>
          <p className={styles.param}>{sensor.parametro}</p>
        </div>
      </div>

      <p className={styles.desc}>{sensor.descricao}</p>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Tópico MQTT</span>
          <code className={styles.code}>{sensor.topico}</code>
        </div>
        <div className={styles.levels}>
          <span className={styles.normal}>✓ {sensor.normal}</span>
          <span className={styles.alerta}>△ {sensor.alerta}</span>
          <span className={styles.critico}>⚠ {sensor.critico}</span>
        </div>
      </div>
    </article>
  )
}
