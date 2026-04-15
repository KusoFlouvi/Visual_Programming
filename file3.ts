// ==== Базовые типы (без изменений) ====
export type Transform<T> = (data: T[]) => T[];

export type Where<T> = <K extends keyof T>(
  key: K,
  value: T[K]
) => Transform<T>;

export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};

export type GroupBy<T> = <K extends keyof T>(
  key: K
) => Transform<Group<T, K>>;

export type GroupTransform<T, K extends keyof T> = (
  groups: Group<T, K>[]
) => Group<T, K>[];

export type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;

declare const opBrand: unique symbol;

type WhereOp<T> = Transform<T> & { [opBrand]: 'where' };
type GroupByOp<T, K extends keyof T> = Transform<Group<T, K>> & { [opBrand]: 'groupBy' };
type HavingOp<T, K extends keyof T> = GroupTransform<T, K> & { [opBrand]: 'having' };
type SortOp<T> = Transform<T> & { [opBrand]: 'sort' };

type PipelineState = 'S0' | 'S1' | 'S2' | 'S3';

type ValidPipeline<T, Steps extends any[], State extends PipelineState = 'S0'> =
  Steps extends [infer First, ...infer Rest]
    ? First extends WhereOp<any>
      ? State extends 'S0' ? ValidPipeline<T, Rest, 'S0'> : never
    : First extends GroupByOp<any, any>
      ? State extends 'S0' ? ValidPipeline<T, Rest, 'S1'> : never
    : First extends HavingOp<any, any>
      ? State extends 'S1' ? ValidPipeline<T, Rest, 'S2'> : never
    : First extends SortOp<any>
      ? (State extends 'S0' | 'S1' | 'S2' | 'S3' ? ValidPipeline<T, Rest, 'S3'> : never)
    : never
  : Steps;

export function query<T, Steps extends any[]>(
  ...steps: Steps extends ValidPipeline<T, Steps> ? Steps : never
): Transform<T> {
  return (data: T[]) => {
    let result: any = [...data];
    for (const step of steps) {
      result = step(result);
    }
    return result;
  };
}

export const where: Where<any> = (key, value) => {
  const fn = (data: any[]) => data.filter(item => item[key] === value);
  return fn as WhereOp<any>;
};

export const sort: Sort<any> = (key) => {
  const fn = (data: any[]) =>
    [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
  return fn as SortOp<any>;
};

export const groupBy: GroupBy<any> = (key) => {
  const fn = (data: any[]) => {
    const groups: Record<string, Group<any, any>> = {};
    for (const item of data) {
      const keyValue = item[key];
      const groupKey = String(keyValue);
      if (!groups[groupKey]) {
        groups[groupKey] = { key: keyValue, items: [] };
      }
      groups[groupKey].items.push(item);
    }
    return Object.values(groups);
  };
  return fn as GroupByOp<any, any>;
};

export const having: Having<any> = (predicate) => {
  const fn = (groups: Group<any, any>[]) => groups.filter(predicate);
  return fn as HavingOp<any, any>;
};