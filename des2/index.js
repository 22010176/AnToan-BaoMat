const { GenerateKey, EnscriptBlock } = require('./utils')
const { BinaryData } = require('./types')
const { generateRandomBinaryString, generateSuffleArray } = require('./testing')

const key = '13345799BBCDDFFA'

const message = '13345799BBCDDFFA'

const binaryKey = BinaryData.HexToBinary(key)
console.log(binaryKey.length)
const binaryMessage = BinaryData.HexToBinary(message)


const keys = GenerateKey(binaryKey)
BinaryData.DebugHex(key)
keys.map(i => BinaryData.DebugHex(BinaryData.BinaryToHex(i)))


// console.log(binaryKey)
// console.log(keys)
const ens = EnscriptBlock(binaryMessage, keys)
const k2 = GenerateKey(binaryKey)
k2.reverse()
// console.log(k2.every((i, j) => i === keys[16 - 1 - j]))
const des = EnscriptBlock(ens, k2)
console.log({ ens: BinaryData.BinaryToHex(ens), des: BinaryData.BinaryToHex(des) })