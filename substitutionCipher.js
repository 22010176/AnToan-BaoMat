const encriptTable = [
  'abcdefghijklmnopqrstuvwxyz',
  'XNYAHPOGZQWBTSFLRCVMUEKJDI'
]

function encription(m = '', table = []) {
  let result = ''
  m.split('').forEach(i => {
    if (i === ' ') return result += ' '
    result += table[1][table[0].indexOf(i)]
  })
  return result;
}

const en = encription('i love you', encriptTable)
const de = encription(en, encriptTable.reverse())

console.log(en, de)