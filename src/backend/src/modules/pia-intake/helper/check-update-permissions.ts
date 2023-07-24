import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
import {
  IEntityActions,
  IUpdateOverrides,
  IStatusUpdates,
  piaStatusMetadata,
} from '../metadata/pia-status.metadata';

interface ICheckUpdatePermissionsParams {
  status: PiaIntakeStatusEnum;
  updatedPiaKeys?: Array<keyof PiaIntakeEntity>;
  entityType?: keyof Omit<IUpdateOverrides, 'pia'>;
  entityAction?: keyof IEntityActions;
}

export const checkUpdatePermissions = ({
  status,
  updatedPiaKeys,
  entityType,
  entityAction,
}: ICheckUpdatePermissionsParams) => {
  if (!status) return false;

  const meta: IStatusUpdates = piaStatusMetadata?.[status]?.updates;

  if (!meta) return false;

  let isChangeAllowed = !!meta?.allow;

  if (meta?.overrides) {
    // check for all type of overrides

    // 1. pia field overrides
    if (updatedPiaKeys) {
      // allowed by default, if ANY of the updatedKeys is explicitly false, then disallow
      // NOT allowed by default, if ALL of the updatedKeys are explicitly true, then allow
      if (
        (meta?.allow &&
          updatedPiaKeys.some(
            (key) => meta?.overrides?.pia?.[key] === false,
          )) ||
        (!meta?.allow &&
          updatedPiaKeys.every((key) => meta?.overrides?.pia?.[key] === true))
      ) {
        isChangeAllowed = !meta?.allow;
      }
    }

    // 2. entity types
    if (
      entityType &&
      entityAction &&
      entityAction in Object(meta?.overrides?.[entityType])
    ) {
      isChangeAllowed = meta?.overrides?.[entityType]?.[entityAction];
    }
  }

  return isChangeAllowed;
};
