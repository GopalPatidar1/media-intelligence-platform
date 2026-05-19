# def isValid(self, s: str) -> bool:
#     obj = {
#         '(': ')',
#         '{': '}',
#         '[': ']',
#         '': ''
#     }
#     newStr = s[0]
#     for item in range(1, len(s)):
#         char = "" if len(newStr) ==0 else newStr[-1]
#         compChar = s[item]
#         print(char, compChar,obj[char])
#         if obj[char] != compChar:
#             newStr += compChar
#         else:
#             newStr = newStr[:-1]
#     return "true" if len(newStr) == 0 else "false"

# print(isValid(None, "([)]"))

print(int(1/2))