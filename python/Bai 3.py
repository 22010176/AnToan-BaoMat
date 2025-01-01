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


def countint(message: str):
    result = [0 for i in range(26)]
    for i in message:
        result[a4.index(i)] += 1

    for i in range(len(a4)):
        print(a4[i] + ": " + str(result[i]))


en = enscript('hello', 6, 8)
de = descript(en, 6, 8)
print(en)
print(de)


def main():
    a = int(input("Nhap a:"))
    while (math.gcd(a, 26) == 1):
        a = int(input("Nhap a: "))

    b = int(input('Nhap b'))

    print(f"\n\n1: ma hoa.\n2: gia ma.")
    choice = int(input("Nhap lua chon cua ban."))
    if (choice == 1):
        message = input("Nhap van ban muon ma hoa.")
        print(f"ket qua ma hoa: {enscript(message, a, b)}")
    elif (choice == 2):
        message = input("Nhap van ban muon giai hoa.")
        print(f"ket qua ma hoa: {descript(message, a, b)}")


main()
