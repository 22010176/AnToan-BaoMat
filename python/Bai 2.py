import math

a4 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
      "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


def enscript(message: str, a: int, b: int) -> str:
    aph = a4
    l = len(a4)

    if math.gcd(a, l) != 1:
        print("a phai la so nguy to cung nhau voi 26")
        return ''
    result = ''
    for i in message:
        result += aph[(aph.index(i) * a + b) % l]
    return result


def descript(message: str, a: int, b: int) -> str:
    aph = a4
    l = len(a4)
    if math.gcd(a, l) != 1:
        print("a phai la so nguy to cung nhau voi 26")
        return ''
    result = ''
    for i in message:
        index = aph.index(i)
        index -= b
        while (index < 0 or index % a != 0):
            index += l
        u = (index / a)
        result += aph[int(u)]
    return result


en = enscript('hello', 6, 8)
de = descript(en, 6, 8)
print(en)
print(de)
