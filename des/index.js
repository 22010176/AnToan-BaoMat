// const aph = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');

function dataToBinary(data = '') {
  const temp = data.split('').map(i => i.charCodeAt(0).toString(2).padStart(8, 0).split('').map(i => parseInt(i))).flat();
  // console.log(temp);
  return temp;
}

const PC_2 = [
  14, 17, 11, 24, 1, 5, 3, 28,
  15, 6, 21, 10, 23, 19, 12, 4,
  26, 8, 16, 7, 27, 20, 13, 2,
  41, 52, 31, 37, 47, 55, 30, 40,
  51, 45, 33, 48, 44, 49, 39, 56,
  34, 53, 46, 42, 50, 36, 29, 32
]
function PC2Key(data = []) {
  if (data.length != 56) throw new Error('Key must be 56 bit');
  return PC_2.map(i => data[i - 1]);
}

function LeftCircularShift(key = [], times = 1) {
  return key.slice(times).concat(key.slice(0, times));
}

const PC_1 = [
  57, 49, 41, 33, 25, 17, 9, 1,
  58, 50, 42, 34, 26, 18, 10, 2,
  59, 51, 43, 35, 27, 19, 11, 3,
  60, 52, 44, 36, 63, 55, 47, 39,
  31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37,
  29, 21, 13, 5, 28, 20, 12, 4
]
function PC1Key(key = []) {
  if (key.length != 64) throw new Error('Key must be 64 bit');
  return PC_1.map(i => key[i - 1]);
}

const shiftTable = [
  1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
]
function genSubKey(Key = '') {
  const data = dataToBinary(Key);

  let [C, D] = [data.slice(0, 28), data.slice(28, 56)];

  const result = []
  for (let i = 0; i < 16; ++i) {
    C = LeftCircularShift(C, shiftTable[i]);
    D = LeftCircularShift(D, shiftTable[i]);
    result.push(PC2Key(C.concat(D)));
  }
  return result;
}

const IP = [
  58, 50, 42, 34, 26, 18, 10, 2,
  60, 52, 44, 36, 28, 20, 12, 4,
  62, 54, 46, 38, 30, 22, 14, 6,
  64, 56, 48, 40, 32, 24, 16, 8,
  57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3,
  61, 53, 45, 37, 29, 21, 13, 5,
  63, 55, 47, 39, 31, 23, 15, 7
]
function InitialPermutation(data = []) {
  if (data.length != 64) throw new Error('Data must be 64 bit');
  return IP.map(i => data[i - 1]);
}

const E_ = [
  32, 1, 2, 3, 4, 5, 4, 5,
  6, 7, 8, 9, 8, 9, 10, 11,
  12, 13, 12, 13, 14, 15, 16, 17,
  16, 17, 18, 19, 20, 21, 20, 21,
  22, 23, 24, 25, 24, 25, 26, 27,
  28, 29, 28, 29, 30, 31, 32, 1
]
function E(data = []) {
  if (data.length != 32) throw new Error('Data must be 32 bit');
  return E_.map(i => data[i - 1]);
}

const S_ = [
  [ // 1
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ],
  [ // 2
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
  ],
  [ // 3
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
  ],
  [ // 4
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
  ],
  [ // 5
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
  ],
  [ // 6
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
  ],
  [ // 7
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
  ],
  [ // 8
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
  ]
]
function S(data, i) {

  // return S_[i].map((i, j) => i[data.slice(j * 6, j * 6 + 6)]);
}

const P = [
  16, 7, 20, 21, 29, 12, 28, 17,
  1, 15, 23, 26, 5, 18, 31, 10,
  2, 8, 24, 14, 32, 27, 3, 9,
  19, 13, 30, 6, 22, 11, 4, 25
]
function PBox(data = []) {
  if (data.length != 32) throw new Error('Data must be 32 bit');
  return P.map(i => data[i - 1]);
}

function RoundEnscript(L = [], R = [], Key = []) {

  const temp = R;
  const expand = E(R).map((i, j) => i ^ Key[j]);
  // const SBox = S_().map((i, j) => i[expand.slice(j * 6, j * 6 + 6)]);

  return [temp, R];
}


function DES(message = [], key = '') {
  const subKey = genSubKey(key);
  const data = InitialPermutation(dataToBinary(message));

  let [L, R] = [data.slice(0, 32), data.slice(32, 64)];



}

function enscript() {

}

module.exports = {
  dataToBinary,
  LeftCircularShift,
  PC1Key,
  genSubKey
}