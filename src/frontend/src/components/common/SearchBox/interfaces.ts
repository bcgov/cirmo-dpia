import { ChangeEventHandler, MouseEventHandler } from 'react';

export interface SearchBoxProps {
  searchText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnter?: MouseEventHandler<HTMLInputElement>;
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  onClearSearchClick?: MouseEventHandler<HTMLButtonElement>;
}
