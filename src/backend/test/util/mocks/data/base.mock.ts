import { BaseEntity } from 'src/common/entities/base.entity';

export const baseEntityMock: BaseEntity = {
  id: 1,
  isActive: true,
  createdByGuid: 'ABCDGUID',
  createdByUsername: 'IDIRUSER',
  createdAt: new Date(),
  updatedAt: new Date(),
};
