import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutos em segundos
  const [isRunning, setIsRunning] = useState(false)
  const [isBreakTime, setIsBreakTime] = useState(false)
  const [breakTimeLeft, setBreakTimeLeft] = useState(20) // 20 segundos
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef(null)

  // Função para formatar tempo em MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Função para criar som de notificação
  const playNotificationSound = () => {
    if (soundEnabled) {
      try {
        // Criar um som usando Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      } catch (error) {
        console.log('Erro ao reproduzir som:', error)
      }
    }
  }

  // Função para mostrar notificação do navegador
  const showNotification = (title, body) => {
    if (notificationsEnabled && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      })
    }
  }

  // Solicitar permissão para notificações
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === 'granted')
    }
  }

  // Verificar permissão de notificação ao carregar
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted')
    }
  }, [])

  // Efeito para controlar o timer principal
  useEffect(() => {
    if (isRunning && !isBreakTime && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsBreakTime(true)
            setBreakTimeLeft(20)
            playNotificationSound()
            showNotification('Hora da Pausa! 👀', 'Olhe para algo a 6 metros de distância por 20 segundos.')
            return 20 * 60 // Reset para 20 minutos
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, isBreakTime, timeLeft, notificationsEnabled, soundEnabled])

  // Efeito para controlar o timer de pausa
  useEffect(() => {
    if (isBreakTime && breakTimeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 1) {
            setIsBreakTime(false)
            playNotificationSound()
            showNotification('Pausa Concluída! 💻', 'Você pode voltar ao trabalho.')
            return 20
          }
          return prev - 1
        })
      }, 1000)
    } else if (isBreakTime && breakTimeLeft === 0) {
      setIsBreakTime(false)
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isBreakTime, breakTimeLeft, notificationsEnabled, soundEnabled])

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreakTime(false)
    setTimeLeft(20 * 60)
    setBreakTimeLeft(20)
    clearInterval(intervalRef.current)
  }

  const skipBreak = () => {
    setIsBreakTime(false)
    setBreakTimeLeft(20)
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>Regra 20-20-20</h1>
          <p>
            A cada 20 minutos, olhe para algo a 20 pés de distância (6 metros) por 20 segundos
          </p>
        </div>

        {/* Configurações */}
        <div className="card settings-card">
          <h3 className="settings-title">Configurações</h3>
          <div className="settings-row">
            <span className="settings-label">Notificações do navegador</span>
            <button
              onClick={requestNotificationPermission}
              className={`settings-button ${notificationsEnabled ? 'active' : 'inactive'}`}
            >
              {notificationsEnabled ? '✓ Ativado' : 'Ativar'}
            </button>
          </div>
          <div className="settings-row">
            <span className="settings-label">Som de alerta</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`settings-button ${soundEnabled ? 'active' : 'inactive'}`}
            >
              {soundEnabled ? '🔊 Ligado' : '🔇 Desligado'}
            </button>
          </div>
        </div>
        
        {!isBreakTime ? (
          /* Timer Principal */
          <div className="card">
            <div className={`timer-display ${isRunning ? 'glow' : ''}`}>
              <div className="timer-time">
                {formatTime(timeLeft)}
              </div>
              <div className="timer-status">
                {isRunning ? 'Trabalhando...' : 'Pronto para começar'}
              </div>
            </div>
            
            <div className="controls">
              {!isRunning ? (
                <button onClick={startTimer} className="btn btn-start">
                  ▶ Iniciar
                </button>
              ) : (
                <button onClick={pauseTimer} className="btn btn-pause">
                  ⏸ Pausar
                </button>
              )}
              <button onClick={resetTimer} className="btn btn-reset">
                🔄 Resetar
              </button>
            </div>
          </div>
        ) : (
          /* Tela de Pausa */
          <div className="card">
            <div className="break-section">
              <div className="break-emoji">👀</div>
              <h2 className="break-title">Hora da Pausa!</h2>
              <p className="break-subtitle">Olhe para algo a 6 metros de distância</p>
              
              <div className="break-timer">
                <div className="break-time">
                  {breakTimeLeft}s
                </div>
              </div>
              
              <button onClick={skipBreak} className="btn btn-skip">
                ⏭ Pular Pausa
              </button>
            </div>
          </div>
        )}
        
        {/* Informações */}
        <div className="card">
          <div className="info-section">
            <h3>
              <span className="info-emoji">ℹ️</span>
              Sobre a Regra 20-20-20
            </h3>
            <p className="info-text">
              Esta regra ajuda a reduzir a fadiga ocular causada pelo uso prolongado de telas.
              A cada 20 minutos de trabalho, faça uma pausa de 20 segundos olhando para algo
              a pelo menos 20 pés (6 metros) de distância.
            </p>
            
            <div className="info-tip">
              <p>
                💡 Dica: Mantenha uma janela próxima ou identifique objetos distantes em seu ambiente de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

