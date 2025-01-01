const {
  ExpansionTable, FinalPermutation, InitialPermutation, KeyShifts, PermutationTable, PermutedChoice1, PermutedChoice2, SBoxes
} = require('./constants')
const { BinaryData } = require('./types')


function CheckBinaryString(input) {
  if (typeof input != 'string')
    throw new Error('CheckBinaryString: data must be binary string.')

  if (input.split('').filter(i => '10'.includes(i)).length < input.length)
    throw new Error('CheckBinaryString: data must be binary')
}

function CheckLength(data = '', len = 0) {
  if (len == 0) return;
  if (data.length != len) throw new Error(`CheckLength: data must be ${len}, got ${data.length}`)
}

function MappingBit(data = '', table = []) { // Tested
  // CheckBinaryString(data);
  return table.map(i => data[i - 1]).join('')
}

function GenerateKey(key = '') {
  CheckBinaryString(key)
  CheckLength(key, 64)

  const p1 = MappingBit(key, PermutedChoice1);

  let [c, d] = BinaryData.DivideIntoBlocks(p1, 28)

  const result = []
  for (let i = 0; i < 16; ++i) {
    [c, d] = [c, d].map(i => BinaryData.CircularShiftLeft(i, KeyShifts[i]))
    result.push(MappingBit(c + d, PermutedChoice2))
  }
  return result;
}

function FBlock(data, key) {
  const exp = MappingBit(data, ExpansionTable)
  const xor = BinaryData.Xor(exp, key);

  const x = BinaryData.DivideIntoBlocks(xor, 6)
    .map((i, j) => SBoxes[j][parseInt(i[0] + i[5], 2)][parseInt(i.slice(1, 5), 2)].toString(2).padStart(4, 0));
  // console.log(x.length)
  return MappingBit(x, PermutationTable)
}

function EnscriptBlock(data = '', keys = []) {
  const ip = MappingBit(data, InitialPermutation)

  let [r, l] = BinaryData.DivideIntoBlocks(ip, 32)
  for (let i = 0; i < 16; ++i) {
    let temp = r;
    r = BinaryData.Xor(FBlock(r, keys[i]), l)
    l = temp;
  }

  return MappingBit(r + l, FinalPermutation)
}



module.exports = {
  MappingBit, CheckLength, GenerateKey, EnscriptBlock
}