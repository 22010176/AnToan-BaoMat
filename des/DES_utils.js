const { Expansion, FP, IP, PBox, PC1, PC2, _SBox, _Shifts } = require('./constants')
const { circularShiftLeft, devideIntoBlocks, Xor } = require('./utils')
const { Converter, Mapper, _32BinaryData, _48BinaryData, _56BinaryData, _64BinaryData, _28BinaryData } = require('./types')

function generateKeys(key = new _64BinaryData()) {
  const keys = []

  const _pc1 = new _56BinaryData(PC1.map(key.data))
  let [C, D] = devideIntoBlocks(_pc1.data, 28).map(block => new _28BinaryData(block))

  for (let i = 0; i < 16; i++) {
    C.data = circularShiftLeft(C.data, _Shifts[i])
    D.data = circularShiftLeft(D.data, _Shifts[i])

    keys.push(new _48BinaryData(PC2.map(C.data + D.data)))
  }

  return keys
}

function F(r = new _32BinaryData(), key = new _48BinaryData()) {
  const expanded = new _48BinaryData(Expansion.map(r.data))
  const xor = Xor(expanded.data, key.data)
  const sBoxes = devideIntoBlocks(xor, 6)
    .map((block, j) => _SBox[j][parseInt(block[0] + block[5], 2)][parseInt(block.slice(1, 5), 2)]
      .toString(2)
      .padStart(4, '0'))
    .join('')

  return new _32BinaryData(PBox.map(sBoxes))
}

function enscriptionBlock(block = new _64BinaryData(), keys = []) {
  if (keys.length !== 16) throw new Error(`enscriptionBlock: keys must be 16. Got ${block.length}`)

  const _ip = IP.map(block.data)
  const [L0, R0] = devideIntoBlocks(_ip, 32).map(block => new _32BinaryData(block))

  let [L, R] = [L0, R0]
  for (let i = 0; i < 16; i++) {
    const temp = L
    L.data = R.data;
    R.data = Xor(temp.data, F(R, keys[i]).data);
  }

  return new _64BinaryData(FP.map(R.data + L.data))
}



module.exports = { enscriptionBlock, generateKeys }