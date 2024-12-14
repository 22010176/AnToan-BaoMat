const aph = 'abcdefghijklmnopqrstuvwxyz'.split('');

function enscript(message = '', a = 0, b = 0) {
  let result = ''
  message.split('').forEach(i => {
    let index = aph.indexOf(i)
    if (index === -1) return result += i;

    result += aph[index * a % aph.length + b % aph.length]
  })
  return result;
}

function descript(message = '', a = 0, b = 0) {
  let result = ''
  message.split('').forEach(i => {
    let index = aph.indexOf(i)
    if (index === -1) return result += i;
    index -= b
    while (index < 0 || index % a !== 0) index += aph.length;
    result += aph[Math.floor(index / a)]
  })
  return result
}

const test = enscript('affine', 7, 8)
const dest = descript(test, 7, 8)
console.log(dest)