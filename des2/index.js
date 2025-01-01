const { GenerateKey, EnscriptBlock } = require('./utils')
const { BinaryData } = require('./types')
const { generateRandomBinaryString, generateSuffleArray } = require('./testing')

const key = '13345799BBCDDFF1'

const message = '0123456789ABCDEF'

const binaryKey = BinaryData.HexToBinary(key)
const binaryMessage = BinaryData.HexToBinary(message)


const keys = GenerateKey(binaryKey)
console.log(keys)
// const ens = EnscriptBlock(binaryMessage, keys)
// const k2 = GenerateKey(key)
// k2.reverse()
// console.log(k2.every((i, j) => i === keys[16 - 1 - j]))
// const des = EnscriptBlock(ens, k2)
// console.log({ ens: BinaryData.BinaryToHex(ens), des: BinaryData.BinaryToHex(des) })