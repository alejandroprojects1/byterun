# Robô Runner — Corrida do Hardware

Jogo mobile 3D de corrida infinita educativo. O jogador controla um robô sobre uma roda giroscópica,
coleta peças de computador e responde a perguntas sobre elas.

- **Controles:** deslize ◀ ▶ para trocar de pista, ▲ para pular, ▼ para deslizar (no computador: setas ou WASD; `P` pausa).
- **Mundos:** Hardware Externo (mesa cibernética) e Hardware Interno (placa-mãe).
- **Regras:** 3 vidas. Bater em um obstáculo ou errar uma pergunta custa 1 vida.

## Arquivos do jogo

Somente estes três são necessários: `index.html`, `style.css`, `game.js`.
(`serve.ps1` é apenas um servidor local de teste: `powershell -File serve.ps1`.)

## Publicar no GitHub Pages

1. Em github.com, crie um repositório **público** (ex.: `robo-runner`).
2. Na página do repositório: **Add file → Upload files**, arraste `index.html`, `style.css` e `game.js` e clique em **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, pasta `/ (root)` → **Save**.
4. Após 1–2 minutos o jogo estará em `https://SEU-USUARIO.github.io/robo-runner/`.

O jogo usa a biblioteca Three.js carregada por CDN, portanto precisa de internet para abrir.
