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