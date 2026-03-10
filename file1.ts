interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

function createUser (id: number, name: string, email?: string, isActive: boolean = true) {
    return {id, name, email, isActive};
}

/*//демонстрация работы функции
const user1 = createUser(1, 'Игрок 1');
console.log('User 1:', user1);

const user2 = createUser(2, 'Игрок 2', 'gameworld23@gmail.com', false);
console.log('User 2:', user2);
*/

interface Book {
    title: string;
    author: string;
    year?: number;
    genre: 'fiction' | 'non-fiction';
}

function createBook(book: Book): Book {
    return book;
}

//демонстрация работы функции
const book1 = createBook({
    title: 'Преступление и наказание',
    author: 'Достоевский',
    genre: 'fiction'
});
console.log('Book 1:', book1);

/*
const book2 = createBook({
    title: 'Краткая история времени',
    author: 'Стивен Хокинг',
    year: 1988,
    genre: 'non-fiction'
});
console.log('Book 2:', book2);
*/


function calculateArea(shape: 'circle', radius: number): number;
function calculateArea(shape: 'square', side: number): number;

function calculateArea(shape: 'circle' | 'square', param: number): number {
    if (shape === 'circle') {
        return Math.PI * param ** 2;
    } else {
        return param ** 2;
    }
}

/*//демонстрация работы функции
console.log(calculateArea('circle', 3));
console.log(calculateArea('square', 3));
*/

type Status = 'active' | 'inactive' | 'new';

function getStatusColor(status: Status): string {
    switch (status) {
        case 'active': return 'green';
        case 'inactive': return 'gray';
        case 'new': return 'yellow';
    }
}

/*//демонстрация работы функции
console.log(getStatusColor('active'));  
console.log(getStatusColor('inactive')); 
console.log(getStatusColor('new'));
*/

type StringFormatter = (str: string, uppercase?: boolean) => string;

//заглавная буква
const firstString: StringFormatter = (str) => {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1);
};

//обрезание пробелов
const trimAndMaybeUpper: StringFormatter = (str, uppercase = false): string => {
  let start = 0;
  let end = str.length - 1;

  while (start <= end && str[start] === " ") {
    start++;
  }

  while (end >= start && str[end] === " ") {
    end--;
  }

  let result = "";

  for (let i = start; i <= end; i++) {
    result += str[i];
  }

  if (uppercase) {
    result = result.toUpperCase();
  }

  return result;
};

/*//демонстрация работы двух функций со строкой
console.log(firstString('hello'));
console.log(trimAndMaybeUpper('  hi  '));
console.log(trimAndMaybeUpper('  hi  ', true));
*/

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

//демонстрация работы на массиве чисел
const numArray = [1, 2, 3];
const strArray = ['a', 'b', 'c'];
const emptyArray: number[] = [];

//демонстрация работы на строках
console.log(getFirstElement(numArray));
console.log(getFirstElement(strArray));
console.log(getFirstElement(emptyArray));

interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

interface Person extends HasId {
    name: string;
}

const persons: Person[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

console.log(findById(persons, 2));
console.log(findById(persons, 5));