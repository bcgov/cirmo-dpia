import { TableHeadingPropertiesType } from '../ListViewRender/tableProperties';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface IDataTable {
  headings: TableHeadingPropertiesType;
  pias: IPiaForm[];
  sorting: (key: string) => void;
}
