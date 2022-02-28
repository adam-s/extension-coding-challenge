import { GoogleDocsModel } from './google-docs.model';

export class GoogleDocsService {
  static build() {
    const model = GoogleDocsModel.build({ fontSize: 12 });
    return new GoogleDocsService(model);
  }

  constructor(public model: GoogleDocsModel) {
    console.log(this.model);
  }
}
