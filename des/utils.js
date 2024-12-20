const { Converter } = require('./types')

const defaultConverter = new Converter(
  char => char.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(''),
  binary => devideIntoBlocks(binary, 8)
    .map(b => String.fromCharCode(parseInt(b, 2)))
    .join('')
)


function circularShiftLeft(arr, shift) {
  return arr.slice(shift).concat(arr.slice(0, shift))
}

function circularShiftRight(arr, shift) {
  return arr.slice(-shift).concat(arr.slice(0, -shift))
}

function Xor(a = '', b = '') {
  if (a.length !== b.length) throw new Error('Xor: a and b must have the same length')
  return a.split('').map((char, index) => char === b[index] ? '0' : '1').join('')
}

function devideIntoBlocks(data, blockSize) {
  const blocks = []
  for (let i = 0; i < data.length; i += blockSize) {
    blocks.push(data.slice(i, i + blockSize))
  }
  return blocks
}

module.exports = {
  circularShiftLeft,
  circularShiftRight,
  Xor,
  devideIntoBlocks,
  defaultConverter
}