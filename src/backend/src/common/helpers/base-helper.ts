// import { BaseEntity } from '../entities/base.entity';
import { BaseEntity } from '../entities/base.entity';
import { omit } from './utils';

/**
 * This class is meant to list the excluded base class properties to be sent to the user
 * - isActive
 * - createdByGuid
 * - createdByUsername
 * - updatedByGuid
 * - updatedByUsername
 */
export class ExcludeBaseSelection
  implements
    Partial<
      Pick<
        BaseEntity,
        | 'isActive'
        | 'createdByGuid'
        | 'createdByUsername'
        | 'updatedByGuid'
        | 'updatedByUsername'
      >
    >
{
  // It is useful for creating property names explicitly via constructor so that Object.getOwnPropertyNames works correctly
  constructor(
    isActive?: boolean,
    createdByGuid?: string,
    createdByUsername?: string,
    updatedByGuid?: string,
    updatedByUsername?: string,
  ) {
    this.isActive = isActive;
    this.createdByGuid = createdByGuid;
    this.createdByUsername = createdByUsername;
    this.updatedByGuid = updatedByGuid;
    this.updatedByUsername = updatedByUsername;
  }

  isActive: boolean;

  createdByGuid: string;

  createdByUsername: string;

  updatedByGuid: string;

  updatedByUsername: string;
}

/**
 * @method omitBaseKeys
 * @description Abstracts the data not needed to be returned to the end user
 *
 * @param entity any entity that extends BaseEntity
 * @returns Partial entity that does not include excluded fields
 */
export function omitBaseKeys<T>(
  entity = {},
  additionalKeysToOmit: Array<string> = [],
) {
  return omit(
    [
      ...Object.getOwnPropertyNames(new ExcludeBaseSelection()),
      ...additionalKeysToOmit,
    ],
    entity,
  ) as T;
}
