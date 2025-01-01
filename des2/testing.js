const { MappingBit, CheckLength, GenerateKey } = require('./utils')


function generateSuffleArray(length) {
  const a = new Array(length).fill().map((_, j) => j + 1)
  return new Array(length).fill().map(() => a.splice(Math.floor(Math.random() * a.length), 1)).flat()
}

function generateRandomBinaryString(length) {
  if (length < 0) return []
  return new Array(length).fill().map(i => Math.floor(Math.random() * 2)).join('')
}

function TestCheckLength() {
  let len = Math.floor(Math.random() * 100);
  let a = generateRandomBinaryString(len)
  let b = generateRandomBinaryString(Math.abs(len - 2))

  CheckLength(a, len);
  try {
    CheckLength(b, len);
  } catch (e) {
    console.log("Good")
    return
  }
  console.log("Fuck b");
}

function TestGenerateKey() {
  const a = generateRandomBinaryString(64)
  const keys = GenerateKey(a)
  console.table(a.split(''))
  // console.table(keys)
}


function TestMappingBinary() {
  const table = generateSuffleArray(10)
  const binary = generateRandomBinaryString(10);
  const result = MappingBit(binary, table)
  console.log({ table, binary, result })
}

// const data = '1234567890'
// const shift = 2;
// console.log(data.slice(shift) + data.slice(0, shift))

module.exports = {
  generateSuffleArray, generateRandomBinaryString
}