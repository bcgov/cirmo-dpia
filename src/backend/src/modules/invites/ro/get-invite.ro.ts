import {
  ExcludeBaseSelection,
  omitBaseKeys,
} from 'src/common/helpers/base-helper';
import { InviteEntity } from '../entities/invite.entity';

export const excludeInviteKeys = {
  pia: true,
  id: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  createdByGuid: true,
  createdByDisplayName: true,
};

export type InviteRO = Omit<
  InviteEntity,
  keyof ExcludeBaseSelection | keyof typeof excludeInviteKeys
>;

export const getFormattedInvite = (invite: InviteEntity) => {
  return omitBaseKeys<InviteRO>(invite, Object.keys(excludeInviteKeys));
};
