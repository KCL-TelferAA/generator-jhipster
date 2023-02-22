import { skipPrettierHelpers as helpers } from '../support/helpers.mjs';
import { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR, CLIENT_MAIN_SRC_DIR } from '../../generators/generator-constants.mjs';
import BaseApplicationGenerator from '../../generators/base-application/generator.mjs';
import { GENERATOR_ENTITY } from '../../generators/generator-list.mjs';

class MockedLanguagesGenerator extends BaseApplicationGenerator<any> {
  get [BaseApplicationGenerator.PREPARING]() {
    return {
      mockTranslations({ control }) {
        control.getWebappTranslation = () => 'translations';
      },
    };
  }
}

const entityFoo = { name: 'Foo', changelogDate: '20160926101210' };
const entityBar = { name: 'Bar', changelogDate: '20160926101211' };
const entityZen = {
  name: "Zen",
  fluentMethods: true,
  clientInterface: "restful-resources",
  relationships: [],
  fields: [
    {
      fieldName: "simpleId",
      fieldType: "Long",
      javadoc: "The simple Id"
    },
    {
      fieldName: "simpleName",
      fieldType: "String"
    }
  ],
  changelogDate: "20160926101212",
  entityTableName: "simple",
  dto: "dtoOnly",
  pagination: "no",
  service: "no"
};

describe('generator - entity --single-entity', () => {
  context('when regenerating', () => {
    describe('with default configuration', () => {
      let runResult;
      before(async () => {
        runResult = await helpers
          .runJHipster(GENERATOR_ENTITY)
          .withGenerators([[MockedLanguagesGenerator, 'jhipster:languages']])
          .withJHipsterConfig({}, [entityFoo, entityBar, entityZen])
          .withArguments(['Foo'])
          .withOptions({ ignoreNeedlesError: true, regenerate: true, force: true, singleEntity: true });
      });

      after(() => runResult.cleanup());

      it('should create files for entity Foo', () => {
        runResult.assertFile([
          `${SERVER_MAIN_RES_DIR}config/liquibase/changelog/20160926101210_added_entity_Foo.xml`,
          `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
          `${CLIENT_MAIN_SRC_DIR}app/entities/foo/foo.model.ts`,
        ]);
      });

      it('should not create files for the entity Bar', () => {
        runResult.assertNoFile([
          `${SERVER_MAIN_RES_DIR}config/liquibase/changelog/20160926101211_added_entity_Bar.xml`,
          `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Bar.java`,
          `${CLIENT_MAIN_SRC_DIR}app/entities/bar/bar.model.ts`,
        ]);
      });

      it('should not create files for the entity Zen', () => {
        runResult.assertNoFile([
          `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/mapper/Zen.java`,
        ]);
      });
    });

    describe('with cassandra database', () => {
      let runResult;
      before(async () => {
        runResult = await helpers
          .runJHipster(GENERATOR_ENTITY)
          .withGenerators([[MockedLanguagesGenerator, 'jhipster:languages']])
          .withJHipsterConfig({ databaseType: 'cassandra' }, [entityFoo, entityBar])
          .withArguments(['Foo'])
          .withOptions({ ignoreNeedlesError: true, regenerate: true, force: true, singleEntity: true });
      });

      after(() => runResult.cleanup());

      it('should create files for entity Foo', () => {
        runResult.assertFile([
          `${SERVER_MAIN_RES_DIR}config/cql/changelog/20160926101210_added_entity_Foo.cql`,
          `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
        ]);
      });

      it('should not create files for the entity Bar', () => {
        runResult.assertNoFile([
          `${SERVER_MAIN_RES_DIR}config/cql/changelog/20160926101211_added_entity_Bar.cql`,
          `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Bar.java`,
        ]);
      });
    });
  });
});
