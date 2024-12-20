const aph = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');

const PC1 = [
  57, 49, 41, 33, 25, 17, 9, 1,
  58, 50, 42, 34, 26, 18, 10, 2,
  59, 51, 43, 35, 27, 19, 11, 3,
  60, 52, 44, 36, 28, 20, 12, 4,
  61, 53, 45, 37, 29, 21, 13, 5,
  62, 54, 46, 38, 30, 22, 14, 6,
  63, 55, 47, 39, 31, 23, 15, 7,
  64, 56, 48, 40, 32, 24, 16, 8,
]

function dataToBinary(data = '') {
  return data.split('').map(i => aph.indexOf(i))
}

function testing(data = []) {
  return data.map(i => i.toString(2).padStart(8, '0')).join('');
}

function LS(data = [], times = 1) {
  return data.map((i, j) => ((i << times) & 0xfc) | (data[(j + 1) % data.length] >> (8 - times)) % 256)
}

function genSubKey(key = []) {

}

function IP(M) {

}

function F() {

}

function RoundEnscript(M, K) {

}


function des(message = [], key = []) {
  console.log(message)
}


function enscript(message = '', key = '') {
  console.log(new BigUint64Array(dataToBinary(message)))

  const keyB = dataToBinary(key)
  return dataToBinary(message).reduce((acc, i, j) => {
    j % 64 === 0
      ? acc.push([i, ...new Array(63).fill(-1)])
      : acc[Math.floor(j / 64)][j % 64] = i
    return acc
  }, []).map(i => des(i, keyB)).join('')
}

// enscript('testddddddddddddaaxxxxxxxxxxxxxxxx       iiiiiiiitestddddddddddddaaxxxxxxxxxxxxxxxx       iiiiiiiitestddddddddddddaaxxxxxxxxxxxxxxxx       iiiiiiiitestddddddddddddaaxxxxxxxxxxxxxxxx       iiiiiiii')

function descript(message = '') {

}

const test = dataToBinary('333d3d')

const result = LS(test, 3)

console.log(testing(test), testing(result))



// console.log(new BigUint64Array('testtddddddddddddddddddddddddddddddddddddddfasdftesttddddddddddddddddddddddddddddddddddddddfasdftesttddddddddddddddddddddddddddddddddddddddfasdf'))