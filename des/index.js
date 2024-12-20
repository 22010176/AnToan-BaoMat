const { devideIntoBlocks, defaultConverter } = require('./utils');
const { generateKeys, enscriptionBlock } = require('./DES_utils');
const { _64BinaryData, Converter } = require('./types');

const hexConverter = new Converter(
  char => {
    return char
      .split('')
      .map(c => {
        switch (c.toLowerCase()) {
          case '0': return '0000'
          case '1': return '0001'
          case '2': return '0010'
          case '3': return '0011'
          case '4': return '0100'
          case '5': return '0101'
          case '6': return '0110'
          case '7': return '0111'
          case '8': return '1000'
          case '9': return '1001'
          case 'a': return '1010'
          case 'b': return '1011'
          case 'c': return '1100'
          case 'd': return '1101'
          case 'e': return '1110'
          case 'f': return '1111'
          default: return ''
        }
      }).join('')

  },
  hex => {
    return devideIntoBlocks(hex, 4).map(h => {
      switch (h) {
        case '0000': return '0'
        case '0001': return '1'
        case '0010': return '2'
        case '0011': return '3'
        case '0100': return '4'
        case '0101': return '5'
        case '0110': return '6'
        case '0111': return '7'
        case '1000': return '8'
        case '1001': return '9'
        case '1010': return 'a'
        case '1011': return 'b'
        case '1100': return 'c'
        case '1101': return 'd'
        case '1110': return 'e'
        case '1111': return 'f'
        default: return ''
      }
    }).join('')
  }
)

function enscript(message = '', key = '', converter = defaultConverter) {
  const binaryMessage = devideIntoBlocks(converter.toBinary(message), 64).map(block => new _64BinaryData(block.padEnd(64, '0')))
  const binaryKey = new _64BinaryData(converter.toBinary(key).padEnd(64, '0'))

  const keys = generateKeys(binaryKey)

  return converter.toChar(binaryMessage.map(block => enscriptionBlock(block, keys).data).join(''))
}


function descript() {

}


// const key = "133457799BBCDFF1"
// const m = "0123456789ABCDEF"
// const temp = enscript(m, key, hexConverter)
// const d = enscript(temp, key, hexConverter)
// console.log(m, d)

// Define DES key and plaintext
const k = "012333ef";
const m = "Hello, world!";


const temp = enscript(m, k, defaultConverter)

console.log(temp)
// // Perform DES encryption
// const des = new DES(key);
// const ciphertext = des.encrypt(plaintext);

// // Perform DES decryption
// const decrypted = des.decrypt(ciphertext);

