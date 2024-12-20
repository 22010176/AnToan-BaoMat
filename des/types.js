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
  #data;

  constructor(length, data = '') {
    this.length = length
    this.data = data
  }

  get data() {
    return this.#data
  }

  set data(value = '') {
    if (value.length !== this.length) throw new Error(`BinaryData: length must be ${this.length}`)
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



module.exports = { Converter, Mapper, _64BinaryData, _56BinaryData, _48BinaryData, _32BinaryData, _28BinaryData }