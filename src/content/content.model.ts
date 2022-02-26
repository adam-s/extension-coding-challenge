import { Model } from '../common/mvc/model';

export interface ContentModelProps {
  id: string;
  url: string;
}

export function isKeyOfObject<T>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

export type ModelProps<T> = T & ContentModelProps;

export class ContentModel<T> extends Model<T> {
  get<K extends keyof ContentModelProps>(
    key: keyof ContentModelProps,
  ): ContentModelProps[K];
  get<K extends keyof T>(key: string & keyof T): T[K];
  get<K extends keyof T, U extends keyof ContentModelProps>(key: K & U): any {
    if (key === 'id') {
      return chrome.runtime.id;
    }
    if (key === 'url') {
      return document.location.href;
    }
    return super.get(key);
  }

  getAll() {
    return {
      ...{ id: chrome.runtime.id, url: document.location.href },
      ...this.attributes.getAll(),
    };
  }
}
