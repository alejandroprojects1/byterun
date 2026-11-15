/* Robô Runner — Corrida do Hardware
   Corrida infinita 3D educativa (Three.js). Sem build: basta abrir index.html. */
(function () {
'use strict';
const $ = id => document.getElementById(id);
if (!window.THREE) { $('err').classList.remove('hidden'); return; }
const THREE = window.THREE;

/* =====================================================================
   CONTEÚDO EDUCATIVO
   ===================================================================== */
const WORLDS = {
  externo: {
    nome: 'Hardware Externo', bg: 0x070b24, accent: 0x21c8ff,
    itens: [
      { id: 'monitor', nome: 'Monitor', ab: 'MONITOR', fato: 'exibe as imagens do computador' },
      { id: 'teclado', nome: 'Teclado', ab: 'TECLADO', fato: 'serve para digitar letras e comandos' },
      { id: 'mouse', nome: 'Mouse', ab: 'MOUSE', fato: 'move o cursor e seleciona itens' },
      { id: 'gabinete', nome: 'Gabinete', ab: 'GABINETE', fato: 'abriga e protege as peças internas' },
      { id: 'caixasom', nome: 'Caixa de som', ab: 'SOM', fato: 'reproduz os sons do computador' },
      { id: 'estabilizador', nome: 'Estabilizador', ab: 'ESTAB.', fato: 'protege contra variações de energia' },
      { id: 'webcam', nome: 'Webcam', ab: 'WEBCAM', fato: 'captura imagens e vídeos' }
    ],
    perguntas: [
      ['monitor', 'Qual é a principal função do monitor?', ['Exibir as imagens e informações do computador', 'Digitar textos e comandos', 'Guardar os arquivos do computador'], 'O monitor é um dispositivo de saída: mostra na tela o que o computador está processando.'],
      ['monitor', 'O monitor é um dispositivo de…', ['Saída de dados', 'Entrada de dados', 'Armazenamento'], 'Ele recebe informações do computador e as apresenta ao usuário — por isso é de saída.'],
      ['teclado', 'Para que serve o teclado?', ['Digitar letras, números e comandos', 'Mostrar imagens na tela', 'Reproduzir sons'], 'O teclado envia ao computador cada tecla que você pressiona.'],
      ['teclado', 'O teclado é um dispositivo de…', ['Entrada de dados', 'Saída de dados', 'Resfriamento'], 'Com ele o usuário envia informações para o computador — por isso é de entrada.'],
      ['mouse', 'O que o mouse faz?', ['Move o cursor e seleciona itens na tela', 'Imprime documentos', 'Protege contra quedas de energia'], 'O mouse é um dispositivo de entrada usado para apontar, clicar e arrastar.'],
      ['mouse', 'Qual periférico usamos para clicar em ícones e botões?', ['Mouse', 'Caixa de som', 'Estabilizador'], 'O mouse controla o cursor e permite clicar nos elementos da tela.'],
      ['gabinete', 'Qual é a função do gabinete?', ['Abrigar e proteger as peças internas do computador', 'Exibir vídeos', 'Capturar imagens'], 'O gabinete é a "caixa" onde ficam placa-mãe, processador, memória, fonte e outros.'],
      ['gabinete', 'Onde ficam a placa-mãe, o processador e a memória?', ['Dentro do gabinete', 'Dentro do monitor', 'Dentro do teclado'], 'O gabinete guarda e protege todos os componentes internos.'],
      ['caixasom', 'Para que serve a caixa de som?', ['Reproduzir os sons do computador', 'Gravar a voz do usuário', 'Digitar textos'], 'A caixa de som transforma os sinais do computador em som que podemos ouvir.'],
      ['caixasom', 'A caixa de som é um dispositivo de…', ['Saída de áudio', 'Entrada de áudio', 'Armazenamento'], 'Ela emite som para o usuário. Quem capta som (entrada) é o microfone.'],
      ['estabilizador', 'Qual é a função do estabilizador?', ['Proteger o computador contra variações da energia elétrica', 'Aumentar a velocidade da internet', 'Guardar arquivos'], 'Ele mantém a tensão elétrica mais estável, evitando danos aos equipamentos.'],
      ['estabilizador', 'Qual equipamento fica entre a tomada e o computador para protegê-lo?', ['Estabilizador', 'Webcam', 'Mouse'], 'O estabilizador recebe a energia da tomada e a entrega mais estável ao computador.'],
      ['webcam', 'O que a webcam faz?', ['Captura imagens e vídeos para o computador', 'Reproduz músicas', 'Resfria o computador'], 'A webcam é um dispositivo de entrada: envia vídeo para o computador.'],
      ['webcam', 'Em uma videochamada, qual periférico envia a sua imagem?', ['Webcam', 'Monitor', 'Caixa de som'], 'A webcam captura sua imagem; o monitor apenas exibe a imagem dos outros.']
    ]
  },
  interno: {
    nome: 'Hardware Interno', bg: 0x03140f, accent: 0x3dffb0,
    itens: [
      { id: 'placamae', nome: 'Placa-mãe', ab: 'PLACA-MÃE', fato: 'conecta todos os componentes' },
      { id: 'ram', nome: 'Memória RAM', ab: 'RAM', fato: 'guarda dados temporários dos programas' },
      { id: 'cpu', nome: 'Processador', ab: 'CPU', fato: 'é o cérebro: executa as instruções' },
      { id: 'fonte', nome: 'Fonte', ab: 'FONTE', fato: 'fornece energia para todas as peças' },
      { id: 'gpu', nome: 'Placa de vídeo', ab: 'VÍDEO', fato: 'gera as imagens enviadas ao monitor' },
      { id: 'ssd', nome: 'SSD', ab: 'SSD', fato: 'armazena arquivos de forma permanente' },
      { id: 'cooler', nome: 'Cooler', ab: 'COOLER', fato: 'resfria os componentes' }
    ],
    perguntas: [
      ['placamae', 'Qual é a função da placa-mãe?', ['Conectar os componentes e permitir que se comuniquem', 'Resfriar o processador', 'Exibir imagens na tela'], 'Todas as peças se encaixam na placa-mãe, que faz a comunicação entre elas.'],
      ['placamae', 'Em qual peça o processador e a memória RAM são encaixados?', ['Placa-mãe', 'Fonte', 'SSD'], 'A placa-mãe tem o soquete do processador e os slots de memória.'],
      ['ram', 'O que a memória RAM faz?', ['Guarda temporariamente os dados dos programas em uso', 'Guarda os arquivos para sempre', 'Fornece energia às peças'], 'A RAM é a memória de trabalho: rápida, mas temporária.'],
      ['ram', 'O que acontece com os dados da RAM quando o computador é desligado?', ['São apagados', 'Ficam salvos para sempre', 'Vão para o monitor'], 'A RAM é volátil: precisa de energia para manter os dados.'],
      ['cpu', 'O processador (CPU) é conhecido como…', ['O cérebro do computador', 'O coração da tela', 'A memória permanente'], 'É ele que executa as instruções e os cálculos de todos os programas.'],
      ['cpu', 'Qual é a função do processador?', ['Executar as instruções e os cálculos dos programas', 'Armazenar fotos e vídeos', 'Distribuir energia elétrica'], 'O processador interpreta e executa cada instrução dos programas.'],
      ['fonte', 'Qual é a função da fonte de alimentação?', ['Converter a energia da tomada e distribuí-la às peças', 'Processar os gráficos dos jogos', 'Guardar os programas'], 'A fonte transforma a energia da tomada nas tensões que cada componente precisa.'],
      ['fonte', 'Sem qual peça nenhum componente recebe energia?', ['Fonte', 'Cooler', 'Memória RAM'], 'A fonte alimenta a placa-mãe e todos os demais componentes.'],
      ['gpu', 'O que a placa de vídeo faz?', ['Processa e gera as imagens enviadas ao monitor', 'Resfria o gabinete', 'Guarda os arquivos'], 'A placa de vídeo (GPU) cria as imagens que aparecem na tela.'],
      ['gpu', 'Qual peça é mais importante para rodar jogos com gráficos avançados?', ['Placa de vídeo', 'Cooler', 'Fonte'], 'A GPU é especializada em processar gráficos.'],
      ['ssd', 'Para que serve o SSD?', ['Armazenar arquivos e programas de forma permanente', 'Guardar dados só enquanto o PC está ligado', 'Resfriar o processador'], 'O SSD mantém os dados salvos mesmo com o computador desligado.'],
      ['ssd', 'Comparado a um HD tradicional, o SSD é…', ['Mais rápido, pois não tem partes móveis', 'Mais lento, pois usa discos giratórios', 'Igual, só muda a cor'], 'O SSD usa memória flash, sem discos girando — por isso é bem mais rápido.'],
      ['cooler', 'Qual é a função do cooler?', ['Resfriar os componentes, evitando superaquecimento', 'Aumentar a memória', 'Gerar as imagens'], 'O cooler retira o calor, principalmente do processador.'],
      ['cooler', 'O que pode acontecer se o cooler parar de funcionar?', ['O processador pode superaquecer', 'O teclado para de digitar', 'A tela fica maior'], 'Sem resfriamento o processador esquenta demais e o computador pode desligar ou sofrer danos.']
    ]
  }
};

/* =====================================================================
   BASE 3D
   ===================================================================== */
const LANE = 2.0, LANES = [-LANE, 0, LANE];
const SPAWN_Z = -130, TRACK_LEN = 320, TILE = 6.6, GTILE = 16;

const canvas = $('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
scene.add(new THREE.HemisphereLight(0xdcefff, 0xb89b74, 1.15));
const sun = new THREE.DirectionalLight(0xfff3dd, 2.2);
sun.position.set(3, 9, 8); scene.add(sun);
const rimLight = new THREE.DirectionalLight(0x8cc4ff, .7);   // contraluz azul, destaca a silhueta
rimLight.position.set(-4, 5, -8); scene.add(rimLight);
// ambiente de estúdio para reflexos nas superfícies brilhantes
(function () {
  const env = new THREE.Scene(); env.background = new THREE.Color(0x6aa6e6);
  const panel = (v, tint, x, y, z, w, h) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(tint).multiplyScalar(v), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  panel(5, 0xffffff, 0, 9, 2, 12, 10); panel(4, 0xeaf4ff, 0, 3, 10, 10, 5);
  panel(3, 0x7fc4ff, -9, 2, 2, 6, 9); panel(3, 0x7fc4ff, 9, 2, -2, 6, 9);
  panel(2, 0x3d6dff, 0, 2, -10, 12, 4); panel(1.2, 0xb99a70, 0, -7, 0, 24, 24);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(env, .04).texture; pm.dispose();
})();

let camBase = { y: 4.4, z: 8 };
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  const portrait = w < h;
  camera.fov = portrait ? 76 : 58;
  camBase = portrait ? { y: 4.3, z: 6.9 } : { y: 3.5, z: 5.8 };
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

/* ---------- helpers de malha ---------- */
const matCache = new Map();
function M(color, o) {
  const k = color + JSON.stringify(o || {});
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial(Object.assign({ color, roughness: .45, metalness: .2, envMapIntensity: .45 }, o)));
  return matCache.get(k);
}
const glow = (color, i = 1, o) => M(color, Object.assign({ emissive: color, emissiveIntensity: i, roughness: .4, metalness: 0, toneMapped: false, envMapIntensity: 0 }, o));
function mesh(geo, mat, x = 0, y = 0, z = 0) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); return m; }
const box = (w, h, d, mat, x, y, z) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z);
const cyl = (r, h, mat, x, y, z, seg = 20) => mesh(new THREE.CylinderGeometry(r, r, h, seg), mat, x, y, z);
const sph = (r, mat, x, y, z) => mesh(new THREE.SphereGeometry(r, 24, 16), mat, x, y, z);
const tor = (r, t, mat, x, y, z, arc = Math.PI * 2) => mesh(new THREE.TorusGeometry(r, t, 10, 28, arc), mat, x, y, z);
function grp() { const g = new THREE.Group(); for (const a of arguments) g.add(a); return g; }
function rot(m, x = 0, y = 0, z = 0) { m.rotation.set(x, y, z); return m; }
function scl(m, x, y, z) { m.scale.set(x, y, z); return m; }
function edges(m, color) {
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color }));
  e.position.copy(m.position); return e;
}
function canvasTex(w, h, draw, rx, ry) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (rx) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 4; }
  return t;
}
const hex = n => '#' + n.toString(16).padStart(6, '0');

/* =====================================================================
   ROBÔ (frente = +Z local; no jogo ele fica de costas para a câmera)
   ===================================================================== */
function lathe(pts, mat, seg = 48) {
  return new THREE.Mesh(new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg), mat);
}
let _haloTex;
function haloTex() {
  return _haloTex || (_haloTex = canvasTex(128, 128, c => {
    const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.22, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, 128, 128);
  }));
}
function halo(size, x = 0, y = 0, z = 0, op = .6, color = 0x2a9cff) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex(), color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: op, toneMapped: false }));
  s.scale.setScalar(size); s.position.set(x, y, z); return s;
}

function buildRobot() {
  const white = new THREE.MeshPhysicalMaterial({ color: 0xf3f6fc, metalness: .15, roughness: .22, clearcoat: 1, clearcoatRoughness: .08 });
  const grey = new THREE.MeshPhysicalMaterial({ color: 0xa9b4c6, metalness: .65, roughness: .28, clearcoat: .6 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x0c0e14, metalness: .4, roughness: .28, clearcoat: 1, clearcoatRoughness: .12 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x1b1e28, metalness: .75, roughness: .42 });
  const neon = new THREE.MeshBasicMaterial({ color: 0x38c4ff, toneMapped: false });
  const hot = new THREE.MeshBasicMaterial({ color: 0xa6e8ff, toneMapped: false });
  const finMat = new THREE.MeshPhysicalMaterial({ color: 0x2aa9ff, emissive: 0x1480ff, emissiveIntensity: .9, roughness: .15, transparent: true, opacity: .84, clearcoat: 1, side: THREE.DoubleSide });
  const tread = canvasTex(64, 128, (c, w, h) => {
    c.fillStyle = '#16181f'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#050608'; c.lineWidth = 12; c.lineJoin = 'miter';
    c.beginPath(); c.moveTo(10, -4); c.lineTo(44, 64); c.lineTo(10, 132); c.stroke();
    c.strokeStyle = '#2b2f3a'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(22, -4); c.lineTo(56, 64); c.lineTo(22, 132); c.stroke();
  }, 22, 1);
  const rubber = new THREE.MeshStandardMaterial({ map: tread, bumpMap: tread, bumpScale: 1.2, roughness: .82, metalness: .05 });
  const ringX = (r, t, mat, y) => rot(tor(r, t, mat, 0, y, 0), Math.PI / 2);   // anel em torno do eixo Y local

  /* ---------- roda giroscópica ---------- */
  const R = .68;
  const wheel = new THREE.Group(); wheel.position.y = R;
  const tire = lathe([[.38, -.25], [.5, -.3], [.6, -.285], [.655, -.2], [R, -.07], [R, .07], [.655, .2], [.6, .285], [.5, .3], [.38, .25]], rubber, 72);
  tire.rotation.z = Math.PI / 2; wheel.add(tire);
  for (let i = 0; i < 6; i++) {          // faixa luminosa segmentada (mostra o giro)
    const h = grp(rot(tor(R + .004, .022, neon, 0, 0, 0, .72), 0, Math.PI / 2)); h.rotation.x = i * Math.PI / 3; wheel.add(h);
  }
  for (const s of [-1, 1]) {             // calotas com anéis concêntricos
    const hub = new THREE.Group(); hub.position.x = s * .2; hub.rotation.z = -s * Math.PI / 2;
    hub.add(lathe([[0, 0], [.5, 0], [.5, .05], [.44, .1], [.3, .12], [0, .12]], dark));
    hub.add(ringX(.37, .038, neon, .105));
    hub.add(lathe([[.2, .1], [.275, .12], [.275, .16], [.2, .185], [0, .185]], grey));
    hub.add(ringX(.14, .026, hot, .18));
    hub.add(cyl(.085, .05, dark, 0, .19, 0));
    for (let i = 0; i < 3; i++) { const b = box(.05, .012, .1, neon, 0, .125, 0); const a = i * 2.094; b.position.set(Math.sin(a) * .31, .125, Math.cos(a) * .31); b.rotation.y = a; hub.add(b); }
    hub.add(halo(1.25, 0, .3, 0, .32));
    wheel.add(hub);
  }

  /* ---------- garfo, para-lama e quadril ---------- */
  const chassis = new THREE.Group();
  const fg = new THREE.CylinderGeometry(.745, .745, .5, 40, 1, true, 1.07, .95);
  const fender = new THREE.Mesh(fg, new THREE.MeshPhysicalMaterial({ color: 0xf3f6fc, metalness: .15, roughness: .22, clearcoat: 1, side: THREE.DoubleSide }));
  fender.rotation.z = Math.PI / 2; fender.position.y = R; chassis.add(fender);
  for (const s of [-1, 1]) {
    const rim = grp(rot(tor(.745, .032, white, 0, 0, 0, .95), 0, Math.PI / 2)); rim.rotation.x = 1.12; rim.position.set(s * .25, R, 0); chassis.add(rim);
    chassis.add(mesh(new THREE.CapsuleGeometry(.065, .62, 6, 14), white, s * .41, R + .37, 0));
    chassis.add(rot(cyl(.13, .07, white, s * .41, R, 0, 28), 0, 0, Math.PI / 2));
    chassis.add(rot(cyl(.07, .09, joint, s * .42, R, 0), 0, 0, Math.PI / 2));
    chassis.add(box(.02, .34, .05, neon, s * .478, R + .42, 0));
  }
  chassis.add(rot(box(.4, .045, .05, hot, 0, R + .685, -.325), -1.1));         // lanterna traseira
  chassis.add(halo(.8, 0, R + .7, -.42, .45));
  chassis.add(scl(sph(.34, white, 0, 1.47, 0), 1.32, .42, 1.22));
  chassis.add(scl(sph(.3, joint, 0, 1.41, 0), 1.3, .3, 1.15));
  chassis.add(box(.5, .03, .03, neon, 0, 1.5, -.4));

  /* ---------- tronco (pivô na cintura) ---------- */
  const upper = new THREE.Group(); upper.position.y = 1.5;
  upper.add(cyl(.13, .22, joint, 0, .08, 0, 24));
  upper.add(ringX(.135, .02, grey, .05)); upper.add(ringX(.135, .02, grey, .12));
  upper.add(scl(lathe([[0, .13], [.2, .13], [.3, .2], [.365, .36], [.378, .5], [.345, .64], [.255, .75], [.13, .8], [0, .8]], white), 1, 1, .86));
  upper.add(scl(sph(.27, dark, 0, .24, 0), 1.12, .5, .95));
  upper.add(scl(sph(.155, dark, 0, .5, -.295), 1, 1.38, .32));                // luz das costas
  upper.add(scl(sph(.11, neon, 0, .5, -.325), 1, 1.38, .3));
  upper.add(scl(sph(.06, hot, 0, .5, -.345), 1, 1.5, .3));
  upper.add(halo(.95, 0, .5, -.42, .5));
  upper.add(rot(cyl(.135, .03, dark, 0, .52, .312, 28), Math.PI / 2));        // botão power (peito)
  upper.add(tor(.085, .02, neon, 0, .52, .335, 5.2).rotateZ(2.1));
  upper.add(box(.025, .09, .02, neon, 0, .575, .338));
  upper.add(ringX(.14, .04, joint, .8));
  upper.add(cyl(.085, .24, joint, 0, .9, 0));
  upper.add(ringX(.09, .014, grey, .88)); upper.add(ringX(.09, .014, grey, .94));
  for (const s of [-1, 1]) upper.add(scl(sph(.155, white, s * .43, .63, 0), 1, .86, 1.05));

  /* ---------- cabeça ---------- */
  const head = new THREE.Group(); head.position.y = 1.5;
  const skull = new THREE.Group(); skull.scale.set(1.22, .96, 1.08); head.add(skull);
  skull.add(mesh(new THREE.SphereGeometry(.56, 56, 36), white));
  skull.add(mesh(new THREE.SphereGeometry(.566, 40, 16, Math.PI / 2 - 1.02, 2.04, 1.02, 1.03), dark));         // visor
  skull.add(mesh(new THREE.SphereGeometry(.564, 40, 12, Math.PI * 1.5 - .95, 1.9, 1.72, .7), grey));          // painel traseiro
  skull.add(mesh(new THREE.SphereGeometry(.565, 24, 12, Math.PI * 1.5 - .22, .44, .25, 1.0), grey));          // faixa central
  skull.add(rot(tor(.562, .006, joint), 0, Math.PI / 2));                                                    // junta dos painéis
  head.add(scl(sph(.5, dark, 0, -.3, 0), 1.15, .5, 1.0));
  head.add(box(.26, .045, .03, hot, 0, .2, -.572)); head.add(halo(.6, 0, .2, -.62, .5));                      // luz traseira
  head.add(box(.2, .03, .34, neon, 0, .535, .12));                                                           // faixa superior
  for (const s of [-1, 1]) {
    head.add(tor(.095, .03, neon, s * .2, -.03, .6, Math.PI));                                               // olhos felizes
    const ear = new THREE.Group(); ear.position.x = s * .63; ear.rotation.z = -s * Math.PI / 2;              // fones
    ear.add(lathe([[0, 0], [.25, 0], [.275, .03], [.275, .1], [.21, .155], [0, .155]], dark));
    ear.add(ringX(.22, .03, white, .12));
    ear.add(ringX(.15, .036, neon, .15));
    ear.add(cyl(.07, .03, hot, 0, .16, 0));
    ear.add(halo(1.0, 0, .3, 0, .45));
    head.add(ear);
    const sh = new THREE.Shape();                                                                            // antenas
    sh.moveTo(-.13, 0); sh.lineTo(.12, 0); sh.quadraticCurveTo(.17, .3, .1, .64); sh.quadraticCurveTo(-.07, .32, -.13, 0);
    const fgeo = new THREE.ExtrudeGeometry(sh, { depth: .05, bevelEnabled: true, bevelSize: .014, bevelThickness: .014, bevelSegments: 2, curveSegments: 14 });
    const fin = new THREE.Group(); fin.position.set(s * .43, .34, -.1); fin.rotation.set(-.22, 0, -s * .42); fin.scale.x = s;
    fin.add(mesh(fgeo, finMat)); fin.add(scl(mesh(fgeo, dark, 0, -.02, -.02), 1.2, .36, 1.9));
    fin.add(halo(.7, .04, .4, 0, .3));
    head.add(fin);
  }
  head.add(rot(tor(.07, .024, neon, 0, -.15, .605, Math.PI), 0, 0, Math.PI));                                 // sorriso
  upper.add(head);

  /* ---------- braços ---------- */
  const arms = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group(); arm.position.set(s * .47, .62, 0);
    arm.add(sph(.1, joint));
    arm.add(mesh(new THREE.CapsuleGeometry(.075, .2, 6, 16), white, 0, -.2, 0));
    arm.add(ringX(.078, .013, neon, -.2));
    arm.add(sph(.082, joint, 0, -.39, 0));
    arm.add(mesh(new THREE.CylinderGeometry(.078, .118, .3, 24), white, 0, -.57, 0));
    arm.add(scl(sph(.118, white, 0, -.72, 0), 1, .4, 1));
    arm.add(box(.02, .2, .05, neon, s * .1, -.58, 0));
    arm.add(cyl(.07, .05, joint, 0, -.77, 0));
    const hand = new THREE.Group(); hand.position.y = -.85;
    hand.add(scl(sph(.088, dark), 1, .95, .7));
    for (let i = 0; i < 4; i++) { const f = mesh(new THREE.CapsuleGeometry(.024, .07, 4, 8), dark, -.063 + i * .042, -.1, .01); f.rotation.x = .35; hand.add(f); }
    const th = mesh(new THREE.CapsuleGeometry(.026, .06, 4, 8), dark, 0, -.03, .07); th.rotation.x = 1.1; hand.add(th);
    arm.add(hand);
    arm.rotation.z = s * .3; arm.userData.s = s;
    upper.add(arm); arms.push(arm);
  }

  const g = grp(wheel, chassis, upper);
  const S = .72; g.scale.setScalar(S);
  g.userData = { wheel, upper, head, arms, wheelR: R * S };
  return g;
}
const robot = buildRobot();
scene.add(robot);
const shadow = grp(
  rot(mesh(new THREE.CircleGeometry(.8, 28), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: .45, depthWrite: false }), 0, .03, 0), -Math.PI / 2),
  rot(mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: haloTex(), color: 0x1e6dff, blending: THREE.AdditiveBlending, transparent: true, opacity: .2, depthWrite: false, toneMapped: false }), 0, .04, 0), -Math.PI / 2));
scene.add(shadow);

/* =====================================================================
   PEÇAS COLECIONÁVEIS
   ===================================================================== */
const DK = () => M(0x1a1f2e), GREEN = () => M(0x0f7a45, { roughness: .6 }), GOLD = () => glow(0xf2b632, .35), SILV = () => M(0xc4ccd8, { metalness: .7, roughness: .25 });
const ITEM = {
  monitor: () => grp(box(1.3, .82, .08, DK(), 0, .22, 0), box(1.16, .68, .03, glow(0x35c8ff, .9), 0, .22, .04), box(.12, .3, .06, DK(), 0, -.3, 0), box(.6, .06, .32, DK(), 0, -.46, 0)),
  teclado: () => {
    const g = grp(box(1.5, .08, .56, DK()));
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) g.add(box(.12, .05, .12, (r + c) % 4 ? M(0xdfe6f2) : glow(0x35c8ff, .9), -.6 + c * .15, .06, -.16 + r * .16));
    return rot(g, 1.0);
  },
  mouse: () => rot(grp(scl(sph(.36, M(0xeef2fa)), 1, .55, 1.5), box(.06, .1, .16, glow(0x35c8ff, 1), 0, .18, -.26), box(.02, .02, .4, DK(), 0, .2, -.3)), .7),
  gabinete: () => grp(box(.58, 1.15, 1.0, DK()), box(.05, .95, .03, glow(0x35c8ff, 1), .18, 0, .51), box(.03, .8, .7, glow(0x7a5cff, .7), .3, 0, 0), rot(cyl(.05, .03, glow(0x3dffb0, 1), -.15, .42, .51), Math.PI / 2)),
  caixasom: () => grp(box(.66, 1.1, .5, DK()), rot(cyl(.22, .04, SILV(), 0, -.2, .26), Math.PI / 2), rot(cyl(.12, .06, DK(), 0, -.2, .27), Math.PI / 2), rot(cyl(.12, .04, SILV(), 0, .3, .26), Math.PI / 2), rot(tor(.22, .025, glow(0x35c8ff, 1), 0, -.2, .28))),
  estabilizador: () => grp(box(1.0, .55, .7, DK()), box(.16, .16, .03, M(0xeef2fa), -.3, .05, .36), box(.16, .16, .03, M(0xeef2fa), -.05, .05, .36), box(.14, .1, .04, glow(0xff3b4e, 1), .3, .1, .36), box(.9, .04, .6, glow(0x35c8ff, .6), 0, .29, 0)),
  webcam: () => grp(sph(.36, DK(), 0, .1, 0), rot(cyl(.2, .1, SILV(), 0, .1, .3), Math.PI / 2), rot(cyl(.13, .12, glow(0x35c8ff, 1), 0, .1, .32), Math.PI / 2), box(.14, .22, .14, DK(), 0, -.32, 0), box(.6, .08, .34, DK(), 0, -.46, 0)),
  placamae: () => rot(grp(box(1.3, .06, 1.3, GREEN()), box(.36, .08, .36, SILV(), -.2, .06, -.2), box(.07, .1, .7, DK(), .3, .07, -.1), box(.07, .1, .7, DK(), .44, .07, -.1), box(.8, .08, .08, DK(), -.1, .07, .35), box(.8, .08, .08, DK(), -.1, .07, .5), cyl(.06, .16, glow(0x35c8ff, .6), -.5, .1, .15), cyl(.06, .16, glow(0x35c8ff, .6), -.5, .1, -.5), box(1.2, .02, .03, GOLD(), 0, .04, .1)), 1.0),
  ram: () => {
    const g = grp(box(1.5, .4, .05, GREEN()), box(1.4, .07, .06, GOLD(), 0, -.2, 0));
    for (let i = 0; i < 4; i++) g.add(box(.26, .22, .08, DK(), -.52 + i * .35, .03, 0));
    return g;
  },
  cpu: () => rot(grp(box(1.0, .07, 1.0, GREEN()), box(.74, .1, .74, SILV(), 0, .08, 0), box(1.0, .03, 1.0, GOLD(), 0, -.05, 0), box(.3, .02, .3, glow(0x35c8ff, .8), 0, .14, 0)), 1.0),
  fonte: () => grp(box(1.1, .7, .8, M(0x3b4252, { metalness: .5 })), rot(tor(.26, .04, DK(), 0, 0, .41)), rot(cyl(.1, .03, glow(0x35c8ff, 1), 0, 0, .41), Math.PI / 2), box(.18, .1, .03, glow(0xffc531, .9), .38, -.22, .41), box(.5, .03, .03, DK(), 0, 0, .42), box(.03, .5, .03, DK(), 0, 0, .42)),
  gpu: () => {
    const g = grp(box(1.5, .56, .2, DK()), box(1.5, .05, .22, glow(0x3dffb0, .9), 0, .3, 0), box(.7, .1, .05, GOLD(), -.2, -.32, 0));
    for (const x of [-.38, .38]) g.add(rot(tor(.2, .035, SILV(), x, 0, .11)), rot(cyl(.07, .03, glow(0x35c8ff, 1), x, 0, .11), Math.PI / 2));
    return g;
  },
  ssd: () => grp(box(.78, 1.1, .09, DK()), box(.56, .46, .03, M(0xeef2fa), 0, .15, .05), box(.56, .1, .035, glow(0x35c8ff, 1), 0, .32, .05), box(.4, .07, .1, GOLD(), 0, -.56, 0)),
  cooler: () => {
    const g = grp(box(1.1, 1.1, .12, DK()), rot(cyl(.48, .14, M(0x06080d), 0, 0, 0), Math.PI / 2), rot(cyl(.13, .2, SILV(), 0, 0, 0), Math.PI / 2), rot(tor(.48, .03, glow(0x35c8ff, 1), 0, 0, .08)));
    for (let i = 0; i < 7; i++) { const b = box(.34, .1, .03, glow(0x35c8ff, .5), 0, 0, .09); const a = i / 7 * Math.PI * 2; b.position.set(Math.cos(a) * .28, Math.sin(a) * .28, .09); b.rotation.z = a + .5; g.add(b); }
    return g;
  }
};

function labelSprite(text) {
  const tex = canvasTex(320, 80, (c, w, h) => {
    c.fillStyle = '#0b6cff'; c.beginPath();
    c.roundRect ? c.roundRect(4, 8, w - 8, h - 16, 30) : c.rect(4, 8, w - 8, h - 16);
    c.fill(); c.lineWidth = 4; c.strokeStyle = '#7fe0ff'; c.stroke();
    c.fillStyle = '#fff'; c.font = 'bold 36px system-ui,Arial,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(text, w / 2, h / 2 + 2);
  });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
  s.scale.set(2.2, .55, 1); return s;
}
const tplCache = new Map();
function tpl(key, make) { if (!tplCache.has(key)) tplCache.set(key, make()); return tplCache.get(key).clone(); }

function makePiece(it) {
  return tpl('piece-' + it.id, () => {
    const model = ITEM[it.id](); const spin = grp(model); spin.name = 'spin'; spin.position.y = 1.15;
    const ring = rot(tor(.85, .04, glow(0x35e0ff, 1.2), 0, .06, 0), Math.PI / 2);
    const lab = labelSprite(it.nome); lab.position.y = 2.35;
    return grp(spin, ring, lab);
  });
}
function makeBit(color) {
  return tpl('bit' + color, () => { const m = mesh(new THREE.OctahedronGeometry(.26), glow(color, 1.2), 0, .9, 0); m.name = 'spin'; return grp(m); });
}

/* =====================================================================
   OBSTÁCULOS  (block = desviar · low = pular · high = deslizar)
   ===================================================================== */
function stripeTex() {
  return canvasTex(128, 32, (c, w, h) => {
    c.fillStyle = '#ffd21f'; c.fillRect(0, 0, w, h); c.fillStyle = '#15171c';
    for (let x = -32; x < w; x += 32) { c.beginPath(); c.moveTo(x, h); c.lineTo(x + 16, h); c.lineTo(x + 32, 0); c.lineTo(x + 16, 0); c.fill(); }
  });
}
let _stripe; const stripeMat = () => _stripe || (_stripe = new THREE.MeshStandardMaterial({ map: stripeTex(), emissive: 0x554400, roughness: .6 }));
function gate(barMat) {
  const post = M(0x2a3040, { metalness: .6 });
  return grp(cyl(.08, 2.6, post, -.92, 1.3, 0), cyl(.08, 2.6, post, .92, 1.3, 0),
    rot(cyl(.14, 1.9, barMat, 0, 2.45, 0), 0, 0, Math.PI / 2), box(1.7, .34, .08, stripeMat(), 0, 2.2, 0));
}
const OBST = {
  externo: {
    block: () => { const b = box(1.7, 1.9, 1.3, M(0x4a0d5e, { transparent: true, opacity: .88, emissive: 0x2a0535 }), 0, .95, 0); return grp(b, edges(b, 0xff4df0), box(1.0, 1.0, .8, glow(0xff4df0, .9), 0, .95, 0), box(1.72, .06, 1.32, glow(0xff4df0, 1), 0, 1.92, 0)); },
    low: () => grp(rot(cyl(.25, 1.7, glow(0xff8a1f, .5), 0, .27, 0), 0, 0, Math.PI / 2), box(.24, .56, .56, M(0x20242e), -.9, .28, 0), box(.24, .56, .56, M(0x20242e), .9, .28, 0), rot(tor(.26, .03, M(0x15171c), -.3, .27, 0), 0, Math.PI / 2), rot(tor(.26, .03, M(0x15171c), .3, .27, 0), 0, Math.PI / 2)),
    high: () => gate(glow(0xff3b4e, 1))
  },
  interno: {
    block: () => grp(cyl(.72, 2.1, M(0x1c3f9a, { metalness: .4, roughness: .35 }), 0, 1.05, 0, 24), cyl(.74, .3, M(0xd6dbe4, { metalness: .6 }), 0, 1.7, 0, 24), cyl(.7, .06, SILV(), 0, 2.13, 0, 24), box(1.0, .03, .08, M(0x555c6a), 0, 2.17, 0), box(.08, .03, 1.0, M(0x555c6a), 0, 2.17, 0), cyl(.8, .1, M(0x10131a), 0, .05, 0, 24), cyl(.745, .08, glow(0xff8a1f, .9), 0, .6, 0, 24)),
    low: () => { const g = grp(box(1.9, .5, .6, M(0x191c26), 0, .25, 0), box(1.6, .06, .26, GOLD(), 0, .52, 0), box(.14, .62, .64, M(0xeef2fa), -.95, .31, 0), box(.14, .62, .64, M(0xeef2fa), .95, .31, 0)); for (let i = 0; i < 8; i++) g.add(box(.06, .3, .62, glow(0xffa01f, .7), -.7 + i * .2, .25, 0)); return g; },
    high: () => gate(glow(0xff7a1f, 1))
  }
};

/* =====================================================================
   CENÁRIO
   ===================================================================== */
let world = null, worldKey = 'externo', trackTex, groundTex, decor = [], clouds = [];
function trackTexture(k) {          // asfalto comum com faixas pintadas
  return canvasTex(512, 512, (c, w, h) => {
    c.fillStyle = '#3b3d42'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 14000; i++) {                       // granulado do asfalto
      const v = 30 + Math.floor(Math.random() * 70);
      c.fillStyle = 'rgba(' + v + ',' + v + ',' + (v + 4) + ',.5)';
      c.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    const paint = k === 'externo' ? '#f2f2ee' : '#f1c232';
    c.fillStyle = paint; c.globalAlpha = .92;
    for (const u of [.348, .652]) for (let y = 0; y < h; y += 256) c.fillRect(u * w - 5, y + 40, 10, 150);   // faixas tracejadas
    c.fillStyle = '#f2f2ee';
    for (const u of [.04, .96]) c.fillRect(u * w - 5, 0, 10, h);                                           // bordas contínuas
    c.globalAlpha = 1;
  }, 1, TRACK_LEN / TILE);
}
function groundTexture(k) {
  return canvasTex(512, 512, (c, w, h) => {
    let s = 11; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    if (k === 'externo') {              // tampo de mesa em madeira clara
      const tones = ['#dcb684', '#d3aa77', '#e2bf90', '#d8b07e'];
      for (let p = 0; p < 4; p++) {
        c.fillStyle = tones[p]; c.fillRect(p * 128, 0, 128, h);
        for (let i = 0; i < 26; i++) {
          c.strokeStyle = 'rgba(120,78,40,' + (.05 + rnd() * .12) + ')'; c.lineWidth = 1 + rnd() * 2;
          const x = p * 128 + 4 + rnd() * 120; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke();
        }
        c.fillStyle = 'rgba(90,55,25,.5)'; c.fillRect(p * 128, 0, 3, h);
      }
    } else {                            // placa de circuito (sem brilho)
      c.fillStyle = '#1f7d50'; c.fillRect(0, 0, w, h);
      for (let i = 0; i < 26; i++) {
        c.strokeStyle = rnd() < .6 ? 'rgba(150,225,180,.55)' : 'rgba(12,70,42,.6)'; c.lineWidth = 3 + rnd() * 3;
        const x = 10 + rnd() * (w - 70), y0 = rnd() * (h - 170), j = 20 + rnd() * 30;
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y0); c.lineTo(x + j, y0 + j); c.lineTo(x + j, y0 + j + 60); c.lineTo(x, y0 + 2 * j + 60); c.lineTo(x, h); c.stroke();
        c.fillStyle = '#e0b84f'; c.beginPath(); c.arc(x + j, y0 + j + 30, 7, 0, 7); c.fill();
        c.fillStyle = '#1f7d50'; c.beginPath(); c.arc(x + j, y0 + j + 30, 3, 0, 7); c.fill();
      }
    }
  }, 400 / GTILE, TRACK_LEN / GTILE);
}
function skyTexture() {
  return canvasTex(8, 256, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#1c6fd6'); g.addColorStop(.3, '#4a9be8'); g.addColorStop(.5, '#9fd0f5'); g.addColorStop(.6, '#d6ecfb'); g.addColorStop(1, '#d6ecfb');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  });
}
function makeCloud() {
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xa9bfd8, fog: false });
  const g = new THREE.Group(), n = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) {
    const r = 4 + Math.random() * 4;
    g.add(scl(mesh(new THREE.SphereGeometry(r, 14, 10), mat, (i - n / 2) * 6 + Math.random() * 2, Math.random() * 2, Math.random() * 4), 1.3, .7, 1));
  }
  return g;
}
const PASTEL = [0xe2574c, 0x3f86d9, 0xf2b93b, 0x4fae6a, 0x8a63d2, 0xf08a3c];
const pick = a => a[Math.floor(Math.random() * a.length)];
const SOLID_GOLD = () => M(0xd9a93a, { metalness: .8, roughness: .3 });
const DECOR = {
  externo: [
    () => {                             // pilha de livros
      const g = new THREE.Group(); let y = 0; const n = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const hh = .55 + Math.random() * .4, ww = 3.6 + Math.random(), dd = 5 + Math.random();
        const b = grp(box(ww, hh, dd, M(pick(PASTEL), { roughness: .7 })), box(ww - .12, hh - .16, dd - .12, M(0xf7f3e8, { roughness: .9 }), .1, 0, 0));
        b.position.y = y + hh / 2; b.rotation.y = (Math.random() - .5) * .4; y += hh; g.add(b);
      }
      return g;
    },
    () => {                             // caneca
      const m = M(pick([0xffffff, 0xe2574c, 0x3f86d9, 0xf2b93b]), { roughness: .25 });
      return grp(cyl(1.3, 2.8, m, 0, 1.4, 0, 32), cyl(1.15, .05, M(0x4a2c17, { roughness: .4 }), 0, 2.79, 0, 32), tor(.75, .2, m, 1.5, 1.4, 0));
    },
    () => {                             // porta-lápis
      const g = grp(cyl(1.2, 3, M(0x39465e, { metalness: .4, roughness: .4 }), 0, 1.5, 0, 28));
      for (let i = 0; i < 4; i++) {
        const p = grp(cyl(.13, 3.2, M(pick(PASTEL), { roughness: .6 }), 0, 0, 0, 8), mesh(new THREE.ConeGeometry(.13, .45, 8), M(0xe8c99a), 0, 1.82, 0));
        p.position.set(-.5 + i * .35, 3.1, (i % 2) * .4 - .2); p.rotation.z = (i - 1.5) * .14; g.add(p);
      }
      return g;
    },
    () => {                             // vaso de planta
      const g = grp(mesh(new THREE.CylinderGeometry(1.25, .9, 1.8, 24), M(0xc8683f, { roughness: .8 }), 0, .9, 0), cyl(1.15, .05, M(0x3b2a1c, { roughness: 1 }), 0, 1.79, 0, 24));
      for (let i = 0; i < 6; i++) {
        const a = i * 1.05, r = .75 + Math.random() * .45;
        g.add(scl(sph(r, M(pick([0x3f9b4a, 0x4fb35a, 0x2f8640]), { roughness: .8 }), Math.cos(a) * .7, 2.5 + Math.random() * 1.2, Math.sin(a) * .7), 1, 1.15, 1));
      }
      return g;
    }
  ],
  interno: [
    () => { const w = 3 + Math.random() * 3; return grp(box(w, .8, w, M(0x15171d, { roughness: .35 }), 0, .5, 0), box(w + .5, .12, w + .5, SILV(), 0, .12, 0), cyl(.25, .04, M(0xf2f4f8), -w / 2 + .5, .91, -w / 2 + .5)); },
    () => { const h = 2.5 + Math.random() * 3; return grp(cyl(1, h, M(Math.random() < .5 ? 0x2456b8 : 0x1b1e26, { metalness: .4, roughness: .35 }), 0, h / 2, 0, 24), cyl(1, .06, SILV(), 0, h + .03, 0, 24), cyl(1.02, .3, M(0xd6dbe4), 0, h * .75, 0, 24)); },
    () => { const g = grp(box(4, .4, 3, M(0x8a93a3, { metalness: .7 }), 0, .2, 0)); for (let i = 0; i < 9; i++) g.add(box(.14, 2.6, 3, M(0xb4bdcb, { metalness: .7, roughness: .3 }), -1.8 + i * .45, 1.7, 0)); return g; },
    () => grp(box(.3, 3.4, 7, M(0x1c8a55, { roughness: .6 }), 0, 2, 0), box(.36, 1.6, 6, M(0x15171c), 0, 2.4, 0), box(.5, .5, 7.4, M(0x20242e), 0, .25, 0), box(.38, .1, 6.6, SOLID_GOLD(), 0, 3.75, 0))
  ]
};
function setupWorld(k) {
  if (world) scene.remove(world);
  worldKey = k; const W = WORLDS[k];
  world = new THREE.Group(); scene.add(world);
  scene.background = skyTexture(); scene.fog = new THREE.Fog(0xd0e8f9, 55, 150);
  trackTex = trackTexture(k); groundTex = groundTexture(k);
  const tr = rot(mesh(new THREE.PlaneGeometry(TILE, TRACK_LEN), new THREE.MeshStandardMaterial({ map: trackTex, roughness: .95, metalness: 0, envMapIntensity: .05 })), -Math.PI / 2);
  tr.position.z = -TRACK_LEN / 2 + 20;
  const gr = rot(mesh(new THREE.PlaneGeometry(400, TRACK_LEN), new THREE.MeshStandardMaterial({ map: groundTex, roughness: .65, envMapIntensity: .2 })), -Math.PI / 2);
  gr.position.set(0, -.05, -TRACK_LEN / 2 + 20);
  world.add(tr, gr);
  for (const s of [-1, 1]) world.add(box(.3, .16, TRACK_LEN, M(0xc9cdd2, { roughness: .9 }), s * 3.45, .08, -TRACK_LEN / 2 + 20));   // meio-fio
  // estrelas / partículas
  clouds = [];
  for (let i = 0; i < 14; i++) { const c = makeCloud(); c.position.set((Math.random() - .5) * 300, 34 + Math.random() * 30, -60 - i * 11); world.add(c); clouds.push(c); }
  const sunS = halo(80, -75, 90, -200, 1, 0xfff3c4); sunS.material.fog = false; world.add(sunS);
  // decoração lateral
  decor = [];
  for (let i = 0; i < 30; i++) {
    const d = DECOR[k][i % 4](); const side = i % 2 ? 1 : -1;
    d.position.set(side * (6.5 + Math.random() * 13), 0, 12 - i * (170 / 30));
    d.rotation.y = k === 'interno' ? 0 : Math.random() * .6;
    world.add(d); decor.push(d);
  }
}

/* =====================================================================
   ESTADO DO JOGO
   ===================================================================== */
let state = 'menu';
let G = null;
let ents = [];
const P = { lane: 1, x: 0, y: 0, vy: 0, slide: 0 };

function newGame(k) {
  if (worldKey !== k || !world) setupWorld(k);
  for (const e of ents) scene.remove(e.obj); ents = [];
  G = { k, W: WORLDS[k], t: 0, dist: 0, bonus: 0, speed: 13, lives: 3, inv: 0, shake: 0, nextRow: 30,
    pieces: 0, nextQuiz: 3, got: new Set(), asked: new Set(), right: 0, queue: [], full: false, shown: -1 };
  P.lane = 1; P.x = 0; P.y = 0; P.vy = 0; P.slide = 0;
  for (let z = -50; z > SPAWN_Z + 10; z -= 20) spawnRow(20, z);   // percurso já povoado no início
  G.nextRow = 20;
  robot.visible = true; robot.rotation.set(0, Math.PI, 0);
  $('chips').innerHTML = G.W.itens.map(i => `<span data-id="${i.id}">${i.ab}</span>`).join('');
  drawHearts(); $('score').textContent = '0';
  show('hud'); hide('menu'); hide('over'); hide('pause'); hide('quiz');
  Music.play('game'); Music.volume(1); $('hint').classList.add('show'); setTimeout(() => $('hint').classList.remove('show'), 4200);
  state = 'play';
}
const show = id => $(id).classList.remove('hidden'), hide = id => $(id).classList.add('hidden');
function drawHearts() { $('hearts').innerHTML = [0, 1, 2].map(i => `<i class="${i < G.lives ? '' : 'off'}"></i>`).join(''); }
let toastT;
function toast(html) { const t = $('toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }
function best(k, v) {
  try { const key = 'robo-runner-best-' + k; const b = +localStorage.getItem(key) || 0; if (v > b) { localStorage.setItem(key, v); return v; } return b; } catch (e) { return v || 0; }
}
function refreshBest() { for (const k of ['externo', 'interno']) { const b = best(k, 0); $('best-' + k).textContent = b ? 'Recorde: ' + b : ''; } }

/* ---------- som e música (gerados em tempo real, sem arquivos) ---------- */
let actx, master, muted = false;
try { muted = localStorage.getItem('robo-runner-mute') === '1'; } catch (e) { }
function audio() {
  if (!actx) {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    actx = new AC(); master = actx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(actx.destination);
  }
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function beep(f, d = .09, type = 'square', v = .05, slide = 0) {
  try {
    const c = audio(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + d);
  } catch (e) { /* sem áudio */ }
}
function jingle(notes, gap = 60, type = 'triangle', v = .08) { notes.forEach((f, i) => setTimeout(() => beep(f, .16, type, v), i * gap)); }

const Music = (function () {
  let mode = null, step = 0, nextT = 0, held = false, bus, lp, noise;
  const hz = n => 440 * Math.pow(2, (n - 69) / 12);
  const CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]];           // Lám · Fá · Dó · Sol
  const LEAD = [
    76, 0, 0, 76, 0, 74, 0, 72, 0, 0, 69, 0, 72, 0, 74, 0,
    72, 0, 0, 72, 0, 69, 0, 65, 0, 0, 69, 0, 72, 0, 77, 0,
    76, 0, 0, 76, 0, 79, 0, 76, 0, 0, 72, 0, 67, 0, 72, 0,
    74, 0, 0, 74, 0, 71, 0, 67, 0, 0, 71, 0, 74, 0, 79, 0];
  function setup(c) {
    if (bus) return;
    bus = c.createGain(); bus.gain.value = .5; bus.connect(master);
    lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200; lp.connect(bus);
    noise = c.createBuffer(1, Math.floor(c.sampleRate * .25), c.sampleRate);
    const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  function tone(t, n, dur, type, v, dest) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.value = hz(n);
    g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(v, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + .02);
  }
  function hit(t, dur, v, type, freq) {
    const s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    s.buffer = noise; f.type = type; f.frequency.value = freq;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(bus); s.start(t); s.stop(t + dur);
  }
  function kick(t) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + .12);
    g.gain.setValueAtTime(.5, t); g.gain.exponentialRampToValueAtTime(.0001, t + .16);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + .18);
  }
  function sched(i, t, spb) {
    const ch = CH[(i >> 4) & 3], s = i & 15;
    if (mode === 'game') {                                   // corrida: animada, com bateria
      if (s % 4 === 0) kick(t);
      if (s === 4 || s === 12) hit(t, .12, .16, 'bandpass', 1800);
      if (s % 4 === 2) hit(t, .04, .07, 'highpass', 7000);
      if (s === 0 || s === 3 || s === 6 || s === 8 || s === 11 || s === 14) tone(t, ch[0] - 24, spb * 1.6, 'sawtooth', .16, lp);
      tone(t, ch[[0, 1, 2, 1][s % 4]] + 12, spb * .9, 'square', .035, lp);
      if (LEAD[i]) tone(t, LEAD[i], spb * 2.2, 'square', .07, lp);
    } else {                                                 // menu: calma, sem bateria
      if (s === 0) for (const n of ch) tone(t, n, spb * 15, 'triangle', .05, bus);
      if (s % 2 === 0) tone(t, ch[[0, 1, 2, 1, 0, 2, 1, 2][s / 2]] + (s === 6 ? 24 : 12), spb * 3, 'triangle', .07, bus);
      if (s === 0 || s === 10) tone(t, ch[0] - 12, spb * 5, 'sine', .14, bus);
    }
  }
  function tick() {
    if (!mode || held || !actx || actx.state !== 'running') return;
    const bpm = mode === 'game' ? 124 + ((G ? G.speed : 13) - 13) * 1.3 : 88, spb = 60 / bpm / 4;
    if (nextT < actx.currentTime) nextT = actx.currentTime + .05;
    while (nextT < actx.currentTime + .3) { sched(step, nextT, spb); nextT += spb; step = (step + 1) % 64; }
  }
  setInterval(tick, 80);
  return {
    play(m) { try { const c = audio(); if (!c) return; setup(c); if (mode !== m) { mode = m; step = 0; nextT = c.currentTime + .08; } held = false; } catch (e) { } },
    hold(h) { held = h; },
    volume(v) { if (bus) bus.gain.setTargetAtTime(.5 * v, actx.currentTime, .1); },
    get mode() { return mode; }
  };
})();
function setMuted(m) {
  muted = m; try { localStorage.setItem('robo-runner-mute', m ? '1' : '0'); } catch (e) { }
  if (master) master.gain.value = m ? 0 : 1;
  document.querySelectorAll('.snd').forEach(b => b.classList.toggle('off', m));
}

/* ---------- geração do percurso ---------- */
function addEnt(obj, kind, lane, z, extra) {
  obj.position.set(LANES[lane], 0, z); scene.add(obj);
  const e = Object.assign({ obj, kind, lane, z, spin: obj.getObjectByName('spin') }, extra); ents.push(e); return e;
}
function nextItem() {
  if (!G.queue.length) { G.queue = G.W.itens.slice().sort(() => Math.random() - .5); }
  // prioriza peças ainda não coletadas
  const i = G.queue.findIndex(it => !G.got.has(it.id));
  return G.queue.splice(i < 0 ? 0 : i, 1)[0];
}
function spawnRow(gap, z = SPAWN_Z) {
  const r = Math.random();
  const pNone = Math.max(.3, .58 - G.dist / 4000);
  let kinds;
  if (G.dist > 150 && r < .14) { const k = Math.random() < .5 ? 'low' : 'high'; kinds = [k, k, k]; }
  else {
    kinds = [0, 1, 2].map(() => { const q = Math.random(); return q < pNone ? null : q < pNone + .26 ? 'block' : q < pNone + .26 + (1 - pNone - .26) / 2 ? 'low' : 'high'; });
    if (kinds.every(k => k === 'block')) kinds[Math.floor(Math.random() * 3)] = 'low';
    if (kinds.every(k => !k)) kinds[Math.floor(Math.random() * 3)] = 'block';
  }
  kinds.forEach((k, l) => { if (k) addEnt(tpl('obs-' + G.k + k, OBST[G.k][k]), 'obs', l, z, { type: k }); });
  // colecionáveis no meio do intervalo até a próxima fileira
  const lane = Math.floor(Math.random() * 3), zm = z - gap / 2;
  if (Math.random() < .5) { const it = nextItem(); addEnt(makePiece(it), 'piece', lane, zm, { it }); }
  else for (let i = 0; i < 4; i++) addEnt(makeBit(G.W.accent), 'bit', lane, zm + 2.4 - i * 1.6);
}

/* ---------- eventos de jogo ---------- */
function loseLife() {
  G.lives--; drawHearts(); G.inv = 1.6; G.shake = .35;
  const f = $('flash'); f.classList.add('on'); requestAnimationFrame(() => requestAnimationFrame(() => f.classList.remove('on')));
  beep(160, .3, 'sawtooth', .08, .4);
  if (navigator.vibrate) try { navigator.vibrate(120); } catch (e) { }
  return G.lives <= 0;
}
function gameOver() {
  state = 'over'; Music.play('menu'); Music.volume(1); const sc = Math.floor(G.dist) + G.bonus; const b = best(G.k, sc);
  $('oScore').textContent = sc; $('oBest').textContent = sc >= b && sc > 0 ? 'Novo recorde!' : 'Recorde: ' + b;
  $('oPieces').textContent = G.pieces; $('oQuiz').textContent = G.right;
  hide('hud'); hide('quiz'); show('over'); refreshBest();
}
function collectPiece(it) {
  G.pieces++; G.bonus += 50; G.got.add(it.id);
  const chip = document.querySelector(`#chips span[data-id="${it.id}"]`); if (chip) chip.classList.add('on');
  toast(`<b>${it.nome}</b> — ${it.fato}`);
  jingle([1047, 1319, 1568, 2093]);
  if (!G.full && G.got.size === G.W.itens.length) { G.full = true; G.bonus += 500; setTimeout(() => toast('<b>Coleção completa!</b> +500 pontos'), 900); }
  if (G.pieces >= G.nextQuiz) { G.nextQuiz += 4; openQuiz(); }
}

/* ---------- quiz ---------- */
function openQuiz() {
  state = 'quiz'; Music.volume(.35);
  const all = G.W.perguntas.map((p, i) => ({ p, i }));
  let pool = all.filter(q => G.got.has(q.p[0]) && !G.asked.has(q.i));
  if (!pool.length) { G.asked.clear(); pool = all.filter(q => G.got.has(q.p[0])); }
  if (!pool.length) pool = all;
  const q = pool[Math.floor(Math.random() * pool.length)]; G.asked.add(q.i);
  const [id, text, ops, exp] = q.p;
  $('qItem').textContent = G.W.itens.find(i => i.id === id).nome.toUpperCase();
  $('qText').textContent = text;
  const box = $('qOps'); box.innerHTML = '';
  hide('qExp'); hide('qNext');
  ops.map((t, i) => ({ t, ok: i === 0 })).sort(() => Math.random() - .5).forEach(o => {
    const b = document.createElement('button'); b.textContent = o.t; b.dataset.ok = o.ok ? 1 : 0;
    b.onclick = () => answer(b, o.ok, exp); box.appendChild(b);
  });
  show('quiz'); beep(520, .12, 'sine', .08); setTimeout(() => beep(780, .16, 'sine', .08), 110);
}
function answer(btn, ok, exp) {
  for (const b of $('qOps').children) { b.disabled = true; if (b.dataset.ok === '1') b.classList.add('ok'); }
  let dead = false;
  if (ok) { G.right++; G.bonus += 200; beep(880, .1, 'triangle', .09); setTimeout(() => beep(1320, .2, 'triangle', .09), 90); }
  else { btn.classList.add('bad'); dead = loseLife(); }
  const e = $('qExp');
  e.innerHTML = (ok ? '<b class="ok">Resposta certa! +200 pontos</b><br>' : '<b class="bad">Resposta errada — você perdeu 1 vida.</b><br>') + exp;
  show('qExp');
  const n = $('qNext'); n.textContent = dead ? 'Ver resultado' : 'Continuar'; show('qNext');
  n.onclick = () => { hide('quiz'); if (dead) gameOver(); else countdown(); };
}
function countdown() {
  state = 'count'; Music.volume(1); Music.hold(false); const c = $('count'); show('count'); let n = 3;
  const step = () => {
    if (state !== 'count') { hide('count'); return; }
    if (n === 0) { hide('count'); state = 'play'; return; }
    c.textContent = n--; beep(440, .07, 'sine', .06); setTimeout(step, 450);
  };
  step();
}

/* ---------- controles ---------- */
function act(a) {
  if (state !== 'play') return;
  if (a === 'left' && P.lane > 0) { P.lane--; beep(300, .05, 'sine', .04); }
  else if (a === 'right' && P.lane < 2) { P.lane++; beep(300, .05, 'sine', .04); }
  else if (a === 'up' && P.y < .05) { P.vy = 12; P.slide = 0; beep(380, .16, 'sine', .06, 2); }
  else if (a === 'down') { if (P.y > .05) P.vy = -22; P.slide = .75; beep(240, .16, 'sine', .05, .5); }
}
let sx = 0, sy = 0, pid = null;
canvas.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; pid = e.pointerId; });
canvas.addEventListener('pointermove', e => {
  if (pid !== e.pointerId) return;
  const dx = e.clientX - sx, dy = e.clientY - sy;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 26) return;
  act(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  sx = e.clientX; sy = e.clientY;
});
const endPtr = () => { pid = null; };
canvas.addEventListener('pointerup', endPtr); canvas.addEventListener('pointercancel', endPtr);
document.addEventListener('touchmove', e => { if (state === 'play') e.preventDefault(); }, { passive: false });
window.addEventListener('keydown', e => {
  const m = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ArrowUp: 'up', w: 'up', W: 'up', ' ': 'up', ArrowDown: 'down', s: 'down', S: 'down' }[e.key];
  if (m) { e.preventDefault(); act(m); }
  else if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') { if (state === 'play') pause(); else if (state === 'pause') resume(); }
});
function pause() { if (state !== 'play') return; state = 'pause'; Music.hold(true); show('pause'); }
function resume() { hide('pause'); countdown(); }
function toMenu() {
  state = 'menu'; Music.play('menu'); Music.volume(1); hide('pause'); hide('over'); hide('hud'); hide('quiz'); show('menu');
  for (const e of ents) scene.remove(e.obj); ents = [];
  robot.visible = true; robot.position.set(0, 0, 0); robot.userData.upper.rotation.x = 0; refreshBest();
}
$('btnPause').onclick = pause; $('btnResume').onclick = resume; $('btnQuit').onclick = toMenu;
$('btnRetry').onclick = () => newGame(G.k); $('btnMenu').onclick = toMenu;
document.querySelectorAll('.world').forEach(b => b.onclick = () => { beep(600, .1, 'triangle', .07); newGame(b.dataset.world); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { pause(); Music.hold(true); } else if (state !== 'pause') Music.hold(false); });
const firstTouch = () => { if (state === 'menu') Music.play('menu'); };
window.addEventListener('pointerdown', firstTouch, { once: true }); window.addEventListener('keydown', firstTouch, { once: true });
document.querySelectorAll('.snd').forEach(b => b.onclick = () => { audio(); setMuted(!muted); if (!Music.mode) Music.play(state === 'play' ? 'game' : 'menu'); });
setMuted(muted);

/* =====================================================================
   LOOP
   ===================================================================== */
function scroll(d) {
  trackTex.offset.y = (trackTex.offset.y + d / TILE) % 1;
  groundTex.offset.y = (groundTex.offset.y + d / GTILE) % 1;
  for (const o of decor) { o.position.z += d; if (o.position.z > 14) o.position.z -= 170; }
  robot.userData.wheel.rotation.x -= d / robot.userData.wheelR;
}
function animateRobot(dt, t) {
  const u = robot.userData, tx = LANES[P.lane];
  robot.position.set(P.x, P.y, 0);
  robot.rotation.z = THREE.MathUtils.clamp((tx - P.x) * .22, -.35, .35);
  const sliding = P.slide > 0 && P.y < .3;
  u.upper.rotation.x += ((sliding ? 1.38 : (P.y > .1 ? -.12 : .06 + Math.sin(t * 5) * .025)) - u.upper.rotation.x) * Math.min(1, dt * 16);
  u.head.rotation.x = sliding ? -.9 : 0;
  for (const a of u.arms) {
    const s = a.userData.s;
    a.rotation.z += ((P.y > .1 ? s * 1.5 : s * .3) - a.rotation.z) * Math.min(1, dt * 12);
    a.rotation.x = sliding ? -1.2 : Math.sin(t * 7 + s) * .18;
  }
  shadow.position.x = P.x; const k = 1 - Math.min(.6, P.y * .25); shadow.scale.setScalar(k);
}
function update(dt) {
  G.t += dt; G.speed = Math.min(32, 13 + G.t * .15);
  const d = G.speed * dt; G.dist += d; scroll(d);
  G.nextRow -= d;
  if (G.nextRow <= 0) { const gap = THREE.MathUtils.clamp(G.speed * 1.15, 18, 34); spawnRow(gap); G.nextRow = gap; }

  // jogador
  P.x += (LANES[P.lane] - P.x) * Math.min(1, dt * 15);
  if (P.y > 0 || P.vy > 0) { P.vy -= 34 * dt; P.y += P.vy * dt; if (P.y <= 0) { P.y = 0; P.vy = 0; } }
  if (P.slide > 0 && P.y < .05) P.slide -= dt;
  if (G.inv > 0) { G.inv -= dt; robot.visible = G.inv <= 0 || Math.floor(G.inv * 12) % 2 === 0; }
  const sliding = P.slide > 0 && P.y < .3;

  // entidades
  for (let i = ents.length - 1; i >= 0; i--) {
    const e = ents[i]; e.z += d; e.obj.position.z = e.z;
    if (e.spin) e.spin.rotation.y += dt * 2.4;
    let gone = e.z > 10;
    const dx = Math.abs(P.x - LANES[e.lane]);
    if (!gone && e.kind === 'obs') {
      if (G.inv <= 0 && dx < 1.05) {
        const hit = e.type === 'block' ? Math.abs(e.z) < .85 :
          e.type === 'low' ? Math.abs(e.z) < .55 && P.y < .5 :
            Math.abs(e.z) < .5 && !sliding;
        if (hit) { gone = true; if (loseLife()) { scene.remove(e.obj); ents.splice(i, 1); gameOver(); return; } }
      }
    } else if (!gone && dx < 1.1 && Math.abs(e.z) < 1.1 && P.y < 1.8) {
      gone = true;
      if (e.kind === 'bit') { G.bonus += 5; beep(1200, .05, 'sine', .04); }
      else { scene.remove(e.obj); ents.splice(i, 1); collectPiece(e.it); if (state !== 'play') break; continue; }
    }
    if (gone) { scene.remove(e.obj); ents.splice(i, 1); }
  }

  animateRobot(dt, G.t);
  const sc = Math.floor(G.dist) + G.bonus;
  if (sc !== G.shown) { G.shown = sc; $('score').textContent = sc; }
}
function placeCamera(dt) {
  const menu = state === 'menu';
  const tx = menu ? 0 : P.x * .55;
  camera.position.x += (tx - camera.position.x) * Math.min(1, dt * 8);
  camera.position.y = menu ? 2.5 : camBase.y;
  camera.position.z = menu ? (camera.aspect < 1 ? 6.2 : 5.0) : camBase.z;
  let sh = 0; if (G && G.shake > 0 && state === 'play') { G.shake -= dt; sh = G.shake; }
  camera.position.x += (Math.random() - .5) * sh; camera.position.y += (Math.random() - .5) * sh;
  camera.lookAt(camera.position.x * .6, menu ? 1.5 : 1.6, menu ? 0 : -9);
}
let last = performance.now(), menuT = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (state === 'play') update(dt);
  else if (state === 'menu') {
    menuT += dt; scroll(7 * dt);
    robot.position.set(0, 0, 0); robot.rotation.set(0, Math.PI + Math.sin(menuT * .5) * 2.6, 0);
    P.x = 0; P.y = 0; P.slide = 0; shadow.position.x = 0; shadow.scale.setScalar(1);
    robot.userData.upper.rotation.x = .04 + Math.sin(menuT * 2) * .03;
  }
  if (state === 'play' || state === 'menu') placeCamera(dt);
  renderer.render(scene, camera);
}

resize(); setupWorld('externo'); refreshBest();
// gancho de depuração (permite avançar quadros manualmente em testes)
window.__game = { get state() { return state; }, get G() { return G; }, get ents() { return ents; }, P, act, Music, get audioState() { return actx ? actx.state : 'none'; },
  step(dt) { if (state === 'play') { update(dt); placeCamera(dt); } } };
requestAnimationFrame(frame);
})();
