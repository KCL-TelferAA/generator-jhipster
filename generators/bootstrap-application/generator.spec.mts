/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { jestExpect as expect } from 'mocha-expect-snapshot';
import lodash from 'lodash';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import Generator from './index.mjs';
import { dryRunHelpers as helpers } from '../../test/support/helpers.mjs';
import { fieldTypes } from '../../jdl/jhipster/index.mjs';

const {
  CommonDBTypes: { UUID },
} = fieldTypes;

const { snakeCase } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatorPath = join(__dirname, 'index.mts');
const generator = basename(__dirname);

const expectedField = () => ({
  generateFakeData: expect.any(Function),
  createRandexp: expect.any(Function),

  entity: expect.any(Object),
  reference: expect.any(Object),
});

const expectedRelationship = () => ({
  otherEntity: expect.any(Object),
});

const expectedPrimaryKeyId = () => ({
  field: expect.any(Object),
});

const expectedPrimaryKey = primaryKey => ({
  ownFields: expect.any(Array),
  fields: expect.any(Array),
  derivedFields: expect.any(Array),
  ids: primaryKey.ids.map(expectedPrimaryKeyId),
});

const expectedEntity = entity => ({
  faker: expect.any(Object),
  generateFakeData: expect.any(Function),
  resetFakerSeed: expect.any(Function),

  allReferences: expect.any(Array),
  otherEntities: expect.any(Array),
  regularEagerRelations: expect.any(Array),
  reactiveEagerRelations: expect.any(Array),
  reactiveRegularEagerRelations: expect.any(Array),

  dtoReferences: expect.any(Array),
  otherReferences: expect.any(Array),
  otherDtoReferences: expect.any(Array),

  fields: entity.fields.map(expectedField),
  relationships: entity.relationships.map(expectedRelationship),
  primaryKey: expectedPrimaryKey(entity.primaryKey),
  reactiveOtherEntities: expect.any(Set),
  reactiveUniqueEntityTypes: expect.any(Set),
});

describe(`generator - ${generator}`, () => {
  it('generator-list constant matches folder name', async () => {
    await expect((await import('../generator-list.mjs'))[`GENERATOR_${snakeCase(generator).toUpperCase()}`]).toBe(generator);
  });
  it('should support features parameter', () => {
    const instance = new Generator([], { help: true, env: { cwd: 'foo', sharedOptions: { sharedData: {} } } }, { unique: 'bar' });
    expect(instance.features.unique).toBe('bar');
  });

  describe('with', () => {
    describe('default config', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withJHipsterConfig({}, [
          {
            name: 'EntityA',
            changelogDate: '20220129025419',
            fields: [
              {
                fieldName: 'id',
                fieldType: UUID,
              },
            ],
          },
        ]);
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
{
  ".jhipster/EntityA.json": {
    "contents": "{
  "changelogDate": "20220129025419",
  "fields": [
    {
      "fieldName": "id",
      "fieldType": "UUID"
    }
  ],
  "name": "EntityA",
  "relationships": []
}
",
    "stateCleared": "modified",
  },
  ".jhipster/User.json": {
    "contents": null,
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
[
  "User",
  "EntityA",
]
`);
      });
      it('should prepare User', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().User;
        expect(entity).toMatchInlineSnapshot(
expectedEntity(entity), `
{
  "adminUserDto": "AdminUserDTO",
  "allReferences": Any<Array>,
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": false,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "builtIn": true,
  "builtInUser": true,
  "clientFramework": "angular",
  "clientInterface": "restful-resources",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": true,
  "dtoClass": "UserDTO",
  "dtoInstance": "userDTO",
  "dtoMapstruct": false,
  "dtoOnly": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.User",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "User",
  "entityAngularNamePlural": "Users",
  "entityApi": "",
  "entityApiUrl": "users",
  "entityClass": "User",
  "entityClassHumanized": "User",
  "entityClassPlural": "Users",
  "entityClassPluralHumanized": "Users",
  "entityContainsCollectionField": false,
  "entityFileName": "user",
  "entityFolderName": "user",
  "entityI18nVariant": "default",
  "entityInstance": "user",
  "entityInstanceDbSafe": "jhiUser",
  "entityInstancePlural": "users",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "user",
  "entityNameCapitalized": "User",
  "entityNamePlural": "Users",
  "entityNamePluralizedAndSpinalCased": "users",
  "entityPackage": undefined,
  "entityPage": "user",
  "entityParentPathAddition": "",
  "entityPluralFileName": "usersundefined",
  "entityReactName": "User",
  "entityServiceFileName": "user",
  "entityStateName": "user",
  "entitySuffix": "",
  "entityTableName": "jhi_user",
  "entityTranslationKey": "user",
  "entityTranslationKeyMenu": "user",
  "entityUrl": "user",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "id",
      "columnType": "bigint",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "ID",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "global.field.id",
      "fieldType": "Long",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": false,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": true,
      "fieldTypeNumeric": true,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesMaxlength": undefined,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "Long",
      "jpaGeneratedValue": "sequence",
      "loadColumnType": "numeric",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "number",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "login",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Login",
      "fieldIsEnum": false,
      "fieldName": "login",
      "fieldNameAsDatabaseColumn": "login",
      "fieldNameCapitalized": "Login",
      "fieldNameHumanized": "Login",
      "fieldNameUnderscored": "login",
      "fieldTranslationKey": "jhipsterApp.user.login",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "login",
      ],
      "propertyName": "login",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "first_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "FirstName",
      "fieldIsEnum": false,
      "fieldName": "firstName",
      "fieldNameAsDatabaseColumn": "first_name",
      "fieldNameCapitalized": "FirstName",
      "fieldNameHumanized": "First Name",
      "fieldNameUnderscored": "first_name",
      "fieldTranslationKey": "jhipsterApp.user.firstName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "firstName",
      ],
      "propertyName": "firstName",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "last_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "LastName",
      "fieldIsEnum": false,
      "fieldName": "lastName",
      "fieldNameAsDatabaseColumn": "last_name",
      "fieldNameCapitalized": "LastName",
      "fieldNameHumanized": "Last Name",
      "fieldNameUnderscored": "last_name",
      "fieldTranslationKey": "jhipsterApp.user.lastName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "lastName",
      ],
      "propertyName": "lastName",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.user",
  "i18nKeyPrefix": "jhipsterApp.user",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "User",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "User",
  "persistInstance": "user",
  "persisted": "yes",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": true,
    "hasUUID": false,
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "number",
    "type": "Long",
    "typeLong": true,
    "typeNumeric": true,
    "typeString": false,
    "typeUUID": false,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "UserDTO",
  "restInstance": "userDTO",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "service": "no",
  "serviceImpl": false,
  "serviceInterfaceOnly": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "number",
  "uniqueEnums": {},
  "updatableEntity": true,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
expectedEntity(entity), `
{
  "allReferences": Any<Array>,
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": true,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientInterface": "restful-resources",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": "no",
  "dtoMapstruct": false,
  "dtoOnly": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "jpaGeneratedValue": true,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "persisted": "yes",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": false,
    "hasUUID": true,
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceInterfaceOnly": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`);
      });
    });

    describe('skipUserManagement', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withJHipsterConfig(
          {
            skipUserManagement: true,
          },
          [
            {
              name: 'EntityA',
              changelogDate: '20220129025419',
              fields: [
                {
                  fieldName: 'id',
                  fieldType: UUID,
                },
              ],
            },
          ]
        );
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
{
  ".jhipster/EntityA.json": {
    "contents": "{
  "changelogDate": "20220129025419",
  "fields": [
    {
      "fieldName": "id",
      "fieldType": "UUID"
    }
  ],
  "name": "EntityA",
  "relationships": []
}
",
    "stateCleared": "modified",
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
[
  "EntityA",
]
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
expectedEntity(entity), `
{
  "allReferences": Any<Array>,
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": true,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientInterface": "restful-resources",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": "no",
  "dtoMapstruct": false,
  "dtoOnly": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "jpaGeneratedValue": true,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "persisted": "yes",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": false,
    "hasUUID": true,
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceInterfaceOnly": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`);
      });
    });
  });
});
