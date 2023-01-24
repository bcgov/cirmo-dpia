import { ChangeEventHandler, MouseEventHandler } from 'react';

export interface SearchBoxProps {
  searchText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  onClearSearchClick?: MouseEventHandler<HTMLButtonElement>;
}
