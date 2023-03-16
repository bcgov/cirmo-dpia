import { GovMinistriesEnum } from '../enums/gov-ministries.enum';
import { RolesEnum } from '../enums/roles.enum';
import { UserTypesEnum } from '../enums/users.enum';

export interface IRoleInfo {
  user: UserTypesEnum;
  ministry: GovMinistriesEnum;
}

export const Roles: Record<RolesEnum, IRoleInfo> = {
  [RolesEnum.MPO_PSEF]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS,
  },
  [RolesEnum.MPO_AGRI]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.AGRICULTURE_AND_FOOD,
  },
  [RolesEnum.MPO_AG]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.ATTORNEY_GENERAL,
  },
  [RolesEnum.MPO_PSA]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.BC_PUBLIC_SERVICE_AGENCY,
  },
  [RolesEnum.MPO_CFD]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.CHILDREN_AND_FAMILY_DEVELOPMENT,
  },
  [RolesEnum.MPO_CITZ]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.CITIZENS_SERVICES,
  },
  [RolesEnum.MPO_ECC]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.EDUCATION_AND_CHILD_CARE,
  },
  [RolesEnum.MPO_EMLI]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.ENERGY_MINES_AND_LOW_CARBON_INNOVATION,
  },
  [RolesEnum.MPO_ENV]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.ENVIRONMENT_AND_CLIMATE_CHANGE_STRATEGY,
  },
  [RolesEnum.MPO_FIN]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.FINANCE,
  },
  [RolesEnum.MPO_FOR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.FORESTS,
  },
  [RolesEnum.MPO_GCPE]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.GOVERNMENT_COMMUNICATIONS_AND_PUBLIC_ENGAGEMENT,
  },
  [RolesEnum.MPO_HLTH]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.HEALTH,
  },
  [RolesEnum.MPO_IRR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.INDIGENOUS_RELATIONS_AND_RECONCILIATION,
  },
  [RolesEnum.MPO_JEDI]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION,
  },
  [RolesEnum.MPO_LBR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.LABOUR,
  },
  [RolesEnum.MPO_WLRS]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.WATER_LAND_AND_RESOURCE_STEWARDSHIP,
  },
  [RolesEnum.MPO_LDBR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.LIQUOR_DISTRIBUTION_BRANCH,
  },
  [RolesEnum.MPO_MMHA]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.MENTAL_HEALTH_AND_ADDICTIONS,
  },
  [RolesEnum.MPO_MUNI]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.MUNICIPAL_AFFAIRS,
  },
  [RolesEnum.MPO_OOP]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.OFFICE_OF_THE_PREMIER,
  },
  [RolesEnum.MPO_PSSG]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.PUBLIC_SAFETY_AND_SOLICITOR_GENERAL,
  },
  [RolesEnum.MPO_SDPR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.SOCIAL_DEVELOPMENT_AND_POVERTY_REDUCTION,
  },
  [RolesEnum.MPO_TACS]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.TOURISM_ARTS_CULTURE_AND_SPORT,
  },
  [RolesEnum.MPO_TRAN]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.TRANSPORTATION_AND_INFRASTRUCTURE,
  },
  [RolesEnum.MPO_HOUS]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.HOUSING,
  },
  [RolesEnum.MPO_EMCR]: {
    user: UserTypesEnum.MPO,
    ministry: GovMinistriesEnum.EDUCATION_AND_CHILD_CARE,
  },
};
