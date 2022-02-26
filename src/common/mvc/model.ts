interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

export class Model<T> {
  constructor(protected attributes: ModelAttributes<T>) {}
  get(key: keyof T) {
    return this.attributes.get(key);
  }

  getAll() {
    return this.attributes.getAll();
  }

  set(update: T) {
    this.attributes.set(update);
  }
}
