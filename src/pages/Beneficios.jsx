import dados from '../data/dados.json'
import styles from './Page.module.css'
import bStyles from './Beneficios.module.css'

const benefits = [
  { value:'<500ms', label:'Latência de Alerta',       desc:'Do sensor ao operador — reação imediata.', color:'var(--accent)' },
  { value:'3×',     label:'Parâmetros Monitorados',   desc:'Temperatura, pressão e força G cobrem os 3 maiores riscos.', color:'var(--accent2)' },
  { value:'24/7',   label:'Monitoramento Contínuo',   desc:'Sistema autônomo, sem intervenção humana.', color:'var(--green)' },
  { value:'$0',     label:'Custo de Infraestrutura',  desc:'HiveMQ Free Tier + GitHub Pages — custo zero.', color:'var(--accent)' },
  { value:'100%',   label:'Open Source',              desc:'Código público, auditável e reutilizável.', color:'var(--accent2)' },
  { value:'∞',      label:'Escalabilidade',           desc:'MQTT suporta múltiplos dispositivos sem alteração.', color:'var(--green)' },
]

export default function Beneficios() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.heroHalf}`} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Impacto Real</p>
          <h1 className={styles.heroTitle} id="hero-title"><em>Benefícios</em><br/>Mensuráveis</h1>
          <p className={styles.heroSub}>Cada decisão técnica gera valor real para tripulantes, operadores e para a engenharia espacial.</p>
        </div>
      </section>

      <section className={styles.section} aria-label="Benefícios do sistema">
        <div className={styles.grid3}>
          {benefits.map(b => (
            <div key={b.value} className={bStyles.bCard} style={{ '--bc': b.color }}>
              <div className={bStyles.bValue} aria-label={b.label}>{b.value}</div>
              <div className={bStyles.bLabel}>{b.label}</div>
              <p className={bStyles.bDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <div className={styles.section} style={{ paddingTop: 0 }}>
        <blockquote className={bStyles.quote}>
          <p>"Cada satélite é um computador voando a 28.000 km/h. Cada dado orbital é uma pergunta esperando por um sistema que saiba respondê-la."</p>
          <cite>— FIAP Global Solution 2026</cite>
        </blockquote>
      </div>

      {/* Equipe */}
      <section className={styles.section} aria-labelledby="team-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Nossa Equipe</p>
          <h2 className={styles.sectionTitle} id="team-heading">Quem Construiu</h2>
        </div>
        <div className={styles.grid3}>
          {dados.equipe.map(m => (
            <div key={m.rm} className={bStyles.memberCard}>
              <div className={bStyles.memberAvatar} aria-hidden="true">👩‍💻</div>
              <div>
                <p className={bStyles.memberName}>{m.nome}</p>
                <p className={bStyles.memberRole}>{m.papel}</p>
                <p className={bStyles.memberRm}>RM {m.rm}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
