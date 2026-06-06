import { Link } from 'react-router-dom'
import Card from '../components/Card'
import dados from '../data/dados.json'
import styles from './Page.module.css'

const stats = [
  { value: '$630B', label: 'Economia Espacial 2023' },
  { value: '+6K',   label: 'Satélites Ativos' },
  { value: '4B',    label: 'Pessoas Sem Internet' },
  { value: '200M',  label: 'Linhas de Código no Perseverance' },
]

const risks = [
  { title: 'Falha Térmica', text: 'Temperaturas fora da faixa segura comprometem eletrônicos e tripulantes em minutos.' },
  { title: 'Despressurização', text: 'Queda abaixo de 800 hPa é fatal. Sem alerta, a janela de intervenção é mínima.' },
  { title: 'Sobrecarga de G', text: 'Forças acima de 3G durante reentrada causam danos físicos à tripulação.' },
]

export default function Problema() {
  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Global Solution 2026 · SpaceX Dragon</p>
          <h1 className={styles.heroTitle} id="hero-title">
            O Espaço Precisa<br/>de <em>Código</em>
          </h1>
          <p className={styles.heroSub}>
            Cada missão carrega dados críticos. Temperatura, pressão, força G —
            sem monitoramento adequado, os riscos são irreversíveis.
          </p>
          <div className={styles.heroCta}>
            <Link to="/tecnologia" className={styles.btnPrimary}>Ver a Solução →</Link>
            <Link to="/telemetria" className={styles.btnGhost}>🛰 Live Dashboard</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.section} aria-label="Dados do mercado espacial">
        <div className={styles.statsRow} role="list">
          {stats.map(s => (
            <div key={s.value} className={styles.statBlock} role="listitem">
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RISKS */}
      <section className={styles.section} aria-labelledby="risks-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Problema Identificado</p>
          <h2 className={styles.sectionTitle} id="risks-heading">Riscos Reais em Missões Tripuladas</h2>
          <p className={styles.sectionDesc}>
            Identificamos três riscos críticos que o Dragon Telemetry resolve.
          </p>
        </div>

        <div className={styles.grid3}>
          {risks.map(r => (
            <Card key={r.title} icon="⚠️" title={r.title} text={r.text} />
          ))}
        </div>
      </section>

      {/* ODS */}
      <section className={styles.section} aria-label="ODS relacionados">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Objetivos de Desenvolvimento Sustentável</p>
        </div>
        <div className={styles.odsList} role="list">
          {dados.projeto.ods.map(o => (
            <span key={o} className={styles.odsPill} role="listitem">{o}</span>
          ))}
        </div>
      </section>

    </main>
  )
}
