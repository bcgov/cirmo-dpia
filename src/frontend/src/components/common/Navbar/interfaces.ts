export interface INavbarPages {
  pages: INavbarItem[];
  CSSclass: string;
  isMenu?: boolean;
}

export interface INavbarItem {
  id: number;
  label: string;
  link: string;
  enable?: boolean;
  onclick?: () => void;
  isDivider?: true;
  navDown?: string;
  navUp?: string;
  navId?: string;
}
