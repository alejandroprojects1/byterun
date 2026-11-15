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
  panel(1.3, 0xc4dcf5, 0, 2, -10, 24, 8); panel(1.2, 0xb99a70, 0, -7, 0, 24, 24);
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
  const ringX = (r, t, mat, y) => rot(tor(r, t, mat, 0, y, 0), Math.PI / 2);   // anel em torno do eixo Y local

  const body = new THREE.Group();

  /* ---------- quadril e pernas ---------- */
  body.add(scl(sph(.3, white, 0, 1.3, 0), 1.3, .62, 1.0));
  body.add(scl(sph(.27, joint, 0, 1.2, 0), 1.25, .5, .95));
  body.add(box(.44, .035, .03, neon, 0, 1.36, -.29));
  const legs = [];
  for (const s of [-1, 1]) {
    const hip = new THREE.Group(); hip.position.set(s * .2, 1.16, 0);
    hip.add(sph(.115, joint));
    hip.add(mesh(new THREE.CapsuleGeometry(.1, .28, 6, 16), white, 0, -.25, 0));
    hip.add(ringX(.103, .014, neon, -.25));
    const knee = new THREE.Group(); knee.position.y = -.5;
    knee.add(sph(.095, joint));
    knee.add(rot(cyl(.07, .2, grey, 0, 0, 0, 16), 0, 0, Math.PI / 2));
    knee.add(mesh(new THREE.CylinderGeometry(.085, .125, .36, 24), white, 0, -.24, 0));
    knee.add(box(.05, .24, .02, neon, 0, -.24, -.108));                         // faixa na panturrilha
    knee.add(sph(.08, joint, 0, -.45, 0));
    knee.add(scl(sph(.16, white, 0, -.55, .07), .95, .6, 1.7));                 // pé
    knee.add(box(.27, .05, .5, dark, 0, -.635, .07));                           // sola
    knee.add(box(.2, .03, .03, neon, 0, -.6, -.19));                            // luz do calcanhar
    knee.add(box(.16, .03, .03, hot, 0, -.57, .335));
    hip.add(knee); body.add(hip);
    legs.push({ hip, knee, s });
  }

  /* ---------- tronco (pivô na cintura) ---------- */
  const upper = new THREE.Group(); upper.position.y = 1.42;
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
  body.add(upper);

  const g = grp(body);
  g.scale.setScalar(.72);
  g.userData = { body, upper, head, arms, legs, phase: 0 };
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
/* ---------- materiais e peças auxiliares dos modelos ---------- */
const PL = () => M(0x1c1f27, { roughness: .35, metalness: .3, envMapIntensity: .9 });      // plástico escuro
const PL2 = () => M(0x343a46, { roughness: .5, metalness: .2 });
const ALU = () => M(0xcfd5de, { metalness: .9, roughness: .25, envMapIntensity: 1 });
const PCB = () => M(0x14804a, { roughness: .45, metalness: .25 });
const GLD = () => M(0xe6b53c, { metalness: .95, roughness: .22, envMapIntensity: 1 });
const WHT = () => M(0xf1f3f7, { roughness: .32, envMapIntensity: .8 });
const LED = c => glow(c, 1);
const zc = (r, h, mat, x, y, z, seg = 24) => rot(cyl(r, h, mat, x, y, z, seg), Math.PI / 2);          // cilindro com eixo Z
const xc = (r, h, mat, x, y, z, seg = 24) => rot(cyl(r, h, mat, x, y, z, seg), 0, 0, Math.PI / 2);    // cilindro com eixo X
const plane = (w, h, mat, x, y, z) => mesh(new THREE.PlaneGeometry(w, h), mat, x, y, z);
function rbox(w, h, d, r, mat, x = 0, y = 0, z = 0) {     // caixa com cantos arredondados (face em XY)
  const s = new THREE.Shape(), a = w / 2, b = h / 2; r = Math.min(r, a, b);
  s.moveTo(-a + r, -b); s.lineTo(a - r, -b); s.quadraticCurveTo(a, -b, a, -b + r); s.lineTo(a, b - r); s.quadraticCurveTo(a, b, a - r, b);
  s.lineTo(-a + r, b); s.quadraticCurveTo(-a, b, -a, b - r); s.lineTo(-a, -b + r); s.quadraticCurveTo(-a, -b, -a + r, -b);
  const bv = Math.min(.02, d / 4);
  const g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * bv, bevelEnabled: true, bevelSize: bv, bevelThickness: bv, bevelSegments: 2, curveSegments: 6 });
  g.center(); return mesh(g, mat, x, y, z);
}
function texMat(w, h, draw, lit) {
  const t = canvasTex(w, h, draw);
  return lit ? new THREE.MeshStandardMaterial({ map: t, roughness: .5 }) : new THREE.MeshBasicMaterial({ map: t, toneMapped: false });
}
function sticker(text, sub, bg, fg) {
  return texMat(256, 128, (c, w, h) => {
    c.fillStyle = bg; c.fillRect(0, 0, w, h); c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = 'bold 54px Arial'; c.fillText(text, w / 2, sub ? 50 : 64);
    if (sub) { c.font = '24px Arial'; c.fillText(sub, w / 2, 100); }
  }, true);
}
function fan(r, n, bladeMat) {                           // ventoinha virada para +Z
  const g = grp(tor(r, r * .07, ALU()), zc(r * .3, .06, PL(), 0, 0, 0), zc(r * .16, .07, LED(0x35c8ff), 0, 0, 0), zc(r * .98, .02, M(0x08090c), 0, 0, -.03));
  for (let i = 0; i < n; i++) { const p = grp(rot(box(r * .62, r * .34, .015, bladeMat, r * .58, 0, 0), .45)); p.rotation.z = i / n * Math.PI * 2; g.add(p); }
  return g;
}

const ITEM = {
  /* ===== hardware externo ===== */
  monitor: () => {
    const scr = texMat(256, 144, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#1d5fd8'); g.addColorStop(1, '#3ad2ff'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(22, 22, 104, 68); c.fillStyle = '#17357e'; c.fillRect(22, 22, 104, 13);
      c.fillStyle = 'rgba(255,255,255,.65)'; for (let i = 0; i < 3; i++) c.fillRect(150, 26 + i * 26, 76, 15);
      c.fillStyle = 'rgba(8,24,70,.7)'; c.fillRect(0, h - 17, w, 17); c.fillStyle = '#7fe0ff'; c.fillRect(8, h - 13, 10, 9);
    });
    return grp(rbox(1.56, .96, .08, .05, PL(), 0, .22, 0), plane(1.44, .8, scr, 0, .245, .042), rbox(1.3, .7, .06, .08, PL2(), 0, .22, -.06),
      box(.035, .02, .01, LED(0x3dffb0), .68, -.215, .042), rot(box(.15, .44, .05, ALU(), 0, -.42, -.08), .16), scl(cyl(.38, .04, ALU(), 0, -.66, -.02, 36), 1, 1, .62));
  },
  teclado: () => {
    const g = grp(rbox(1.8, .68, .08, .05, PL()), rbox(1.74, .62, .02, .04, PL2(), 0, 0, .04));
    const cap = M(0xe9edf3, { roughness: .4 }), capD = M(0x4a5160, { roughness: .5 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++)
      g.add(box(.1, .1, .05, r === 0 && c === 0 ? LED(0x35c8ff) : (c === 0 || c === 13 ? capD : cap), -.78 + c * .12, .22 - r * .12, .07));
    g.add(box(.6, .1, .05, cap, -.06, -.26, .07));
    for (const x of [-.78, -.66, -.54, .42, .54, .66, .78]) g.add(box(.1, .1, .05, capD, x, -.26, .07));
    g.add(box(.03, .015, .01, LED(0x3dffb0), .8, .315, .052));
    return rot(g, -.55);
  },
  mouse: () => rot(grp(scl(sph(.38, WHT()), 1, .62, 1.55), scl(sph(.385, PL(), 0, -.05, 0), 1.02, .34, 1.56),
    rot(box(.014, .03, .4, PL(), 0, .2, .3), .42), xc(.065, .05, PL(), 0, .215, .27), xc(.068, .012, LED(0x35c8ff), 0, .215, .27),
    scl(sph(.1, LED(0x35c8ff), 0, .1, -.52), 1.6, .5, .5), box(.03, .12, .3, PL2(), -.375, .02, .1), box(.03, .12, .3, PL2(), .375, .02, .1)), .75),
  gabinete: () => {
    const g = grp(rbox(.66, 1.3, 1.2, .05, PL()));
    g.children[0].rotation.y = Math.PI / 2;                                    // face arredondada para os lados
    g.add(box(.02, 1.1, 1.0, M(0x12233f, { transparent: true, opacity: .5, roughness: .05, metalness: .6 }), .335, .02, 0));  // lateral de vidro
    g.add(box(.02, .9, .8, PCB(), .26, .05, -.02), rot(tor(.17, .03, LED(0x35c8ff), .29, .25, .05), 0, Math.PI / 2), box(.03, .3, .05, LED(0x7a5cff), .29, -.05, -.3), box(.03, .3, .05, LED(0x7a5cff), .29, -.05, -.2));
    g.add(box(.5, 1.1, .03, PL2(), 0, 0, .61));                                // painel frontal
    for (let i = 0; i < 7; i++) g.add(box(.36, .02, .02, M(0x0a0b0e), 0, -.4 + i * .07, .63));
    g.add(zc(.05, .03, ALU(), 0, .46, .62), tor(.065, .012, LED(0x35c8ff), 0, .46, .63), box(.09, .03, .02, M(0x0a0b0e), -.14, .32, .63), box(.09, .03, .02, M(0x0a0b0e), .02, .32, .63), box(.5, .04, .03, LED(0x35c8ff), 0, .2, .625));
    for (const x of [-.24, .24]) for (const z of [-.48, .48]) g.add(box(.1, .06, .14, M(0x0a0b0e), x, -.68, z));
    return g;
  },
  caixasom: () => {
    const cone = lathe([[0, .02], [.07, .03], [.2, .1], [.215, .1], [.215, 0], [0, 0]], M(0x15171c, { roughness: .7 }), 32);
    cone.rotation.x = Math.PI / 2; cone.position.set(0, -.2, .31);
    return grp(rbox(.74, 1.26, .62, .07, M(0x2a2420, { roughness: .6 })), rbox(.66, 1.18, .02, .06, PL(), 0, 0, .31),
      cone, tor(.225, .028, ALU(), 0, -.2, .41), scl(sph(.075, PL(), 0, -.2, .34), 1, 1, .6),
      zc(.11, .05, PL(), 0, .3, .32), tor(.11, .02, ALU(), 0, .3, .35), scl(sph(.07, ALU(), 0, .3, .34), 1, 1, .5),
      zc(.045, .06, ALU(), .22, .52, .33), box(.012, .03, .02, LED(0x35c8ff), .22, .55, .365), zc(.07, .03, M(0x050506), -.2, -.5, .32));
  },
  estabilizador: () => {
    const g = grp(rbox(1.15, .62, .8, .06, M(0x23272f, { roughness: .5, metalness: .3 })));
    for (let i = 0; i < 4; i++) {                                              // tomadas em cima
      const x = -.39 + i * .26;
      g.add(cyl(.105, .03, WHT(), x, .32, .05, 24), cyl(.014, .034, M(0x0a0b0e), x - .04, .325, .05, 8), cyl(.014, .034, M(0x0a0b0e), x + .04, .325, .05, 8), cyl(.014, .034, M(0x0a0b0e), x, .325, .0, 8));
    }
    g.add(rbox(.2, .14, .04, .02, LED(0xff3b4e), -.36, .02, .41), box(.04, .04, .02, LED(0x3dffb0), -.1, .06, .41), box(.04, .04, .02, LED(0xffc531), 0, .06, .41), box(.36, .12, .01, sticker('115V', 'ESTABILIZADOR', '#e9edf3', '#1c1f27'), .3, .02, .405));
    for (let i = 0; i < 5; i++) g.add(box(.01, .3, .05, M(0x0a0b0e), .58, 0, -.24 + i * .12));
    g.add(xc(.04, .3, M(0x0a0b0e), -.7, -.15, -.2), box(.12, .14, .1, M(0x0a0b0e), -.88, -.15, -.2));
    return g;
  },
  webcam: () => grp(rot(mesh(new THREE.CapsuleGeometry(.24, .5, 8, 20), PL()), 0, 0, Math.PI / 2), zc(.19, .08, PL2(), 0, 0, .21), tor(.17, .03, ALU(), 0, 0, .25),
    scl(sph(.14, M(0x0a1830, { roughness: .05, metalness: .8, envMapIntensity: 1.5 }), 0, 0, .23), 1, 1, .5), sph(.03, LED(0x35c8ff), .05, .05, .295),
    sph(.022, LED(0x3dffb0), .34, .09, .2), sph(.018, M(0x0a0b0e), -.34, 0, .225), box(.12, .2, .12, PL2(), 0, -.3, 0), xc(.05, .2, ALU(), 0, -.4, 0),
    rot(box(.56, .06, .3, PL(), 0, -.47, .06), -.1), rot(box(.5, .26, .05, PL(), 0, -.58, -.1), .35)),

  /* ===== hardware interno ===== */
  placamae: () => {
    const g = grp(rbox(1.6, 1.6, .05, .04, PCB()));
    g.add(rbox(.44, .44, .05, .03, ALU(), -.22, .28, .05), box(.32, .32, .03, GLD(), -.22, .28, .07), box(.5, .06, .04, ALU(), -.22, .56, .05));   // soquete
    g.add(box(.12, .5, .12, ALU(), -.6, .3, .08), box(.5, .12, .12, ALU(), -.22, .68, .08));                                             // dissipadores VRM
    for (let i = 0; i < 4; i++) g.add(box(.05, .7, .07, i % 2 ? PL() : PL2(), .2 + i * .09, .3, .06), box(.06, .05, .09, WHT(), .2 + i * .09, .67, .06));  // slots de RAM
    for (let i = 0; i < 3; i++) g.add(box(.9, .05, .07, i ? PL() : PL2(), -.2, -.2 - i * .2, .06));                                    // slots PCIe
    const hs = grp(box(.34, .34, .05, ALU(), .5, -.4, .06)); for (let i = 0; i < 6; i++) hs.add(box(.34, .03, .08, ALU(), .5, -.54 + i * .056, .1)); g.add(hs);
    for (let i = 0; i < 9; i++) g.add(zc(.035, .1, M(i % 2 ? 0x15171c : 0x24449c), -.66 + (i % 3) * .1, -.05 - Math.floor(i / 3) * .1, .08, 12));
    g.add(zc(.09, .03, ALU(), .1, -.52, .05), box(.1, .36, .1, WHT(), .72, .3, .07), box(.18, .5, .16, ALU(), -.7, .52, .1), box(1.2, .012, .012, GLD(), -.1, -.74, .03), box(.012, .5, .012, GLD(), .02, 0, .03));
    return rot(g, -.5);
  },
  ram: () => {
    const g = grp(rbox(1.7, .44, .04, .02, PCB()));
    for (let i = 0; i < 8; i++) g.add(box(.15, .2, .035, PL(), -.7 + i * .2 + (i > 3 ? .0 : 0), .04, .035));
    g.add(box(.72, .08, .045, GLD(), -.43, -.2, 0), box(.82, .08, .045, GLD(), .4, -.2, 0), box(.3, .1, .01, sticker('8GB', 'DDR4', '#f1f3f7', '#14804a'), 0, .2, .024));
    for (const s of [-1, 1]) g.add(box(.05, .1, .05, M(0x0a0b0e), s * .84, .0, 0));
    for (let i = 0; i < 8; i++) g.add(box(.15, .2, .035, PL(), -.7 + i * .2, .04, -.035));
    return g;
  },
  cpu: () => {
    const top = texMat(256, 256, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#e6eaf0'); g.addColorStop(.5, '#aab2bf'); g.addColorStop(1, '#dfe4ea'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = '#4a5160'; c.textAlign = 'center'; c.font = 'bold 64px Arial'; c.fillText('CPU', w / 2, 118); c.font = '24px Arial'; c.fillText('8 NÚCLEOS · 4.2 GHz', w / 2, 160); c.fillRect(40, 186, 176, 4);
    }, true);
    top.metalness = .7; top.roughness = .3;
    const g = grp(rbox(1.1, 1.1, .06, .03, PCB()), rbox(.86, .86, .1, .06, ALU(), 0, 0, .07), plane(.76, .76, top, 0, 0, .122), box(1.02, 1.02, .03, GLD(), 0, 0, -.04));
    const tri = new THREE.Shape(); tri.moveTo(0, 0); tri.lineTo(.12, 0); tri.lineTo(0, .12);
    g.add(mesh(new THREE.ShapeGeometry(tri), GLD(), -.52, -.52, .033));
    for (let i = 0; i < 6; i++) g.add(box(.04, .04, .02, GLD(), -.5 + i * .2, .49, .035), box(.04, .04, .02, GLD(), .49, -.5 + i * .2, .035));
    return rot(g, -.45);
  },
  fonte: () => {
    const g = grp(rbox(1.3, .8, 1.05, .04, M(0x22252c, { roughness: .45, metalness: .5 })));
    const f = fan(.36, 7, M(0x30353f, { roughness: .4 })); f.rotation.x = -Math.PI / 2; f.position.y = .41; g.add(f);       // ventoinha em cima
    for (let i = 0; i < 3; i++) g.add(rot(tor(.12 + i * .11, .012, ALU(), 0, .44, 0), Math.PI / 2));
    g.add(box(.8, .015, .02, ALU(), 0, .44, 0), box(.02, .015, .8, ALU(), 0, .44, 0));
    g.add(plane(.7, .36, sticker('650W', 'FONTE ATX', '#f2c230', '#1c1f27'), 0, 0, .531));
    g.add(box(.2, .16, .03, M(0x0a0b0e), -.42, -.16, -.535), box(.1, .08, .04, LED(0xff3b4e), -.15, -.16, -.535));
    for (let i = 0; i < 3; i++) { g.add(xc(.045, .4, M([0x0a0b0e, 0xf2c230, 0xe2574c][i]), .82, -.2 + i * .11, .2 - i * .15), box(.1, .12, .16, WHT(), 1.05, -.2 + i * .11, .2 - i * .15)); }
    return g;
  },
  gpu: () => {
    const g = grp(rbox(1.8, .66, .24, .05, PL()), box(1.8, .62, .03, PCB(), 0, -.01, -.13), rbox(1.76, .62, .02, .04, ALU(), 0, 0, -.16));
    for (const x of [-.42, .44]) { const f = fan(.25, 9, M(0x2c313c, { roughness: .4 })); f.position.set(x, 0, .13); g.add(f); }
    g.add(box(1.7, .035, .2, LED(0x3dffb0), 0, .335, .02), box(.9, .09, .03, GLD(), -.2, -.37, -.13), box(.04, .9, .34, ALU(), -.92, -.08, -.03),
      box(.2, .08, .16, M(0x0a0b0e), .6, .35, -.02), rot(box(.5, .03, .02, LED(0x35c8ff), .02, .2, .125), 0, 0, .5), rot(box(.5, .03, .02, LED(0x35c8ff), .02, -.2, .125), 0, 0, -.5));
    for (let i = 0; i < 3; i++) g.add(box(.02, .14, .2, M(0x0a0b0e), -.945, .15 - i * .2, -.03));
    return g;
  },
  ssd: () => {
    const lab = texMat(256, 320, (c, w, h) => {
      c.fillStyle = '#f1f3f7'; c.fillRect(0, 0, w, h); c.fillStyle = '#0b6cff'; c.fillRect(0, 0, w, 86);
      c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = 'bold 64px Arial'; c.fillText('SSD', w / 2, 66);
      c.fillStyle = '#1c1f27'; c.font = 'bold 56px Arial'; c.fillText('1 TB', w / 2, 180); c.font = '24px Arial'; c.fillText('SATA · 550 MB/s', w / 2, 232);
      c.fillRect(40, 262, 176, 6);
    }, true);
    const g = grp(rbox(.86, 1.2, .1, .04, M(0x2a2e37, { metalness: .8, roughness: .3, envMapIntensity: 1 })), plane(.62, .78, lab, 0, .06, .052),
      box(.5, .06, .06, M(0x0a0b0e), -.1, -.6, 0), box(.44, .03, .03, GLD(), -.1, -.615, .0));
    for (const x of [-.36, .36]) for (const y of [-.52, .52]) g.add(zc(.03, .02, ALU(), x, y, .05, 12));
    return g;
  },
  cooler: () => {
    const g = new THREE.Group();
    for (let i = 0; i < 10; i++) g.add(box(1.0, 1.0, .02, ALU(), 0, 0, -.5 + i * .05));          // aletas do dissipador
    for (const x of [-.3, .3]) g.add(cyl(.035, 1.24, M(0xc98a4b, { metalness: .9, roughness: .3 }), x, -.1, -.27, 12));   // tubos de cobre
    g.add(box(.5, .08, .5, M(0xc98a4b, { metalness: .9, roughness: .3 }), 0, -.72, -.27));
    const fr = PL();                                                                             // moldura da ventoinha
    g.add(box(1.1, .08, .2, fr, 0, .51, .1), box(1.1, .08, .2, fr, 0, -.51, .1), box(.08, 1.1, .2, fr, .51, 0, .1), box(.08, 1.1, .2, fr, -.51, 0, .1));
    const f = fan(.46, 9, M(0x1f6fd0, { roughness: .2, transparent: true, opacity: .85 })); f.position.z = .12; g.add(f);
    g.add(tor(.47, .02, LED(0x35c8ff), 0, 0, .2));
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
let trackRough;
function trackTexture(k) {          // asfalto molhado: poças que refletem o céu e faixas pintadas gastas
  const W = 512, H = 1024, rep = TRACK_LEN / (TILE * 2);
  let s = 23; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const puddles = [];
  for (let i = 0; i < 9; i++) {
    const cx = rnd() * W, cy = rnd() * H, n = 4 + Math.floor(rnd() * 4);
    for (let j = 0; j < n; j++) puddles.push([cx + (rnd() - .5) * 150, cy + (rnd() - .5) * 220, 40 + rnd() * 70]);
  }
  const blobs = (c, rgb, a) => {
    for (const p of puddles) for (const oy of [-H, 0, H]) {
      const g = c.createRadialGradient(p[0], p[1] + oy, 0, p[0], p[1] + oy, p[2]);
      g.addColorStop(0, 'rgba(' + rgb + ',' + a + ')'); g.addColorStop(.55, 'rgba(' + rgb + ',' + a * .8 + ')'); g.addColorStop(1, 'rgba(' + rgb + ',0)');
      c.fillStyle = g; c.fillRect(p[0] - p[2], p[1] + oy - p[2], p[2] * 2, p[2] * 2);
    }
  };
  const lines = (c, color) => {
    c.fillStyle = color;
    for (const u of [.348, .652]) for (let y = 0; y < H; y += 512) c.fillRect(u * W - 6, y + 70, 12, 220);
    for (const u of [.04, .96]) c.fillRect(u * W - 5, 0, 10, H);
  };
  const grain = (c, n, lo, hi, a) => {
    for (let i = 0; i < n; i++) {
      const v = lo + Math.floor(Math.random() * (hi - lo));
      c.fillStyle = 'rgba(' + v + ',' + v + ',' + (v + 3) + ',' + a + ')';
      c.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  };
  const map = canvasTex(W, H, c => {
    c.fillStyle = '#2b2d31'; c.fillRect(0, 0, W, H);
    grain(c, 34000, 18, 80, .5);
    blobs(c, '5,7,11', .62);
    c.globalAlpha = .9; lines(c, k === 'externo' ? '#eeeeea' : '#eec02e'); c.globalAlpha = 1;
    for (let i = 0; i < 2600; i++) {                        // desgaste da pintura
      const u = [.348, .652, .04, .96][i % 4];
      c.fillStyle = 'rgba(40,42,46,.7)'; c.fillRect(u * W - 7 + Math.random() * 14, Math.random() * H, 1 + Math.random() * 3, 1 + Math.random() * 4);
    }
  }, 1, rep);
  trackRough = canvasTex(W, H, c => {                       // rugosidade: escuro = liso e espelhado
    c.fillStyle = 'rgb(165,165,165)'; c.fillRect(0, 0, W, H);
    grain(c, 30000, 110, 215, .6);
    lines(c, 'rgb(150,150,150)');
    blobs(c, '14,14,14', 1);
  }, 1, rep);
  trackRough.colorSpace = THREE.NoColorSpace; trackRough.offset = map.offset;
  return map;
}
const leafGeo = (function () {
  const s = new THREE.Shape(); s.moveTo(0, -.17); s.quadraticCurveTo(.14, -.05, 0, .17); s.quadraticCurveTo(-.14, -.05, 0, -.17);
  return new THREE.ShapeGeometry(s, 6);
})();
const leafMats = [0xe8a21c, 0xd9741a, 0xf2c230, 0xb5561c].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: .6, side: THREE.DoubleSide, envMapIntensity: .3 }));
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
  const tr = rot(mesh(new THREE.PlaneGeometry(TILE, TRACK_LEN), new THREE.MeshStandardMaterial({ map: trackTex, roughnessMap: trackRough, bumpMap: trackRough, bumpScale: .5, roughness: 1, metalness: 0, envMapIntensity: .6 })), -Math.PI / 2);
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
  for (let i = 0; i < 170; i++) {      // folhas caídas sobre o asfalto
    const l = new THREE.Mesh(leafGeo, leafMats[i % 4]);
    l.position.set((Math.random() - .5) * 7.6, .03 + Math.random() * .03, 12 - Math.random() * 170);
    l.rotation.set(-Math.PI / 2 + (Math.random() - .5) * .5, 0, Math.random() * 6.28); l.scale.setScalar(1.2 + Math.random() * 1.1);
    world.add(l); decor.push(l);
  }
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
  trackTex.offset.y = (trackTex.offset.y + d / (TILE * 2)) % 1;
  groundTex.offset.y = (groundTex.offset.y + d / GTILE) % 1;
  for (const o of decor) { o.position.z += d; if (o.position.z > 14) o.position.z -= 170; }

}
function poseLeg(l, thigh, knee, k) {
  l.hip.rotation.x += (thigh - l.hip.rotation.x) * k; l.knee.rotation.x += (knee - l.knee.rotation.x) * k;
}
function idleRobot(t) {                       // parado no menu
  const u = robot.userData;
  u.body.position.y = Math.sin(t * 2) * .015; u.upper.rotation.x = .04 + Math.sin(t * 2) * .03; u.head.rotation.x = 0;
  for (const l of u.legs) { l.hip.rotation.x = 0; l.knee.rotation.x = 0; }
  for (const a of u.arms) { a.rotation.x = Math.sin(t * 2 + a.userData.s) * .08; a.rotation.z = a.userData.s * .3; }
}
function animateRobot(dt, t) {
  const u = robot.userData, tx = LANES[P.lane], k = Math.min(1, dt * 18);
  robot.position.set(P.x, P.y, 0);
  robot.rotation.z = THREE.MathUtils.clamp((tx - P.x) * .22, -.35, .35);
  const sliding = P.slide > 0 && P.y < .3, air = P.y > .1;
  u.phase += dt * (9 + G.speed * .26);
  let bob = 0;
  for (const l of u.legs) {
    const p = u.phase + (l.s > 0 ? Math.PI : 0);
    if (sliding) poseLeg(l, -1.5 + l.s * .12, .12, k);                       // pernas à frente, deslizando
    else if (air) poseLeg(l, l.s > 0 ? -1.1 : -.35, l.s > 0 ? 1.5 : .9, k);  // encolhidas no pulo
    else poseLeg(l, -Math.sin(p) * .9, .2 + Math.max(0, Math.cos(p)) * 1.15, 1);
  }
  if (!sliding && !air) bob = Math.abs(Math.sin(u.phase)) * .07;
  u.body.position.y += ((sliding ? -.82 : bob) - u.body.position.y) * (sliding || u.body.position.y < -.1 ? k : 1);
  u.upper.rotation.x += ((sliding ? -.95 : air ? -.1 : .2) - u.upper.rotation.x) * k;
  u.head.rotation.x += ((sliding ? .7 : -.12) - u.head.rotation.x) * k;
  for (const a of u.arms) {
    const s = a.userData.s, p = u.phase + (s > 0 ? Math.PI : 0);
    a.rotation.z += ((air ? s * 1.4 : sliding ? s * .7 : s * .22) - a.rotation.z) * k;
    a.rotation.x = sliding ? .5 : air ? -.4 : Math.sin(p) * .75;
  }
  shadow.position.x = P.x; shadow.scale.setScalar(1 - Math.min(.6, P.y * .25));
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
    idleRobot(menuT);
  }
  if (state === 'play' || state === 'menu') placeCamera(dt);
  renderer.render(scene, camera);
}

resize(); setupWorld('externo'); refreshBest();
// gancho de depuração (permite avançar quadros manualmente em testes)
window.__game = { get state() { return state; }, get G() { return G; }, get ents() { return ents; }, P, act, Music, gallery(k, off = 0) { robot.visible = false; WORLDS[k].itens.forEach((it, i) => { const p = makePiece(it); p.position.set((i - 3) * 1.75 + off, 0, -2.5); p.name = 'gal'; scene.add(p); }); }, spinGallery(a) { scene.children.filter(c => c.name === 'gal').forEach(c => c.getObjectByName('spin').rotation.y = a); }, clearGallery() { scene.children.filter(c => c.name === 'gal').forEach(c => scene.remove(c)); robot.visible = true; }, get audioState() { return actx ? actx.state : 'none'; },
  step(dt) { if (state === 'play') { update(dt); placeCamera(dt); } } };
requestAnimationFrame(frame);
})();
