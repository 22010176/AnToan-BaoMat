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

  console.log(key)
  const p1 = MappingBit(key, PermutedChoice1);
  console.table(p1.split(''))

  // let [c, d] = BinaryData.DivideIntoBlocks(p1, 28)

  // const result = []
  // for (let i = 0; i < 16; ++i) {
  //   [c, d] = [c, d].map(i => BinaryData.CircularShiftLeft(i, KeyShifts[i]))
  //   // console.log(c, d)
  //   result.push(MappingBit(c + d, PermutedChoice2))
  // }
  // return result;
}






function EnscriptBlock(data = '', key = '') {
  CheckBinaryString(data);
  CheckBinaryString(key);
  CheckLength(data, 64)
  CheckLength(key, 64)

  const ip = MappingBit(data, _IP)
  const keys = GenerateKey(key)



}

module.exports = {
  MappingBit, CheckLength, GenerateKey
}