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

type Any<T> = Transform<T> | GroupTransform<T, any>;

//начало реализации query
export function query<T>(...steps: Any<T>[]): Transform<T> {
  return (data: T[]) => {
    let result: any = [...data];

    for (const step of steps) {
      result = step(result);
    }

    return result;
  };
}

export const where: Where<any> = (key, value) => (data) =>
  data.filter((item) => (item as any)[key] === value);

export const sort: Sort<any> = (key) => (data) =>
  [...data].sort((a, b) => {
    const av = (a as any)[key];
    const bv = (b as any)[key];
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });

export const groupBy: GroupBy<any> = (key) => (data) => {
  const groups: Record<string, Group<any, any>> = {};

  for (const item of data) {
    const keyValue = (item as any)[key];
    const groupKey = String(keyValue);

    if (!groups[groupKey]) {
      groups[groupKey] = {
        key: keyValue,
        items: [],
      } as Group<any, any>;
    }
    groups[groupKey].items.push(item);
  }

  return Object.values(groups);
};

export const having: Having<any> = (predicate) => (groups) =>
  groups.filter(predicate);