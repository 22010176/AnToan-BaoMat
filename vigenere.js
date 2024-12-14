const aph = 'abcdefghijklmnopqrstuvwxyz'.split('');

function enscript(message = '', key = '') {
  let result = ''
  const table = key.split('').map(i => aph.indexOf(i))
  message.split('').forEach((i, j) => {
    const index = aph.indexOf(i);
    if (index === -1) return result += i;
    result += aph[(index + table[j % table.length]) % aph.length]
  });
  return result
}

function descript(message = '', key = '') {
  let result = ''
  const table = key.split('').map(i => aph.indexOf(i))
  message.split('').forEach((i, j) => {
    const index = aph.indexOf(i);
    if (index == null || index == -1) return result += i;

    let temp = index - table[j % table.length] + aph.length
    result += aph[temp % aph.length]
  });
  return result
}

const message = 'phenikaa', key = 'affine'
const en = enscript(message, key)
const des = descript(en, key)
console.log(en, des)

