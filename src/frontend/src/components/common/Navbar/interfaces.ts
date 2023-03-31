export interface INavbarPages {
  pages: INavbarItem[];
  CSSclass: string;
}

export interface INavbarItem {
  [name:string]: {
  id: number;
  label: string;
  link: string;
  enable?: boolean;
  onclick?: () => void;
  isDivider?: true;
  state : {
    [prev:string]: {
      condition: boolean | null;
      action: string | number;
    };
    [next:string]?: {
      condition: boolean | null;
      action: string | number;
    };
  };
}
