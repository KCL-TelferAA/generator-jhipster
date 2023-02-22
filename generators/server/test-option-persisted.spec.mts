import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { defaultHelpers as helpers } from '../../test/support/helpers.mjs';

import { SERVER_TEST_SRC_DIR, SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatorFile = join(__dirname, 'index.mjs');

const skipPriorities = ['writing', 'postWriting'];

const entitySimple = {
  name: 'Simple',
  changelogDate: '20220129000100',
  jpaMetamodelFiltering: true,
  fields: [{ fieldName: 'simpleName', fieldType: 'String' }],
};

const entityAnotherSimple = {
  name: 'AnotherSimple',
  changelogDate: '20220129000200',
  fields: [{ fieldName: 'simpleName', fieldType: 'String' }],
  dto: 'mapstruct',
  service: 'serviceImpl',
  pagination: 'pagination',
  clientRootFolder: 'test-root',
};

const entities = [
  entitySimple,
  entityAnotherSimple,
  {
    name: 'RelationshipWithSimple',
    changelogDate: '20220129001000',
    fields: [{ fieldName: 'twoName', fieldType: 'String' }],
    relationships: [{ relationshipName: 'relationship', otherEntityName: 'Simple', relationshipType: 'many-to-one' }],
  },
];

const entitySampleA = {
  name: "Simple",
  changelogDate: "20230220074113",
  clientRootFolder: 'test-root',
  dto: 'mapstruct',
  fields: [
    {
      fieldName: "username",
      fieldType: "String",
    },
  ],
  relationships: [
    {
      otherEntityName: "simple2",
      ownerSide: true,
      relationshipName: "simple2",
      relationshipType: "one-to-one",
      relationshipValidateRules: "required"
    },
  ],
};

export const entitySampleB = {
  name: 'Simple2',
  changelogDate: "20230220074114",
  clientRootFolder: 'test-root',
  dto: "mapstruct",
  embedded: false,
  persisted: 'no',
  fields: [
    {
      fieldName: "name",
      fieldType: "String",
      fieldValidateRules: ["maxlength"],
      fieldValidateRulesMaxlength: "40"
    }
  ]
};

const entitiesNotTested = [
  entitySampleA, entitySampleB
];

describe(`generator - server - entities`, () => {
    describe('entity persistence', () => {
      let runResult;

      before(async () => {
        runResult = await helpers
          .run(generatorFile)
          .withJHipsterConfig({
            applicationType: 'microservice',
          }, entities)
          // .withOptions({ skipPriorities })
          .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
      });

      after(() => runResult.cleanup());

      it('should generate domain objects', () => {
        runResult.assertFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple.java.jhi`]);
      });

      it('should generate integration tests for all resources', () => {
        runResult.assertFile([`${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/SimpleResourceIT.java`]);
      });
    });

  describe('entity persistence with persisted option', () => {
    let runResult;

    before(async () => {
      runResult = await helpers
        .run(generatorFile)
        .withJHipsterConfig({
          applicationType: 'microservice',
        }, entitiesNotTested)
        // .withOptions({ skipPriorities })
        .withMockedGenerators(['jhipster:languages', 'jhipster:common', 'jhipster:liquibase']);
    });

    after(() => runResult.cleanup());

    it('should generate the persistence layer for Simple', () => {
      runResult.assertFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple.java.jhi`]);
      runResult.assertFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/SimpleRepository.java`]);
    });

    it('should not generate the persistence layer for Simple2', () => {
      runResult.assertNoFile([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Simple2.java`]);
      runResult.assertNoFile([`${SERVER_TEST_SRC_DIR}com/mycompany/myapp/repository/Simple2Repository.java`]);
    });

    it('should not generate integration tests for all resources', () => {
      runResult.assertNoFile([`${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/SimpleResourceIT.java`]);
      runResult.assertNoFile([`${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/Simple2ResourceIT.java`]);
    });
  });
});
