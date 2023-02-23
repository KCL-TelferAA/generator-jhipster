import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { defaultHelpers as helpers } from '../../support/helpers.mjs';
import BaseApplicationGenerator from '../../../generators/base-application/index.mjs';

import { CLIENT_MAIN_SRC_DIR } from '../../../generators/generator-constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const angularGeneratorFile = join(__dirname, '../../../generators/angular/index.mjs');

const entitySimple = {
  name: 'Simple',
  changelogDate: '20220129000100',
  jpaMetamodelFiltering: true,
  fields: [{ fieldName: 'simpleName', fieldType: 'String' }],
  annotations: [{ option: 'apiPath', method: 'custom-api-path', type: 'BINARY' }],
};

const entities = [
  entitySimple,
];

class MockedLanguagesGenerator extends BaseApplicationGenerator<any> {
  get [BaseApplicationGenerator.PREPARING]() {
    return {
      mockTranslations({ control }) {
        control.getWebappTranslation = () => 'translations';
      },
    };
  }
}

describe(`generator - server - api path annotation`, () => {
  describe(`monolith`, () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(angularGeneratorFile)
        .withJHipsterConfig({
          applicationType: 'monolith',
          clientFramework: 'angular',
          authenticationType: 'oauth2'
        }, entities)
        .withGenerators([[MockedLanguagesGenerator, 'jhipster:languages']])
        .withMockedGenerators(['jhipster:common']);
    });

    after(() => runResult.cleanup());

    it('contains custom api path', () => {
      runResult.assertFileContent(`${CLIENT_MAIN_SRC_DIR}app/entities/simple/service/simple.service.ts`, /custom-api-path/);
    });
  });
});