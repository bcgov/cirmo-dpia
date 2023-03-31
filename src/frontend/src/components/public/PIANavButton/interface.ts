import { INavbarItem } from '../../common/Navbar/interfaces';

export interface INavButton {
  pages: INavbarItem[];
  isDelegate: boolean;
  isIntakeSubmitted: boolean;
}
