# Aplicativo da Regra 20-20-20

Um aplicativo web moderno e responsivo para ajudar a reduzir a fadiga ocular seguindo a regra 20-20-20.

## 📖 Sobre a Regra 20-20-20

A regra 20-20-20 é uma técnica recomendada por oftalmologistas para reduzir a fadiga ocular causada pelo uso prolongado de telas:

- **A cada 20 minutos** de trabalho na tela
- **Olhe para algo a 20 pés** (6 metros) de distância
- **Por pelo menos 20 segundos**

## ✨ Funcionalidades

- ⏰ **Timer de 20 minutos** com contagem regressiva
- 🔔 **Notificações visuais e sonoras** quando é hora da pausa
- 👀 **Timer de pausa de 20 segundos** para olhar à distância
- 📱 **Interface responsiva** que funciona em desktop e mobile
- ⚙️ **Configurações personalizáveis** para notificações e som
- 🎨 **Design moderno** com gradientes e animações suaves

## 🚀 Como Usar

### Desenvolvimento Local

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   - Acesse `http://localhost:5173/`

### Build de Produção

1. **Criar build:**
   ```bash
   npm run build
   ```

2. **Os arquivos de produção estarão na pasta `dist/`**

### Uso da Aplicação

1. **Configurar notificações:**
   - Clique em "Ativar" para permitir notificações do navegador
   - Configure o som de alerta conforme preferir

2. **Iniciar o timer:**
   - Clique no botão "▶ Iniciar" para começar o timer de 20 minutos
   - O timer mostrará "Trabalhando..." e contará regressivamente

3. **Durante a pausa:**
   - Quando o timer chegar a zero, você será notificado
   - Uma tela de pausa aparecerá com timer de 20 segundos
   - Olhe para algo a 6 metros de distância durante este tempo

4. **Controles disponíveis:**
   - **Pausar/Retomar:** Pause ou retome o timer a qualquer momento
   - **Resetar:** Reinicie o timer para 20 minutos
   - **Pular Pausa:** Pule a pausa de 20 segundos se necessário

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **CSS3** - Estilização moderna com gradientes e animações
- **Web Audio API** - Sons de notificação
- **Notification API** - Notificações do navegador

## 📱 Responsividade

O aplicativo é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop:** Interface completa com todos os elementos
- **Tablet:** Layout otimizado para telas médias
- **Mobile:** Interface compacta com botões empilhados

## 🔧 Estrutura do Projeto

```
regra-20-20-20/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos customizados
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── public/              # Arquivos estáticos
├── dist/                # Build de produção
└── package.json         # Dependências e scripts
```

## 💡 Dicas de Uso

- **Mantenha uma janela próxima** para facilitar o olhar à distância
- **Identifique objetos distantes** em seu ambiente de trabalho antes de começar
- **Use as notificações** para não perder os lembretes
- **Seja consistente** - use o aplicativo regularmente para melhores resultados
