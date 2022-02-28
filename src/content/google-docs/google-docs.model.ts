import { Attributes } from '../../common/mvc/attributes';
import { ContentModel } from '../content.model';

export interface GoogleDocsProps {
  fontSize?: number;
}

const DEFAULT_PROPS = { fontSize: 11 };

export class GoogleDocsModel extends ContentModel<GoogleDocsProps> {
  static build(props: GoogleDocsProps = DEFAULT_PROPS): GoogleDocsModel {
    const attrs = new Attributes<GoogleDocsProps>(props);
    return new GoogleDocsModel(attrs);
  }
}
