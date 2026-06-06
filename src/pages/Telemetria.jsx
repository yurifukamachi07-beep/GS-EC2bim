import { useState, useEffect, useRef } from 'react'
import styles from './Telemetria.module.css'

const BROKER = 'wss://bd024fe521b64a85be1e2e59e993c7cf.s1.eu.hivemq.cloud:8884/mqtt'
const OPTS = { username:'yurifuka', password:'Fiap2026', clientId:'react-'+Math.random().toString(16).slice(2,8) }
const MAX = 40

function level(type, v) {
  if (type === 'temp')     return v > 40 || v < 5 ? 'crit' : v > 30 || v < 15 ? 'warn' : 'ok'
  if (type === 'pressure') return v < 800 ? 'crit' : v < 950 ? 'warn' : 'ok'
  if (type === 'gforce')   return v > 3.0 ? 'crit' : v > 2.0 ? 'warn' : 'ok'
  return 'ok'
}

export default function Telemetria() {
  const [conn, setConn]     = useState('connecting') // connecting | on | err
  const [pkts, setPkts]     = useState(0)
  const [status, setStatus] = useState('—')
  const [clock, setClock]   = useState('')
  const [metrics, setMetrics] = useState({
    temp:  { value:'—', level:'ok', pct:0 },
    pres:  { value:'—', level:'ok', pct:0 },
    gfor:  { value:'—', level:'ok', pct:0 },
  })
  const [logs, setLogs]     = useState([{ ts: new Date().toTimeString().slice(0,8), msg:'Conectando ao HiveMQ…', type:'info' }])
  const [history, setHistory] = useState({ temp:[], pres:[], gfor:[] })
  const mqttRef = useRef(null)

  const addLog = (msg, type='info') => {
    const entry = { ts: new Date().toTimeString().slice(0,8), msg, type }
    setLogs(prev => [entry, ...prev].slice(0, 60))
  }

  // Clock
  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toTimeString().slice(0,8)), 1000)
    return () => clearInterval(id)
  }, [])

  // MQTT
  useEffect(() => {
    if (!window.mqtt) return
    const client = window.mqtt.connect(BROKER, { ...OPTS, clean:true, reconnectPeriod:3000 })
    mqttRef.current = client

    client.on('connect', () => { setConn('on'); addLog('Conexão MQTT estabelecida.'); client.subscribe('iot/#', { qos:1 }) })
    client.on('reconnect', () => setConn('connecting'))
    client.on('error', err => { setConn('err'); addLog('Erro: '+err.message, 'critical') })

    client.on('message', (topic, payload) => {
      const val = payload.toString().trim()
      setPkts(p => p + 1)

      if (topic === 'iot/dragon/temperatura') {
        const t = parseFloat(val); if (isNaN(t)) return
        const lvl = level('temp', t)
        setMetrics(m => ({ ...m, temp: { value: t.toFixed(1), level: lvl, pct: Math.min((t/50)*100, 100) } }))
        setHistory(h => ({ ...h, temp: [...h.temp.slice(-MAX+1), t] }))
        if (lvl === 'crit') addLog(`TEMP CRÍTICA: ${t.toFixed(1)} °C`, 'critical')
        else if (lvl === 'warn') addLog(`Temp alerta: ${t.toFixed(1)} °C`, 'warning')
      } else if (topic === 'iot/dragon/pressao') {
        const p = parseFloat(val); if (isNaN(p)) return
        const lvl = level('pressure', p)
        setMetrics(m => ({ ...m, pres: { value: p.toFixed(1), level: lvl, pct: Math.min(((p-700)/400)*100, 100) } }))
        setHistory(h => ({ ...h, pres: [...h.pres.slice(-MAX+1), p] }))
        if (lvl === 'crit') addLog(`PRESSÃO CRÍTICA: ${p.toFixed(1)} hPa`, 'critical')
      } else if (topic === 'iot/dragon/forcaG') {
        const g = parseFloat(val); if (isNaN(g)) return
        const lvl = level('gforce', g)
        setMetrics(m => ({ ...m, gfor: { value: g.toFixed(2), level: lvl, pct: Math.min((g/5)*100, 100) } }))
        setHistory(h => ({ ...h, gfor: [...h.gfor.slice(-MAX+1), g] }))
        if (lvl === 'crit') addLog(`G-FORCE CRÍTICA: ${g.toFixed(2)} G`, 'critical')
      } else if (topic === 'iot/dragon/status') {
        setStatus(val.trim().toUpperCase())
        addLog('Status → ' + val.trim())
      }
    })
    return () => client.end()
  }, [])

  const isCrit = Object.values(metrics).some(m => m.level === 'crit')
  const statusClass = status.includes('CRITI') ? styles.sCrit : status.includes('ALERT') ? styles.sWarn : styles.sOk
  const statusLabel = status.includes('CRITI') ? '⚠ CRÍTICO' : status.includes('ALERT') ? '△ ALERTA' : status === '—' ? '—' : '✓ NOMINAL'

  const mCards = [
    { key:'temp', label:'Temperatura da Cabine', unit:'°C' },
    { key:'pres', label:'Pressão da Cabine',     unit:'hPa' },
    { key:'gfor', label:'Força G (Eixo X)',       unit:'G' },
  ]

  return (
    <main className={`${styles.page} ${isCrit ? styles.critPage : ''}`} role="main">

      {/* STATUS BAR */}
      <div className={styles.bar} role="status" aria-live="polite">
        <div className={`${styles.dot} ${conn === 'on' ? styles.dotOn : conn === 'err' ? styles.dotErr : ''}`} aria-hidden="true" />
        <span className={styles.connLabel}>
          {conn === 'on' ? 'CONECTADO' : conn === 'err' ? 'ERRO' : 'CONECTANDO…'}
        </span>
        <span className={styles.sep}>//</span>
        <span className={`${styles.mStatus} ${statusClass}`} aria-label={`Status: ${statusLabel}`}>{statusLabel}</span>
        <span className={styles.right}>
          PACOTES: <strong style={{ color:'var(--accent)' }}>{pkts}</strong>
          <span className={styles.clk}>{clock}</span>
        </span>
      </div>

      {/* METRICS */}
      <div className={styles.metricsRow}>
        {mCards.map(m => {
          const data = metrics[m.key]
          return (
            <div key={m.key} className={`${styles.mCard} ${data.level === 'warn' ? styles.mWarn : data.level === 'crit' ? styles.mCrit : ''}`}
              aria-label={m.label}>
              <div className={styles.mLabel}>{m.label}</div>
              <div className={styles.mValue}>
                {data.value}<span className={styles.mUnit}>{m.unit}</span>
              </div>
              <div className={styles.mBar}>
                <div className={styles.mFill} style={{ width: `${data.pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* MINI SPARKLINES */}
      <div className={styles.sparks}>
        <Spark data={history.temp} color="#00c2ff" label="Temperatura (°C)" />
        <Spark data={history.pres} color="#00e887" label="Pressão (hPa)" />
        <Spark data={history.gfor} color="#ffd24d" label="Força G (G)" />
      </div>

      {/* LOG */}
      <div className={styles.logBox} aria-label="Log de eventos" aria-live="polite">
        <div className={styles.logTitle}>▸ Log de Telemetria</div>
        {logs.map((l, i) => (
          <div key={i} className={`${styles.logEntry} ${styles['log_'+l.type]}`}>
            <span className={styles.logTs}>{l.ts}</span>
            <span>{l.msg}</span>
          </div>
        ))}
      </div>

    </main>
  )
}

// Inline SVG sparkline
function Spark({ data, color, label }) {
  if (data.length < 2) return (
    <div className={styles.sparkCard}>
      <div className={styles.sparkTitle}>{label}</div>
      <div className={styles.sparkEmpty}>Aguardando dados…</div>
    </div>
  )
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const w = 300, h = 80
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 10) - 5
    return `${x},${y}`
  }).join(' ')
  return (
    <div className={styles.sparkCard}>
      <div className={styles.sparkTitle}>{label}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className={styles.sparkSvg} aria-hidden="true">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
