import kaplay from "kaplay";
type K = ReturnType<typeof kaplay>;

const VW = 480;
const VH = 640;

// ─── Color palettes per style ────────────────────────────────────────────────
interface RoomStyle {
  name: string;
  emoji: string;
  wall: [number,number,number];
  floor: [number,number,number];
  floorDk: [number,number,number];
  accent: [number,number,number];
  accent2: [number,number,number];
  furniture: [number,number,number];
  furnitureLt: [number,number,number];
  bedMain: [number,number,number];
  bedPillow: [number,number,number];
  panelBg: [number,number,number];
  panelAccent: [number,number,number];
  textCol: [number,number,number];
}

const STYLES: RoomStyle[] = [
  {
    name:"Cozy",       emoji:"🧸",
    wall:    [255,240,225], floor:   [210,170,120], floorDk: [185,145,95],
    accent:  [220,130,80],  accent2: [255,200,150],
    furniture:[160,100,55], furnitureLt:[220,175,120],
    bedMain: [200,100,80],  bedPillow:[255,220,200],
    panelBg: [60,35,20],    panelAccent:[180,100,50],  textCol:[255,230,200],
  },
  {
    name:"Minimalist",  emoji:"🤍",
    wall:    [245,245,245], floor:   [220,210,200], floorDk: [200,190,178],
    accent:  [180,180,180], accent2: [230,230,230],
    furniture:[140,130,120],furnitureLt:[210,205,198],
    bedMain: [240,240,240], bedPillow:[255,255,255],
    panelBg: [30,30,30],    panelAccent:[100,100,100], textCol:[240,240,240],
  },
  {
    name:"Dark Academia",emoji:"📚",
    wall:    [45,38,30],    floor:   [80,55,30],    floorDk: [60,40,20],
    accent:  [160,120,60],  accent2: [200,160,90],
    furniture:[100,65,30],  furnitureLt:[150,110,60],
    bedMain: [80,50,30],    bedPillow:[200,170,120],
    panelBg: [20,15,10],    panelAccent:[140,100,40],  textCol:[220,190,140],
  },
  {
    name:"Coastal",     emoji:"🌊",
    wall:    [220,235,245], floor:   [215,200,175], floorDk: [190,175,148],
    accent:  [80,160,200],  accent2: [180,225,240],
    furniture:[150,120,80], furnitureLt:[210,190,160],
    bedMain: [100,170,210], bedPillow:[230,245,255],
    panelBg: [20,50,80],    panelAccent:[60,140,190],  textCol:[220,240,255],
  },
  {
    name:"Gaming",      emoji:"🎮",
    wall:    [15,15,25],    floor:   [25,25,40],    floorDk: [18,18,30],
    accent:  [80,255,180],  accent2: [180,80,255],
    furniture:[30,30,50],   furnitureLt:[50,50,80],
    bedMain: [20,20,40],    bedPillow:[40,40,70],
    panelBg: [10,10,20],    panelAccent:[80,255,180],  textCol:[80,255,180],
  },
  {
    name:"Nature",      emoji:"🌿",
    wall:    [225,240,220], floor:   [180,155,110], floorDk: [155,130,85],
    accent:  [80,160,90],   accent2: [150,210,130],
    furniture:[110,80,45],  furnitureLt:[175,145,95],
    bedMain: [100,155,90],  bedPillow:[210,235,200],
    panelBg: [25,50,25],    panelAccent:[70,140,70],   textCol:[210,240,200],
  },
  {
    name:"Luxury",      emoji:"✨",
    wall:    [240,230,210], floor:   [100,75,45],   floorDk: [80,58,32],
    accent:  [200,165,80],  accent2: [240,215,150],
    furniture:[80,55,25],   furnitureLt:[140,105,55],
    bedMain: [50,40,30],    bedPillow:[240,220,180],
    panelBg: [20,15,5],     panelAccent:[180,145,60],  textCol:[240,215,150],
  },
  {
    name:"Pastel",      emoji:"🌸",
    wall:    [255,235,245], floor:   [245,220,200], floorDk: [225,198,175],
    accent:  [255,160,200], accent2: [200,180,255],
    furniture:[200,140,160],furnitureLt:[240,200,220],
    bedMain: [255,180,210], bedPillow:[255,220,235],
    panelBg: [80,40,70],    panelAccent:[220,130,180], textCol:[255,220,240],
  },
];

// ─── Furniture items ─────────────────────────────────────────────────────────
interface FurnitureDef {
  id: string;
  label: string;
  emoji: string;
  cost: number;
  tier: 1|2|3|4;
  tierLabel: string;
  w: number;
  h: number;
  draw: (k: K, x: number, y: number, s: RoomStyle) => void;
}

function drawBed(k: K, x: number, y: number, s: RoomStyle) {
  // Frame
  k.drawRect({ pos: k.vec2(x, y+10), width: 150, height: 85, color: k.rgb(...s.furniture), radius: 5 });
  // Headboard
  k.drawRect({ pos: k.vec2(x, y-12), width: 150, height: 28, color: k.rgb(...s.furnitureLt), radius: 6 });
  // Mattress
  k.drawRect({ pos: k.vec2(x+5, y+18), width: 140, height: 72, color: k.rgb(...s.bedMain), radius: 4 });
  // Blanket
  k.drawRect({ pos: k.vec2(x+5, y+46), width: 140, height: 40, color: k.rgb(...s.accent), radius: 4 });
  for (let i = 0; i < 5; i++)
    k.drawRect({ pos: k.vec2(x+14+i*26, y+48), width: 14, height: 36, color: k.rgb(...s.accent2), radius: 3 });
  // Pillows
  k.drawRect({ pos: k.vec2(x+8, y+20), width: 55, height: 26, color: k.rgb(...s.bedPillow), radius: 7 });
  k.drawRect({ pos: k.vec2(x+70, y+20), width: 55, height: 26, color: k.rgb(...s.accent2), radius: 7 });
  // Legs
  k.drawRect({ pos: k.vec2(x+4, y+90), width: 10, height: 8, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x+136, y+90), width: 10, height: 8, color: k.rgb(...s.furniture) });
}

function drawDesk(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x+5, y+22), width: 10, height: 45, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x+95, y+22), width: 10, height: 45, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x, y+16), width: 110, height: 12, color: k.rgb(...s.furnitureLt), radius: 3 });
  // Monitor
  k.drawRect({ pos: k.vec2(x+30, y-28), width: 50, height: 36, color: k.rgb(20,20,35), radius: 5 });
  k.drawRect({ pos: k.vec2(x+34, y-24), width: 42, height: 26, color: k.rgb(...s.accent), radius: 3 });
  k.drawRect({ pos: k.vec2(x+51, y+15), width: 8, height: 4, color: k.rgb(80,80,80) });
  // Keyboard
  k.drawRect({ pos: k.vec2(x+20, y+6), width: 50, height: 10, color: k.rgb(60,60,70), radius: 2 });
  // Cup
  k.drawRect({ pos: k.vec2(x+90, y+3), width: 14, height: 14, color: k.rgb(...s.accent2), radius: 3 });
}

function drawBookshelf(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 85, height: 110, color: k.rgb(...s.furnitureLt), radius: 3 });
  k.drawRect({ pos: k.vec2(x, y+33), width: 85, height: 6, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x, y+68), width: 85, height: 6, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x, y+104), width: 85, height: 6, color: k.rgb(...s.furniture) });
  const colors: [number,number,number][] = [
    [255,100,100],[100,180,255],[255,200,80],[150,255,150],[220,100,255],[255,150,80],[80,220,200]
  ];
  for (let i = 0; i < 6; i++) {
    const c = colors[i % colors.length] ?? colors[0]!;
    k.drawRect({ pos: k.vec2(x+4+i*13, y+6), width: 11, height: 26, color: k.rgb(...c), radius: 1 });
  }
  for (let i = 0; i < 5; i++) {
    const c = colors[(i+2) % colors.length] ?? colors[0]!;
    k.drawRect({ pos: k.vec2(x+4+i*16, y+40), width: 13, height: 26, color: k.rgb(...c), radius: 1 });
  }
}

function drawLamp(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x+14, y+58), width: 28, height: 8, color: k.rgb(...s.furniture), radius: 3 });
  k.drawRect({ pos: k.vec2(x+24, y+12), width: 8, height: 48, color: k.rgb(180,180,190) });
  k.drawRect({ pos: k.vec2(x+2, y), width: 52, height: 18, color: k.rgb(...s.accent2), radius: 5 });
  k.drawRect({ pos: k.vec2(x+8, y+4), width: 40, height: 10, color: k.rgb(255,255,200), radius: 3 });
  k.drawCircle({ pos: k.vec2(x+28, y+9), radius: 6, color: k.rgb(255,255,220) });
}

function drawPlant(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x+10, y+42), width: 36, height: 26, color: k.rgb(...s.accent), radius: 5 });
  k.drawRect({ pos: k.vec2(x+6, y+38), width: 44, height: 8, color: k.rgb(...s.accent2), radius: 3 });
  k.drawRect({ pos: k.vec2(x+26, y+14), width: 5, height: 28, color: k.rgb(80,140,60) });
  k.drawCircle({ pos: k.vec2(x+28, y+12), radius: 16, color: k.rgb(80,180,80) });
  k.drawCircle({ pos: k.vec2(x+16, y+20), radius: 11, color: k.rgb(60,160,60) });
  k.drawCircle({ pos: k.vec2(x+40, y+20), radius: 11, color: k.rgb(100,200,90) });
  k.drawCircle({ pos: k.vec2(x+28, y+4), radius: 7, color: k.rgb(...s.accent) });
  k.drawCircle({ pos: k.vec2(x+28, y+4), radius: 3, color: k.rgb(255,220,50) });
}

function drawRug(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 130, height: 70, color: k.rgb(...s.accent), radius: 10 });
  k.drawRect({ pos: k.vec2(x+7, y+7), width: 116, height: 56, color: k.rgb(...s.accent2), radius: 8 });
  k.drawRect({ pos: k.vec2(x+14, y+14), width: 102, height: 42, color: k.rgb(...s.accent), radius: 5 });
  for (let i = 0; i < 3; i++)
    k.drawCircle({ pos: k.vec2(x+32+i*34, y+35), radius: 10, color: k.rgb(...s.accent2) });
}

function drawMirror(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 55, height: 90, color: k.rgb(...s.accent2), radius: 10 });
  k.drawRect({ pos: k.vec2(x+6, y+6), width: 43, height: 72, color: k.rgb(200,230,255), radius: 7 });
  k.drawRect({ pos: k.vec2(x+10, y+10), width: 12, height: 50, color: k.rgb(240,250,255), radius: 4 });
  k.drawRect({ pos: k.vec2(x+16, y+84), width: 23, height: 8, color: k.rgb(...s.furnitureLt), radius: 3 });
}

function drawPoster(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 65, height: 80, color: k.rgb(...s.accent2), radius: 5 });
  k.drawRect({ pos: k.vec2(x+4, y+4), width: 57, height: 72, color: k.rgb(...s.wall ?? [240,240,240]), radius: 3 });
  k.drawCircle({ pos: k.vec2(x+32, y+28), radius: 18, color: k.rgb(...s.accent) });
  k.drawCircle({ pos: k.vec2(x+38, y+22), radius: 14, color: k.rgb(...s.accent2) });
  for (let i = 0; i < 4; i++)
    k.drawCircle({ pos: k.vec2(x+12+i*14, y+56), radius: 3, color: k.rgb(...s.accent) });
  k.drawRect({ pos: k.vec2(x+10, y+66), width: 45, height: 4, color: k.rgb(...s.accent), radius: 2 });
}

function drawFairyLights(k: K, x: number, y: number, _s: RoomStyle) {
  const bulbColors: [number,number,number][] = [
    [255,220,80],[255,150,180],[150,220,255],[180,255,180],[220,150,255],[255,180,100]
  ];
  for (let i = 0; i < 10; i++) {
    const lx = x + i * 14;
    const ly = y + Math.sin(i * 0.9) * 7;
    k.drawRect({ pos: k.vec2(lx, ly+3), width: 14, height: 2, color: k.rgb(180,180,190) });
    const bc = bulbColors[i % bulbColors.length] ?? bulbColors[0]!;
    k.drawCircle({ pos: k.vec2(lx+6, ly+11), radius: 5, color: k.rgb(...bc) });
    k.drawCircle({ pos: k.vec2(lx+5, ly+9), radius: 2, color: k.rgb(255,255,255) });
  }
}

function drawTeddy(k: K, x: number, y: number, _s: RoomStyle) {
  k.drawCircle({ pos: k.vec2(x+24, y+38), radius: 20, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+24, y+14), radius: 15, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+11, y+4), radius: 8, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+11, y+4), radius: 5, color: k.rgb(255,190,180) });
  k.drawCircle({ pos: k.vec2(x+37, y+4), radius: 8, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+37, y+4), radius: 5, color: k.rgb(255,190,180) });
  k.drawCircle({ pos: k.vec2(x+18, y+12), radius: 3, color: k.rgb(50,30,20) });
  k.drawCircle({ pos: k.vec2(x+30, y+12), radius: 3, color: k.rgb(50,30,20) });
  k.drawCircle({ pos: k.vec2(x+24, y+19), radius: 5, color: k.rgb(255,180,170) });
  k.drawCircle({ pos: k.vec2(x+5, y+36), radius: 9, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+43, y+36), radius: 9, color: k.rgb(210,165,110) });
  k.drawCircle({ pos: k.vec2(x+24, y+40), radius: 12, color: k.rgb(255,200,185) });
}

function drawGamingSetup(k: K, x: number, y: number, s: RoomStyle) {
  // Desk
  k.drawRect({ pos: k.vec2(x, y+30), width: 140, height: 14, color: k.rgb(...s.furnitureLt), radius: 3 });
  k.drawRect({ pos: k.vec2(x+5, y+44), width: 12, height: 40, color: k.rgb(...s.furniture) });
  k.drawRect({ pos: k.vec2(x+123, y+44), width: 12, height: 40, color: k.rgb(...s.furniture) });
  // Two monitors
  k.drawRect({ pos: k.vec2(x+5, y-20), width: 55, height: 40, color: k.rgb(15,15,25), radius: 4 });
  k.drawRect({ pos: k.vec2(x+9, y-16), width: 47, height: 30, color: k.rgb(...s.accent), radius: 2 });
  k.drawRect({ pos: k.vec2(x+75, y-20), width: 55, height: 40, color: k.rgb(15,15,25), radius: 4 });
  k.drawRect({ pos: k.vec2(x+79, y-16), width: 47, height: 30, color: k.rgb(...s.accent2), radius: 2 });
  // LED strip
  k.drawRect({ pos: k.vec2(x, y+28), width: 140, height: 3, color: k.rgb(...s.accent) });
  // Keyboard + mouse
  k.drawRect({ pos: k.vec2(x+20, y+18), width: 60, height: 12, color: k.rgb(30,30,45), radius: 2 });
  k.drawCircle({ pos: k.vec2(x+100, y+24), radius: 7, color: k.rgb(30,30,45) });
}

function drawWardrobe(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 100, height: 130, color: k.rgb(...s.furnitureLt), radius: 4 });
  k.drawRect({ pos: k.vec2(x+2, y+2), width: 46, height: 126, color: k.rgb(...s.furniture), radius: 3 });
  k.drawRect({ pos: k.vec2(x+52, y+2), width: 46, height: 126, color: k.rgb(...s.furniture), radius: 3 });
  k.drawCircle({ pos: k.vec2(x+42, y+65), radius: 4, color: k.rgb(...s.accent2) });
  k.drawCircle({ pos: k.vec2(x+58, y+65), radius: 4, color: k.rgb(...s.accent2) });
  // Top shelf
  k.drawRect({ pos: k.vec2(x, y-18), width: 100, height: 20, color: k.rgb(...s.furniture), radius: 3 });
}

function drawClock(k: K, x: number, y: number, s: RoomStyle) {
  k.drawCircle({ pos: k.vec2(x+24, y+24), radius: 24, color: k.rgb(...s.furnitureLt) });
  k.drawCircle({ pos: k.vec2(x+24, y+24), radius: 21, color: k.rgb(245,245,250) });
  k.drawRect({ pos: k.vec2(x+23, y+8), width: 3, height: 16, color: k.rgb(40,40,50), radius: 1 });
  k.drawRect({ pos: k.vec2(x+24, y+22), width: 12, height: 3, color: k.rgb(40,40,50), radius: 1 });
  k.drawCircle({ pos: k.vec2(x+24, y+24), radius: 2, color: k.rgb(40,40,50) });
  k.drawRect({ pos: k.vec2(x+10, y+46), width: 9, height: 7, color: k.rgb(...s.accent), radius: 2 });
  k.drawRect({ pos: k.vec2(x+29, y+46), width: 9, height: 7, color: k.rgb(...s.accent), radius: 2 });
}

function drawBeanbag(k: K, x: number, y: number, s: RoomStyle) {
  k.drawCircle({ pos: k.vec2(x+32, y+42), radius: 30, color: k.rgb(...s.accent) });
  k.drawCircle({ pos: k.vec2(x+32, y+38), radius: 26, color: k.rgb(...s.accent2) });
  k.drawCircle({ pos: k.vec2(x+32, y+30), radius: 16, color: k.rgb(...s.accent) });
}

function drawNeonSign(k: K, x: number, y: number, s: RoomStyle) {
  k.drawRect({ pos: k.vec2(x, y), width: 100, height: 36, color: k.rgb(20,15,30), radius: 6 });
  k.drawRect({ pos: k.vec2(x+4, y+4), width: 92, height: 28, color: k.rgb(15,10,25), radius: 4 });
  // Neon text effect
  k.drawRect({ pos: k.vec2(x+10, y+10), width: 80, height: 16, color: k.rgb(...s.accent), radius: 3 });
  k.drawRect({ pos: k.vec2(x+14, y+13), width: 72, height: 10, color: k.rgb(255,255,255), radius: 2 });
  // Glow dots
  for (let i = 0; i < 5; i++)
    k.drawCircle({ pos: k.vec2(x+18+i*16, y+18), radius: 3, color: k.rgb(...s.accent2) });
}

const FURNITURE: FurnitureDef[] = [
  { id:"bed",      label:"Bed",          emoji:"🛏",  cost:0,  tier:1, tierLabel:"🟢 Free",    w:150, h:100, draw:drawBed },
  { id:"desk",     label:"Desk",         emoji:"💻",  cost:0,  tier:1, tierLabel:"🟢 Free",    w:110, h:70,  draw:drawDesk },
  { id:"lamp",     label:"Lamp",         emoji:"💡",  cost:20, tier:1, tierLabel:"🟢 Easy",    w:56,  h:68,  draw:drawLamp },
  { id:"plant",    label:"Plant",        emoji:"🌿",  cost:20, tier:1, tierLabel:"🟢 Easy",    w:56,  h:68,  draw:drawPlant },
  { id:"rug",      label:"Rug",          emoji:"🪄",  cost:30, tier:1, tierLabel:"🟢 Easy",    w:130, h:70,  draw:drawRug },
  { id:"clock",    label:"Clock",        emoji:"🕐",  cost:35, tier:2, tierLabel:"🔵 Medium",  w:48,  h:54,  draw:drawClock },
  { id:"shelf",    label:"Bookshelf",    emoji:"📚",  cost:50, tier:2, tierLabel:"🔵 Medium",  w:85,  h:110, draw:drawBookshelf },
  { id:"mirror",   label:"Mirror",       emoji:"🪞",  cost:60, tier:2, tierLabel:"🔵 Medium",  w:55,  h:92,  draw:drawMirror },
  { id:"poster",   label:"Poster",       emoji:"🖼",  cost:55, tier:2, tierLabel:"🔵 Medium",  w:65,  h:80,  draw:drawPoster },
  { id:"teddy",    label:"Teddy Bear",   emoji:"🧸",  cost:70, tier:2, tierLabel:"🔵 Medium",  w:50,  h:58,  draw:drawTeddy },
  { id:"lights",   label:"Fairy Lights", emoji:"✨",  cost:80, tier:3, tierLabel:"🟣 Hard",    w:140, h:24,  draw:drawFairyLights },
  { id:"wardrobe", label:"Wardrobe",     emoji:"🚪",  cost:90, tier:3, tierLabel:"🟣 Hard",    w:100, h:148, draw:drawWardrobe },
  { id:"beanbag",  label:"Bean Bag",     emoji:"🪑",  cost:85, tier:3, tierLabel:"🟣 Hard",    w:64,  h:72,  draw:drawBeanbag },
  { id:"gaming",   label:"Gaming Setup", emoji:"🎮",  cost:150,tier:4, tierLabel:"🟡 Special", w:140, h:85,  draw:drawGamingSetup },
  { id:"neon",     label:"Neon Sign",    emoji:"💜",  cost:120,tier:4, tierLabel:"🟡 Special", w:100, h:36,  draw:drawNeonSign },
];

interface PlacedItem { id: string; x: number; y: number }
interface SaveData { coins: number; placed: PlacedItem[]; doneIds: string[]; styleIdx: number }

// ─── Challenges ──────────────────────────────────────────────────────────────
interface Challenge {
  id: string; label: string; desc: string; reward: number; done: boolean;
  check: (p: Set<string>) => boolean;
}
const CHALLENGE_DEFS: Omit<Challenge,"done">[] = [
  { id:"cozy",    label:"🛏 Cozy Corner",   desc:"Bed + Lamp + Rug",        reward:40,  check:p=>p.has("bed")&&p.has("lamp")&&p.has("rug") },
  { id:"study",   label:"📚 Study Zone",    desc:"Desk + Bookshelf",        reward:50,  check:p=>p.has("desk")&&p.has("shelf") },
  { id:"gamer",   label:"🎮 Gamer Room",    desc:"Gaming Setup + Neon",     reward:80,  check:p=>p.has("gaming")&&p.has("neon") },
  { id:"bloom",   label:"🌸 Full Bloom",    desc:"Place 6+ items",          reward:60,  check:p=>p.size>=6 },
  { id:"dreamy",  label:"✨ Dream Room",    desc:"Fairy Lights + Mirror",   reward:70,  check:p=>p.has("lights")&&p.has("mirror") },
  { id:"maxed",   label:"🏆 Dream Complete",desc:"Place all 15 items",      reward:250, check:p=>p.size>=15 },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export function startGame(canvas: HTMLCanvasElement, onScore: (n: number) => void): () => void {
  const k = kaplay({
    canvas, width: VW, height: VH, letterbox: true,
    background: [245, 235, 225],
    global: false,
    pixelDensity: Math.min(window.devicePixelRatio || 1, 2),
  });

  const SAVE_KEY = "dreamroom_v3";
  function loadSave(): SaveData {
    try { const r = localStorage.getItem(SAVE_KEY); if (r) return JSON.parse(r) as SaveData; } catch { /**/ }
    return { coins: 30, placed: [], doneIds: [], styleIdx: 0 };
  }
  function writeSave(d: SaveData) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch { /**/ }
  }

  const save = loadSave();
  let coins = save.coins;
  const placed: PlacedItem[] = save.placed;
  const doneIds = new Set<string>(save.doneIds);
  let styleIdx = save.styleIdx ?? 0;

  const challenges: Challenge[] = CHALLENGE_DEFS.map(d => ({ ...d, done: doneIds.has(d.id) }));

  function persist() {
    writeSave({ coins, placed, doneIds: [...doneIds], styleIdx });
    onScore(coins);
  }
  onScore(coins);

  // ── Toast ─────────────────────────────────────────────────────────────────
  let toastTimer = 0;
  let toastMsg = "";
  function showToast(msg: string) { toastMsg = msg; toastTimer = 2.5; }

  // ── Scenes ────────────────────────────────────────────────────────────────
  k.scene("style", () => {
    const style = STYLES[styleIdx] ?? STYLES[0]!;

    k.onDraw(() => {
      k.drawRect({ pos: k.vec2(0,0), width: VW, height: VH, color: k.rgb(...style.wall) });
      // Title
      k.drawRect({ pos: k.vec2(0,0), width: VW, height: 60, color: k.rgb(...style.panelBg) });
    });

    k.add([k.text("Choose Your Style", { size: 20, font:"sans-serif" }), k.pos(VW/2, 30), k.anchor("center"), k.color(...style.textCol), k.fixed()]);
    k.add([k.text("Pick a room vibe 👇", { size: 12, font:"sans-serif" }), k.pos(VW/2, 50), k.anchor("center"), k.color(...style.textCol), k.fixed()]);

    const COLS = 2;
    const BW = 210, BH = 64, GAP = 10;
    const startX = (VW - (COLS * BW + (COLS-1)*GAP)) / 2;
    const startY = 75;

    for (let i = 0; i < STYLES.length; i++) {
      const st = STYLES[i]!;
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const bx = startX + col * (BW + GAP);
      const by = startY + row * (BH + GAP);
      const isSelected = i === styleIdx;

      const btn = k.add([
        k.rect(BW, BH, { radius: 10 }),
        k.pos(bx, by),
        k.color(k.rgb(...st.panelBg)),
        k.area(), k.fixed(),
      ]);
      if (isSelected) {
        k.add([k.rect(BW+6, BH+6, { radius: 12 }), k.pos(bx-3, by-3), k.color(k.rgb(...st.accent)), k.fixed()]);
        k.add([k.rect(BW, BH, { radius: 10 }), k.pos(bx, by), k.color(k.rgb(...st.panelBg)), k.fixed()]);
      }
      k.add([k.text(st.emoji + " " + st.name, { size: 16, font:"sans-serif" }), k.pos(bx+BW/2, by+22), k.anchor("center"), k.color(k.rgb(...st.textCol)), k.fixed()]);
      k.add([k.text(isSelected ? "✓ Selected" : "Tap to select", { size: 10, font:"sans-serif" }), k.pos(bx+BW/2, by+44), k.anchor("center"), k.color(k.rgb(...st.accent2)), k.fixed()]);

      const idx = i;
      btn.onClick(() => { styleIdx = idx; persist(); k.go("style"); });
    }

    // Continue button
    const contY = startY + Math.ceil(STYLES.length / COLS) * (BH + GAP) + 10;
    const contBtn = k.add([
      k.rect(220, 50, { radius: 12 }),
      k.pos(VW/2-110, contY),
      k.color(k.rgb(...style.accent)),
      k.area(), k.fixed(),
    ]);
    k.add([k.text("🛏 Decorate My Room →", { size: 14, font:"sans-serif" }), k.pos(VW/2, contY+25), k.anchor("center"), k.color(k.rgb(...style.panelBg)), k.fixed()]);
    contBtn.onClick(() => k.go("room"));
  });

  k.scene("room", () => {
    const style = STYLES[styleIdx] ?? STYLES[0]!;
    const FLOOR_Y = VH - 185;
    const PANEL_Y = VH - 185;
    const PANEL_H = 185;
    const ROOM_H  = PANEL_Y;

    // ── Background draw ───────────────────────────────────────────────────
    k.onDraw(() => {
      // Wall
      k.drawRect({ pos: k.vec2(0,0), width: VW, height: FLOOR_Y, color: k.rgb(...style.wall) });

      // Wallpaper pattern based on style
      if (styleIdx === 4) { // Gaming — grid lines
        for (let i = 0; i < 12; i++)
          k.drawRect({ pos: k.vec2(i*42,0), width:1, height:FLOOR_Y, color: k.rgb(...style.accent) });
        for (let i = 0; i < 12; i++)
          k.drawRect({ pos: k.vec2(0,i*42), width:VW, height:1, color: k.rgb(...style.accent) });
      } else if (styleIdx === 2) { // Dark academia — wood panels
        for (let i = 0; i < 6; i++)
          k.drawRect({ pos: k.vec2(i*82,0), width:4, height:FLOOR_Y, color: k.rgb(...style.furniture) });
      } else { // Dots
        for (let r = 0; r < 8; r++)
          for (let c = 0; c < 10; c++)
            k.drawCircle({ pos: k.vec2(28+c*48, 28+r*54), radius: 3, color: k.rgb(...style.accent2) });
      }

      // Window
      k.drawRect({ pos: k.vec2(VW/2-55, 18), width: 110, height: 95, color: k.rgb(180,215,245), radius: 8 });
      k.drawRect({ pos: k.vec2(VW/2-50, 23), width: 100, height: 85, color: k.rgb(210,235,255), radius: 5 });
      // Panes
      k.drawRect({ pos: k.vec2(VW/2-2, 23), width: 4, height: 85, color: k.rgb(255,255,255) });
      k.drawRect({ pos: k.vec2(VW/2-50, 62), width: 100, height: 4, color: k.rgb(255,255,255) });
      // Sunlight rays
      k.drawRect({ pos: k.vec2(VW/2-30, 23), width: 10, height: 85, color: k.rgb(255,255,240) });
      // Window sill
      k.drawRect({ pos: k.vec2(VW/2-60, 112), width: 120, height: 10, color: k.rgb(245,245,245), radius: 3 });
      // Curtains
      k.drawRect({ pos: k.vec2(VW/2-80, 10), width: 28, height: 105, color: k.rgb(...style.accent), radius: 5 });
      k.drawRect({ pos: k.vec2(VW/2+52, 10), width: 28, height: 105, color: k.rgb(...style.accent), radius: 5 });
      // Curtain folds
      for (let i = 0; i < 3; i++) {
        k.drawRect({ pos: k.vec2(VW/2-78+i*8, 10), width: 4, height: 105, color: k.rgb(...style.accent2) });
        k.drawRect({ pos: k.vec2(VW/2+54+i*8, 10), width: 4, height: 105, color: k.rgb(...style.accent2) });
      }
      // Curtain rod
      k.drawRect({ pos: k.vec2(VW/2-88, 6), width: 176, height: 7, color: k.rgb(...style.accent2), radius: 3 });

      // Floor
      k.drawRect({ pos: k.vec2(0, FLOOR_Y), width: VW, height: VH-FLOOR_Y, color: k.rgb(...style.floor) });
      for (let i = 0; i < 8; i++)
        k.drawRect({ pos: k.vec2(0, FLOOR_Y+i*20), width: VW, height: 2, color: k.rgb(...style.floorDk) });
      // Skirting
      k.drawRect({ pos: k.vec2(0, FLOOR_Y), width: VW, height: 10, color: k.rgb(...style.furnitureLt) });

      // ── Panel ──────────────────────────────────────────────────────────
      k.drawRect({ pos: k.vec2(0, PANEL_Y), width: VW, height: PANEL_H, color: k.rgb(...style.panelBg) });
      k.drawRect({ pos: k.vec2(0, PANEL_Y), width: VW, height: 4, color: k.rgb(...style.accent) });
    });

    // ── Draw placed items ─────────────────────────────────────────────────
    k.onDraw(() => {
      for (const item of placed) {
        const def = FURNITURE.find(f => f.id === item.id);
        if (def) def.draw(k, item.x, item.y, style);
      }
    });

    // ── Toast draw ────────────────────────────────────────────────────────
    k.onDraw(() => {
      if (toastTimer > 0) {
        const alpha = Math.min(1, toastTimer);
        const ta = Math.floor(alpha * 220);
        k.drawRect({ pos: k.vec2(VW/2-110, 140), width: 220, height: 38, color: k.rgb(30,20,50), radius: 10 });
        k.drawText({ text: toastMsg, pos: k.vec2(VW/2, 159), anchor:"center", size:13, font:"sans-serif", color: k.rgb(255,230,100) });
        void ta;
      }
    });
    k.onUpdate(() => { if (toastTimer > 0) toastTimer -= k.dt(); });

    // ── Coin display ──────────────────────────────────────────────────────
    const coinLbl = k.add([
      k.text(`🌸 ${coins}`, { size: 15, font:"sans-serif" }),
      k.pos(10, PANEL_Y + 8), k.color(...style.textCol), k.fixed(),
    ]);

    // Style button
    const styleBtn = k.add([
      k.rect(110, 28, { radius: 6 }),
      k.pos(VW-118, PANEL_Y+6),
      k.color(k.rgb(...style.accent)),
      k.area(), k.fixed(),
    ]);
    k.add([k.text("🎨 Style", { size: 12, font:"sans-serif" }), k.pos(VW-63, PANEL_Y+20), k.anchor("center"), k.color(k.rgb(...style.panelBg)), k.fixed()]);
    styleBtn.onClick(() => k.go("style"));

    // Challenges button
    const challBtn = k.add([
      k.rect(110, 28, { radius: 6 }),
      k.pos(VW-118, PANEL_Y+38),
      k.color(k.rgb(...style.panelAccent)),
      k.area(), k.fixed(),
    ]);
    k.add([k.text("⭐ Goals", { size: 12, font:"sans-serif" }), k.pos(VW-63, PANEL_Y+52), k.anchor("center"), k.color(k.rgb(...style.textCol)), k.fixed()]);
    challBtn.onClick(() => k.go("challenges"));

    // ── Shop row ──────────────────────────────────────────────────────────
    const SHOP_Y = PANEL_Y + 70;
    const CARD_W = 72;
    const CARD_H = 106;
    const CARD_GAP = 6;
    let shopScroll = 0;
    const MAX_SCROLL = Math.max(0, FURNITURE.length * (CARD_W + CARD_GAP) - VW + 60);

    // Drag-to-place state
    let dragging = false;
    let dragDefId = "";
    let dragX = 0, dragY = 0;

    // Shop draw
    k.onDraw(() => {
      // Tier label
      k.drawText({ text: "🛒 Shop", pos: k.vec2(10, SHOP_Y - 2), size: 11, font:"sans-serif", color: k.rgb(...style.textCol) });

      const startX = 8 - shopScroll;
      for (let i = 0; i < FURNITURE.length; i++) {
        const def = FURNITURE[i]!;
        const cx = startX + i * (CARD_W + CARD_GAP);
        if (cx + CARD_W < 0 || cx > VW) continue;

        const canAfford = coins >= def.cost;
        const alreadyPlaced = placed.some(p => p.id === def.id);
        const dimmed = !canAfford || alreadyPlaced;

        // Card bg
        k.drawRect({ pos: k.vec2(cx, SHOP_Y+14), width: CARD_W, height: CARD_H,
          color: dimmed ? k.rgb(40,30,55) : k.rgb(70,45,100), radius: 8 });

        // Tier color bar
        const tierColors: [number,number,number][] = [
          [80,200,120],[80,140,255],[180,80,255],[255,200,50]
        ];
        const tc = tierColors[(def.tier-1)] ?? tierColors[0]!;
        k.drawRect({ pos: k.vec2(cx, SHOP_Y+14), width: CARD_W, height: 5, color: k.rgb(...tc), radius: 4 });

        // Emoji
        k.drawText({ text: def.emoji, pos: k.vec2(cx+CARD_W/2, SHOP_Y+46), anchor:"center", size:22, font:"sans-serif", color: k.rgb(255,255,255) });

        // Label
        k.drawText({ text: def.label, pos: k.vec2(cx+CARD_W/2, SHOP_Y+76), anchor:"center", size:8, font:"sans-serif",
          color: k.rgb(...(dimmed ? [120,100,140] as [number,number,number] : [220,200,255] as [number,number,number])) });

        // Cost / status
        const costText = alreadyPlaced ? "✓ Placed" : def.cost === 0 ? "FREE" : `🌸${def.cost}`;
        k.drawText({ text: costText, pos: k.vec2(cx+CARD_W/2, SHOP_Y+92), anchor:"center", size:9, font:"sans-serif",
          color: k.rgb(...(alreadyPlaced ? [80,200,120] as [number,number,number] : canAfford ? [255,220,80] as [number,number,number] : [180,100,100] as [number,number,number])) });

        // Drag hint
        if (canAfford && !alreadyPlaced)
          k.drawText({ text: "drag ↑", pos: k.vec2(cx+CARD_W/2, SHOP_Y+106), anchor:"center", size:8, font:"sans-serif", color: k.rgb(150,130,180) });
      }

      // Drag ghost
      if (dragging) {
        const def = FURNITURE.find(f => f.id === dragDefId);
        if (def) {
          k.drawRect({ pos: k.vec2(dragX - def.w/2 - 4, dragY - def.h/2 - 4), width: def.w+8, height: def.h+8,
            color: k.rgb(...style.accent), radius: 6 });
          def.draw(k, dragX - def.w/2, dragY - def.h/2, style);
        }
      }
    });

    // ── Input: drag from shop to room ─────────────────────────────────────
    function getCardAtPos(mx: number, my: number): string | null {
      if (my < SHOP_Y+14 || my > SHOP_Y+14+CARD_H) return null;
      const startX = 8 - shopScroll;
      for (let i = 0; i < FURNITURE.length; i++) {
        const def = FURNITURE[i]!;
        const cx = startX + i * (CARD_W + CARD_GAP);
        if (mx >= cx && mx <= cx + CARD_W) return def.id;
      }
      return null;
    }

    k.onMousePress(() => {
      const mp = k.mousePos();
      const id = getCardAtPos(mp.x, mp.y);
      if (id) {
        const def = FURNITURE.find(f => f.id === id);
        if (!def) return;
        if (placed.some(p => p.id === id)) { showToast("Already placed! Remove first."); return; }
        if (coins < def.cost) { showToast(`Need ${def.cost} 🌸 coins!`); return; }
        dragging = true;
        dragDefId = id;
        dragX = mp.x; dragY = mp.y;
      }
    });

    k.onMouseMove(() => {
      if (!dragging) return;
      const mp = k.mousePos();
      dragX = mp.x; dragY = mp.y;
    });

    k.onMouseRelease(() => {
      if (!dragging) return;
      dragging = false;
      if (dragY < PANEL_Y - 10) {
        const def = FURNITURE.find(f => f.id === dragDefId);
        if (!def) return;
        const px = Math.max(0, Math.min(VW - def.w, dragX - def.w/2));
        const py = Math.max(0, Math.min(FLOOR_Y - 10, dragY - def.h/2));
        placed.push({ id: dragDefId, x: px, y: py });
        coins -= def.cost;
        coinLbl.text = `🌸 ${coins}`;
        showToast(`${def.emoji} ${def.label} placed!`);
        checkChallenges();
        persist();
      }
    });

    // Touch support
    k.onTouchStart((_id, touch) => {
      const id = getCardAtPos(touch.x, touch.y);
      if (id) {
        const def = FURNITURE.find(f => f.id === id);
        if (!def) return;
        if (placed.some(p => p.id === id)) { showToast("Already placed!"); return; }
        if (coins < def.cost) { showToast(`Need ${def.cost} 🌸 coins!`); return; }
        dragging = true; dragDefId = id; dragX = touch.x; dragY = touch.y;
      }
    });
    k.onTouchMove((_id, touch) => { if (dragging) { dragX = touch.x; dragY = touch.y; } });
    k.onTouchEnd((_id, touch) => {
      if (!dragging) return;
      dragging = false;
      if (touch.y < PANEL_Y - 10) {
        const def = FURNITURE.find(f => f.id === dragDefId);
        if (!def) return;
        const px = Math.max(0, Math.min(VW - def.w, touch.x - def.w/2));
        const py = Math.max(0, Math.min(FLOOR_Y - 10, touch.y - def.h/2));
        placed.push({ id: dragDefId, x: px, y: py });
        coins -= def.cost;
        coinLbl.text = `🌸 ${coins}`;
        showToast(`${def.emoji} ${def.label} placed!`);
        checkChallenges();
        persist();
      }
    });

    // Scroll shop
    k.onScroll((delta) => {
      shopScroll = Math.max(0, Math.min(MAX_SCROLL, shopScroll + delta.y * 0.5));
    });

    // Left/right scroll buttons
    const lBtn = k.add([k.rect(28,CARD_H,{radius:5}), k.pos(0,SHOP_Y+14), k.color(k.rgb(...style.panelAccent)), k.area(), k.fixed()]);
    k.add([k.text("◀",{size:13}), k.pos(14,SHOP_Y+14+CARD_H/2), k.anchor("center"), k.color(k.rgb(...style.textCol)), k.fixed()]);
    lBtn.onClick(() => { shopScroll = Math.max(0, shopScroll-(CARD_W+CARD_GAP)*2); });

    const rBtn = k.add([k.rect(28,CARD_H,{radius:5}), k.pos(VW-28,SHOP_Y+14), k.color(k.rgb(...style.panelAccent)), k.area(), k.fixed()]);
    k.add([k.text("▶",{size:13}), k.pos(VW-14,SHOP_Y+14+CARD_H/2), k.anchor("center"), k.color(k.rgb(...style.textCol)), k.fixed()]);
    rBtn.onClick(() => { shopScroll = Math.min(MAX_SCROLL, shopScroll+(CARD_W+CARD_GAP)*2); });

    // Remove last item button
    const undoBtn = k.add([
      k.rect(90,28,{radius:6}), k.pos(10, PANEL_Y+38),
      k.color(k.rgb(140,50,50)), k.area(), k.fixed(),
    ]);
    k.add([k.text("↩ Remove Last",{size:10}), k.pos(55, PANEL_Y+52), k.anchor("center"), k.color(k.rgb(255,200,200)), k.fixed()]);
    undoBtn.onClick(() => {
      const item = placed.pop();
      if (item) {
        const def = FURNITURE.find(f => f.id === item.id);
        if (def) { coins += def.cost; coinLbl.text = `🌸 ${coins}`; persist(); showToast(`↩ ${def.label} removed`); }
      }
    });

    function checkChallenges() {
      const placedIds = new Set(placed.map(p => p.id));
      for (const ch of challenges) {
        if (!ch.done && ch.check(placedIds)) {
          ch.done = true;
          doneIds.add(ch.id);
          coins += ch.reward;
          coinLbl.text = `🌸 ${coins}`;
          persist();
          showToast(`${ch.label} +${ch.reward}🌸`);
        }
      }
    }
  });

  // ── Challenges scene ──────────────────────────────────────────────────────
  k.scene("challenges", () => {
    const style = STYLES[styleIdx] ?? STYLES[0]!;

    k.onDraw(() => {
      k.drawRect({ pos: k.vec2(0,0), width:VW, height:VH, color: k.rgb(...style.panelBg) });
      k.drawRect({ pos: k.vec2(0,0), width:VW, height:55, color: k.rgb(20,12,35) });
    });

    k.add([k.text("⭐ Room Goals", {size:20, font:"sans-serif"}), k.pos(VW/2,28), k.anchor("center"), k.color(...style.textCol), k.fixed()]);
    k.add([k.text(`🌸 ${coins} coins`, {size:13, font:"sans-serif"}), k.pos(VW-10,28), k.anchor("right"), k.color(...style.accent2), k.fixed()]);

    const placedIds = new Set(placed.map(p => p.id));

    for (let i = 0; i < challenges.length; i++) {
      const ch = challenges[i]!;
      const cy = 65 + i * 92;
      const isDone = ch.done;
      const canClaim = !isDone && ch.check(placedIds);

      k.add([k.rect(VW-20, 82, {radius:10}), k.pos(10, cy), k.color(k.rgb(isDone?30:40, isDone?60:30, isDone?30:55)), k.fixed()]);
      if (isDone) k.add([k.rect(VW-20,4,{radius:2}), k.pos(10,cy), k.color(k.rgb(80,200,120)), k.fixed()]);
      if (canClaim) k.add([k.rect(VW-20,4,{radius:2}), k.pos(10,cy), k.color(k.rgb(...style.accent)), k.fixed()]);

      k.add([k.text(ch.label, {size:14, font:"sans-serif"}), k.pos(20,cy+14), k.color(k.rgb(...style.textCol)), k.fixed()]);
      k.add([k.text(isDone?"✅ Completed!":ch.desc, {size:10, font:"sans-serif"}), k.pos(20,cy+34), k.color(k.rgb(isDone?80:150, isDone?200:150, isDone?80:180)), k.fixed()]);
      k.add([k.text(`+${ch.reward} 🌸`, {size:13, font:"sans-serif"}), k.pos(VW-30,cy+14), k.anchor("right"), k.color(k.rgb(...style.accent2)), k.fixed()]);

      if (canClaim) {
        const claimBtn = k.add([k.rect(90,28,{radius:6}), k.pos(VW-108,cy+46), k.color(k.rgb(...style.accent)), k.area(), k.fixed()]);
        k.add([k.text("CLAIM 🎉",{size:11}), k.pos(VW-63,cy+60), k.anchor("center"), k.color(k.rgb(...style.panelBg)), k.fixed()]);
        const chId = ch.id;
        const reward = ch.reward;
        claimBtn.onClick(() => {
          const target = challenges.find(c => c.id === chId);
          if (target && !target.done) {
            target.done = true;
            doneIds.add(chId);
            coins += reward;
            persist();
            showToast(`+${reward} coins! 🎉`);
            k.go("challenges");
          }
        });
      } else if (!isDone) {
        k.add([k.text("🔒 Not yet", {size:10}), k.pos(VW-30,cy+60), k.anchor("right"), k.color(k.rgb(120,100,140)), k.fixed()]);
      }
    }

    const backBtn = k.add([k.rect(140,40,{radius:10}), k.pos(VW/2-70, VH-55), k.color(k.rgb(...style.accent)), k.area(), k.fixed()]);
    k.add([k.text("← Back to Room",{size:13}), k.pos(VW/2, VH-35), k.anchor("center"), k.color(k.rgb(...style.panelBg)), k.fixed()]);
    backBtn.onClick(() => k.go("room"));
  });

  k.go("room");

  return () => { k.quit(); };
}
