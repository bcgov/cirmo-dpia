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
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

interface IStatusTransitionCondition {
  accessType?: Array<UserTypesEnum>;
  piaType?: Array<PiaTypesEnum>;
}

interface IStatusTransitionAction {
  type: 'update';
  key: keyof PiaIntakeEntity;
  value: null;
}

interface IStatusTransition {
  allow: boolean;
  conditions?: Array<IStatusTransitionCondition>;
  actions?: Array<IStatusTransitionAction>;
}

interface IStatusUpdates {
  allow: boolean;
  except?: Array<keyof PiaIntakeEntity>;
}

interface IStatusMetadata {
  updates: IStatusUpdates;
  transition: Partial<Record<PiaIntakeStatusEnum, IStatusTransition>>;
}

// TODO: TO BE UPDATED for all statuses
export const piaStatusMetadata: Partial<
  Record<PiaIntakeStatusEnum, IStatusMetadata>
> = {
  // [PiaIntakeStatusEnum.INCOMPLETE]: {
  //   view: true,
  //   edit: true,
  //   roles: {
  //     [UserTypesEnum.DRAFTER]: {
  //       view: true,
  //       edit: true,
  //     },
  //     [UserTypesEnum.MPO]: {
  //       view: false,
  //       edit: false,
  //     },
  //     [UserTypesEnum.CPO]: {
  //       view: false,
  //       edit: false,
  //     },
  //   },
  //   access: [UserTypesEnum.DRAFTER, UserTypesEnum.MPO, UserTypesEnum.CPO],
  //   actions: [],
  //   statusChange: {
  //     [PiaIntakeStatusEnum.MPO_REVIEW]: {
  //       actions: [
  //         {
  //           type: 'delete',
  //           key: 'review',
  //         },
  //       ],
  //     },
  //   },
  // },
  // [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
  //   view: true,
  //   edit: true,
  //   role: {
  //     [UserTypesEnum.DRAFTER]: {
  //       view: true,
  //       edit: true,
  //     },
  //     [UserTypesEnum.MPO]: {
  //       view: true,
  //       edit: true,
  //     },
  //     [UserTypesEnum.CPO]: {
  //       view: false,
  //       edit: false,
  //     },
  //   },
  // },
  [PiaIntakeStatusEnum.MPO_REVIEW]: {
    updates: {
      allow: true,
    },
    transition: {
      [PiaIntakeStatusEnum.INCOMPLETE]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.CPO_REVIEW]: {
        allow: true,
      },
      [PiaIntakeStatusEnum.FINAL_REVIEW]: {
        allow: true,
        conditions: [
          {
            piaType: [PiaTypesEnum.DELEGATE_REVIEW],
          },
        ],
      },
    },
  },
  // [PiaIntakeStatusEnum.CPO_REVIEW]: {
  //   view: true,
  //   edit: true,
  //   roles: {
  //     [UserTypesEnum.DRAFTER]: {
  //       edit: true,
  //     },
  //     [UserTypesEnum.MPO]: {
  //       edit: true,
  //     },
  //     [UserTypesEnum.CPO]: {
  //       edit: true,
  //     },
  //   },
  //   transitions: {
  //     [PiaIntakeStatusEnum.INCOMPLETE]: {
  //       allow: true,
  //       actions: [
  //         {
  //           type: 'update',
  //           key: 'review',
  //           value: null,
  //         },
  //       ],
  //     },
  //     [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
  //       allow: true,
  //       actions: [
  //         {
  //           type: 'update',
  //           key: 'review',
  //           value: null,
  //         },
  //       ],
  //     },
  //     [PiaIntakeStatusEnum.CPO_REVIEW]: {
  //       allow: true,
  //       conditions: [],
  //     },
  //   },
  // },
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
    },
  },
  [PiaIntakeStatusEnum.COMPLETE]: {
    updates: {
      allow: false, // no changes allowed
    },
    transition: {}, // no status changes are allowed
  },
};
