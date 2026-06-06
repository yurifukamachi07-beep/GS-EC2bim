import { useState } from 'react'
import { Link } from 'react-router-dom'
import dados from '../data/dados.json'
import styles from './Page.module.css'
import aStyles from './Aplicacao.module.css'

const steps = [
  { num:'01', title:'Sensores Coletam a Cada Segundo', text:'DHT22, BMP180 e MPU6050 lidos em paralelo. ESP32 processa os três a cada 1.000ms.', tag:'Edge · ESP32', tagColor:'var(--accent)' },
  { num:'02', title:'Lógica de Alerta no Edge',        text:'Firmware classifica NORMAL/ALERTA/CRÍTICO antes de publicar. LEDs e buzzer respondem independente de conexão.', tag:'Edge · Firmware', tagColor:'var(--accent)' },
  { num:'03', title:'Publicação MQTT via TLS',         text:'Quatro tópicos publicados, criptografados na porta 8883, com reconexão automática.', tag:'Cloud · MQTT', tagColor:'var(--accent2)' },
  { num:'04', title:'Dashboard em Tempo Real',         text:'Painel web conecta via WebSocket seguro (WSS :8884). Gráficos e métricas atualizam instantaneamente.', tag:'Dashboard · WSS', tagColor:'var(--green)' },
  { num:'05', title:'Alerta Crítico — Ação Imediata',  text:'Overlay vermelho piscante, alerta sonoro e log de evento. Operador age em segundos.', tag:'Alerta · Intervenção', tagColor:'var(--red)' },
]

export default function Aplicacao() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.heroHalf}`} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Na Prática</p>
          <h1 className={styles.heroTitle} id="hero-title">Uma Missão,<br/><em>Passo a Passo</em></h1>
          <p className={styles.heroSub}>Do lançamento à reentrada — como o sistema funciona em voo real.</p>
        </div>
      </section>

      {/* STEPS */}
      <section className={styles.section} aria-labelledby="flow-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Fluxo Operacional</p>
          <h2 className={styles.sectionTitle} id="flow-heading">Como Funciona na Prática</h2>
        </div>
        <div className={aStyles.steps} role="list">
          {steps.map(s => (
            <div key={s.num} className={aStyles.step} role="listitem">
              <div className={aStyles.stepNum} aria-hidden="true">{s.num}</div>
              <div className={aStyles.stepBody}>
                <h3 className={aStyles.stepTitle}>{s.title}</h3>
                <p className={aStyles.stepText}>{s.text}</p>
                <span className={aStyles.stepTag} style={{ '--tc': s.tagColor }}>{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} aria-labelledby="faq-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Perguntas Frequentes</p>
          <h2 className={styles.sectionTitle} id="faq-heading">FAQ Técnico</h2>
        </div>
        <div className={aStyles.faqList} role="list">
          {dados.faqs.map((f, i) => <FaqItem key={i} faq={f} />)}
        </div>
      </section>

      {/* CTA */}
      <div className={styles.section} style={{ textAlign:'center', paddingTop:0 }}>
        <Link to="/telemetria" className={styles.btnPrimary}>🛰 Ver Dashboard ao Vivo →</Link>
      </div>
    </main>
  )
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${aStyles.faqItem} ${open ? aStyles.faqOpen : ''}`} role="listitem">
      <button
        className={aStyles.faqQ}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {faq.pergunta}
        <span className={aStyles.faqArrow} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className={aStyles.faqA}>{faq.resposta}</p>}
    </div>
  )
}
