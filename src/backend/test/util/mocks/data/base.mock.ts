import { BaseEntity } from 'src/common/entities/base.entity';

export const baseEntityMock: BaseEntity = {
  id: 1,
  isActive: true,
  createdByGuid: 'ABCDGUID',
  createdByUsername: 'IDIRUSER',
  updatedByGuid: 'ABCDGUID',
  updatedByUsername: 'IDIRUSER',
  saveId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};
