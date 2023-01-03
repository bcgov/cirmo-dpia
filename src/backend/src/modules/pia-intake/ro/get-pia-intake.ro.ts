import { ExcludeBaseSelection } from '../../../common/helpers/base-helper';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';

export type GetPiaIntakeRO = Omit<PiaIntakeEntity, keyof ExcludeBaseSelection>;
