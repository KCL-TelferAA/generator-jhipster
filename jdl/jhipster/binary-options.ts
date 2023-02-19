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
import entityOptions from './entity-options.js';

const { ClientInterfaceTypes, MapperTypes, PaginationTypes, PersistedTypes, SearchTypes, ServiceTypes } = entityOptions;
const { DTO_ONLY, MAPSTRUCT } = MapperTypes;
const NO_MAPPER = MapperTypes.NO;
const { PERSIST, DO_NOT_PERSIST } = PersistedTypes;
const { SERVICE_CLASS, SERVICE_IMPL, SERVICE_INTERFACE } = ServiceTypes;
const NO_SERVICE = ServiceTypes.NO;
const { RESTFUL_RESOURCES } = ClientInterfaceTypes;
const NO_CLIENT_INTERFACE = ClientInterfaceTypes.NO;
const { ELASTICSEARCH, COUCHBASE, NO: NO_SEARCH } = SearchTypes;
const Options = {
  DTO: 'dto',
  SERVICE: 'service',
  CLIENT_INTERFACE: 'clientInterface',
  PAGINATION: 'pagination',
  PERSISTED: 'persisted',
  MICROSERVICE: 'microservice',
  SEARCH: 'search',
  ANGULAR_SUFFIX: 'angularSuffix',
  CLIENT_ROOT_FOLDER: 'clientRootFolder',
};

const optionNames = Object.values(Options);

const Values = {
  [Options.DTO]: { DTO_ONLY, MAPSTRUCT, NO: NO_MAPPER },
  [Options.SERVICE]: { SERVICE_CLASS, SERVICE_IMPL, SERVICE_INTERFACE, NO: NO_SERVICE },
  [Options.CLIENT_INTERFACE]: { RESTFUL_RESOURCES, NO: NO_CLIENT_INTERFACE },
  [Options.PAGINATION]: {
    PAGINATION: PaginationTypes.PAGINATION,
    'INFINITE-SCROLL': PaginationTypes.INFINITE_SCROLL,
    NO: PaginationTypes.NO,
  },
  [Options.PERSISTED]: { PERSIST, DO_NOT_PERSIST },
  [Options.SEARCH]: { ELASTICSEARCH, COUCHBASE, NO: NO_SEARCH },
};

const DefaultValues = {
  [Options.DTO]: Values[Options.DTO].NO,
  [Options.SERVICE]: Values[Options.SERVICE].NO,
  [Options.PAGINATION]: Values[Options.PAGINATION].NO,
  [Options.PERSISTED]: Values[Options.PERSISTED].PERSIST,
  [Options.CLIENT_INTERFACE]: Values[Options.CLIENT_INTERFACE].RESTFUL_RESOURCES,
};

function getOptionName(optionValue) {
  return optionNames.find(optionName => Values[optionName] && Values[optionName][optionValue]);
}

const OptionValues = {
  mapstruct: 'MAPSTRUCT',
  serviceClass: 'SERVICE_CLASS',
  serviceImpl: 'SERVICE_IMPL',
  serviceInterfce: 'SERVICE_INTERFACE',
  doNotPersist: 'DO_NOT_PERSIST',
  persist: 'PERSIST',
  'restful-resources': 'RESTFUL_RESOURCES',
  pagination: 'PAGINATION',
  'infinite-scroll': 'INFINITE-SCROLL',
  elasticsearch: 'ELASTICSEARCH',
  couchbase: 'COUCHBASE',
};

function forEach(passedFunction) {
  if (!passedFunction) {
    throw new Error('A function has to be passed to loop over the binary options.');
  }
  optionNames.forEach(passedFunction);
}

function exists(passedOption, passedValue?: any) {
  return (
    !Object.values(Options).includes(passedOption) ||
    Object.values(Options).some(
      option =>
        passedOption === option &&
        (passedOption === Options.MICROSERVICE ||
          passedOption === Options.ANGULAR_SUFFIX ||
          passedOption === Options.CLIENT_ROOT_FOLDER ||
          Object.values(Values[option]).includes(passedValue))
    )
  );
}

export default {
  Options,
  // TODO change the names
  DefaultValues,
  OptionValues,
  Values,
  exists,
  forEach,
  getOptionName,
};
