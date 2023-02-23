import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { defaultHelpers as helpers } from '../../support/helpers.mjs';
import { SERVER_MAIN_SRC_DIR } from '../../../generators/generator-constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverGeneratorFile = join(__dirname, '../../../generators/server/index.mjs');

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

describe(`generator - server - api path annotation`, () => {
  describe(`microservice`, () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(serverGeneratorFile)
        .withJHipsterConfig({
          applicationType: 'microservice',
          authenticationType: 'oauth2'
        }, entities)
        .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
    });

    after(() => runResult.cleanup());

    it('contains custom api path', () => {
      runResult.assertFileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/SimpleResource.java`, /custom-api-path/);
    });
  });
});