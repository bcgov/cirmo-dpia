export interface INavbarPages {
  pages: INavbarItem[];
  CSSclass: string;
}

export interface INavbarItem {
  id: number;
  label: string;
  link: string;
  enable?: boolean;
  onclick?: () => void;
}
