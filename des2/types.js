class BinaryData {
  static Xor(a, b) {
    return new BinaryData(a.split('').map((bit, i) => bit === b[i] ? '0' : '1').join(''))
  }

  static And(a, b) {
    return new BinaryData(a.split('').map((bit, i) => bit === '1' && b[i] === '1' ? '1' : '0').join(''))
  }

  static Or(a, b) {
    return new BinaryData(a.split('').map((bit, i) => bit === '1' || b[i] === '1' ? '1' : '0').join(''))
  }

  static Nand(a, b) {
    return new BinaryData(a.split('').map((bit, i) => bit === '1' && b[i] === '1' ? '0' : '1').join(''))
  }

  static Nor(a, b) {
    return new BinaryData(a.split('').map((bit, i) => bit === '1' || b[i] === '1' ? '0' : '1').join(''))
  }

  static Not(a) {
    return new BinaryData(a.split('').map(bit => bit === '1' ? '0' : '1').join(''))
  }

  static DivideIntoBlocks(data, size) {
    let temp = data;
    if (data instanceof BinaryData) temp = data.data;

    return temp.match(new RegExp(`.{1,${size}}`, 'g'))
  }

  static CircularShiftLeft(data, shift) {
    // console.log(data)
    const a = data.slice(shift) + data.slice(0, shift)
    console.log('dd', a)
    console.log()
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