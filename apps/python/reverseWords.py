sentence = input("Enter your name: ")

name = sentence.split()      # convert string → list of words
reversed_words = name[::-1]  # reverse the list

result = " ".join(reversed_words)

print(result)