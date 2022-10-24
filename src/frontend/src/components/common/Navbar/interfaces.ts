export interface INavbarPages {
  pages: INavbarItem[];
}

export interface INavbarItem {
  id: number;
  label: string;
  link: string;
}