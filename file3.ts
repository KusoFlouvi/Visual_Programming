//функции

// Transform<T> — функция, преобразующая массив T[] в массив T[]
export type Transform<T> = (data: T[]) => T[];

// Where<T> — функция, принимающая ключ и значение, возвращающая Transform<T>
export type Where<T> = <K extends keyof T>(
  key: K,
  value: T[K]
) => Transform<T>;

// Sort<T> — функция, принимающая ключ, возвращающая Transform<T>
export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

// Group<T, K> — тип группы (ключ и массив элементов)
export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};

// GroupBy<T> — функция, принимающая ключ, возвращающая Transform<Group<T, K>>
export type GroupBy<T> = <K extends keyof T>(
  key: K
) => Transform<Group<T, K>>;

// GroupTransform<T, K> — функция, преобразующая массив групп в массив групп
export type GroupTransform<T, K extends keyof T> = (
  groups: Group<T, K>[]
) => Group<T, K>[];

// Having<T> — функция, принимающая предикат, возвращающая GroupTransform<T, K>
export type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;
