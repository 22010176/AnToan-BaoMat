const { test, expect } = require('@jest/globals');

const { dataToBinary, LeftCircularShift, PC1Key, genSubKey } = require('./index');

test('dataToBinary', () => {
	expect(dataToBinary('teasdsf').join('')).toBe('01110100011001010110000101110011011001000111001101100110');
	expect(dataToBinary('asdfasfasceww3213123').join('')).toBe('0110000101110011011001000110011001100001011100110110011001100001011100110110001101100101011101110111011100110011001100100011000100110011001100010011001000110011');
	expect(dataToBinary('adfqqwe').join('')).toBe('01100001011001000110011001110001011100010111011101100101');
	expect(dataToBinary('123456').join('')).toBe('001100010011001000110011001101000011010100110110');
	expect(dataToBinary('qwertyuiopasdfghjklzxcvbnm1234567890 ').join('')).toBe('01110001011101110110010101110010011101000111100101110101011010010110111101110000011000010111001101100100011001100110011101101000011010100110101101101100011110100111100001100011011101100110001001101110011011010011000100110010001100110011010000110101001101100011011100111000001110010011000000100000');
});

test('LeftCircularShift', () => {
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 1)).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual([3, 4, 5, 6, 7, 8, 1, 2]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([4, 5, 6, 7, 8, 1, 2, 3]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 4)).toEqual([5, 6, 7, 8, 1, 2, 3, 4]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 5)).toEqual([6, 7, 8, 1, 2, 3, 4, 5]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 6)).toEqual([7, 8, 1, 2, 3, 4, 5, 6]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 7)).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
	expect(LeftCircularShift([1, 2, 3, 4, 5, 6, 7, 8], 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
})


test('PC1Key', () => {


})