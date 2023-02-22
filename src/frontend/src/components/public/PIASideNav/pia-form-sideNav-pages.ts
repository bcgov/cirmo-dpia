/*
 * This is used to determine the side nav styleing of each form attribute
 * enable is used to control if we want to dislay the form attribute in the side nav
 * till the complete feature is implemented we can control what is disaplayed in the side nav
 */

import { INavbarItem } from '../../common/Navbar/interfaces';

export const piaFormSideNavPages: INavbarItem[] = [
  {
    id: 1,
    label: 'PIA Intake',
    link: '/pia/:id/intake',
    enable: true,
  },
  {
    id: 2,
    label: 'Accuracy Correction and Retention',
    link: '/pia/:id/accuracy-correction-and-retention',
    enable: true,
  },
];
