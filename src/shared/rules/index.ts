import {Rule} from 'effector-forms';

export const rules = {
  required: <T>(): Rule<string | number | T[]> => ({
    name: 'required',
    validator: (value: string | number | T[]) => {
      if (typeof value === 'number') {
        return {
          isValid: value.toString().length > 0,
          errorText: 'Field is required',
        };
      }

      if (Array.isArray(value)) {
        return {isValid: true};
      }

      return {
        isValid: Boolean(value),
        errorText: 'Field is required',
      };
    },
  }),
  email: (): Rule<string> => ({
    name: 'email',
    validator: (value: string) => ({
      isValid: /\S+@\S+\.\S+/.test(value),
      errorText: 'Invalid email',
    }),
  }),
  minLength: <T>(min: number): Rule<string | T[]> => ({
    name: 'minLength',
    validator: (value: string | T[]) => ({
      isValid: value.length >= min,
      errorText: `Min length is ${min}`,
    }),
  }),
  maxLength: <T>(max: number): Rule<string | T[]> => ({
    name: 'maxLength',
    validator: (value: string | T[]) => ({
      isValid: value.length <= max,
      errorText: `Min length is ${max}`,
    }),
  }),
  minValue: (min: number): Rule<number> => ({
    name: 'minValue',
    validator: (value: any) => ({
      isValid: value >= min,
      errorText: `Min value is ${min}`,
    }),
  }),
  maxValue: (max: number): Rule<number> => ({
    name: 'maxValue',
    validator: (value: any) => ({
      isValid: value <= max,
      errorText: `Max value is ${max}`,
    }),
  }),
};
