/**
 * role vs status change matrix;
 * if not one of the allowed transition, throw forbidden error;
 *
 * TODO for all transitions
 *
 * allowed transitions                |   MPO   |   CPO   |  Drafter |  Invited_User  | Delegated Review?  |   Action
 * -------------------                |   ----  |   ---   |  ------- |  ------------  | ----------------   |   ------
 * FINAL_REVIEW -> INCOMPLETE         |   Yes   |   NO    | NO       |        NO      | YES                |  delete review section
 * FINAL_REVIEW -> EDIT_IN_PROGRESS   |   Yes   |   NO    | NO       |        NO      | YES                |  delete review section
 * FINAL_REVIEW -> MPO_REVIEW         |   Yes   |   NO    | NO       |        NO      | YES                |  N/A
 *
 */

import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { SizeEnum } from 'src/common/enums/size.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

export interface IFieldValidation {
  required?: boolean;
  size?: SizeEnum;
}
export interface IFieldValidationsByPath {
  [path: string]: IFieldValidation;
}
export interface ICondition extends Partial<PiaIntakeEntity> {
  accessType?: Array<UserTypesEnum>;
  piaType?: Array<PiaTypesEnum>;
  fieldValidations?: IFieldValidationsByPath;
}

interface IStatusTransitionAction {
  type: 'update';
  key: keyof PiaIntakeEntity;
  value: null;
}

interface IStatusTransition {
  allow: boolean;
  conditions?: Array<ICondition>;
  actions?: Array<IStatusTransitionAction>;
}

interface IStatusUpdates {
  allow: boolean;
  except?: Array<keyof PiaIntakeEntity>;
  conditions?: Array<ICondition>;
}

interface IStatusMetadata {
  updates: IStatusUpdates;
  transition: Partial<Record<PiaIntakeStatusEnum, IStatusTransition>>;
}

export const piaStatusMetadata: Partial<
  Record<PiaIntakeStatusEnum, IStatusMetadata>
> = {
  [PiaIntakeStatusEnum.INCOMPLETE]: {
    updates: {
      allow: true,
    },
    transition: {
      [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.MPO_REVIEW]: {
        allow: true,
      },
    },
  },
  [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
    updates: {
      allow: true,
    },
    transition: {
      [PiaIntakeStatusEnum.INCOMPLETE]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.MPO_REVIEW]: {
        allow: true,
      },
    },
  },
  [PiaIntakeStatusEnum.MPO_REVIEW]: {
    updates: {
      allow: true,
      // IMPROVE to allow select updates
      // review: true,
      // pia: false
    },
    transition: {
      [PiaIntakeStatusEnum.INCOMPLETE]: {
        allow: true,
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
        allow: true,
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.CPO_REVIEW]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.FINAL_REVIEW]: {
        allow: true,
        conditions: [
          {
            piaType: [PiaTypesEnum.DELEGATE_REVIEW],
            fieldValidations: {
              'review.mpo.reviewNote': {
                required: true,
              },
              'review.programArea.selectedRoles': {
                size: SizeEnum.AT_LEAST_ONE,
              },
            },
          },
        ],
      },
    },
  },
  [PiaIntakeStatusEnum.CPO_REVIEW]: {
    updates: {
      allow: true,
      conditions: [
        {
          piaType: [PiaTypesEnum.STANDARD], // updates in CPO_REVIEW are only allowed when standard PIA
        },
      ],
    },
    transition: {
      [PiaIntakeStatusEnum.INCOMPLETE]: {
        allow: true,
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
        allow: true,
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.MPO_REVIEW]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.FINAL_REVIEW]: {
        allow: true,
        conditions: [
          {
            piaType: [PiaTypesEnum.STANDARD],
          },
        ],
      },
    },
  },
  [PiaIntakeStatusEnum.FINAL_REVIEW]: {
    updates: {
      allow: true, // add exceptions
    },
    transition: {
      [PiaIntakeStatusEnum.INCOMPLETE]: {
        allow: true,
        // allow if any of the below conditions completely satisfies
        conditions: [
          {
            accessType: [UserTypesEnum.MPO],
            piaType: [PiaTypesEnum.DELEGATE_REVIEW],
          },
        ],
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
        allow: true,
        conditions: [
          {
            accessType: [UserTypesEnum.MPO],
            piaType: [PiaTypesEnum.DELEGATE_REVIEW],
          },
        ],
        actions: [
          {
            type: 'update',
            key: 'review',
            value: null,
          },
        ],
      },
      [PiaIntakeStatusEnum.MPO_REVIEW]: {
        allow: true,
        conditions: [
          {
            accessType: [UserTypesEnum.MPO],
            piaType: [PiaTypesEnum.DELEGATE_REVIEW],
          },
        ],
      },
      [PiaIntakeStatusEnum.COMPLETE]: {
        allow: true,
      },
    },
  },
  [PiaIntakeStatusEnum.COMPLETE]: {
    updates: {
      allow: false, // no changes allowed
    },
    transition: {}, // no status changes are allowed
  },
};
