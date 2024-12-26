class Converter {
  #encode; #decode;
  constructor(encode, decode) {
    this.#encode = encode
    this.#decode = decode
  }
  toBinary(char = '') {
    return this.#encode(char)
  }
  toChar(binary = '') {
    return this.#decode(binary)
  }
}

class Mapper {
  constructor(table) {
    this.table = table
  }
  map(data = '') {
    return this.table.map(index => data[index - 1]).join('')
  }
}

class BinaryData {
  static Xor(a, b) {
    return a.split('').map((bit, i) => bit === b[i] ? '0' : '1').join('')
  }

  static And(a, b) {
    return a.split('').map((bit, i) => bit === '1' && b[i] === '1' ? '1' : '0').join('')
  }
  static Or(a, b) {
    return a.split('').map((bit, i) => bit === '1' || b[i] === '1' ? '1' : '0').join('')
  }

  static Nand(a, b) {
    return a.split('').map((bit, i) => bit === '1' && b[i] === '1' ? '0' : '1').join('')
  }
  static Nor(a, b) {
    return a.split('').map((bit, i) => bit === '1' || b[i] === '1' ? '0' : '1').join('')
  }

  static Not(a) {
    return a.split('').map(bit => bit === '1' ? '0' : '1').join('')
  }

  static Nand(a, b) {
  }

  static circularShiftLeft(data, shift) {
    return data.slice(shift) + data.slice(0, shift)
  }

  static devideIntoBlocks(data, size) {
    return data.match(new RegExp(`.{1,${size}}`, 'g'))
  }


  #data;

  constructor(length = 0, data = '') {
    if (length === 0) throw new Error('BinaryData: length must be greater than 0')

    this.length = length
    this.data = data
  }


  get data() {
    return this.#data
  }

  set data(value = '') {
    if (value.length !== this.length) throw new Error(`BinaryData: length must be ${this.length}, got ${value.length}`)
    if (!/^[01]+$/.test(value)) throw new Error('BinaryData: data must be binary')

    this.#data = value
  }

  get value() {
    return parseInt(this.data, 2)
  }

  set value(value) {
    this.data = value.toString(2).padStart(this.length, '0')
  }
}

class _64BinaryData extends BinaryData {
  constructor(data) {
    super(64, data)
  }
}

class _56BinaryData extends BinaryData {
  constructor(data) {
    super(56, data)
  }
}

class _48BinaryData extends BinaryData {
  constructor(data) {
    super(48, data)
  }
}
class _32BinaryData extends BinaryData {
  constructor(data) {
    super(32, data)
  }
}

class _28BinaryData extends BinaryData {
  constructor(data) {
    super(28, data)
  }
}


// const a = new _28BinaryData('1111010101010101010101010100');
// console.log(_28BinaryData.circularShiftLeft(a.data, 4))


module.exports = { Converter, Mapper, _64BinaryData, _56BinaryData, _48BinaryData, _32BinaryData, _28BinaryData }