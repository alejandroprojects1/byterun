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
scene.add(new THREE.HemisphereLight(0xcfe4ff, 0x1a2040, 1.5));
const sun = new THREE.DirectionalLight(0xffffff, 2.0);
sun.position.set(3, 9, 8); scene.add(sun);

let camBase = { y: 4.4, z: 8 };
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  const portrait = w < h;
  camera.fov = portrait ? 76 : 58;
  camBase = portrait ? { y: 5.0, z: 8.2 } : { y: 4.2, z: 7.6 };
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

/* ---------- helpers de malha ---------- */
const matCache = new Map();
function M(color, o) {
  const k = color + JSON.stringify(o || {});
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial(Object.assign({ color, roughness: .45, metalness: .2 }, o)));
  return matCache.get(k);
}
const glow = (color, i = 1, o) => M(color, Object.assign({ emissive: color, emissiveIntensity: i, roughness: .4, metalness: 0 }, o));
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
function buildRobot() {
  const white = M(0xeef2fa, { metalness: .35, roughness: .28 });
  const dark = M(0x12151d, { roughness: .5 });
  const silver = M(0xb4bfd0, { metalness: .6, roughness: .3 });
  const blue = glow(0x1fb6ff, 1.2);
  const fin = glow(0x2aa8ff, .9, { transparent: true, opacity: .85 });

  // roda giroscópica
  const wheel = new THREE.Group(); wheel.position.y = .62;
  wheel.add(rot(tor(.4, .22, M(0x0d0f14, { roughness: .85 })), 0, Math.PI / 2));
  wheel.add(rot(cyl(.4, .4, dark), 0, 0, Math.PI / 2));
  for (const s of [-1, 1]) {
    wheel.add(rot(tor(.3, .05, blue, s * .21), 0, Math.PI / 2));
    wheel.add(rot(tor(.47, .025, blue, s * .17), 0, Math.PI / 2));
    wheel.add(rot(cyl(.2, .06, silver, s * .21), 0, 0, Math.PI / 2));
    wheel.add(rot(cyl(.1, .08, blue, s * .22), 0, 0, Math.PI / 2));
  }
  for (let i = 0; i < 10; i++) { // marcas no pneu (deixam o giro visível)
    const a = i / 10 * Math.PI * 2;
    const t = box(.3, .05, .1, i % 2 ? blue : M(0x2a2f3a), 0, Math.cos(a) * .615, Math.sin(a) * .615);
    t.rotation.x = a; wheel.add(t);
  }

  // garfo / para-lama
  const fender = scl(tor(.72, .07, white, 0, .62, 0, Math.PI), .56, 1, 1.6);
  const hip = scl(sph(.3, white, 0, 1.36, 0), 1.2, .5, 1.3);

  // parte superior (pivô na cintura)
  const upper = new THREE.Group(); upper.position.y = 1.38;
  upper.add(cyl(.13, .26, dark, 0, .1, 0));
  upper.add(scl(sph(.36, white, 0, .5, 0), 1.12, 1.05, .86));
  upper.add(scl(sph(.3, dark, 0, .42, 0), 1.25, .5, .95));
  upper.add(rot(tor(.1, .028, blue, 0, .56, .3)));                       // botão power (peito)
  upper.add(box(.03, .1, .03, blue, 0, .62, .31));
  upper.add(scl(sph(.1, blue, 0, .55, -.29), .9, 1.3, .35));             // luz das costas
  upper.add(cyl(.085, .28, dark, 0, .98, 0));

  const head = new THREE.Group(); head.position.y = 1.52;
  head.add(scl(sph(.55, white), 1.2, .95, 1.05));
  head.add(scl(sph(.5, dark, 0, -.03, .3), 1.06, .64, .6));              // visor
  for (const s of [-1, 1]) {
    head.add(tor(.09, .028, blue, s * .2, -.04, .585, Math.PI));         // olhos felizes
    head.add(rot(cyl(.2, .14, dark, s * .66, 0, 0), 0, 0, Math.PI / 2)); // fones
    head.add(rot(tor(.17, .045, blue, s * .735, 0, 0), 0, Math.PI / 2));
    head.add(rot(cyl(.08, .04, blue, s * .74, 0, 0), 0, 0, Math.PI / 2));
    const f = scl(mesh(new THREE.ConeGeometry(.15, .55, 4), fin, s * .52, .62, -.04), 1, 1, .45); // antenas
    f.rotation.z = -s * .38; head.add(f);
  }
  head.add(rot(tor(.07, .022, blue, 0, -.14, .59, Math.PI), 0, 0, Math.PI)); // sorriso
  head.add(box(.26, .045, .04, blue, 0, .2, -.56));                      // luz traseira
  head.add(scl(sph(.5, dark, 0, -.2, -.1), 1.1, .5, .9));                // base escura
  head.add(box(.3, .05, .5, blue, 0, .5, .1));                           // faixa superior
  upper.add(head);

  const arms = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group(); arm.position.set(s * .47, .7, 0);
    arm.add(sph(.115, dark));
    arm.add(mesh(new THREE.CapsuleGeometry(.08, .2, 4, 10), white, 0, -.22, 0));
    arm.add(sph(.085, dark, 0, -.4, 0));
    arm.add(mesh(new THREE.CapsuleGeometry(.095, .2, 4, 10), white, 0, -.58, 0));
    arm.add(box(.2, .05, .2, blue, 0, -.6, 0));
    arm.add(sph(.12, dark, 0, -.83, 0));
    arm.rotation.z = s * .3; arm.userData.s = s;
    upper.add(arm); arms.push(arm);
  }

  const g = grp(wheel, fender, hip, upper);
  g.scale.setScalar(.8);
  g.userData = { wheel, upper, head, arms };
  return g;
}
const robot = buildRobot();
scene.add(robot);
const shadow = rot(mesh(new THREE.CircleGeometry(.75, 24), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: .4 })), -Math.PI / 2);
shadow.position.y = .03; scene.add(shadow);

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
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
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
let world = null, worldKey = 'externo', trackTex, groundTex, decor = [];
function trackTexture(k) {
  return canvasTex(256, 256, (c, w, h) => {
    const ext = k === 'externo';
    c.fillStyle = ext ? '#0b1136' : '#07261c'; c.fillRect(0, 0, w, h);
    c.strokeStyle = ext ? 'rgba(60,110,255,.25)' : 'rgba(242,182,50,.28)'; c.lineWidth = 2;
    if (ext) { for (let y = 0; y < h; y += 64) { c.beginPath(); c.moveTo(0, y + 1); c.lineTo(w, y + 1); c.stroke(); } }
    else for (const x of [30, 52, 128, 204, 226]) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); c.fillStyle = 'rgba(242,182,50,.6)'; c.beginPath(); c.arc(x, (x * 7) % h, 5, 0, 7); c.fill(); }
    const col = ext ? '#21c8ff' : '#3dffb0';
    c.shadowColor = col; c.shadowBlur = 10; c.strokeStyle = col; c.lineWidth = 4;
    for (const u of [.348, .652]) { c.setLineDash(ext ? [70, 58] : []); c.beginPath(); c.moveTo(u * w, 0); c.lineTo(u * w, h); c.stroke(); }
    c.setLineDash([]); c.lineWidth = 6;
    for (const u of [.02, .98]) { c.beginPath(); c.moveTo(u * w, 0); c.lineTo(u * w, h); c.stroke(); }
  }, 1, TRACK_LEN / TILE);
}
function groundTexture(k) {
  return canvasTex(512, 512, (c, w, h) => {
    if (k === 'externo') {
      c.fillStyle = '#080d2c'; c.fillRect(0, 0, w, h);
      c.strokeStyle = 'rgba(33,200,255,.5)'; c.lineWidth = 2; c.shadowColor = '#21c8ff'; c.shadowBlur = 8;
      for (let i = 0; i <= 4; i++) { const p = i * 128; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, h); c.moveTo(0, p); c.lineTo(w, p); c.stroke(); }
      c.shadowBlur = 0; c.fillStyle = 'rgba(120,90,255,.25)';
      for (let i = 0; i < 10; i++) c.fillRect(((i * 97) % 4) * 128 + 8, ((i * 53) % 4) * 128 + 8, 112, 112 * ((i % 3) / 3));
    } else {
      c.fillStyle = '#062a1e'; c.fillRect(0, 0, w, h);
      let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 26; i++) {
        const gold = rnd() < .6; c.strokeStyle = gold ? 'rgba(242,182,50,.75)' : 'rgba(61,255,176,.8)'; c.lineWidth = 3 + rnd() * 3;
        const x = 10 + rnd() * (w - 60), y0 = rnd() * h, j = 20 + rnd() * 30;
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y0); c.lineTo(x + j, y0 + j); c.lineTo(x + j, y0 + j + 60); c.lineTo(x, y0 + 2 * j + 60); c.lineTo(x, h); c.stroke();
        c.fillStyle = c.strokeStyle; c.beginPath(); c.arc(x + j, y0 + j + 30, 7, 0, 7); c.fill();
      }
    }
  }, 120 / GTILE, TRACK_LEN / GTILE);
}
const DECOR = {
  externo: [
    () => { const h = 2 + Math.random() * 7, w = 1.5 + Math.random() * 3; const b = box(w, h, w, M(0x0d1445), 0, h / 2, 0); return grp(b, edges(b, Math.random() < .5 ? 0x21c8ff : 0x8a5cff)); },
    () => { const g = new THREE.Group(); const cols = [0x2456ff, 0x8a5cff, 0x21c8ff, 0xff4df0]; let y = 0; for (let i = 0; i < 4; i++) { const hh = .5 + Math.random() * .5; g.add(box(4 + Math.random(), hh, 3, M(cols[i]), Math.random() - .5, y + hh / 2, 0)); y += hh; } return g; },
    () => grp(cyl(1.3, 3.4, M(0x16205e, { metalness: .5 }), 0, 1.7, 0, 24), cyl(1.32, .2, glow(0x21c8ff, 1), 0, 3.3, 0, 24), cyl(.12, 3, glow(0xff4df0, .8), .3, 4, 0), cyl(.12, 2.6, glow(0x21c8ff, .8), -.4, 4, .2)),
    () => grp(box(.3, 5, .3, M(0x16205e), 0, 2.5, 0), rot(tor(1.4, .08, glow(0x21c8ff, 1), 0, 5.4, 0), 0, Math.PI / 2))
  ],
  interno: [
    () => { const w = 3 + Math.random() * 3; return grp(box(w, .8, w, M(0x0e1016, { roughness: .3 }), 0, .5, 0), box(w + .5, .12, w + .5, SILV(), 0, .12, 0), cyl(.25, .04, glow(0x3dffb0, 1), -w / 2 + .5, .91, -w / 2 + .5)); },
    () => { const h = 2.5 + Math.random() * 3; return grp(cyl(1, h, M(Math.random() < .5 ? 0x1c3f9a : 0x15171c, { metalness: .4 }), 0, h / 2, 0, 20), cyl(1, .06, SILV(), 0, h + .03, 0, 20), cyl(1.02, .3, M(0xd6dbe4), 0, h * .75, 0, 20)); },
    () => { const g = grp(box(4, .4, 3, M(0x8a93a3, { metalness: .7 }), 0, .2, 0)); for (let i = 0; i < 9; i++) g.add(box(.14, 2.6, 3, M(0xaab4c4, { metalness: .7, roughness: .3 }), -1.8 + i * .45, 1.7, 0)); return g; },
    () => grp(box(.3, 3.4, 7, GREEN(), 0, 2, 0), box(.36, 1.6, 6, M(0x15171c), 0, 2.4, 0), box(.5, .5, 7.4, M(0x20242e), 0, .25, 0), box(.38, .1, 6.6, glow(0x3dffb0, 1), 0, 3.75, 0))
  ]
};
function setupWorld(k) {
  if (world) scene.remove(world);
  worldKey = k; const W = WORLDS[k];
  world = new THREE.Group(); scene.add(world);
  scene.background = new THREE.Color(W.bg); scene.fog = new THREE.Fog(W.bg, 45, 135);
  trackTex = trackTexture(k); groundTex = groundTexture(k);
  const tr = rot(mesh(new THREE.PlaneGeometry(TILE, TRACK_LEN), new THREE.MeshStandardMaterial({ map: trackTex, roughness: .5, metalness: .3 })), -Math.PI / 2);
  tr.position.z = -TRACK_LEN / 2 + 20;
  const gr = rot(mesh(new THREE.PlaneGeometry(120, TRACK_LEN), new THREE.MeshStandardMaterial({ map: groundTex, roughness: .8 })), -Math.PI / 2);
  gr.position.set(0, -.05, -TRACK_LEN / 2 + 20);
  world.add(tr, gr);
  for (const s of [-1, 1]) world.add(box(.14, .22, TRACK_LEN, glow(W.accent, 1), s * 3.4, .11, -TRACK_LEN / 2 + 20));
  // estrelas / partículas
  const pts = []; for (let i = 0; i < 350; i++) pts.push((Math.random() - .5) * 220, 6 + Math.random() * 60, -20 - Math.random() * 200);
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  world.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: W.accent, size: .5, fog: false, transparent: true, opacity: .8 })));
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
  $('hint').classList.add('show'); setTimeout(() => $('hint').classList.remove('show'), 4200);
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

/* ---------- som ---------- */
let actx;
function beep(f, d = .09, type = 'square', v = .05, slide = 0) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d);
  } catch (e) { /* sem áudio */ }
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
  state = 'over'; const sc = Math.floor(G.dist) + G.bonus; const b = best(G.k, sc);
  $('oScore').textContent = sc; $('oBest').textContent = sc >= b && sc > 0 ? 'Novo recorde!' : 'Recorde: ' + b;
  $('oPieces').textContent = G.pieces; $('oQuiz').textContent = G.right;
  hide('hud'); hide('quiz'); show('over'); refreshBest();
}
function collectPiece(it) {
  G.pieces++; G.bonus += 50; G.got.add(it.id);
  const chip = document.querySelector(`#chips span[data-id="${it.id}"]`); if (chip) chip.classList.add('on');
  toast(`<b>${it.nome}</b> — ${it.fato}`);
  beep(660, .08, 'triangle', .08); setTimeout(() => beep(990, .12, 'triangle', .08), 70);
  if (!G.full && G.got.size === G.W.itens.length) { G.full = true; G.bonus += 500; setTimeout(() => toast('<b>Coleção completa!</b> +500 pontos'), 900); }
  if (G.pieces >= G.nextQuiz) { G.nextQuiz += 4; openQuiz(); }
}

/* ---------- quiz ---------- */
function openQuiz() {
  state = 'quiz';
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
  state = 'count'; const c = $('count'); show('count'); let n = 3;
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
function pause() { if (state !== 'play') return; state = 'pause'; show('pause'); }
function resume() { hide('pause'); countdown(); }
function toMenu() {
  state = 'menu'; hide('pause'); hide('over'); hide('hud'); hide('quiz'); show('menu');
  for (const e of ents) scene.remove(e.obj); ents = [];
  robot.visible = true; robot.position.set(0, 0, 0); robot.userData.upper.rotation.x = 0; refreshBest();
}
$('btnPause').onclick = pause; $('btnResume').onclick = resume; $('btnQuit').onclick = toMenu;
$('btnRetry').onclick = () => newGame(G.k); $('btnMenu').onclick = toMenu;
document.querySelectorAll('.world').forEach(b => b.onclick = () => { beep(600, .1, 'triangle', .07); newGame(b.dataset.world); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

/* =====================================================================
   LOOP
   ===================================================================== */
function scroll(d) {
  trackTex.offset.y = (trackTex.offset.y + d / TILE) % 1;
  groundTex.offset.y = (groundTex.offset.y + d / GTILE) % 1;
  for (const o of decor) { o.position.z += d; if (o.position.z > 14) o.position.z -= 170; }
  robot.userData.wheel.rotation.x -= d / .62;
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
  camera.position.y = menu ? 3.2 : camBase.y;
  camera.position.z = menu ? 7.2 : camBase.z;
  let sh = 0; if (G && G.shake > 0 && state === 'play') { G.shake -= dt; sh = G.shake; }
  camera.position.x += (Math.random() - .5) * sh; camera.position.y += (Math.random() - .5) * sh;
  camera.lookAt(camera.position.x * .6, menu ? 1.5 : 1.7, menu ? 0 : -9);
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
window.__game = { get state() { return state; }, get G() { return G; }, get ents() { return ents; }, P, act,
  step(dt) { if (state === 'play') { update(dt); placeCamera(dt); } } };
requestAnimationFrame(frame);
})();
