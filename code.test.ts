//тесты функций
import { describe, it, expectTypeOf } from 'vitest';
import type { DeepReadonly, PickedByType, EventHandlers } from  './file4';

describe('TypeScript utility types', () => {
  it('DeepReadonly', () => {
    type User = {
      name: string;
      info: {
        age: number;
        address: {
          city: string;
        };
      };
      hobbies: string[];
    };

    type Result = DeepReadonly<User>;

    expectTypeOf<Result>().toEqualTypeOf<{
      readonly name: string;
      readonly info: {
        readonly age: number;
        readonly address: {
          readonly city: string;
        };
      };
      readonly hobbies: readonly string[];
    }>();
  });

  it('PickedByType', () => {
    type Person = {
      id: number;
      name: string;
      age: number;
      city: string;
      isActive: boolean;
    };

    type StringProps = PickedByType<Person, string>;
    type NumberProps = PickedByType<Person, number>;
    type BooleanProps = PickedByType<Person, boolean>;

    expectTypeOf<StringProps>().toEqualTypeOf<{
      name: string;
      city: string;
    }>();

    expectTypeOf<NumberProps>().toEqualTypeOf<{
      id: number;
      age: number;
    }>();

    expectTypeOf<BooleanProps>().toEqualTypeOf<{
      isActive: boolean;
    }>();
  });

  it('EventHandlers', () => {
    type Events = {
      click: { x: number; y: number };
      change: string;
      submit: { id: number };
    };

    type Result = EventHandlers<Events>;

    expectTypeOf<Result>().toEqualTypeOf<{
      onClick: (event: { x: number; y: number }) => void;
      onChange: (event: string) => void;
      onSubmit: (event: { id: number }) => void;
    }>();
  });
});