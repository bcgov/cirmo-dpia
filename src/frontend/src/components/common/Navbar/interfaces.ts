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
    [prev: string]: {
      condition: boolean | null | undefined;
      action?:
        | {
            link: string | null;
            title: string | null;
          }
        | number
        | string
        | null;
      actionFalse?:
        | {
            link: string | null;
            title: string | null;
          }
        | number
        | string
        | null;
    };
  };
}
