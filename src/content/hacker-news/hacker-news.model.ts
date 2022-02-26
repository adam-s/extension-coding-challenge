import { Attributes } from '../../common/mvc/attributes';
import { ContentModel } from '../content.model';
export interface HackerNewsProps {
  lastAccess?: Date;
}

export class HackerNewsModel extends ContentModel<HackerNewsProps> {
  static build(props: HackerNewsProps = {}): HackerNewsModel {
    const attrs = new Attributes<HackerNewsProps>(props);
    return new HackerNewsModel(attrs);
  }
}
