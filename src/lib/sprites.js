// Pixel-art sprites as text grids. '.' is transparent; letters map to PAL.
export const PAL = {
  o: '#0b0f2a', // outline
  W: '#e8ecff', // suit white
  S: '#aab4e8', // suit shade
  V: '#1b2a6b', // visor
  C: '#3df2e0', // visor glint / window
  P: '#03a89e', // chest panel
  R: '#ff4fa3', // pink accent
  y: '#ffd23f', // yellow
  f: '#ff8a3d', // orange flame
};

const mirror = (rows) => rows.map((r) => r + [...r].reverse().join(''));

export const astronaut = mirror([
  '....oooo',
  '..ooWWWW',
  '.oWWWWWW',
  '.oWVVVVV',
  '.oWVCCVV',
  '.oWVVVVV',
  '.oWWVVVV',
  '..ooWWWW',
  '...ooWWW',
  '.ooWWWWW',
  'oWWWWWPP',
  'oWSWWWPP',
  'oSSWWWWW',
  '.oSWWWWW',
  '..oWWoo.',
  '..oooo..',
]);

export const rocket = [
  '...oo...',
  '..oRRo..',
  '..oRRo..',
  '.oWWWWo.',
  '.oWCCWo.',
  '.oWCCWo.',
  '.oWWWWo.',
  '.oWSSWo.',
  'oRoWWoRo',
  'oRooooRo',
  'oo.yy.oo',
];

export const flameA = ['..yyyy..', '..yffy..', '...ff...', '...ff...'];
export const flameB = ['..yyyy..', '...yy...', '...ff...'];

export const ufo = [
  '.....oooo.....',
  '...ooCCCCoo...',
  '..oCCWWCCCCo..',
  '.oooooooooooo.',
  'oSSSSSSSSSSSSo',
  'oSyySSyySSyySo',
  '.oooooooooooo.',
  '..o..o..o..o..',
];
