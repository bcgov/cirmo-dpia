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
  isDivider?: true;
  state?: {
    prev?: {
      condition: boolean | null | undefined;
      action: string | number;
    };
    next?: {
      condition: boolean | null | undefined;
      action: string | number;
    };
  };
}
