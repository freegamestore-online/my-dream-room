import kaplay from "kaplay";
type K = ReturnType<typeof kaplay>;

const VW = 480;
const VH = 640;

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  wall:    [255, 236, 245] as [number,number,number],
  floor:   [255, 213, 180] as [number,number,number],
  floorDk: [235, 190, 155] as [number,number,number],
  skirting:[220, 170, 130] as [number,number,number],
  white:   [255, 255, 255] as [number,number,number],
  pink:    [255, 150, 190] as [number,number,number],
  lpink:   [255, 200, 225] as [number,number,number],
  purple:  [180, 130, 220] as [number,number,number],
  lpurple: [220, 190, 255] as [number,number,number],
  yellow:  [255, 220,  80] as [number,number,number],
  lyellow: [255, 245, 180] as [number,number,number],
  mint:    [130, 220, 180] as [number,number,number],
  lmint:   [190, 245, 220] as [number,number,number],
  sky:     [130, 190, 255] as [number,number,number],
  lsky:    [200, 225, 255] as [number,number,number],
  brown:   [160, 100,  60] as [number,number,number],
  lbrown:  [210, 160, 110] as [number,number,number],
  dark:    [ 60,  40,  80] as [number,number,number],
  gold:    [255, 200,  50] as [number,number,number],
  lgold:   [255, 235, 150] as [number,number,number],
  red:     [255,  90,  90] as [number,number,number],
  green:   [ 80, 200, 120] as [number,number,number],
  lgreen:  [160, 230, 180] as [number,number,number],
  gray:    [180, 180, 190] as [number,number,number],
  lgray:   [230, 230, 235] as [number,number,number],
  orange:  [255, 160,  60] as [number,number,number],
  lorange: [255, 210, 150] as [number,number,number],
  teal:    [ 60, 190, 190] as [number,number,number],
  coral:   [255, 120, 100] as [number,number,number],
};

// ─── Furniture catalogue ────────────────────────────────────────────────────
interface FurnitureDef {
  id: string;
  label: string;
  cost: number;
  emoji: string;
  w: number;
  h: number;
  draw: (k: K, x: number, y: number) => void;
}

function drawBed(k: K, x: number, y: number) {
  // Frame
  k.drawRect({ pos: k.vec2(x, y), width: 130, height: 80, color: k.rgb(...C.brown), radius: 4 });
  // Mattress
  k.drawRect({ pos: k.vec2(x+5, y+12), width: 120, height: 63, color: k.rgb(...C.lpink), radius: 3 });
  // Pillow
  k.drawRect({ pos: k.vec2(x+8, y+15), width: 45, height: 28, color: k.rgb(...C.white), radius: 6 });
  k.drawRect({ pos: k.vec2(x+58, y+15), width: 45, height: 28, color: k.rgb(...C.lpurple), radius: 6 });
  // Blanket
  k.drawRect({ pos: k.vec2(x+5, y+42), width: 120, height: 30, color: k.rgb(...C.purple), radius: 3 });
  // Blanket stripes
  for (let i = 0; i < 4; i++) {
    k.drawRect({ pos: k.vec2(x+15+i*25, y+44), width: 12, height: 26, color: k.rgb(...C.lpurple), radius: 2 });
  }
  // Headboard
  k.drawRect({ pos: k.vec2(x, y-18), width: 130, height: 22, color: k.rgb(...C.lbrown), radius: 4 });
  // Heart on headboard
  k.drawCircle({ pos: k.vec2(x+57, y-10), radius: 5, color: k.rgb(...C.pink) });
  k.drawCircle({ pos: k.vec2(x+67, y-10), radius: 5, color: k.rgb(...C.pink) });
  k.drawRect({ pos: k.vec2(x+55, y-8), width: 20, height: 10, color: k.rgb(...C.pink) });
}

function drawDesk(k: K, x: number, y: number) {
  // Legs
  k.drawRect({ pos: k.vec2(x+5, y+20), width: 10, height: 40, color: k.rgb(...C.brown) });
  k.drawRect({ pos: k.vec2(x+85, y+20), width: 10, height: 40, color: k.rgb(...C.brown) });
  // Surface
  k.drawRect({ pos: k.vec2(x, y+15), width: 100, height: 12, color: k.rgb(...C.lbrown), radius: 3 });
  // Monitor
  k.drawRect({ pos: k.vec2(x+30, y-25), width: 40, height: 30, color: k.rgb(...C.dark), radius: 4 });
  k.drawRect({ pos: k.vec2(x+33, y-22), width: 34, height: 22, color: k.rgb(...C.sky), radius: 2 });
  k.drawRect({ pos: k.vec2(x+46, y+14), width: 8, height: 4, color: k.rgb(...C.gray) });
  // Pencil cup
  k.drawRect({ pos: k.vec2(x+6, y+3), width: 14, height: 14, color: k.rgb(...C.lpink), radius: 2 });
  k.drawRect({ pos: k.vec2(x+9, y-2), width: 3, height: 8, color: k.rgb(...C.yellow) });
  k.drawRect({ pos: k.vec2(x+14, y-4), width: 3, height: 10, color: k.rgb(...C.pink) });
}

function drawBookshelf(k: K, x: number, y: number) {
  // Back panel
  k.drawRect({ pos: k.vec2(x, y), width: 80, height: 100, color: k.rgb(...C.lbrown), radius: 3 });
  // Shelves
  k.drawRect({ pos: k.vec2(x, y+30), width: 80, height: 6, color: k.rgb(...C.brown) });
  k.drawRect({ pos: k.vec2(x, y+62), width: 80, height: 6, color: k.rgb(...C.brown) });
  k.drawRect({ pos: k.vec2(x, y+94), width: 80, height: 6, color: k.rgb(...C.brown) });
  // Books row 1
  const booksRow1 = [C.pink, C.purple, C.sky, C.mint, C.yellow, C.coral];
  for (let i = 0; i < booksRow1.length; i++) {
    const col = booksRow1[i] ?? C.pink;
    k.drawRect({ pos: k.vec2(x+4+i*12, y+6), width: 10, height: 24, color: k.rgb(...col), radius: 1 });
  }
  // Books row 2
  const booksRow2 = [C.orange, C.teal, C.red, C.lpurple, C.lyellow];
  for (let i = 0; i < booksRow2.length; i++) {
    const col = booksRow2[i] ?? C.orange;
    k.drawRect({ pos: k.vec2(x+4+i*14, y+38), width: 11, height: 22, color: k.rgb(...col), radius: 1 });
  }
  // Plant on top
  k.drawRect({ pos: k.vec2(x+28, y-16), width: 24, height: 18, color: k.rgb(...C.lorange), radius: 3 });
  k.drawCircle({ pos: k.vec2(x+40, y-22), radius: 12, color: k.rgb(...C.green) });
  k.drawCircle({ pos: k.vec2(x+32, y-26), radius: 8, color: k.rgb(...C.mint) });
  k.drawCircle({ pos: k.vec2(x+48, y-26), radius: 8, color: k.rgb(...C.lgreen) });
}

function drawLamp(k: K, x: number, y: number) {
  // Base
  k.drawRect({ pos: k.vec2(x+12, y+52), width: 26, height: 8, color: k.rgb(...C.gray), radius: 3 });
  // Pole
  k.drawRect({ pos: k.vec2(x+22, y+10), width: 6, height: 44, color: k.rgb(...C.lgray) });
  // Shade
  k.drawRect({ pos: k.vec2(x+4, y), width: 42, height: 16, color: k.rgb(...C.yellow), radius: 4 });
  k.drawRect({ pos: k.vec2(x+8, y+3), width: 34, height: 10, color: k.rgb(...C.lyellow), radius: 3 });
  // Glow dot
  k.drawCircle({ pos: k.vec2(x+25, y+8), radius: 5, color: k.rgb(255, 255, 200) });
}

function drawPlant(k: K, x: number, y: number) {
  // Pot
  k.drawRect({ pos: k.vec2(x+8, y+36), width: 34, height: 24, color: k.rgb(...C.coral), radius: 4 });
  k.drawRect({ pos: k.vec2(x+4, y+32), width: 42, height: 8, color: k.rgb(...C.orange), radius: 3 });
  // Soil
  k.drawRect({ pos: k.vec2(x+10, y+34), width: 30, height: 6, color: k.rgb(...C.brown), radius: 2 });
  // Stem
  k.drawRect({ pos: k.vec2(x+23, y+10), width: 4, height: 26, color: k.rgb(...C.green) });
  // Leaves
  k.drawCircle({ pos: k.vec2(x+25, y+10), radius: 14, color: k.rgb(...C.mint) });
  k.drawCircle({ pos: k.vec2(x+14, y+18), radius: 10, color: k.rgb(...C.green) });
  k.drawCircle({ pos: k.vec2(x+36, y+18), radius: 10, color: k.rgb(...C.lgreen) });
  // Flower
  k.drawCircle({ pos: k.vec2(x+25, y+4), radius: 6, color: k.rgb(...C.pink) });
  k.drawCircle({ pos: k.vec2(x+25, y+4), radius: 3, color: k.rgb(...C.yellow) });
}

function drawRug(k: K, x: number, y: number) {
  k.drawRect({ pos: k.vec2(x, y), width: 110, height: 60, color: k.rgb(...C.purple), radius: 8 });
  k.drawRect({ pos: k.vec2(x+6, y+6), width: 98, height: 48, color: k.rgb(...C.lpurple), radius: 6 });
  // Pattern diamonds
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const cx = x + 24 + col * 32;
      const cy = y + 18 + row * 26;
      k.drawRect({ pos: k.vec2(cx-8, cy-4), width: 16, height: 8, color: k.rgb(...C.pink), radius: 2 });
      k.drawRect({ pos: k.vec2(cx-4, cy-8), width: 8, height: 16, color: k.rgb(...C.pink), radius: 2 });
    }
  }
}

function drawMirror(k: K, x: number, y: number) {
  // Frame
  k.drawRect({ pos: k.vec2(x, y), width: 60, height: 80, color: k.rgb(...C.gold), radius: 8 });
  // Glass
  k.drawRect({ pos: k.vec2(x+6, y+6), width: 48, height: 62, color: k.rgb(...C.lsky), radius: 5 });
  // Reflection shimmer
  k.drawRect({ pos: k.vec2(x+12, y+12), width: 10, height: 40, color: k.rgb(255,255,255), radius: 3 });
  // Stand
  k.drawRect({ pos: k.vec2(x+20, y+78), width: 20, height: 8, color: k.rgb(...C.lbrown), radius: 3 });
  // Stars on frame
  k.drawCircle({ pos: k.vec2(x+8, y+8), radius: 3, color: k.rgb(...C.lyellow) });
  k.drawCircle({ pos: k.vec2(x+52, y+8), radius: 3, color: k.rgb(...C.lyellow) });
  k.drawCircle({ pos: k.vec2(x+8, y+72), radius: 3, color: k.rgb(...C.lyellow) });
  k.drawCircle({ pos: k.vec2(x+52, y+72), radius: 3, color: k.rgb(...C.lyellow) });
}

function drawPoster(k: K, x: number, y: number) {
  // Frame
  k.drawRect({ pos: k.vec2(x, y), width: 60, height: 70, color: k.rgb(...C.pink), radius: 4 });
  // Paper
  k.drawRect({ pos: k.vec2(x+4, y+4), width: 52, height: 62, color: k.rgb(...C.lyellow), radius: 2 });
  // Moon
  k.drawCircle({ pos: k.vec2(x+30, y+22), radius: 14, color: k.rgb(...C.yellow) });
  k.drawCircle({ pos: k.vec2(x+36, y+18), radius: 11, color: k.rgb(...C.lyellow) });
  // Stars
  for (let i = 0; i < 5; i++) {
    k.drawCircle({ pos: k.vec2(x+8+i*10, y+44), radius: 2, color: k.rgb(...C.gold) });
  }
  // Text line
  k.drawRect({ pos: k.vec2(x+10, y+54), width: 40, height: 4, color: k.rgb(...C.pink), radius: 2 });
  k.drawRect({ pos: k.vec2(x+15, y+60), width: 30, height: 3, color: k.rgb(...C.lpink), radius: 1 });
}

function drawFairyLights(k: K, x: number, y: number) {
  // String
  for (let i = 0; i < 8; i++) {
    const lx = x + i * 15;
    const ly = y + Math.sin(i * 0.8) * 6;
    k.drawRect({ pos: k.vec2(lx, ly+3), width: 15, height: 2, color: k.rgb(...C.lgray) });
    // Bulb
    k.drawCircle({ pos: k.vec2(lx+6, ly+10), radius: 5,
      color: k.rgb(...([C.yellow, C.pink, C.mint, C.sky, C.lpurple, C.orange, C.coral, C.lmint][i % 8] ?? C.yellow)) });
    k.drawCircle({ pos: k.vec2(lx+6, ly+10), radius: 2, color: k.rgb(255, 255, 255) });
  }
}

function drawTeddyBear(k: K, x: number, y: number) {
  // Body
  k.drawCircle({ pos: k.vec2(x+22, y+36), radius: 18, color: k.rgb(...C.lorange) });
  // Head
  k.drawCircle({ pos: k.vec2(x+22, y+14), radius: 14, color: k.rgb(...C.lorange) });
  // Ears
  k.drawCircle({ pos: k.vec2(x+10, y+4), radius: 7, color: k.rgb(...C.lorange) });
  k.drawCircle({ pos: k.vec2(x+10, y+4), radius: 4, color: k.rgb(...C.lpink) });
  k.drawCircle({ pos: k.vec2(x+34, y+4), radius: 7, color: k.rgb(...C.lorange) });
  k.drawCircle({ pos: k.vec2(x+34, y+4), radius: 4, color: k.rgb(...C.lpink) });
  // Face
  k.drawCircle({ pos: k.vec2(x+16, y+12), radius: 3, color: k.rgb(...C.dark) });
  k.drawCircle({ pos: k.vec2(x+28, y+12), radius: 3, color: k.rgb(...C.dark) });
  k.drawCircle({ pos: k.vec2(x+22, y+18), radius: 5, color: k.rgb(...C.lpink) });
  k.drawCircle({ pos: k.vec2(x+22, y+18), radius: 2, color: k.rgb(...C.dark) });
  // Arms
  k.drawCircle({ pos: k.vec2(x+4, y+34), radius: 8, color: k.rgb(...C.lorange) });
  k.drawCircle({ pos: k.vec2(x+40, y+34), radius: 8, color: k.rgb(...C.lorange) });
  // Belly
  k.drawCircle({ pos: k.vec2(x+22, y+38), radius: 10, color: k.rgb(...C.lpink) });
  // Bow
  k.drawRect({ pos: k.vec2(x+16, y+23), width: 12, height: 5, color: k.rgb(...C.pink), radius: 2 });
}

function drawCat(k: K, x: number, y: number) {
  // Body
  k.drawCircle({ pos: k.vec2(x+20, y+34), radius: 16, color: k.rgb(...C.lgray) });
  // Head
  k.drawCircle({ pos: k.vec2(x+20, y+14), radius: 13, color: k.rgb(...C.lgray) });
  // Ears
  k.drawRect({ pos: k.vec2(x+6, y-2), width: 10, height: 12, color: k.rgb(...C.lgray), radius: 2 });
  k.drawRect({ pos: k.vec2(x+8, y+0), width: 6, height: 8, color: k.rgb(...C.lpink), radius: 1 });
  k.drawRect({ pos: k.vec2(x+24, y-2), width: 10, height: 12, color: k.rgb(...C.lgray), radius: 2 });
  k.drawRect({ pos: k.vec2(x+26, y+0), width: 6, height: 8, color: k.rgb(...C.lpink), radius: 1 });
  // Face
  k.drawCircle({ pos: k.vec2(x+14, y+12), radius: 3, color: k.rgb(...C.dark) });
  k.drawCircle({ pos: k.vec2(x+26, y+12), radius: 3, color: k.rgb(...C.dark) });
  k.drawCircle({ pos: k.vec2(x+20, y+17), radius: 3, color: k.rgb(...C.lpink) });
  // Whiskers
  k.drawRect({ pos: k.vec2(x+2, y+15), width: 12, height: 1, color: k.rgb(...C.gray) });
  k.drawRect({ pos: k.vec2(x+26, y+15), width: 12, height: 1, color: k.rgb(...C.gray) });
  // Tail
  k.drawRect({ pos: k.vec2(x+34, y+30), width: 6, height: 20, color: k.rgb(...C.lgray), radius: 3 });
  k.drawCircle({ pos: k.vec2(x+37, y+50), radius: 5, color: k.rgb(...C.lgray) });
}

function drawClock(k: K, x: number, y: number) {
  k.drawCircle({ pos: k.vec2(x+22, y+22), radius: 22, color: k.rgb(...C.white) });
  k.drawCircle({ pos: k.vec2(x+22, y+22), radius: 20, color: k.rgb(...C.lsky) });
  // Numbers positions
  const nums = [
    [22,4],[36,8],[42,22],[36,36],[22,40],[8,36],[2,22],[8,8]
  ];
  for (const n of nums) {
    k.drawCircle({ pos: k.vec2(x+(n[0]??22), y+(n[1]??22)), radius: 2, color: k.rgb(...C.dark) });
  }
  // Hands
  k.drawRect({ pos: k.vec2(x+21, y+10), width: 2, height: 12, color: k.rgb(...C.dark), radius: 1 });
  k.drawRect({ pos: k.vec2(x+22, y+18), width: 10, height: 2, color: k.rgb(...C.dark), radius: 1 });
  k.drawCircle({ pos: k.vec2(x+22, y+22), radius: 2, color: k.rgb(...C.dark) });
  // Feet
  k.drawRect({ pos: k.vec2(x+8, y+42), width: 8, height: 6, color: k.rgb(...C.lpink), radius: 2 });
  k.drawRect({ pos: k.vec2(x+28, y+42), width: 8, height: 6, color: k.rgb(...C.lpink), radius: 2 });
}

const FURNITURE: FurnitureDef[] = [
  { id:"bed",     label:"🛏 Bed",         cost:0,   emoji:"🛏",  w:130, h:98,  draw: drawBed },
  { id:"desk",    label:"🖥 Desk",         cost:0,   emoji:"🖥",  w:100, h:65,  draw: drawDesk },
  { id:"lamp",    label:"💡 Lamp",         cost:10,  emoji:"💡",  w:50,  h:62,  draw: drawLamp },
  { id:"plant",   label:"🌿 Plant",        cost:10,  emoji:"🌿",  w:50,  h:60,  draw: drawPlant },
  { id:"shelf",   label:"📚 Bookshelf",    cost:20,  emoji:"📚",  w:80,  h:116, draw: drawBookshelf },
  { id:"rug",     label:"🪄 Rug",          cost:15,  emoji:"🪄",  w:110, h:60,  draw: drawRug },
  { id:"mirror",  label:"🪞 Mirror",       cost:25,  emoji:"🪞",  w:60,  h:86,  draw: drawMirror },
  { id:"poster",  label:"🌙 Poster",       cost:20,  emoji:"🌙",  w:60,  h:70,  draw: drawPoster },
  { id:"lights",  label:"✨ Fairy Lights", cost:15,  emoji:"✨",  w:120, h:20,  draw: drawFairyLights },
  { id:"teddy",   label:"🧸 Teddy Bear",   cost:20,  emoji:"🧸",  w:45,  h:60,  draw: drawTeddyBear },
  { id:"cat",     label:"🐱 Cat",          cost:30,  emoji:"🐱",  w:45,  h:60,  draw: drawCat },
  { id:"clock",   label:"🕐 Clock",        cost:15,  emoji:"🕐",  w:44,  h:48,  draw: drawClock },
];

// ─── Challenge definitions ───────────────────────────────────────────────────
interface Challenge {
  id: string;
  label: string;
  desc: string;
  reward: number;
  check: (placed: Set<string>) => boolean;
  done: boolean;
}

// ─── Placed item ─────────────────────────────────────────────────────────────
interface PlacedItem {
  id: string;
  x: number;
  y: number;
}

// ─── Main entry ──────────────────────────────────────────────────────────────
export function startGame(canvas: HTMLCanvasElement, onScore: (n: number) => void): () => void {
  const k = kaplay({
    canvas,
    width: VW,
    height: VH,
    letterbox: true,
    background: [...C.wall] as [number, number, number],
    global: false,
    pixelDensity: Math.min(window.devicePixelRatio || 1, 2),
  });

  // ── Persistent state ──────────────────────────────────────────────────────
  const SAVE_KEY = "roombloom_v1";
  interface SaveData { coins: number; placed: PlacedItem[]; challengesDone: string[] }
  function loadSave(): SaveData {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw) as SaveData;
    } catch { /* ignore */ }
    return { coins: 30, placed: [], challengesDone: [] };
  }
  function writeSave(d: SaveData) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
  }

  const save = loadSave();
  let coins = save.coins;
  const placed: PlacedItem[] = save.placed;
  const challengesDone = new Set<string>(save.challengesDone);

  function persist() {
    writeSave({ coins, placed, challengesDone: [...challengesDone] });
    onScore(coins);
  }

  onScore(coins);

  // ── Challenges ────────────────────────────────────────────────────────────
  const CHALLENGES: Challenge[] = [
    {
      id: "cozy_corner",
      label: "🛏 Cozy Corner",
      desc: "Place a Bed + Lamp",
      reward: 25,
      check: (p) => p.has("bed") && p.has("lamp"),
      done: false,
    },
    {
      id: "study_spot",
      label: "📚 Study Spot",
      desc: "Place a Desk + Bookshelf",
      reward: 30,
      check: (p) => p.has("desk") && p.has("shelf"),
      done: false,
    },
    {
      id: "full_bloom",
      label: "🌸 Full Bloom",
      desc: "Place 6 different items",
      reward: 50,
      check: (p) => p.size >= 6,
      done: false,
    },
  ];
  for (const ch of CHALLENGES) {
    if (challengesDone.has(ch.id)) ch.done = true;
  }

  // ── Scene: main room ──────────────────────────────────────────────────────
  k.scene("room", () => {
    const FLOOR_Y = VH - 130;
    const PANEL_H = 160;
    const ROOM_H = VH - PANEL_H;

    // ── Draw room background ──────────────────────────────────────────────
    k.onDraw(() => {
      // Wall
      k.drawRect({ pos: k.vec2(0, 0), width: VW, height: FLOOR_Y, color: k.rgb(...C.wall) });
      // Wallpaper dots
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
          k.drawCircle({ pos: k.vec2(28 + col * 46, 28 + row * 52), radius: 3, color: k.rgb(255, 200, 220) });
        }
      }
      // Window
      k.drawRect({ pos: k.vec2(VW/2-50, 20), width: 100, height: 80, color: k.rgb(...C.lsky), radius: 6 });
      k.drawRect({ pos: k.vec2(VW/2-46, 24), width: 92, height: 72, color: k.rgb(200, 230, 255), radius: 4 });
      k.drawRect({ pos: k.vec2(VW/2-2, 24), width: 4, height: 72, color: k.rgb(...C.white) });
      k.drawRect({ pos: k.vec2(VW/2-46, 58), width: 92, height: 4, color: k.rgb(...C.white) });
      // Window sill
      k.drawRect({ pos: k.vec2(VW/2-54, 100), width: 108, height: 8, color: k.rgb(...C.white), radius: 2 });
      // Curtains
      k.drawRect({ pos: k.vec2(VW/2-70, 12), width: 24, height: 90, color: k.rgb(...C.pink), radius: 4 });
      k.drawRect({ pos: k.vec2(VW/2+46, 12), width: 24, height: 90, color: k.rgb(...C.pink), radius: 4 });
      // Curtain rod
      k.drawRect({ pos: k.vec2(VW/2-76, 8), width: 152, height: 6, color: k.rgb(...C.gold), radius: 3 });

      // Floor
      k.drawRect({ pos: k.vec2(0, FLOOR_Y), width: VW, height: VH - FLOOR_Y, color: k.rgb(...C.floor) });
      // Floor planks
      for (let i = 0; i < 6; i++) {
        k.drawRect({ pos: k.vec2(0, FLOOR_Y + i * 22), width: VW, height: 2, color: k.rgb(...C.floorDk) });
      }
      // Skirting board
      k.drawRect({ pos: k.vec2(0, FLOOR_Y), width: VW, height: 8, color: k.rgb(...C.skirting) });

      // Bottom panel bg
      k.drawRect({ pos: k.vec2(0, ROOM_H), width: VW, height: PANEL_H, color: k.rgb(50, 30, 70) });
      k.drawRect({ pos: k.vec2(0, ROOM_H), width: VW, height: 4, color: k.rgb(...C.purple) });

      // Panel header
      k.drawRect({ pos: k.vec2(8, ROOM_H + 8), width: 160, height: 22, color: k.rgb(80, 50, 110), radius: 4 });
    });

    // ── Draw placed furniture ─────────────────────────────────────────────
    k.onDraw(() => {
      for (const item of placed) {
        const def = FURNITURE.find(f => f.id === item.id);
        if (def) def.draw(k, item.x, item.y);
      }
    });

    // ── Coin label ────────────────────────────────────────────────────────
    const coinLabel = k.add([
      k.text(`🌸 ${coins} coins`, { size: 14, font: "sans-serif" }),
      k.pos(14, ROOM_H + 10),
      k.color(...C.lyellow),
      k.fixed(),
    ]);

    // ── Challenges panel ──────────────────────────────────────────────────
    const CHALL_X = 175;
    const challengeObjs: ReturnType<K["add"]>[] = [];

    function refreshChallenges() {
      for (const obj of challengeObjs) k.destroy(obj);
      challengeObjs.length = 0;

      const placedIds = new Set(placed.map(p => p.id));
      for (let i = 0; i < CHALLENGES.length; i++) {
        const ch = CHALLENGES[i]!;
        const cy = ROOM_H + 8 + i * 48;
        const isDone = ch.done;
        const bgColor = isDone ? k.rgb(60, 120, 60) : k.rgb(80, 50, 110);
        const obj = k.add([
          k.rect(290, 40, { radius: 6 }),
          k.pos(CHALL_X, cy),
          k.color(bgColor),
          k.fixed(),
        ]);
        challengeObjs.push(obj);

        const statusIcon = isDone ? "✅" : ch.check(placedIds) ? "🎉" : "⭐";
        const lbl = k.add([
          k.text(`${statusIcon} ${ch.label}  +${ch.reward}🌸`, { size: 11, font: "sans-serif" }),
          k.pos(CHALL_X + 6, cy + 4),
          k.color(...C.white),
          k.fixed(),
        ]);
        challengeObjs.push(lbl);

        const desc = k.add([
          k.text(isDone ? "Completed!" : ch.desc, { size: 9, font: "sans-serif" }),
          k.pos(CHALL_X + 6, cy + 22),
          k.color(isDone ? k.rgb(...C.lmint) : k.rgb(...C.lgray)),
          k.fixed(),
        ]);
        challengeObjs.push(desc);

        // Claim button if completable and not done
        if (!isDone && ch.check(placedIds)) {
          const btn = k.add([
            k.rect(50, 24, { radius: 4 }),
            k.pos(CHALL_X + 234, cy + 8),
            k.color(k.rgb(...C.gold)),
            k.area(),
            k.fixed(),
            "claimBtn",
          ]);
          const btnLbl = k.add([
            k.text("CLAIM", { size: 10, font: "sans-serif" }),
            k.pos(CHALL_X + 250, cy + 16),
            k.anchor("center"),
            k.color(k.rgb(...C.dark)),
            k.fixed(),
          ]);
          challengeObjs.push(btn);
          challengeObjs.push(btnLbl);

          const chId = ch.id;
          btn.onClick(() => {
            ch.done = true;
            challengesDone.add(chId);
            coins += ch.reward;
            onScore(coins);
            coinLabel.text = `🌸 ${coins} coins`;
            persist();
            refreshChallenges();
            showToast(`+${ch.reward} coins! 🎉`);
          });
        }
      }
    }
    refreshChallenges();

    // ── Shop panel: scrollable row of furniture cards ─────────────────────
    const SHOP_Y = ROOM_H + 8;
    const CARD_W = 70;
    const CARD_H = 78;
    const CARD_GAP = 8;
    let shopScroll = 0;
    const MAX_SCROLL = Math.max(0, FURNITURE.length * (CARD_W + CARD_GAP) - VW + 16);

    // We'll render shop in onDraw and handle clicks manually
    let selectedId: string | null = null;
    let dragging = false;
    let dragX = 0;
    let dragY = 0;

    // Shop scroll arrows
    const leftArrow = k.add([
      k.rect(24, CARD_H + 4, { radius: 4 }),
      k.pos(0, SHOP_Y),
      k.color(k.rgb(80, 50, 110)),
      k.area(),
      k.fixed(),
      "shopArrow",
    ]);
    k.add([
      k.text("◀", { size: 14 }),
      k.pos(12, SHOP_Y + CARD_H / 2 + 2),
      k.anchor("center"),
      k.color(...C.white),
      k.fixed(),
    ]);
    leftArrow.onClick(() => { shopScroll = Math.max(0, shopScroll - (CARD_W + CARD_GAP) * 2); });

    const rightArrow = k.add([
      k.rect(24, CARD_H + 4, { radius: 4 }),
      k.pos(VW - 24, SHOP_Y),
      k.color(k.rgb(80, 50, 110)),
      k.area(),
      k.fixed(),
      "shopArrow",
    ]);
    k.add([
      k.text("▶", { size: 14 }),
      k.pos(VW - 12, SHOP_Y + CARD_H / 2 + 2),
      k.anchor("center"),
      k.color(...C.white),
      k.fixed(),
    ]);
    rightArrow.onClick(() => { shopScroll = Math.min(MAX_SCROLL, shopScroll + (CARD_W + CARD_GAP) * 2); });

    // Draw shop cards
    k.onDraw(() => {
      const startX = 28;
      for (let i = 0; i < FURNITURE.length; i++) {
        const def = FURNITURE[i]!;
        const cx = startX + i * (CARD_W + CARD_GAP) - shopScroll;
        if (cx + CARD_W < 28 || cx > VW - 28) continue;

        const unlocked = def.cost === 0 || coins >= def.cost;
        const isSelected = selectedId === def.id;
        const cardColor = isSelected ? k.rgb(...C.gold) : unlocked ? k.rgb(70, 45, 100) : k.rgb(50, 35, 70);

        k.drawRect({ pos: k.vec2(cx, SHOP_Y), width: CARD_W, height: CARD_H, color: cardColor, radius: 6 });
        if (isSelected) {
          k.drawRect({ pos: k.vec2(cx-2, SHOP_Y-2), width: CARD_W+4, height: CARD_H+4, color: k.rgb(...C.gold), radius: 7 });
          k.drawRect({ pos: k.vec2(cx, SHOP_Y), width: CARD_W, height: CARD_H, color: cardColor, radius: 6 });
        }

        // Emoji
        k.drawText({ text: def.emoji, pos: k.vec2(cx + CARD_W/2, SHOP_Y + 22), anchor: "center", size: 22, font: "sans-serif" });

        // Label
        const shortLabel = def.label.replace(/^.+ /, "");
        k.drawText({ text: shortLabel, pos: k.vec2(cx + CARD_W/2, SHOP_Y + 44), anchor: "center", size: 8, font: "sans-serif",
          color: k.rgb(...C.white) });

        // Cost badge
        if (def.cost > 0) {
          const badgeColor = unlocked ? k.rgb(...C.mint) : k.rgb(...C.coral);
          k.drawRect({ pos: k.vec2(cx + 4, SHOP_Y + CARD_H - 20), width: CARD_W - 8, height: 16, color: badgeColor, radius: 3 });
          k.drawText({ text: `🌸${def.cost}`, pos: k.vec2(cx + CARD_W/2, SHOP_Y + CARD_H - 12), anchor: "center",
            size: 9, font: "sans-serif", color: k.rgb(...C.dark) });
        } else {
          k.drawRect({ pos: k.vec2(cx + 4, SHOP_Y + CARD_H - 20), width: CARD_W - 8, height: 16, color: k.rgb(...C.mint), radius: 3 });
          k.drawText({ text: "FREE", pos: k.vec2(cx + CARD_W/2, SHOP_Y + CARD_H - 12), anchor: "center",
            size: 9, font: "sans-serif", color: k.rgb(...C.dark) });
        }

        // Lock overlay
        if (!unlocked) {
          k.drawRect({ pos: k.vec2(cx, SHOP_Y), width: CARD_W, height: CARD_H - 20, color: k.rgb(0, 0, 0), radius: 6, opacity: 0.45 });
          k.drawText({ text: "🔒", pos: k.vec2(cx + CARD_W/2, SHOP_Y + 22), anchor: "center", size: 20, font: "sans-serif" });
        }
      }

      // Drag preview
      if (dragging && selectedId) {
        const def = FURNITURE.find(f => f.id === selectedId);
        if (def) {
          k.drawRect({ pos: k.vec2(dragX - def.w/2 - 2, dragY - def.h/2 - 2),
            width: def.w + 4, height: def.h + 4, color: k.rgb(...C.gold), radius: 4, opacity: 0.6 });
          def.draw(k, dragX - def.w / 2, dragY - def.h / 2);
        }
      }
    });

    // ── Input handling ────────────────────────────────────────────────────
    function shopCardAt(mx: number, my: number): string | null {
      if (my < SHOP_Y || my > SHOP_Y + CARD_H) return null;
      const startX = 28;
      for (let i = 0; i < FURNITURE.length; i++) {
        const def = FURNITURE[i]!;
        const cx = startX + i * (CARD_W + CARD_GAP) - shopScroll;
        if (mx >= cx && mx <= cx + CARD_W) return def.id;
      }
      return null;
    }

    function tryPlace(mx: number, my: number) {
      if (!selectedId) return;
      if (my >= ROOM_H) return; // don't place in panel
      const def = FURNITURE.find(f => f.id === selectedId);
      if (!def) return;

      // Check cost
      if (def.cost > coins) {
        showToast(`Need ${def.cost} 🌸 coins!`);
        return;
      }

      // Snap to floor or wall
      let px = k.clamp(mx - def.w / 2, 0, VW - def.w);
      let py = k.clamp(my - def.h / 2, 10, FLOOR_Y + 10);

      // Deduct cost if first time placing this item
      const alreadyPlaced = placed.some(p => p.id === def.id);
      if (!alreadyPlaced && def.cost > 0) {
        coins -= def.cost;
        onScore(coins);
        coinLabel.text = `🌸 ${coins} coins`;
      }

      // Remove old instance of same item (one per type)
      const idx = placed.findIndex(p => p.id === def.id);
      if (idx !== -1) placed.splice(idx, 1);

      placed.push({ id: def.id, x: px, y: py });
      persist();
      refreshChallenges();
      showToast(`${def.emoji} Placed!`);
      selectedId = null;
      dragging = false;
    }

    k.onMousePress((btn) => {
      if (btn !== "left") return;
      const mp = k.mousePos();

      // Check shop card click
      const cardId = shopCardAt(mp.x, mp.y);
      if (cardId) {
        const def = FURNITURE.find(f => f.id === cardId);
        if (!def) return;
        if (def.cost > 0 && coins < def.cost) {
          showToast(`Need ${def.cost} 🌸 coins!`);
          return;
        }
        selectedId = cardId;
        dragging = false;
        return;
      }

      // If we have a selection and clicked the room area, place it
      if (selectedId && mp.y < ROOM_H) {
        tryPlace(mp.x, mp.y);
        return;
      }
    });

    k.onMouseMove((mp) => {
      if (selectedId && mp.y < ROOM_H) {
        dragging = true;
        dragX = mp.x;
        dragY = mp.y;
      }
    });

    // Touch support
    k.onTouchStart((touch) => {
      const tp = touch.pos;
      const cardId = shopCardAt(tp.x, tp.y);
      if (cardId) {
        const def = FURNITURE.find(f => f.id === cardId);
        if (!def) return;
        if (def.cost > 0 && coins < def.cost) {
          showToast(`Need ${def.cost} 🌸 coins!`);
          return;
        }
        selectedId = cardId;
        dragging = false;
        return;
      }
      if (selectedId && tp.y < ROOM_H) {
        dragging = true;
        dragX = tp.x;
        dragY = tp.y;
      }
    });

    k.onTouchEnd((touch) => {
      const tp = touch.pos;
      if (selectedId && tp.y < ROOM_H) {
        tryPlace(tp.x, tp.y);
      }
      dragging = false;
    });

    // ESC to cancel selection
    k.onKeyPress("escape", () => { selectedId = null; dragging = false; });

    // ── Hint text ─────────────────────────────────────────────────────────
    k.add([
      k.text("Pick an item below, then click the room to place it!", { size: 10, font: "sans-serif", width: VW - 20 }),
      k.pos(VW / 2, ROOM_H - 18),
      k.anchor("center"),
      k.color(...C.gray),
      k.fixed(),
    ]);

    // ── Toast notifications ───────────────────────────────────────────────
    let toastObj: ReturnType<K["add"]> | null = null;
    let toastTimer = 0;

    function showToast(msg: string) {
      if (toastObj) { k.destroy(toastObj); toastObj = null; }
      toastObj = k.add([
        k.rect(220, 34, { radius: 8 }),
        k.pos(VW / 2 - 110, ROOM_H - 55),
        k.color(k.rgb(...C.dark)),
        k.fixed(),
        k.opacity(1),
      ]);
      k.add([
        k.text(msg, { size: 13, font: "sans-serif" }),
        k.pos(VW / 2, ROOM_H - 38),
        k.anchor("center"),
        k.color(...C.white),
        k.fixed(),
      ]);
      toastTimer = 2;
    }

    k.onUpdate(() => {
      if (toastTimer > 0) {
        toastTimer -= k.dt();
        if (toastTimer <= 0 && toastObj) {
          k.destroy(toastObj);
          toastObj = null;
        }
      }
    });

    // ── Daily bonus: +5 coins on first load ───────────────────────────────
    const DAILY_KEY = "roombloom_daily";
    const today = new Date().toDateString();
    if (localStorage.getItem(DAILY_KEY) !== today) {
      localStorage.setItem(DAILY_KEY, today);
      coins += 5;
      onScore(coins);
      coinLabel.text = `🌸 ${coins} coins`;
      persist();
      k.wait(0.5, () => showToast("🌸 Daily bonus: +5 coins!"));
    }
  });

  k.go("room");
  return () => k.quit();
}
