const a = 'abcdefghijklmnopqrstuvwxyz'.split('');

function enscript(m = '', k = 0) {
  let result = ''
  m.split('').forEach(i => {
    if (i === ' ') return result += ' '
    result += a[(a.indexOf(i) + k) % a.length]
  });
  return result;
}

function descript(m = '', k = 0) {
  let result = ''
  m.split('').forEach(i => {
    if (i === ' ') return result += ' '
    let index = a.indexOf(i) - k;
    result += a[index < 0 ? index + a.length : index]
  })
  return result;
}

for (let i = 0; i < a.length; ++i) {
  let en = enscript('i love you', i)
  console.log(i.toString().padEnd(4), '|', en, '|', descript(en, i))
}
// console.log(enscript('i love you', 5))