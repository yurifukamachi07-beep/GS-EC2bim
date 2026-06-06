import SensorCard from '../components/SensorCard'
import dados from '../data/dados.json'
import styles from './Page.module.css'
import tStyles from './Tecnologia.module.css'

export default function Tecnologia() {
  const nodes = [
    { icon:'🌡️', label:'Sensores', sub:'DHT22 · BMP180 · MPU6050' },
    { icon:'🔲', label:'ESP32',    sub:'Edge Device · Wokwi' },
    { icon:'📡', label:'MQTT/TLS', sub:'HiveMQ :8883' },
    { icon:'📊', label:'Dashboard',sub:'Chart.js · WSS' },
    { icon:'👩‍🚀', label:'Operador', sub:'Terra / Missão' },
  ]

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.heroHalf}`} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Stack Tecnológico</p>
          <h1 className={styles.heroTitle} id="hero-title">Como o <em>Código</em><br/>Move a Dragon</h1>
          <p className={styles.heroSub}>Cada camada escolhida por confiabilidade e aplicabilidade em missões espaciais reais.</p>
        </div>
      </section>

      {/* ARCH */}
      <section className={styles.section} aria-label="Arquitetura">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Fluxo de Dados</p>
          <h2 className={styles.sectionTitle}>Arquitetura Edge → Cloud → Dashboard</h2>
        </div>
        <div className={tStyles.arch} role="img" aria-label="Diagrama de arquitetura">
          {nodes.map((n, i) => (
            <>
              <div key={n.label} className={tStyles.node}>
                <div className={tStyles.nodeIcon}>{n.icon}</div>
                <div className={tStyles.nodeLabel}>{n.label}</div>
                <div className={tStyles.nodeSub}>{n.sub}</div>
              </div>
              {i < nodes.length - 1 && <div key={`arrow-${i}`} className={tStyles.arrow} aria-hidden="true">→</div>}
            </>
          ))}
        </div>
      </section>

      {/* SENSORS */}
      <section className={styles.section} aria-labelledby="sensors-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Hardware Simulado</p>
          <h2 className={styles.sectionTitle} id="sensors-heading">Sensores da Missão</h2>
        </div>
        <div className={styles.grid3}>
          {dados.sensores.map(s => <SensorCard key={s.id} sensor={s} />)}
        </div>
      </section>

      {/* TOPICS */}
      <section className={styles.section} aria-labelledby="topics-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Protocolo MQTT</p>
          <h2 className={styles.sectionTitle} id="topics-heading">Tópicos Publicados</h2>
        </div>
        <div className={tStyles.topicsGrid}>
          {dados.topicos_mqtt.map(t => (
            <div key={t.topico} className={tStyles.topicRow}>
              <code className={tStyles.topic}>{t.topico}</code>
              <span className={tStyles.tipo}>{t.tipo}</span>
              <span className={tStyles.unit}>{t.unidade || '—'}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
