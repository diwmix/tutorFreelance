letter_to_symbol = {
    'a': '!',
    'b': '"',
    'c': '#',
    'd': '$',
    'e': '%',
    'f': '&',
    'g': "'",
    'h': '(',
    'i': ')',
    'j': "*",
    'k': '+',
    'l': ',',
    'm': '-',
    'n': '.',
    'o': '/',
    'p': ':',
    'q': ';',
    'r': '<',
    's': '=',
    't': '>',
    'u': '?',
    'v': '@',
    'w': "[",
    'x': '\\',
    'y': ']',
    'z': '^'
}

# Функция для замены букв на символы
def replace_letters(input_text):
    result = ''
    for letter in input_text:
        # Если буква есть в словаре, заменяем её символом, в противном случае оставляем как есть
        result += letter_to_symbol.get(letter, letter)
    return result

# Получаем ввод пользователя
user_input = input("Введите текст, чтобы заменить буквы на символы: ")

# Заменяем буквы на символы
output_text = replace_letters(user_input)

# Выводим результат
print("Результат замены:")
print(output_text)
