import { IPIAIntake } from '../../../types/interfaces/pia-intake.interface';
import { TableHeadingPropertiesType } from '../../../pages/PIAListPage/tableProperties';

export interface IDataTable {
  headings: TableHeadingPropertiesType;
  pias: IPIAIntake[];
}
