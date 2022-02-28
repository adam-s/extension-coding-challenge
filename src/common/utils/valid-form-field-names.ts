// The form type
export type IFormFields<T extends readonly string[]> = {
  [key in T[number]]: string;
};

export function validFormFieldName<T extends readonly string[]>(
  formFieldNames: T,
  name: string,
): name is keyof IFormFields<T> {
  return formFieldNames.includes(name);
  // Sadly necessary, but harmless   ^^^^^^^^^^^^^^^^^^^^^
}

export function validIFormFields<T extends readonly string[]>(
  formFieldNames: T,
  fields: Partial<IFormFields<T>>,
): fields is IFormFields<T> {
  return formFieldNames.every((name) => name in fields);
}
