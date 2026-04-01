import { describe, it, expect } from 'vitest';
import { createUser, createBook, calculateArea, getStatusColor, firstString, trimAndMaybeUpper, getFirstElement, findById } from './file1';

describe("Tests for ..file1.ts", () => {
    // createUser:  
    it("createUser: Создаю пользователя по умолчанию с isActive", () => {
      const user = createUser(1, "Test №1");
      expect(user.isActive).toBe(true);
    });

    it("createUser: Создаю пользователя с isActive = false", () => {
      const user = createUser(2, "Test №2", undefined, false);
      expect(user.isActive).toBe(false);
    });

    it("createUser: Создаю пользователя с email", () => {
      const user = createUser(3, "Test №3", "test@gmail.com");
      expect(user.email).toBe("test@gmail.com");
    });


    // createBook:
    it("createBook: Создаю книгу без year", () => {
      const book = createBook({
        title: "1984",
        author: "George Orwell",
        genre: "fiction"
      });
      expect(book.year).toBeUndefined();
    });

    it("createBook: Создаю книгу с year", () => {
      const book = createBook({
        title: "Clean Code",
        author: "Robert Martin",
        year: 2008,
        genre: "non-fiction"
      });
      expect(book.year).toBe(2008);
    });


    // calculateArea:
    it("calculateArea: Вычисляет площадь квадрата", () => {
      const result = calculateArea("square", 4);
      expect(result).toBe(16);
    });

    it("calculateArea: Вычисляет площадь круга", () => {
      const result = calculateArea("circle", 2);
      expect(result).toBeCloseTo(Math.PI * 4);
    });


    // getStatusColor:
    it("getStatusColor: Возвращает green для active", () => {
      const result = getStatusColor("active");
      expect(result).toBe("green");
    });

    it("getStatusColor: Возвращает red для active", () => {
      const result = getStatusColor("inactive");
      expect(result).toBe("gray");
    });

    it("getStatusColor: Возвращает new для new", () => {
      const result = getStatusColor("new");
      expect(result).toBe("yellow");
    });


    // firstString
    it("firstString: Проба делать первую букву заглавной", () => {
      const result = firstString("test");
      expect(result).toBe("Test");
    });

    it("firstString: Делаем всю строку заглавной", () => {
      const result = firstString("test", true);
      expect(result).toBe("Test");
    });

    it("firstString: Вроде как возрат пустой строки должен быть", () => {
      const result = firstString("");
      expect(result).toBe("");
    });


    it("trimAndMaybeUpper: Убирает пробелы по краям без заглавия строки", () => {
      const result = trimAndMaybeUpper("     trim     ");
      expect(result).toBe("trim");
    });

    it("trimAndMaybeUpper: Убирает пробелы и делает строку заглавной", () => {
      const result = trimAndMaybeUpper("     trim     ", true);
      expect(result).toBe("TRIM");
    });

    it("trimAndMaybeUpper: Если пробелов нема - остаётся прежней строка", () => {
      const result = trimAndMaybeUpper("trim");
      expect(result).toBe("trim");
    });


    // getFirstElement
    it("getFirstElement: Возврат первого элемента массива", () => {
      const result = getFirstElement([5928, 6928, 7928]);
      expect(result).toBe(5928);
    });

    it("getFirstElement: Возврат underfined должен быть", () => {
      const result = getFirstElement([]);
      expect(result).toBeUndefined();
    });


    it("findById: Надо найти объект по  id", () => {
      const arr = [
        {id: 1, name: "Test 1"},
        {id: 2, name: "LOL"}
      ];

      const result = findById(arr, 2);
      expect(result?.name).toBe("LOL");
    });

    it("findById: Возврат underfined если id нема", () => {
      const arr = [
        {id: 1},
        {id: 2}
      ];

      const result = findById(arr, 3);

      expect(result).toBeUndefined();
    });
});