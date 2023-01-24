import { BaseEntity } from 'src/common/entities/base.entity';

export const baseEntityMock: BaseEntity = {
  id: 1,
  isActive: true,
  createdByGuid: 'ABCDGUID',
  createdByUsername: 'IDIRUSER',
  updatedByGuid: 'ABCDGUID',
  updatedByUsername: 'IDIRUSER',
  createdAt: new Date(),
  updatedAt: new Date(),
};
