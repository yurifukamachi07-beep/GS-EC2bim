import { useState } from 'react'
import dados from '../data/dados.json'
import styles from './Page.module.css'
import oStyles from './Objetivos.module.css'

const goals = [
  { num:'01', title:'Monitoramento em Tempo Real', text:'ESP32 coleta e publica dados dos 3 sensores a cada 1s via MQTT TLS.', pct:100 },
  { num:'02', title:'Sistema de Alertas em 3 Níveis', text:'NORMAL, ALERTA e CRÍTICO com LEDs, buzzer e overlay no dashboard.', pct:100 },
  { num:'03', title:'Dashboard com Histórico', text:'Gráficos dos últimos 40 pontos atualizados em tempo real via WebSocket.', pct:100 },
  { num:'04', title:'Interface Responsiva e Acessível', text:'Dark/light mode, ARIA, navegação por teclado, mobile-first.', pct:100 },
  { num:'05', title:'Integração FIWARE (Futuro)', text:'Evolução para Orion Context Broker com NGSIv2 e histórico persistente.', pct:40 },
]

export default function Objetivos() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.heroHalf}`} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Metas do Sistema</p>
          <h1 className={styles.heroTitle} id="hero-title">O Que a <em>Dragon</em><br/>Precisa Alcançar</h1>
          <p className={styles.heroSub}>Cinco objetivos que guiam cada decisão de engenharia.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="goals-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Roadmap Técnico</p>
          <h2 className={styles.sectionTitle} id="goals-heading">Objetivos por Camada</h2>
        </div>

        <div className={oStyles.timeline} role="list">
          {goals.map(g => (
            <GoalItem key={g.num} goal={g} />
          ))}
        </div>
      </section>

      {/* Alerts section */}
      <section className={styles.section} aria-labelledby="alerts-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Sistema de Alertas</p>
          <h2 className={styles.sectionTitle} id="alerts-heading">Níveis de Operação</h2>
        </div>
        <div className={styles.grid3}>
          {dados.alertas.map(a => (
            <div key={a.nivel} className={oStyles.alertCard} style={{ '--alert-color': a.cor }}>
              <div className={oStyles.alertDot} aria-hidden="true" />
              <h3 className={oStyles.alertTitle}>{a.nivel}</h3>
              <p className={oStyles.alertText}>{a.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function GoalItem({ goal }) {
  const [visible, setVisible] = useState(false)
  return (
    <div
      className={oStyles.goalItem}
      role="listitem"
      ref={el => {
        if (!el) return
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold:.3 })
        io.observe(el)
      }}
    >
      <div className={oStyles.goalNum} aria-hidden="true">OBJ {goal.num}</div>
      <div className={oStyles.goalBody}>
        <h3 className={oStyles.goalTitle}>{goal.title}</h3>
        <p className={oStyles.goalText}>{goal.text}</p>
        <div className={oStyles.progressWrap}>
          <div className={oStyles.progressBar}>
            <div
              className={oStyles.progressFill}
              style={{ width: visible ? `${goal.pct}%` : '0%' }}
              role="progressbar"
              aria-valuenow={goal.pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={oStyles.progressPct}>{goal.pct}%</span>
        </div>
      </div>
    </div>
  )
}
