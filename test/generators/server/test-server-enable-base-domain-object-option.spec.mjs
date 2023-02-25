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
  requiresPersistableImplementation: true,
};

const entities = [
  entitySimple,
];

describe(`generator - server - extendWithDomainObject usage`, () => {
  describe(`microservice with extendWithDomainObject set to true`, () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(serverGeneratorFile)
        .withJHipsterConfig({
          applicationType: 'microservice',
          extendWithDomainObject: true,
        }, entities)
        .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
    });

    after(() => runResult.cleanup());

    it('entity extends DomainObject', () => {
      runResult.assertFileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple.java.jhi`, /extends DomainObject/);
      runResult.assertFileContent(`pom.xml`, /arcadia-arcadia_repository/);
      runResult.assertFileContent(`pom.xml`, /arcadia-common\.version/);
      runResult.assertFileContent(`pom.xml`, /io\.kingstoncloud\.web/);
    });
  });

  describe(`monolith with extendWithDomainObject set to true`, () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(serverGeneratorFile)
        .withJHipsterConfig({
          applicationType: 'monolith',
          extendWithDomainObject: true,
        }, entities)
        .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
    });

    after(() => runResult.cleanup());

    it('entity extends DomainObject', () => {
      runResult.assertFileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple.java.jhi`, /extends DomainObject/);
    });
  });

  describe(`monolith with extendWithDomainObject set to false`, () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(serverGeneratorFile)
        .withJHipsterConfig({
          applicationType: 'monolith',
          extendWithDomainObject: false,
        }, entities)
        .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
    });

    after(() => runResult.cleanup());

    it('entity extends DomainObject', () => {
      runResult.assertNoFileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple.java.jhi`, /extends DomainObject/);
    });
  });
});