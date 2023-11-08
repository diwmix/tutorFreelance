def swap_zeros_with_first_non_zero(num):
    num_str = str(num)

    # Находим индекс первой ненулевой цифры
    first_non_zero_index = next((i for i, digit in enumerate(num_str) if digit != '0'), None)

    if first_non_zero_index is not None and first_non_zero_index < len(num_str):
        # Создаем список символов для измененной строки
        new_str = list(num_str)

        # Меняем местами нули с первой ненулевой цифрой
        new_str[first_non_zero_index], new_str[0] = new_str[0], new_str[first_non_zero_index]

        # Преобразуем список обратно в строку
        result_str = ''.join(new_str)

        result = int(result_str)
        return result
    else:
        # Если нет ненулевых цифр, возвращаем исходное число
        return num

# Пример использования
number = 4820901
result = swap_zeros_with_first_non_zero(number)
print(result)
