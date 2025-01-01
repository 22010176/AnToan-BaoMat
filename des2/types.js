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

  static DivideIntoBlocks(data, size) {
    let temp = data;
    // if (data instanceof BinaryData) temp = data.data;

    return temp.match(new RegExp(`.{1,${size}}`, 'g'))
  }

  static CircularShiftLeft(data, shift) {
    // console.log(data)
    const a = data.slice(shift) + data.slice(0, shift)
    // console.log('dd', a)
    // console.log()
    return a
  }

  static CircularShiftRight(data, shift) {
    return data.slice(-shift) + data.slice(0, -shift)
  }


  static Concat(...data) {
    return new BinaryData(data.reduce((acc, i) => {
      if (!i instanceof BinaryData) throw new Error("Concat: must be instance of BinaryData")
      return acc + i.data
    }, ''))
  }

  static BinaryToHex(message) {
    return this.DivideIntoBlocks(message, 4)
      .map(i => {
        switch (i) {
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

  static HexToBinary(message) {
    return message.split('').map(i => {
      switch (i) {
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
  }

  static DebugBinary(message) {
    console.log(this.DivideIntoBlocks(message, 4).join(' '))
  }

  static DebugHex(message) {
    console.log(this.DivideIntoBlocks(message, 2).join(' '))
  }
  // #data;

  // constructor(data = '') {
  //   if (typeof data != 'string') throw new Error('Data must be string.')
  //   if (data.length === 0) throw new Error('BinaryData: length must be greater than 0')

  //   this.data = data
  // }

  // get data() {
  //   return this.#data
  // }

  // set data(value = '') {
  //   if (this.#data.length !== value.length) throw new Error(`BinaryData: length must be ${this.#data.length}, got ${value.length}`)
  //   if (!/^[01]+$/.test(value)) throw new Error('BinaryData: data must be binary')

  //   this.#data = value
  // }

  // get value() {
  //   return parseInt(this.data, 2)
  // }

  // get length() {
  //   return this.data.length;
  // }

  // set value(value) {
  //   this.data = value.toString(2).padStart(this.length, '0')
  // }
}

// console.log(BinaryData.DivideIntoBlocks('1010101010101010101010101010101010101010101010101010101010101010', 8))



module.exports = {
  BinaryData
}