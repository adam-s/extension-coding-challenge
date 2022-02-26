import { NasaModel } from './nasa.model';

export class NasaService {
  static build() {
    const model = NasaModel.build({ engineType: 'GEM 63' });
    return new NasaService(model);
  }

  constructor(public model: NasaModel) {
    console.log(this.model);
  }
}
