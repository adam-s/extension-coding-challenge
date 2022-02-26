import { Attributes } from '../../common/mvc/attributes';
import { ContentModel } from '../content.model';

export type EngineTypes = 'Aeon 1' | 'BE-3' | 'GEM 63' | 'NewtonFour';
export interface NasaProps {
  engineType?: EngineTypes;
}

export class NasaModel extends ContentModel<NasaProps> {
  static build(props: NasaProps = {}): NasaModel {
    const attrs = new Attributes<NasaProps>(props);
    return new NasaModel(attrs);
  }
}
